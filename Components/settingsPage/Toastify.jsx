"use client";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = ({ error }) => {
  useEffect(() => {
    toast.error(error);
  }, []);
  return <ToastContainer />;
};

export default Toastify;
