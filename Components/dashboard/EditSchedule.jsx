"use client";
import { MdPendingActions } from "react-icons/md";
import { useState } from "react";
import Schedule from "./Schedule";

const EditSchedule = ({ doctor_id }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <Schedule setShowModal={setShowModal} doctor_id={doctor_id} />
      )}
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-4">
        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-600 to-gray-400 text-white shadow-gray-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <MdPendingActions className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col items-end justify-end">
          <p className="text-[12px] lg:text-sm leading-normal font-normal text-blue-gray-600">
            قم بإضافة مواعيدك هنا
          </p>
          <button
            className="block tracking-normal  lg:text-2xl font-semibold leading-snug text-blue-gray-900 hover:text-blue-600 text-base"
            onClick={() => setShowModal((prev) => !prev)}
          >
            عدل مواعيدك
          </button>
        </div>
        <div className="border-t border-blue-gray-50 pt-2 mt-7">
          <p className="text-sm text-end leading-relaxed font-normal text-blue-gray-600">
            قم بإضافة مواعيدك لعيادتك خلال الاسبوع
          </p>
        </div>
      </div>
    </>
  );
};

export default EditSchedule;
