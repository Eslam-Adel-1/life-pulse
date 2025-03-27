import Link from "next/link";
import Image from "next/image";
import Success from "@/Assets/Images/Success.gif";
import { notFound } from "next/navigation";
import connect from "@/mongoDB/mongoConnect";
import Appointment from "@/mongoDB/Schemas/appointment";

const Page = async ({ params }) => {
  const { appointment_id } = await params;
  let appointmentInfo;
  //==========================================================
  if (!appointment_id) {
    notFound();
  }

  await connect();
  appointmentInfo = await Appointment.findById(appointment_id).catch(() => {
    return null;
  });

  if (!appointmentInfo) {
    notFound();
  }

  if (appointmentInfo.payment !== "paid") {
    notFound();
  }

  //==========================================================
  return (
    <div className="flex items-center justify-center  h-screen">
      <div className="bg-white z-10 p-6  md:mx-auto flex flex-col md:flex-row items-center justify-center gap-5">
        <Image src={Success} alt="success" width={300} height={300} />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            تم الدفع
          </h3>
          <p className="text-gray-600 my-4">
            نشكرك على ثقتك بنا ، سيتم التواصل معك في اقرب وقت
          </p>
          <p className="text-sm mt-1"> نتمنى لك يوم سعيد </p>
          <div className="py-10 text-center">
            <Link
              href="/"
              className="px-5 sm:px-12 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 text-[13px] sm:text-sm rounded-xl"
            >
              العودة للقائمة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
