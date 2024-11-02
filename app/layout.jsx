import { Lemonada } from "next/font/google";
import Navbar from "@/Components/Navbar";
import "./globals.css";
import UserContextProvider from "@/lib/ReactContext/UserContext";

const lemonada = Lemonada({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-lemonada",
});

export const metadata = {
  title: "نبض الحياة",
  description: "اختار دكتورك واحجز دلوقتي",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className={lemonada.className}>
      <body className="antialiased lg:px-20 bg-white xl:px-52 md:px-12 px-5 sm:px-10 min-h-screen">
        <UserContextProvider>
          <Navbar />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
