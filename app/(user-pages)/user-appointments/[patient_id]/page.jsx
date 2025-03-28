import TableRow from "@/Components/dashboard/TableRow";
import Appointment from "@/mongoDB/Schemas/appointment";
import Doctor from "@/mongoDB/Schemas/doctorSchema";
import rotateYourPhone from "@/Assets/Images/rotateYourPhone.gif";
import Image from "next/image";
import { notFound } from "next/navigation";

//==========================================
const ScheduleTable = async ({ params }) => {
  const { patient_id } = await params;
  let error;
  let patientSchedule = [];
  let doctorInfo;
  let doctorInfoArray = [];
  try {
    patientSchedule = await Appointment.find({ patient_id }).sort({
      createdAt: -1,
    });
    doctorInfo = patientSchedule.map((item) => {
      return Doctor.findOne({
        _id: JSON.parse(JSON.stringify(item.doctor_id)),
      });
    });
    doctorInfoArray = await Promise.all(doctorInfo);

    if (!patientSchedule || patientSchedule?.length === 0) {
      error = "لا يوجد مواعيد ";
    }
  } catch (err) {
    notFound();
  }

  //============================================
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] sm:hidden">
        <Image
          src={rotateYourPhone}
          alt="rotateYourPhone"
          width={200}
          height={200}
        />
        <h2 className="text-center">قم بتدوير هاتفك لعرض جدول المواعيد</h2>
      </div>
      <div className="hidden mb-4 sm:grid grid-cols-1 gap-6 xl:grid-cols-2 w-full">
        <div className="relative w-full flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
            <button
              aria-expanded="false"
              aria-haspopup="menu"
              id=":r5:"
              className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
              type="button"
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currenColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  ></path>
                </svg>
              </span>
            </button>
            <h6 className="block antialiased tracking-normal text-end text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
              مواعيدك التي قمت بحجزها
            </h6>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr className="border-b border-blue-gray-50">
                  <th className="py-3 px-6 text-left">
                    <p className="block antialiased  text-end text-[11px] font-medium uppercase text-blue-gray-400">
                      تأكيد / الغاء
                    </p>
                  </th>
                  <th className="py-3 px-6 text-left">
                    <p className="block antialiased text-end text-[11px] font-medium uppercase text-blue-gray-400">
                      حالة الموعد
                    </p>
                  </th>
                  <th className="py-3 px-6 text-left">
                    <p className="block antialiased text-end text-[11px] font-medium uppercase text-blue-gray-400">
                      الدفع
                    </p>
                  </th>
                  <th className="py-3 px-6 text-left">
                    <p className="block antialiased text-end text-[11px] font-medium uppercase text-blue-gray-400">
                      الموعد
                    </p>
                  </th>
                  <th className="py-3 px-6 text-left">
                    <p className="block antialiased text-end text-[11px] font-medium uppercase text-blue-gray-400">
                      الدكتور
                    </p>
                  </th>
                </tr>
              </thead>
              {patientSchedule && patientSchedule?.length !== 0 ? (
                <tbody>
                  {patientSchedule.map((item, index) => {
                    const doctor = doctorInfoArray.find(
                      (item2) =>
                        JSON.stringify(item2?._id) ===
                        JSON.stringify(item?.doctor_id)
                    );
                    return (
                      <TableRow
                        key={index}
                        className="w-full"
                        name={`${doctor?.first_name} ${doctor?.last_name}`}
                        day={item?.day}
                        time={item?.time}
                        payment={item?.payment}
                        status={item?.status}
                        doctor_id={item?.doctor_id}
                        patient_id={item?.patient_id}
                        typeOfAppointment={item?.typeOfAppointment}
                        appointment_id={item?._id}
                        type="patient"
                      />
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 m-5">
                      <p className="w-full flex items-center justify-center p-20">
                        <span className=" p-5 px-10 ">{error}</span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleTable;
