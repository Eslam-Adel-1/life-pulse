"use client";
import React from "react";
import { setupAnAppointment } from "@/lib/server-actions/serverActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const TableRowButtons = ({
  doctor_id,
  patient_id,
  time,
  day,
  typeOfAppointment,
  status,
  appointment_id,
  payment,
  price,
}) => {
  //=======================================

  const handleCancel = async () => {
    try {
      const result = await setupAnAppointment(
        doctor_id,
        patient_id,
        typeOfAppointment,
        day,
        time,
        "cancelled",
        payment,
        price
      );
      if (result === "Successful operation") {
        toast.success("تم الغاء الموعد");
      } else if (result === "Failed operation") {
        toast.error("حدث خطأ ما حاول لاحقا");
      }
    } catch {
      toast.error("حدث خطاء ما حاول لاحقا");
    }
  };

  //=======================================
  return (
    <>
      <ToastContainer />
      {!(
        status === "cancelled" ||
        payment === "paid" ||
        status === "pending"
      ) && (
        <>
          <button
            className="text-[11px] border p-2 text-red-600 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            onClick={handleCancel}
          >
            الغاء
          </button>
          <Link
            className="text-[11px] border p-2 text-orange-600 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
            href={`/appointment-payment/${JSON.parse(appointment_id)}`}
          >
            دفع
          </Link>
        </>
      )}
    </>
  );
};

export default TableRowButtons;
