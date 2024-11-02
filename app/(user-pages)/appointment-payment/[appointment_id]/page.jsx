"use client";

import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { convertToSubcurrencyEGP } from "@/lib/Reuseable Functions/functions";
import CheckOut from "@/Components/checkoutComponents/CheckOut";
import PaymentUi from "@/Components/checkoutComponents/PaymentUi";
import { useEffect, useState } from "react";
import {
  getAppointmentData,
  getDoctorInfo,
  getPatientInfo,
} from "@/lib/server-actions/serverActions";

//------------------------------------------------

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

//------------------------------------------------

const Page = ({ params }) => {
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const { appointment_id } = React.use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointment = await getAppointmentData(appointment_id);
        setAppointment(JSON.parse(appointment));

        const doctorInfo = await getDoctorInfo(
          JSON.parse(appointment)?.doctor_id
        );

        setDoctor(JSON.parse(doctorInfo));

        const patientInfo = await getPatientInfo(
          JSON.parse(appointment)?.patient_id
        );

        setPatient(JSON.parse(patientInfo));
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
  }, [appointment_id]);

  //------------------------------------------------

  return (
    <main className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen gap-10 mb-10 md:gap-24">
      <PaymentUi doctor={doctor} patient={patient} appointment={appointment} />
      <div className="flex-1">
        {appointment?.price && (
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrencyEGP(appointment?.price ?? 10),
              currency: "egp",
            }}
          >
            <CheckOut
              amount={appointment?.price}
              appointment_id={appointment_id}
            />
          </Elements>
        )}
      </div>
    </main>
  );
};

export default Page;
