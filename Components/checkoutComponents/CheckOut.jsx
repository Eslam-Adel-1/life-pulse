"use client";
import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { convertToSubcurrencyEGP } from "@/lib/Reuseable Functions/functions";
import { updateAppointmentPaid } from "@/lib/server-actions/serverActions";

//=================================================

const CheckOut = ({ amount, appointment_id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //----------------------------------------------------------------

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrencyEGP(amount) }),
    })
      .then((res) => res.json())
      .then(({ clientSecret }) => {
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //----------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements) {
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setError(submitError?.message || "Something went wrong");
        setLoading(false);
        return;
      }

      const result = await updateAppointmentPaid(appointment_id);
      if (result === "something went wrong") {
        // console.log("something went wrong");
        setLoading(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/successful-payment/${appointment_id}`,
        },
      });

      if (confirmError) {
        setError(error?.message || "Something went wrong");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  //----------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit}>
      {clientSecret ? (
        <PaymentElement />
      ) : (
        <div className="w-full flex items-center justify-center">
          <div
            className="inline-block animate-spin mb-20 size-14 border-[3px] border-current border-t-transparent text-gray-500 rounded-full dark:text-white"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      <button
        disabled={!clientSecret}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {loading ? "جاري المعالجة" : "ادفع"}
      </button>
    </form>
  );
};

export default CheckOut;
