import Link from "next/link";
import ProfileComponent from "../ProfileComponent";
import { IoMenu } from "react-icons/io5";

const NavbarButton = ({ doctor, user }) => {
  //=========================================================

  return (
    <>
      {user || doctor ? (
        <div className="flex items-center gap-3">
          <ProfileComponent />
        </div>
      ) : (
        <>
          <IoMenu className="block md:hidden w-7 h-7 text-gray-600" />
          <div className="hidden md:flex items-center gap-3">
            <Link className="btn btn-outline button-change" href="/register">
              تسجيل
            </Link>
            <Link className="btn btn-outline button-change" href="/login">
              دخول
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarButton;