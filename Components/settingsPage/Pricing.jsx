"use client";

import { updateDoctorPrice } from "@/lib/server-actions/serverActions";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pricing = ({ doctor_id, price }) => {
  const [checkUpPrice, setCheckUpPrice] = useState(null);
  const [consultationPrice, setConsultationPrice] = useState(null);
  const [spinner, setSpinner] = useState(false);

  //=============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner((prev) => !prev);
    try {
      if (!doctor_id) {
        toast.error("حدث خطأ ما حاول لاحقا");
        return;
      }
      if (!checkUpPrice || !consultationPrice) {
        toast.error("هناك حقول فارغة");
        return;
      }
      const result = await updateDoctorPrice(
        checkUpPrice,
        consultationPrice,
        doctor_id
      );
      if (result === "price changed successfully") {
        toast.success("تم وصع التسعيرة الجديده بنجاح");
      } else {
        toast.error("حدث خطاء ما حاول لاحقا");
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setCheckUpPrice(null);
      setConsultationPrice(null);
      setSpinner((prev) => !prev);
    }
  };
  //=============================================================

  return (
    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow pb-10 pt-5">
      <ToastContainer />
      <p className="text-center my-5">التسعيرة</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-center">سعر الكشف</p>
          <p className="text-center">سعر الاستشارة</p>
          <div>
            <p className="text-center text-[11px] font-medium text-gray-400">
              {price?.check_up_price}: السعر الحالي
            </p>
          </div>
          <div>
            <p className="text-center text-[11px] font-medium text-gray-400">
              {price?.consultation_price}: السعر الحالي
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <label>بالجنيه</label>
            <input
              type="number"
              id="number-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="200"
              onChange={(e) => setCheckUpPrice(e.target.value)}
              value={checkUpPrice ?? ""}
              required
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <label>بالجنيه</label>
            <input
              type="number"
              id="number-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="100"
              onChange={(e) => setConsultationPrice(e.target.value)}
              value={consultationPrice ?? ""}
              required
            />
          </div>
          <button className="bg-blue-500 p-2 px-4 rounded-lg text-white col-span-2">
            {spinner ? (
              <div
                className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "حقظ"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pricing;
