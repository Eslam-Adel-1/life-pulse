"use client";

import {
  getDoctorSchedule,
  updateDoctorSchedule,
} from "@/lib/server-actions/serverActions";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { daysOfWeekArabic } from "@/lib/Reuseable Functions/functions";

const daysOfWeek = [
  "Saturday",
  "Friday",
  "Thursday",
  "Wednesday",
  "Tuesday",
  "Monday",
  "Sunday",
];

const initialDays = {
  Saturday: [],
  Friday: [],
  Thursday: [],
  Wednesday: [],
  Tuesday: [],
  Monday: [],
  Sunday: [],
};

//=========================================

const renderTimeWithAmOrPm = (time) =>
  `${time % 12 || 12} ${time >= 12 ? "PM" : "AM"}`;

//=========================================

const Schedule = ({ setShowModal, doctor_id }) => {
  const [days, setDays] = useState(initialDays);
  const [selectedDay, setSelectedDay] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      const schedule = await getDoctorSchedule(doctor_id);
      if (schedule === "No schedule found") return;
      setDays(schedule);
    };
    fetchSchedule();
  }, []);

  const handleScheduleChange = (selectedDay, time) => {
    if (days[selectedDay]?.includes(time)) {
      const newDaysSchedule = {
        ...days,
        [selectedDay]: days[selectedDay]?.filter((item) => item !== time),
      };

      setDays(newDaysSchedule);
    } else {
      const newDaysSchedule = {
        ...days,
        [selectedDay]: [...(days[selectedDay] || []), time],
      };

      setDays(newDaysSchedule);
    }
  };

  //=========================================================

  const updateSchedule = async () => {
    setSpinner((prev) => !prev);
    try {
      const result = await updateDoctorSchedule(doctor_id, days);
      toast.success(result);
      setSpinner((prev) => !prev);
    } catch {
      toast.error("حدث خطأ ما حاول لاحقا");
      setSpinner((prev) => !prev);
    }
  };

  //=========================================================

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black/70 z-50">
      <ToastContainer />
      <div className="relative bg-white px-10 w-[100%] h-[100%] md:w-[90%] md:h-[80%] lg:w-[70%] rounded-2xl pt-16 overflow-y-scroll">
        <IoMdClose
          className="text-2xl absolute top-5 right-6 hover:bg-slate-300 hover:rounded-full cursor-pointer"
          onClick={() => setShowModal((prev) => !prev)}
        />
        <p className="text-end w-full text-gray-600">
          قم بإضافة او تعديل مواعيد لعيادتك
        </p>

        {/* //===================================== */}

        {/*some of the content inside the parent container were not shown/displayed even after applying overflow-x-scroll >>> the problem solution is to remove justify-center if the parent container has display */}
        <div className="flex items-center md:justify-center gap-6 my-5 border-b-2 pb-4 px-5 w-full overflow-x-scroll">
          {daysOfWeek.map((day, index) => (
            <div
              className={`border p-2 rounded-lg ${
                selectedDay === day ? "text-blue-700" : "text-gray-600"
              }`}
              onClick={() => setSelectedDay(day)}
              key={index}
            >
              <p className="font-semibold text-[12px] cursor-pointer">
                {daysOfWeekArabic(day)}
              </p>
            </div>
          ))}
        </div>

        {/* //===================================== */}

        {selectedDay ? (
          <div className="py-4 pb-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 place-items-center mb-5">
              {Array.from({ length: 24 }, (_, index) => (
                <div
                  key={index}
                  className="border flex items-center justify-center gap-1 rounded-lg shadow-md w-[120px]  p-2"
                >
                  <input
                    type="checkbox"
                    value={index}
                    className="peer appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-600 checked:border-transparent cursor-pointer"
                    checked={
                      days[selectedDay]?.includes(renderTimeWithAmOrPm(index))
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handleScheduleChange(
                        selectedDay,
                        renderTimeWithAmOrPm(e.target.value)
                      )
                    }
                  />
                  <span className="peer-checked:text-red-600 text-gray-600">
                    {renderTimeWithAmOrPm(index)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-red-600 text-white p-2 rounded-lg px-7 active:bg-gray-500 active:scale-95 transition-all"
                disabled={spinner}
                onClick={() => updateSchedule()}
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
                  <p>حفظ</p>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center w-full p-4 text-gray-500 border-[1.5px] rounded-lg">
              اختر اليوم
            </p>
          </div>
        )}

        {/* //===================================== */}
      </div>
    </div>
  );
};

export default Schedule;
