"use client";
import { useRouter } from "next/navigation";

const GoToDoctorAppointment = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <p className="text-center">
        لم يكمل هذا الطبيب الاجرائات اللازمة لحجز المواعيد بعد
      </p>
      <button
        className="btn  text-white bg-red-500 hover:bg-gray-600"
        onClick={() => router.push(`/doctors`)}
      >
        العودة الى صفحة الاطباء
      </button>
    </main>
  );
};

export default GoToDoctorAppointment;
