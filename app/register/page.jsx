import UserRegisterForm from "@/Components/Forms/UserRegisterForm/UserRegisterForm";
import login_image1 from "@/Assets/Images/Authentication_Images/login-image1.png";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex items-center justify-between gap-5 w-full min-h-screen md:-mt-8 px-7 md:px-0">
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="h-80 w-full">
          <Image
            src={login_image1}
            alt="login-image"
            width={500}
            height={500}
            className=" h-full object-contain"
            priority
          />
        </div>
      </div>
      {/* //==================================================== */}
      <div className="flex flex-1 min-h-full flex-col justify-center py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="md:mt-10 text-end text-2xl font-bold leading-9 tracking-tight text-gray-700">
            انشاء حساب كمريض
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <UserRegisterForm />

          <p className="mt-4 text-center text-sm text-gray-500">
            ليس لديك حساب ؟
            <Link
              href="/login"
              className="font-semibold leading-6 text-red-500/80 hover:text-red-500/80"
            >
              {" "}
              تسجيل الدخول
            </Link>
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            هل انت طبيب ؟
            <Link
              href="/register/doctor"
              className="font-semibold leading-6 text-red-500/80 hover:text-red-500/80"
            >
              {" "}
              انشاء حساب كطبيب
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
