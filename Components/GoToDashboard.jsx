"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GoToDashboard = ({ doctor_id }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/dashboard/${doctor_id}`);
  });
};

export default GoToDashboard;
