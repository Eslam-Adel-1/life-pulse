import forget_password_doctor from "@/Assets/Images/Authentication_Images/forget_password_doctor.png";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="flex flex-col-reverse md:flex-row items-center justify-between gap-5 w-full min-h-screen md:-mt-8 px-7 md:px-0">
      <>
        <div className="flex flex-1 min-h-full flex-col justify-center py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="-mt-14 md:mt-10 text-end text-2xl font-bold leading-9 tracking-tight text-gray-700">
              اعادة تعيين كلمة السر
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="">
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
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  اعادة تعيين كلمة السر
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              اعادة تعيين كلمة السر
              <Link
                href="/forgetPassword"
                className="font-semibold leading-6 text-red-500/80 hover:text-red-500/80"
              >
                {" "}
                كمريض ؟
              </Link>
            </p>
          </div>
        </div>
      </>
      {/* //==================================================== */}
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={forget_password_doctor}
          alt="login-image"
          width={370}
          height={370}
          className=""
        />
      </div>
    </main>
  );
};

export default Page;
