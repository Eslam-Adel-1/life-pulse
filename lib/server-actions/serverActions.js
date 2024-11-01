"use server";
import connect from "@/mongoDB/mongoConnect";
import Doctor from "@/mongoDB/Schemas/doctorSchema";
import User from "@/mongoDB/Schemas/userSchema";
import Appointment from "@/mongoDB/Schemas/appointment";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { cookieMaxAge } from "../constants/constants";
import { Twilio } from "twilio";
import { redirect } from "next/navigation";

//=================================================================

//Command to generate random JWT_SECRET_KEY
//openssl rand -base64 32 ----- OR -----
//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

//=================================================================

// const client = new Twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

const secretKey = process.env.JWT_SECRET_KEY || "";

export const createDoctor = async (data, idImage) => {
  const encryptedPassword = btoa(data.password);

  try {
    await connect();
    const createDoctor = new Doctor({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phoneNumber,
      speciality: data.speciality,
      password: encryptedPassword,
      idImage: idImage,
      profileImage: null,
    });
    await createDoctor.save();

    const doctor = await Doctor.findOne({ email: data.email });
    if (!doctor) {
      return { message: "No user found" };
    }

    const token = sign({ doctor }, secretKey, {
      expiresIn: cookieMaxAge,
    });

    const cookiesStore = await cookies();

    cookiesStore.set("doctorToken", token, {
      httpOnly: true,
      maxAge: cookieMaxAge,
      sameSite: "strict",
      path: "/",
    });

    return {
      message: "doctor created successfully",
      doctorData: JSON.stringify(doctor),
    };
  } catch (err) {
    if (
      err.message.includes(
        "E11000 duplicate key error collection: test.doctors index: email_1 dup key"
      )
    ) {
      return { message: "email already exists" };
    } else if (
      err.message.includes(
        "E11000 duplicate key error collection: test.doctors index: phone_number_1 dup key:"
      )
    ) {
      return { message: "phone number already exists" };
    } else if (
      err.message.includes(
        "E11000 duplicate key error collection: test.doctors index: idImage_1 dup key:"
      )
    ) {
      return { message: "Id image already exists" };
    } else {
      console.error(err.message);
    }
  }
};

//=================================================================

export const createUser = async (data) => {
  const encryptedPassword = btoa(data.password);

  try {
    await connect();
    const createUser = new User({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phoneNumber,
      password: encryptedPassword,
      profileImage: null,
    });
    await createUser.save();

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return { message: "No user found" };
    }

    const token = sign({ user }, secretKey, {
      expiresIn: cookieMaxAge,
    });

    const cookiesStore = await cookies();

    cookiesStore.set("userToken", token, {
      httpOnly: true,
      maxAge: cookieMaxAge,
      sameSite: "strict",
      path: "/",
    });

    return {
      message: "user created successfully",
      userData: JSON.stringify(user),
    };

    // + + + + + + + + + + + + + + + + +
  } catch (err) {
    if (
      err.message.includes(
        "E11000 duplicate key error collection: test.users index: email_1 dup key:"
      )
    ) {
      return { message: "email already exists" };
    }

    if (
      err.message.includes(
        "E11000 duplicate key error collection: test.users index: phone_number_1 dup key:"
      )
    ) {
      return { message: "phone number already exists" };
    } else {
      console.error(err.message);
    }
  }
};

//=================================================================

export const loginUser = async (data) => {
  const encryptedPassword = btoa(data.password);

  try {
    await connect();
    const user = await User.findOne({
      email: data.email,
      password: encryptedPassword,
    });

    if (!user) {
      return { message: "No user found" };
    }

    const token = sign({ user }, secretKey, {
      expiresIn: cookieMaxAge,
    });

    const cookiesStore = await cookies();

    cookiesStore.set("userToken", token, {
      httpOnly: true,
      maxAge: cookieMaxAge,
      sameSite: "strict",
      path: "/",
    });

    return {
      message: "Login Successful",
      userData: JSON.stringify(user),
    };
  } catch (err) {
    console.error(err.message);
    return { message: "Login Failed" };
  }
};

