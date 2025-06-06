"use client";
import { useEffect, useContext } from "react";
import { userInfoContext } from "@/lib/ReactContext/UserContext";
import { getCurrentUserCookie } from "@/lib/server-actions/serverActions";

const Layout = ({ children }) => {
  const { user, setUser } = useContext(userInfoContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        const userCookie = await getCurrentUserCookie();
        if (!userCookie) return;
        setUser(userCookie?.userData);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {user !== null ? (
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
