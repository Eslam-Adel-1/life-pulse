import doctorDiscuss from "@/Assets/Images/Authentication_Images/doctorDiscuss.gif";
import Image from "next/image";
import Link from "next/link";
import DoctorLoginForm from "@/Components/Forms/DoctorLoginForm/DoctorLoginForm";

const page = () => {
  return (
    <main className="flex items-center justify-between gap-5 w-full min-h-screen md:-mt-8 px-7 md:px-0">
      <div className="flex flex-1 min-h-full flex-col justify-center md:py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="md:mt-10 text-end text-2xl font-bold leading-9 tracking-tight text-gray-700">
            تسجيل دخول الى حسابك
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <DoctorLoginForm />

          <p className="mt-4 text-center text-sm text-gray-500">
            ليس لديك حساب ؟
            <Link
              href="/register/doctor"
              className="font-semibold leading-6 text-red-500/80 hover:text-red-500/80"
            >
              {" "}
              انشئ حساب
            </Link>
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            هل انت مريض ؟
            <Link
              href="/login"
              className="font-semibold leading-6 text-red-500/80 hover:text-red-500/80"
            >
              {" "}
              سجل دخولك كمريض
            </Link>
          </p>
        </div>
      </div>

      {/* //==================================================== */}
      <div className="hidden md:flex md:flex-1 items-center justify-center bg-white bg-blend-screen">
        <Image
          src={doctorDiscuss}
          alt="login-image"
          width={370}
          height={370}
          className=""
        />
      </div>
    </main>
  );
};

export default page;
