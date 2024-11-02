"use client";

import * as React from "react";
import Account from "@/Components/settingsPage/Account";
import Pricing from "@/Components/settingsPage/Pricing";
import Profile from "@/Components/settingsPage/Profile";
import { getDoctorInfo } from "@/lib/server-actions/serverActions";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({ params }) => {
  const { doctor_id } = React.use(params);
  const [showSettings, setShowSettings] = useState(1);
  const [doctorData, setDoctorData] = useState(null);
  const [spinner, setSpinner] = useState(true);

  //=================================================
  useEffect(() => {
    let mounted = true;
    const fetchDoctorData = async () => {
      setSpinner(true);
      try {
        const result = await getDoctorInfo(doctor_id);
        if (result === "something went wrong") {
          toast.error("حدث خطاء ما حاول لاحقا");
        }
        if (mounted) {
          setDoctorData(JSON.parse(result));
          setSpinner(false);
        }
      } catch (err) {
        if (mounted) {
          toast.error(err.message);
        }
      }
    };
    fetchDoctorData();

    return () => {
      mounted = false;
    };
  }, [doctor_id]);

  //=================================================

  return (
    <div className="min-h-screen">
      <ToastContainer />
      {spinner ? (
        <div className="w-full h-full grid place-content-center">
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
            <h1 className="border-b py-6 text-2xl text-end font-semibold text-gray-600">
              الاعدادات
            </h1>
            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
              {showSettings === 1 ? (
                <Account doctor_id={doctor_id} />
              ) : showSettings === 2 ? (
                <Profile doctor_id={doctor_id} doctorData={doctorData} />
              ) : (
                <Pricing doctor_id={doctor_id} price={doctorData?.price} />
              )}

              <div className="col-span-2 hidden sm:block text-gray-600">
                <ul>
                  <li
                    className={`${
                      showSettings === 1 && "border-l-blue-700 text-blue-700"
                    } mt-5 cursor-pointer border-l-2 px-2 py-2 text-end font-semibold transition hover:border-l-blue-700 hover:text-blue-700`}
                    onClick={() => setShowSettings(1)}
                  >
                    الحساب
                  </li>
                  <li
                    className={` ${
                      showSettings === 2 && "border-l-blue-700 text-blue-700"
                    } mt-5 cursor-pointer border-l-2  px-2 py-2 text-end font-semibold  transition hover:border-l-blue-700 hover:text-blue-700`}
                    onClick={() => setShowSettings(2)}
                  >
                    الملف الشخصي
                  </li>
                  <li
                    className={`${
                      showSettings === 3 && "border-l-blue-700 text-blue-700"
                    } mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 text-end font-semibold transition hover:border-l-blue-700 hover:text-blue-700`}
                    onClick={() => setShowSettings(3)}
                  >
                    التسعيرة
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
