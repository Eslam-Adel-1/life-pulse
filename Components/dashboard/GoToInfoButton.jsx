"use client";
import { useRouter } from "next/navigation";

const GoToInfoButton = ({ doctor_id }) => {
  const router = useRouter();
  return (
    <button
      className="btn  text-white bg-red-500 hover:bg-gray-600"
      onClick={() => router.push(`/complete-info/${doctor_id}`)}
    >
      اذهب لاستكمال المعلومات
    </button>
  );
};

export default GoToInfoButton;
