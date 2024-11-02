"use client";
import { useEffect, useContext } from "react";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import { getCurrentDoctorCookie } from "@/lib/server-actions/serverActions";

const Layout = ({ children }) => {
  const { doctorContext, setDoctorContext } = useContext(userInfoContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorContext) {
        const doctorCookie = await getCurrentDoctorCookie();
        if (!doctorCookie) return;
        setDoctorContext(doctorCookie?.doctorData);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {doctorContext !== null ? (
        <>{children}</>
      ) : (
        <main className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            <div
              className="animate-spin inline-block size-24 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
            <p>جاري التحميل</p>
          </div>
        </main>
      )}
    </>
  );
};

export default Layout;
