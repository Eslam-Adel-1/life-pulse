import doctorDiscuss from "@/Assets/Images/Authentication_Images/doctorDiscuss.gif";
import DoctorRegisterForm from "@/Components/Forms/DoctorRegisterForm/DoctorRegisterForm";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex items-center justify-between gap-5 w-full min-h-screen md:-mt-8 px-7 md:px-0">
      <div className="hidden md:flex md:flex-1 items-center justify-center bg-white bg-blend-screen">
        <Image
          src={doctorDiscuss}
          alt="login-image"
          width={370}
          height={370}
          className=""
        />
      </div>
      {/* //==================================================== */}
      <div className="flex flex-1 min-h-full flex-col justify-center md:py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="md:mt-10  text-end text-xl font-bold leading-9 tracking-tight text-gray-700">
            انشاء حساب كطبيب
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <DoctorRegisterForm />

          <p className="mt-4 text-center text-sm text-gray-500">
            هل لديك حساب ؟
            <Link
              href="/login/doctor"
              className="font-semibold leading-6 text-red-500/80 hover:text-red-500/80"
            >
              {" "}
              تسجيل الدخول
            </Link>
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            هل انت مريض ؟
            <Link
              href="/register"
              className="font-semibold leading-6 text-red-500/80 hover:text-red-500/80"
            >
              {" "}
              انشئ حساب كمريض
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
