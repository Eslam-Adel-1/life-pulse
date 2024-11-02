"use client";
import { useEffect, useContext } from "react";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import {
  getCurrentDoctorCookie,
  getCurrentUserCookie,
} from "@/lib/server-actions/serverActions";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const { doctorContext, setDoctorContext, user, setUser } =
    useContext(userInfoContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!doctorContext) {
          const doctorCookie = await getCurrentDoctorCookie();
          if (doctorCookie) {
            setDoctorContext(userCookie?.userData);
          }
        }
        if (!user) {
          const userCookie = await getCurrentUserCookie();
          if (userCookie) {
            setUser(userCookie?.userData);
          }
        }
      } catch (err) {
        console.error(err.message);
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {doctorContext ? (
        <>{children}</>
      ) : user ? (
        <>{children}</>
      ) : (
        <main className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            <div
              className="animate-spin inline-block size-24 border-[3px] border-current border-t-transparent text-gray-600 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-gray-700">جاري التحميل</p>
          </div>
        </main>
      )}
    </>
  );
};

export default Layout;
