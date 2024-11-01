"use client";
import UploadImage from "@/Components/UploadImage";
import {
  logoutUser_Doctor,
  updateDoctorInfo,
} from "@/lib/server-actions/serverActions";
import { doctorUpdateSchema } from "@/lib/zod-schemas/schemas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoContext } from "@/lib/ReactContext/UserContext";

const DoctorInformationForm = ({ doctor_id }) => {
  const [profileImage, setProfileImage] = useState("");
  const { setDoctorContext } = useContext(userInfoContext);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  //=============================================

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(doctorUpdateSchema), mode: "all" });

  //===================================================

  const onSubmit = async () => {
    setSpinner((prev) => !prev);
    try {
      let result = await updateDoctorInfo(getValues(), profileImage, doctor_id);
      if (result.doctor) {
        setDoctorContext(JSON.parse(result.doctor));
        toast.success("تم تعديل المعلومات بنجاح");
      }
    } catch (err) {
      toast.error("تعذر انشاء الحساب");
      console.error(err.message);
    } finally {
      setSpinner((prev) => !prev);
      reset();
    }
  };

  //
  const handleLogout = async () => {
    logoutUser_Doctor();
    setDoctorContext(null);
    router.push("/login");
  };
  //========================================================

  return (
    <div>
      <ToastContainer />

      <form
        className="my-2 rounded-3xl bg-red-100/60 py-6 flex flex-col justify-center sm:py-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed text-end">تم انشاء الحساب</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed text-end">
                    قم بإستكمال باقي المعلومات ليتم عرضك في قائمة الاطباء
                  </p>
                </div>
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  i
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose text-end text-sm font-semibold">
                      الجامعة التي تخرجت منها
                    </label>
                    <input
                      {...register("university")}
                      type="text"
                      className=" bg-white px-4 py-2 border placeholder:text-end  focus:border-red-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-black text-end"
                      placeholder="حقل اجباري"
                    />
                    <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
                      {errors?.university?.message}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose text-sm font-semibold text-end">
                      عنوان العيادة{" "}
                    </label>
                    <input
                      {...register("clinic")}
                      type="text"
                      className="bg-white px-4 py-2 border placeholder:text-end focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-black text-end"
                      placeholder="حقل اجباري"
                    />
                    <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
                      {errors?.clinic?.message}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose text-sm text-end font-semibold">
                      اكتب وصف عن خبراتك / شهاداتك
                    </label>
                    <textarea
                      {...register("bio")}
                      type="text"
                      className="bg-white px-4 py-2 h-24 border placeholder:text-end focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-black text-end"
                      placeholder="حقل اجباري"
                    />
                    <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
                      {errors?.bio?.message}
                    </p>
                  </div>
                  <UploadImage
                    title="صورة شخصية"
                    setIdImage={setProfileImage}
                  />
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                    <p
                      className="text-[12px] font-semibold"
                      onClick={handleLogout}
                    >
                      تسجيل الخروج
                    </p>
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>{" "}
                  </button>
                  <button
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none disabled:bg-gray-400 disabled:cursor-default"
                    type="submit"
                    disabled={profileImage?.length === 0 ? true : false}
                  >
                    {profileImage?.length !== 0 && spinner ? (
                      <>
                        <div
                          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <p>استكمال</p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorInformationForm;
