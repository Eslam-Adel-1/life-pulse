"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "@/lib/zod-schemas/schemas";
import { PhoneInput } from "react-international-phone";
import { createUser } from "@/lib/server-actions/serverActions";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import "react-toastify/dist/ReactToastify.css";
import "react-international-phone/style.css";

const UserRegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userRegisterSchema), mode: "all" });

  const { setUser } = useContext(userInfoContext);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();

  //==================================================

  const onSubmit = async () => {
    setSpinner((prev) => !prev);
    try {
      const result = await createUser(getValues());
      if (result?.message === "No user found") {
        toast.error("هذا المستخدم غير موجود");
      } else if (result?.message === "email already exists") {
        toast.error("هذا البريد الالكتروني مستخدم مسبقا");
      } else if (result?.message === "phone number already exists") {
        toast.error("رقم الهاتف مستخدم مسبقا");
      }
      //=============================
      else if (result?.message === "user created successfully") {
        setUser(JSON.parse(result.userData));
        toast.success("تم انشاء الحساب بنجاح");
        router.push("/");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("تعذر انشاء الحساب");
    } finally {
      setSpinner((prev) => !prev);
      reset();
    }
  };

  //==================================================

  return (
    <div className="overflow-y-scroll h-72 form-scrollbar pr-2">
      <ToastContainer />
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium leading-6 text-gray-700 text-end"
            >
              الاسم الاخير{" "}
            </label>
            <div className="mt-2">
              <input
                id="last_name"
                {...register("last_name")}
                type="text"
                className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none text-end px-2 "
              />
              <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
                {errors.last_name?.message}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium leading-6 text-gray-700 text-end"
            >
              الاسم الاول{" "}
            </label>
            <div className="mt-2">
              <input
                id="first_name"
                {...register("first_name")}
                type="text"
                className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none text-end px-2 "
              />
              <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
                {errors.first_name?.message}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-700 text-end"
          >
            البريد الالكتروني
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register("email")}
              type="email"
              autoComplete="email"
              className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none text-end px-2 "
            />
            <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
              {errors.email?.message}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-700 text-end"
          >
            رقم الهاتف
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneInput
                defaultCountry="eg"
                className="w-full"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
            {errors.phoneNumber?.message}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-end">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-700 text-end"
            >
              كلمة السر
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              {...register("password")}
              type="password"
              autoComplete="current-password"
              className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none text-end px-2 "
            />
            <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
              {errors.password?.message}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-end">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-700 text-end"
            >
              اعادة كلمة السر
            </label>
          </div>
          <div className="mt-2">
            <input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              autoComplete="current-password"
              className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none text-end px-2 "
            />
            <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {spinner ? (
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
              <p>انشاء حساب</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegisterForm;