//=================================================================

export const loginDoctor = async (data) => {
  const encryptedPassword = btoa(data.password);
  try {
    await connect();
    const doctor = await Doctor.findOne({
      email: data.email,
      password: encryptedPassword,
    });

    if (!doctor) {
      return { message: "No user found" };
    }
    const token = sign({ doctor }, secretKey, {
      expiresIn: cookieMaxAge,
    });

    const cookiesStore = await cookies();

    cookiesStore.set("doctorToken", token, {
      httpOnly: true,
      maxAge: cookieMaxAge,
      sameSite: "strict",
      path: "/",
    });

    return {
      message: "Login Successful",
      doctorData: JSON.stringify(doctor),
    };
  } catch (err) {
    return { message: "Login Failed" };
  }
};

//=================================================================

export const logoutUser_Doctor = async () => {
  const cookiesStore = await cookies();
  if (cookiesStore.has("doctorToken")) {
    cookiesStore.set("doctorToken", "", { maxAge: -1 });
  }
  if (cookiesStore.has("userToken")) {
    cookiesStore.set("userToken", "", { maxAge: -1 });
  }
};

//=================================================================

export const getCurrentUserCookie = async () => {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get("userToken");
  if (!cookie || !cookie.value) {
    return null;
  }

  try {
    const data = verify(cookie.value, secretKey);
    if (!data?.user) {
      return null;
    }
    return { userData: data?.user };
  } catch (err) {
    return null;
  }
};

//=================================================================

export const getCurrentDoctorCookie = async () => {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get("doctorToken");
  if (!cookie || !cookie.value) {
    return null;
  }

  try {
    const data = verify(cookie.value, secretKey);
    if (!data?.doctor) {
      return null;
    }
    return { doctorData: data?.doctor };
  } catch (err) {
    return null;
  }
};
//=================================================================

export const updateDoctorInfo = async (data, profileImage, doctor_id) => {
  await connect();
  await Doctor.updateOne(
    {
      _id: JSON.parse(JSON.stringify(doctor_id)),
    },
    {
      university: data.university,
      clinic: data.clinic,
      bio: data.bio,
      profileImage: profileImage,
    }
  );

  const doctor = await Doctor.findOne({
    _id: JSON.parse(JSON.stringify(doctor_id)),
  });

  const token = sign({ doctor }, secretKey, {
    expiresIn: cookieMaxAge,
  });

  cookies().set("doctorToken", token, {
    httpOnly: true,
    maxAge: cookieMaxAge,
    sameSite: "strict",
    path: "/",
  });

  return {
    doctor: JSON.stringify(doctor),
    message: "تم استكمال البيانات بنجاح",
  };
};

//=================================================================

export const updateDoctorRating = async (data, doctor_id) => {
  try {
    await connect();
    await Doctor.updateOne(
      {
        _id: JSON.parse(doctor_id),
      },
      {
        $push: { rating: data.rating },
      }
    );

    return "شكرا لك على التقييم";
  } catch (err) {
    console.error(err.message);
  }
};

//=================================================================

export const updateDoctorSchedule = async (doctor_id, schedule) => {
  try {
    await connect();
    await Doctor.updateOne(
      {
        _id: JSON.parse(JSON.stringify(doctor_id)),
      },
      {
        schedule,
      }
    );

    return "تم تحديث جدول مواعيدك بنجاح";
  } catch (err) {
    console.error(err.message, "this is on the server actions file");
  }
};
//=================================================================

export const getDoctorSchedule = async (doctor_id) => {
  try {
    await connect();
    const doctor = await Doctor.findOne({
      _id: JSON.parse(JSON.stringify(doctor_id)),
    });
    if (!doctor) {
      return "Doctor not found";
    }
    if (!doctor.schedule) {
      return "No schedule found";
    }
    return doctor.schedule;
  } catch (err) {
    console.error(err.message);
  }
};

//=================================================================

