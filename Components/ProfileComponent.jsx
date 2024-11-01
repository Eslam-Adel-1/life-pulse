"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import { logoutUser_Doctor } from "@/lib/server-actions/serverActions";
import Link from "next/link";

const ProfileComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, doctorContext, setUser, setDoctorContext } =
    useContext(userInfoContext);
  const router = useRouter();

  //==========================================

  const handleLogOut = async () => {
    await logoutUser_Doctor();
    setUser(null);
    setDoctorContext(null);
    router.push("/login");
  };

  //==========================================
  return (
    <div className="relative">
      <div className="">
        <button
          id="avatarButton"
          onClick={() => setShowMenu((prev) => !prev)}
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-11 h-11 border-2 border-red-500/60 border-dashed rounded-full p-[1.5px] flex items-center justify-center"
        >
          {doctorContext?.profileImage ? (
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <Image
                src={doctorContext?.profileImage}
                alt="profile-image"
                width={500}
                height={500}
                className="h-full object-fill"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt="profile-image"
                width={500}
                height={500}
                className="h-full object-fill"
              />
            </div>
          )}
        </button>
      </div>
      {showMenu && (
        <div
          id="userDropdown"
          className="z-[100] absolute top-[110%] bg-white divide-y divide-gray-200 rounded-lg shadow w-44 border border-red-300"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <p className="text-[12px] text-end">
              {" "}
              {user
                ? `${user?.first_name} ${user?.last_name}`
                : doctorContext
                ? `${doctorContext?.first_name} ${doctorContext?.last_name}`
                : "something went wrong"}
            </p>
            <div className="text-[11px] font-semibold truncate">
              {user
                ? user?.email
                : doctorContext
                ? doctorContext?.email
                : "something went wrong"}
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="avatarButton"
          >
            {doctorContext ? (
              <li>
                <Link
                  href={`/dashboard/${JSON.parse(
                    JSON.stringify(doctorContext._id)
                  )}`}
                  className="block text-[12px] px-4 py-2 hover:bg-gray-100  text-end"
                >
                  الجدول
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href={`/user-appointments/${JSON.parse(
                    JSON.stringify(user?._id)
                  )}`}
                  className="block text-[12px] px-4 py-2 hover:bg-gray-100  text-end"
                >
                  مواعيدك
                </Link>
              </li>
            )}

            <li>
              <Link
                href={
                  doctorContext
                    ? `/doctor-settings/${JSON.parse(
                        JSON.stringify(doctorContext._id)
                      )}`
                    : `/user-settings/${JSON.parse(JSON.stringify(user._id))}`
                }
                className="block text-[12px] px-4 py-2 hover:bg-gray-100  text-end"
              >
                الاعدادات
              </Link>
            </li>
            {user && (
              <>
                <li className="block lg:hidden">
                  <Link
                    href="/"
                    className="block text-[12px] px-4 py-2 hover:bg-gray-100  text-end"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li className="block lg:hidden">
                  <Link
                    href="/doctors"
                    className="block text-[12px] px-4 py-2 hover:bg-gray-100  text-end"
                  >
                    الاطباء
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="py-1 flex items-center justify-end">
            <button
              className="block px-4 py-2 text-[11px] text-gray-700 hover:bg-gray-100 w-full"
              onClick={() => handleLogOut()}
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
