import { MdOutlineSchedule } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { MdFreeCancellation } from "react-icons/md";
import EditSchedule from "./EditSchedule";

const DashboardCards = ({ type, title, number, doctor_id }) => {
  return type == 1 ? (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 h-16 w-16 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-6 h-6 text-white"
        >
          <CgSandClock className="text-2xl" />
        </svg>
      </div>
      <div className="p-4 text-right">
        <h4 className="block antialiased tracking-normal text-blue-500  text-2xl font-semibold leading-snug ">
          <p className="block antialiased  text-sm leading-normal font-normal text-blue-gray-600">
            {title}
          </p>
          {number}
        </h4>
      </div>
      <div className="border-t border-blue-gray-50 p-4">
        <p className="block antialiased  text-sm text-end leading-relaxed font-normal text-blue-gray-600">
          مواعيدك التي على قائمة الانتظار
        </p>
      </div>
    </div>
  ) : type == 2 ? (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-6 h-6 text-white"
        >
          <MdOutlineSchedule className="text-2xl" />
        </svg>
      </div>
      <div className="p-4 text-right text-green-500">
        <p className="block antialiased  text-sm leading-normal font-normal text-blue-gray-600">
          {title}
        </p>
        <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
          {number}
        </h4>
      </div>
      <div className="border-t border-blue-gray-50 p-4">
        <p className="block antialiased  text-sm text-end leading-relaxed font-normal text-blue-gray-600">
          مواعيدك التي تم تأكيدها مع المرضى
        </p>
      </div>
    </div>
  ) : type === 3 ? (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-red-400 text-white shadow-red-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-6 h-6 text-white"
        >
          <MdFreeCancellation className="text-2xl" />
        </svg>
      </div>
      <div className="p-4 text-right text-red-500">
        <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
          <p className="block antialiased  text-sm leading-normal font-normal text-blue-gray-600">
            {title}
          </p>
          {number}
        </h4>
      </div>
      <div className="border-t border-blue-gray-50 p-4">
        <p className="block antialiased  text-sm text-end leading-relaxed font-normal text-blue-gray-600">
          مواعيدك التي تم الغائها
        </p>
      </div>
    </div>
  ) : (
    <EditSchedule doctor_id={doctor_id} />
  );
};

export default DashboardCards;
