import doctorDiscuss from "@/Assets/Images/Authentication_Images/doctorDiscuss.gif";
import Image from "next/image";
import Link from "next/link";
import DoctorLoginForm from "@/Components/Forms/DoctorLoginForm/DoctorLoginForm";

const Page = () => {
  return (
    <main className="flex items-center justify-between gap-5 w-full min-h-screen md:-mt-8 px-7 md:px-0">
      <div className="flex flex-1 min-h-full flex-col justify-center md:py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="font-mono font-bold text-gray-500 mt-5 mb-8 text-sm md:my-0 md:text-base ">
            <p>* Demo Account *</p>
            <p>E-mail : Eslam334@gmail.com</p>
            <p>Password : Qwe123@www</p>
          </div>
          <h2 className="md:mt-10 text-end text-2xl font-bold leading-9 tracking-tight text-gray-700">
            تسجيل دخول الى حسابك
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full xl:w-[85%]">
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
      <div className="hidden md:flex md:flex-1 items-center justify-center">
        <Image
          src={doctorDiscuss}
          alt="login-image"
          width={370}
          height={370}
          className="xl:h-[70%] xl:w-[70%] min-w-[330px] min-h-[330px]  object-contain"
        />
      </div>
    </main>
  );
};

export default Page;
