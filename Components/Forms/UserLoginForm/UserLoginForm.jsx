"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod-schemas/schemas";
import { loginUser } from "@/lib/server-actions/serverActions";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import "react-toastify/dist/ReactToastify.css";

//==================================================

const UserLoginForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "all" });

  const [spinner, setSpinner] = useState(false);
  const { setUser } = useContext(userInfoContext);
  const router = useRouter();

  //==================================================

  const onSubmit = async () => {
    setSpinner((prev) => !prev);
    try {
      const result = await loginUser(getValues());
      if (result.message === "No user found") {
        toast.error("هذا المستخدم غير موجود");
      } else if (result.message === "Login Failed") {
        toast.error("حدث خطا ما حاول لاحقا");
      } else {
        setUser(JSON.parse(result.userData));
        toast.success("تم تسجيل الدخول بنجاح");
        router.push("/");
      }
    } catch (err) {
      toast.error("تعذر تسجيل الدخول");
    } finally {
      setSpinner((prev) => !prev);
      reset();
    }
  };

  //==================================================

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
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
            className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none"
          />
          <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
            {errors.email?.message}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/forgetPassword"
              className="font-semibold text-red-500/80 hover:text-red-500/80"
            >
              نسيت كلمة السر ؟
            </Link>
          </div>
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
            className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 outline-none"
          />
          <p className="text-[10px] font-semibold text-red-500 text-center mt-1">
            {errors.password?.message}
          </p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
            <p>تسجيل دخول</p>
          )}
        </button>
      </div>
    </form>
  );
};

export default UserLoginForm;
