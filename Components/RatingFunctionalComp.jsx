"use client";
import { useForm } from "react-hook-form";
import { updateDoctorRating } from "@/lib/server-actions/serverActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RatingFunctionalComp = ({ setShowModel, id }) => {
  //==============================================

  const { register, handleSubmit, getValues } = useForm({ mode: "all" });

  //==============================================
  const onSubmit = async () => {
    try {
      const result = await updateDoctorRating(getValues(), id);
      toast.success(result);
      setShowModel((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  };
  //==============================================

  return (
    <>
      <ToastContainer />
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row-reverse justify-end items-center">
          <input
            {...register("rating")}
            id="hs-ratings-readonly-1"
            type="radio"
            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
            value="5"
          />
          <label
            htmlFor="hs-ratings-readonly-1"
            className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
            </svg>
          </label>

          <input
            {...register("rating")}
            id="hs-ratings-readonly-2"
            type="radio"
            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
            value="4"
          />
          <label
            htmlFor="hs-ratings-readonly-2"
            className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
            </svg>
          </label>
          <input
            {...register("rating")}
            id="hs-ratings-readonly-3"
            type="radio"
            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
            value="3"
          />
          <label
            htmlFor="hs-ratings-readonly-3"
            className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none"
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
            </svg>
          </label>
          <input
            {...register("rating")}
            id="hs-ratings-readonly-4"
            type="radio"
            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
            value="2"
          />
          <label
            htmlFor="hs-ratings-readonly-4"
            className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none "
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
            </svg>
          </label>
          <input
            {...register("rating")}
            id="hs-ratings-readonly-5"
            type="radio"
            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
            value="1"
          />
          <label
            htmlFor="hs-ratings-readonly-5"
            className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none "
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
            </svg>
          </label>
        </div>
        <button
          type="submit"
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
        >
          ارسل التقييم
        </button>
      </form>
    </>
  );
};

export default RatingFunctionalComp;
