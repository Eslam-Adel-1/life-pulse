"use client";

import * as React from "react";
import Footer from "@/Components/Footer";
import Booking from "@/Assets/Images/Booking.png";
import Image from "next/image";
import "react-day-picker/style.css";
import {
  getDoctorInfo,
  getDoctorSchedule,
  setupAnAppointment,
} from "@/lib/server-actions/serverActions";
import { daysOfWeekArabic } from "@/lib/Reuseable Functions/functions";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import { useEffect, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToDoctorAppointment from "@/Components/GoToDoctorAppointment";

const daysOfWeek = [
  "Saturday",
  "Friday",
  "Thursday",
  "Wednesday",
  "Tuesday",
  "Monday",
  "Sunday",
];

const page = ({ params }) => {
  const { doctor_id } = React.use(params);
  const [showDays, setShowDays] = useState(false);
  const [typeOfAppointment, setTypeOfAppointment] = useState(1);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [docPrice, setDocPrice] = useState(null);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [appointmentPrice, setAppointmentPrice] = useState();
  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(userInfoContext);

  //==========================================================

  const handleSubmit = async () => {
    setSpinner((prev) => !prev);
    try {
      const result = await setupAnAppointment(
        doctor_id,
        user._id,
        typeOfAppointment,
        day,
        time,
        "pending",
        "unpaid",
        appointmentPrice
      );
      if (result === "Successful operation") {
        toast.success("تم حجز الموعد بنجاح");
      } else {
        toast.error("تعذر حجز الموعد");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSpinner((prev) => !prev);
      setDay("");
      setTime("");
      setTypeOfAppointment(null);
    }
  };

  //============================

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const docInfo = await getDoctorInfo(doctor_id);
        const { price } = JSON.parse(docInfo);

        setDocPrice(price);

        const result = await getDoctorSchedule(doctor_id);
        if (result === "Doctor not found") {
          toast.error("هذا الطبيب غير موجود");
        } else if (result === "No schedule found") {
          toast.error("لا يوجد جدول لهذا الطبيب");
        } else {
          setDoctorSchedule(result);
        }
      } catch (err) {
        toast.error("حدث خطأ ما حاول لاحقا");
      }
    };
    getSchedule();
  }, []);

  useEffect(() => {
    setTime("");
  }, [day]);

  //==========================================================

  return (
    <>
      {!docPrice || !doctorSchedule ? (
        <GoToDoctorAppointment />
      ) : (
        <main className="min-h-screen py-7">
          <ToastContainer className="text-end" />
          <h2 className="text-center text-gray-700">اكمل حجزك مع الطبيب</h2>
          <div className="my-7 flex items-center justify-center">
            <Image
              src={Booking}
              alt="doctor-appointment"
              className="hidden md:block md:w-[350px] "
            />
            <div className="px-6 pb-20 gap-6 ">
              <div className="flex flex-col items-end justify-between ">
                <p className="text-md font-bold text-gray-500 text-end">
                  اختر نوع الزيارة
                </p>
                <div className="mt-4 flex flex-row items-center gap-5 justify-end ">
                  <div
                    className="relative w-[150px] lg:w-[200px]"
                    onClick={() => {
                      setTypeOfAppointment(1);
                      setAppointmentPrice(docPrice?.consultation_price);
                    }}
                  >
                    <input
                      className="peer hidden"
                      id="radio_1"
                      type="radio"
                      name="radio"
                    />
                    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-red-400/70"></span>
                    <label
                      className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-red-500/80 peer-checked:text-white"
                      htmlFor="radio_1"
                    >
                      <span className="mt-2- font-medium">استشارة</span>
                      <div className="flex items-center gap-2 text-[12px]">
                        <p>جنيه</p>
                        <p>{docPrice?.consultation_price}</p>
                      </div>
                    </label>
                  </div>
                  <div
                    className="relative w-[150px] lg:w-[200px] "
                    onClick={() => {
                      setTypeOfAppointment(2);
                      setAppointmentPrice(docPrice?.check_up_price);
                    }}
                  >
                    <input
                      className="peer hidden"
                      id="radio_2"
                      type="radio"
                      name="radio"
                    />
                    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-red-400/70"></span>

                    <label
                      className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-gray-200 peer-checked:bg-red-500/80 peer-checked:text-white"
                      htmlFor="radio_2"
                    >
                      <span className="mt-2 font-medium">كشف </span>
                      <div className="flex items-center gap-2 text-[12px]">
                        <p>جنيه</p>
                        <p>{docPrice?.check_up_price}</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="mt-8 text-md font-bold text-gray-500">
                  اختر يوم الزيارة
                </p>
                <div className="relative mt-4">
                  <input
                    onClick={() => setShowDays((prev) => !prev)}
                    type="text"
                    className="datepicker-input block text-end w-full rounded-lg border border-red-300 bg-red-50 p-2.5 pr-10 text-red-800 outline-none ring-opacity-30 placeholder:text-gray-500 focus:ring focus:ring-red-300 sm:text-sm"
                    placeholder={daysOfWeekArabic(day)}
                  />
                  {showDays && (
                    <div className="absolute top-12 border shadow-lg right-0 left-0 bg-white p-4 rounded-lg z-50">
                      {daysOfWeek.map((day, index) => (
                        <p
                          className="cursor-pointer mt-2 text-end hover:text-blue-500"
                          key={index}
                          onClick={() => {
                            setDay(day);
                            setShowDays(false);
                          }}
                        >
                          {daysOfWeekArabic(day)}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="mt-8 text-md font-bold text-gray-500">
                  اختر وقت الزيارة
                </p>
                {doctorSchedule[day]?.length === 0 ? (
                  <p className="mt-5 text-center text-gray-400 w-full">
                    لا يوجد مواعيد لهذا اليوم
                  </p>
                ) : (
                  <div className="mt-5 flex items-center justify-end flex-wrap gap-2">
                    {doctorSchedule[day]?.map((item, index) => (
                      <button
                        className={`rounded-lg bg-red-100 px-4 py-2 font-medium  ${
                          item === time && "bg-red-400 text-white"
                        } text-red-900 active:scale-95 active:text-white active:bg-red-500 transition-all`}
                        key={index}
                        onClick={() => setTime(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="mt-8 w-56 rounded-full border-8 border-red-400/80 bg-red-600/80 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1 disabled:bg-gray-300 disabled:text-black/30 disabled:hover:translate-y-0 disabled:border-gray-400 disabled:border-2"
                  onClick={handleSubmit}
                  disabled={!(day && time && typeOfAppointment)}
                >
                  {spinner ? (
                    <div
                      className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <p>احجز الان</p>
                  )}
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      )}
    </>
  );
};

export default page;
