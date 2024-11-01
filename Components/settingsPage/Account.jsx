"use client";

import { userInfoContext } from "@/lib/ReactContext/UserContext";
import {
  getDoctorInfo,
  deleteDoctorAccount,
} from "@/lib/server-actions/serverActions";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//=======================================================

const Account = ({ doctor_id }) => {
  const [doctorInfo, setDoctorInfo] = useState([]);
  const { setUser, setDoctorContext } = useContext(userInfoContext);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const result = await getDoctorInfo(doctor_id);
        if (result === "something went wrong") {
          toast.error("حدث خطاء ما حاول لاحقا");
        }
        setDoctorInfo(JSON.parse(result));
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchDoctorData();
  }, []);

  const deleteAccount = async () => {
    try {
      const result = await deleteDoctorAccount(doctor_id);
      setDoctorContext(null);
      setUser(null);

      if (result === "something went wrong") {
        toast.error("حدث خطاء ما حاول لاحقا");
      }
      toast.success("تم حذف الحساب بنجاح");
    } catch (err) {
      toast.error(err.message);
    }
  };

  //=======================================================

  return (
    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <ToastContainer />
      <hr className="mt-4 mb-8" />
      <p className="py-2 text-xl font-semibold text-end">البريد الالكتروني</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
          تغيير
        </button>
        <p className="text-gray-600">
          بريدك الالكتروني هو <strong>{doctorInfo?.email}</strong>
        </p>
      </div>
      <hr className="mt-4 mb-8" />
      <p className="py-2 text-xl font-semibold text-end">كلمة السر</p>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2 mx-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <label htmlFor="login-password">
            <p className="text-sm text-gray-500 text-end">كلمة السر الجديدة</p>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                id="login-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
              />
            </div>
          </label>
          <label htmlFor="login-password">
            <p className="text-sm text-gray-500 text-end w-full">
              كلمة السر الحالية
            </p>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                id="login-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
              />
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-end my-3">
        <button className="bg-blue-500 p-2 px-4 rounded-lg text-white">
          تغيير كلمة السر
        </button>
      </div>

      <div className="my-10 border-t">
        <p className="py-2 text-xl font-semibold text-end">حذف حساب</p>
        <div className="flex justify-end my-4">
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600 justify-self-end">
            لا يمكن التراجع عن هذا الفعل
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </div>
        <p className="mt-2 text-end">
          تحذير: سيتم حذف حسابك نهائيا ولا يمكن التراجع عن هذا الفعل
        </p>
        <div className="flex justify-end my-4">
          <button
            className="ml-auto text-sm font-semibold text-rose-600 underline underline-offset-8 decoration-2 "
            onClick={deleteAccount}
          >
            اكمل حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
