"use client";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import { useContext } from "react";
import Image from "next/image";
import lifePulse from "@/Assets/Images/lifePulse.png";
import NavbarButton from "./Navbar/NavbarButton";
import Link from "next/link";

const Navbar = () => {
  const { user, doctorContext } = useContext(userInfoContext);
  //=========================================================

  return (
    <div className="flex items-center justify-between py-4  px-4 md:px-0 z-50">
      <NavbarButton doctor={doctorContext} user={user} />
      {user && (
        <ul className="hidden lg:flex items-center gap-9 text-sm 2xl:text-lg">
          <li className="cursor-pointer after text-gray-800 text-end ">
            <Link href="">خدمات </Link>
          </li>
          <li className="cursor-pointer after text-gray-800 text-end">
            <Link href="">تواصل معنا</Link>
          </li>
          <li className="cursor-pointer after text-gray-800 text-end">
            <Link href="/doctors">اطباء</Link>
          </li>
          <li className="cursor-pointer after text-gray-800 text-end">
            <Link href="/">الرئيسية</Link>
          </li>
        </ul>
      )}

      <div className="flex items-center gap-2 cursor-pointer">
        <p className="text-red-400 font-semibold xl:text-xl">نبض الحياة</p>
        <Image
          src={lifePulse}
          alt="نبض الحياة"
          width={40}
          className="xl:w-[60px]"
        />
      </div>
    </div>
  );
};

export default Navbar;