export const setupAnAppointment = async (
  doctor_id,
  patient_id,
  typeOfAppointment,
  day,
  time,
  status,
  payment,
  price
) => {
  await connect();

  const appointment = await new Appointment({
    doctor_id,
    patient_id,
    typeOfAppointment,
    day,
    time,
    status,
    payment,
    price,
  });
  await appointment.save();

  if (!appointment) {
    return "Failed operation";
  }

  if (status === "done" || status === "cancelled") {
    const deleteAppointment = await Appointment.deleteOne({
      doctor_id,
      patient_id,
      status: "pending",
    });

    if (!deleteAppointment) return "Failed operation";
  }

  return "Successful operation";
};

//=================================================================

export const getAppointmentData = async (appointment_id) => {
  try {
    await connect();
    const appointment = await Appointment.findOne({
      _id: JSON.parse(JSON.stringify(appointment_id)),
    });
    if (!appointment) {
      return "something went wrong";
    }
    return JSON.stringify(appointment);
  } catch (err) {
    console.error(err.message);
  }
};

//=================================================================

export const getDoctorInfo = async (doctor_id) => {
  await connect();
  const doctor = await Doctor.findOne({
    _id: JSON.parse(JSON.stringify(doctor_id)),
  });

  if (!doctor) {
    return "something went wrong";
  }
  return JSON.stringify(doctor);
};

//=================================================================
export const getPatientInfo = async (patient_id) => {
  try {
    await connect();
    const patient = await User.findOne({
      _id: JSON.parse(JSON.stringify(patient_id)),
    });
    if (!patient) {
      return "something went wrong";
    }
    return JSON.stringify(patient);
  } catch (err) {
    console.error(err.message);
  }
};

//=================================================================
export const updateDoctorPrice = async (
  checkUpPrice,
  consultationPrice,
  doctor_id
) => {
  try {
    await connect();
    const doctor = await Doctor.findOne({
      _id: JSON.parse(JSON.stringify(doctor_id)),
    });
    if (!doctor) {
      return "something went wrong";
    }
    const updatedDoctor = await Doctor.updateOne(
      { _id: JSON.parse(JSON.stringify(doctor_id)) },
      {
        price: {
          check_up_price: checkUpPrice,
          consultation_price: consultationPrice,
        },
      }
    );
    if (!updatedDoctor) {
      return "something went wrong";
    }
    return "price changed successfully";
  } catch (err) {
    console.error(err.message);
  }
};

//=================================================================
export const updateAppointmentPaid = async (appointment_id) => {
  try {
    const updateStatus = await Appointment.updateOne(
      {
        _id: JSON.parse(JSON.stringify(appointment_id)),
      },
      {
        payment: "paid",
      }
    );
    if (!updateStatus) {
      return "something went wrong";
    }
    return "appointment updated successfully";
  } catch (err) {
    console.error(err.message);
  }
};

//=================================================================

export const deleteDoctorAccount = async (doctor_id) => {
  await connect();
  const findDoctor = await Doctor.findById(doctor_id);
  if (!findDoctor) {
    return "something went wrong";
  }

  const deleteDoctor = await Doctor.findByIdAndDelete(doctor_id);
  if (!deleteDoctor) {
    return "something went wrong";
  }

  const deleteAppointments = await Appointment.deleteMany({
    doctor_id: JSON.parse(JSON.stringify(doctor_id)),
  });

  if (!deleteAppointments) {
    return "something went wrong";
  }
  logoutUser_Doctor();
  redirect("/login");
};

//=================================================================

// if (status === "done") {
//   const message = await client.messages.create({
//     body: "قام الدكتور بتأكيد حجزك بنجاح",
//     to: "+18036303295",
//     from: "+18036303295",
//   });
//   if (!message) {
//     return "Failed operation";
//   }
//   return "Successful operation";
// } else if (status === "cancelled") {
//   const message = await client.messages.create({
//     body: "نعتذر لك لقد قام الدكتور بإلغاء تأكيد الحجز لظروف طارئة",
//     to: "+18036303295",
//     from: "+18036303295",
//   });
//   if (!message) {
//     return "Failed operation";
//   }
//   return "Successful operation";
// }
