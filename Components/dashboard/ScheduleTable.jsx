import TableRow from "./TableRow";
import Appointment from "@/mongoDB/Schemas/appointment";
import User from "@/mongoDB/Schemas/userSchema";

//==========================================
const ScheduleTable = async ({ doctor_id }) => {
  let error;
  let doctorSchedule = [];
  let patientInfo;
  let patientInfoArray = [];
  try {
    doctorSchedule = await Appointment.find({ doctor_id: doctor_id }).sort({
      createdAt: -1,
    });
    patientInfo = doctorSchedule.map((item) => {
      return User.findOne({
        _id: JSON.parse(JSON.stringify(item.patient_id)),
      });
    });
    patientInfoArray = await Promise.all(patientInfo);

    if (!doctorSchedule || doctorSchedule?.length === 0) {
      error = "لا يوجد مواعيد لهذا الطبيب";
    }
  } catch (err) {
    console.error(err.message);
  }

  //============================================
  return (
    <div className="hidden mb-4 sm:grid grid-cols-1 gap-6 ">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
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
            مواعيدك التي على قائمة الانتظار
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
                    المرضى
                  </p>
                </th>
              </tr>
            </thead>
            {doctorSchedule && doctorSchedule?.length !== 0 ? (
              <tbody>
                {doctorSchedule.map((item, index) => {
                  const patient = patientInfoArray.find(
                    (item2) =>
                      JSON.stringify(item2?._id) ===
                      JSON.stringify(item?.patient_id)
                  );
                  return (
                    <TableRow
                      key={index}
                      className="w-full"
                      name={`${patient?.first_name} ${patient?.last_name}`}
                      day={item?.day}
                      time={item?.time}
                      payment={item?.payment}
                      status={item?.status}
                      doctor_id={item?.doctor_id}
                      patient_id={item?.patient_id}
                      typeOfAppointment={item?.typeOfAppointment}
                      price={item?.price}
                      type="doctor"
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
  );
};

export default ScheduleTable;
