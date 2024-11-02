import DashboardCards from "@/Components/dashboard/DashboardCards";
import ScheduleTable from "@/Components/dashboard/ScheduleTable";
import Footer from "@/Components/Footer";
import Appointment from "@/mongoDB/Schemas/appointment";
import Doctor from "@/mongoDB/Schemas/doctorSchema";
import rotateYourPhone from "@/Assets/Images/rotateYourPhone.gif";
import Image from "next/image";
import { notFound } from "next/navigation";
import connect from "@/mongoDB/mongoConnect";
import GoToInfoButton from "@/Components/dashboard/GoToInfoButton";

const Page = async ({ params }) => {
  //================================================

  const { doctor_id } = await params;
  let error = null;
  let doctorSchedule = [];
  let pendingAppointments = [];
  let cancelledAppointments = [];
  let confirmedAppointments = [];
  let doctorInfo = null;
  try {
    await connect();
    doctorInfo = await Doctor.findOne({
      _id: JSON.parse(JSON.stringify(doctor_id)),
    });
    if (!doctorInfo) {
      return notFound();
    }
    //============================================

    if (
      !doctorInfo?.bio ||
      !doctorInfo?.university ||
      !doctorInfo?.clinic ||
      !doctorInfo?.profileImage
    ) {
      return (
        <div className="flex items-center justify-center h-screen flex-col gap-7 text-gray-600">
          <p> المعلومات غير مكتملة قم بإستكمال معلوماتك للدخول الى حسابك</p>
          <GoToInfoButton doctor_id={doctor_id} />
        </div>
      );
    }

    //============================================
    doctorSchedule = await Appointment.find({ doctor_id: doctor_id });
    cancelledAppointments = doctorSchedule.filter(
      (item) => item.status === "cancelled"
    );
    confirmedAppointments = doctorSchedule.filter(
      (item) => item.status === "done"
    );
    pendingAppointments = doctorSchedule.filter(
      (item) => item.status === "pending"
    );

    if (!doctorSchedule) {
      error = "لا يوجد مواعيد لهذا الطبيب";
    }
  } catch (err) {
    console.error(err.message);
    return notFound();
  }

  //======================================================
  return (
    <div className="min-h-screen">
      <div className="p-4 ">
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 ">
            <DashboardCards
              type={1}
              title="في قائمة الانتظار"
              number={pendingAppointments.length || 0}
            />
            <DashboardCards
              type={2}
              title="مواعيد مؤكده"
              number={confirmedAppointments.length || 0}
            />
            <DashboardCards
              type={3}
              title="مواعيد تم الغائها"
              number={cancelledAppointments.length || 0}
            />
            <DashboardCards
              type={4}
              title="hello"
              number={5}
              doctor_id={doctor_id}
            />
          </div>
          {/* ////////////////////////////// */}
          <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] sm:hidden">
            <Image
              src={rotateYourPhone}
              alt="rotateYourPhone"
              width={200}
              height={200}
            />
            <h2 className="text-center">قم بتدوير هاتفك لعرض جدول المواعيد</h2>
          </div>
          {/* ////////////////////////////// */}

          <ScheduleTable doctor_id={doctor_id} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
