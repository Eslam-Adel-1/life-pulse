"use client";
import React from "react";
import { setupAnAppointment } from "@/lib/server-actions/serverActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableRowButtons = ({
  doctor_id,
  patient_id,
  time,
  day,
  typeOfAppointment,
  status,
  price,
  payment,
}) => {
  //=======================================
  const handleConfirm = async () => {
    try {
      const result = await setupAnAppointment(
        doctor_id,
        patient_id,
        typeOfAppointment,
        day,
        time,
        "done",
        payment,
        price
      );
      if (result === "Successful operation") {
        toast.success("تم تأكيد موعدك بنجاح");
      } else if (result === "Failed operation") {
        toast.error("حدث خطأ ما حاول لاحقا");
      }
    } catch {
      toast.error("حدث خطأ ما حاول لاحقا");
    }
  };
  //+++++++++++++++++++++
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
      {status === "pending" && (
        <>
          <button
            className="text-[11px] border p-2 text-red-600 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            onClick={handleCancel}
          >
            الغاء
          </button>
          <button
            className="text-[11px] border p-2 text-green-600 border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"
            onClick={handleConfirm}
          >
            تأكيد
          </button>
        </>
      )}
    </>
  );
};

export default TableRowButtons;
