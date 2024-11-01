import Image from "next/image";
import React from "react";
import lifePulse from "@/Assets/Images/lifePulse.png";
import { daysOfWeekArabic } from "@/lib/Reuseable Functions/functions";

const PaymentUi = ({ doctor, patient, appointment }) => {
  return (
    <div className="flex-1 flex flex-col gap-5 justify-end w-full mt-6 md:my-0">
      <div className="hidden md:flex items-center gap-2 justify-end">
        <p className="text-red-400 font-semibold text-xl">نبض الحياة</p>
        <Image src={lifePulse} alt="نبض الحياة" width={85} />
      </div>
      <div className="flex flex-col items-center justify-end">
        <p className="text-end w-full text-lg">: معلومات الموعد</p>
        {appointment !== null && doctor !== null && patient !== null ? (
          <div className="container grid grid-cols-2 items-center justify-end gap-5 rounded-xl p-5 w-full border-[1.5px] my-2 shadow-md">
            <div className="flex items-center gap-5 justify-end">
              <p className="text-sm">
                {doctor?.first_name} {doctor?.last_name}
              </p>
              <div className="h-10 w-10 rounded-lg overflow-hidden justify-end">
                <Image
                  src={doctor?.profileImage}
                  alt="doctor"
                  width={200}
                  height={200}
                  className="h-full object-fill "
                />
              </div>
            </div>
            <p className="text-end w-full text-md">: اسم الطبيب </p>
            {/* //-------------- */}
            <p className="text-end w-full text-sm">{doctor?.speciality} </p>
            <p className="text-end w-full text-sm">: مجال التخصص </p>
            {/* //-------------- */}
            <p className="text-end w-full text-sm">
              {patient?.first_name} {patient?.last_name}{" "}
            </p>
            <p className="text-end w-full text-md">: اسم المريض</p>
            {/* //-------------- */}
            <p className="text-end w-full text-sm">
              {appointment?.typeOfAppointment === 1 ? "كشف" : "استشارة"}{" "}
            </p>
            <p className="text-end w-full text-md">: نوع الزيارة </p>
            {/* //-------------- */}
            <h3 className="text-end w-full text-sm">
              {daysOfWeekArabic(appointment?.day)}{" "}
              <p className="mt-1">{appointment?.time}</p>
            </h3>
            <p className="text-end w-full text-md">: توقيت الزيارة</p>
            {/* //-------------- */}
            <p className="text-end w-full text-sm">{appointment?.price} </p>
            <p className="text-end w-full text-sm">: تكلفة الحجز</p>
            {/* //-------------- */}
          </div>
        ) : (
          <div className="my-5 flex flex-col items-center justify-center gap-4">
            <p>جاري التحميل</p>
            <div
              className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {/* //-------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default PaymentUi;
