import { CgSandClock } from "react-icons/cg";
import TableRowButtons from "./TableRowButtons";
import { daysOfWeekArabic } from "@/lib/Reuseable Functions/functions";
import {
  MdOutlineMoneyOff,
  MdFreeCancellation,
  MdOutlineSchedule,
  MdOutlineAttachMoney,
} from "react-icons/md";

import UserTableRowButtons from "@/Components/UserTableRowButtons";

const TableRow = ({
  name,
  day,
  time,
  payment,
  doctor_id,
  patient_id,
  status,
  typeOfAppointment,
  type,
  appointment_id,
  price,
}) => {
  return (
    <tr className="align-middle border-b border-blue-gray-50">
      <td className="py-3 px-5 flex items-center justify-end gap-2">
        {type === "patient" ? (
          <UserTableRowButtons
            doctor_id={doctor_id}
            patient_id={patient_id}
            typeOfAppointment={typeOfAppointment}
            time={time}
            day={day}
            status={status}
            appointment_id={JSON.stringify(appointment_id)}
            payment={payment}
            price={price}
          />
        ) : (
          <TableRowButtons
            doctor_id={doctor_id}
            patient_id={patient_id}
            typeOfAppointment={typeOfAppointment}
            time={time}
            day={day}
            status={status}
            price={price}
            payment={payment}
          />
        )}
      </td>
      <td className="py-3 px-5">
        {status === "pending" ? (
          <p className="flex items-center justify-end gap-2 text-blue-500 antialiased text-end text-[12px] font-medium text-blue-gray-600 ">
            قيد الانتظار
            <CgSandClock className="text-xl " />
          </p>
        ) : status === "done" ? (
          <p className="flex items-center justify-end gap-2 text-green-500 antialiased text-end text-[12px] font-medium text-blue-gray-600 ">
            تم التأكيد
            <MdOutlineSchedule className="text-xl " />
          </p>
        ) : status === "cancelled" ? (
          <p className="flex items-center justify-end gap-2 text-red-500 antialiased text-end text-[12px] font-medium text-blue-gray-600 ">
            ملغي
            <MdFreeCancellation className="text-xl " />
          </p>
        ) : (
          <p className="flex items-center justify-end gap-2 antialiased text-end text-[12px] font-medium text-blue-gray-600 ">
            في الانتظار
          </p>
        )}
      </td>
      <td className="py-3 px-5">
        {payment === "paid" ? (
          <div className="flex items-center justify-end antialiased text-end text-xs font-medium text-blue-gray-600">
            <p>مدفوع</p>
            <MdOutlineAttachMoney className="text-xl text-green-500" />
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3 antialiased text-end text-xs font-medium text-blue-gray-600">
            <p>غير مدفوع</p>
            <MdOutlineMoneyOff className="text-xl text-red-500" />
          </div>
        )}
      </td>
      <td className="py-3 px-5 flex justify-end">
        <div className="w-10/12 flex justify-end items-center">
          <p className="antialiased text-end mb-1 block text-xs font-medium text-blue-gray-600">
            {`${time} ${daysOfWeekArabic(day)}`}
          </p>
        </div>
      </td>
      <td className="py-3 px-5 ">
        <div className="flex items-center gap-4 justify-end">
          <p className="block antialiased text-end text-sm leading-normal text-blue-gray-900 font-bold">
            {name}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
