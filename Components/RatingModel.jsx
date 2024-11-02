"use client";
import { useState } from "react";
import RatingFunctionalComp from "./RatingFunctionalComp";
import Image from "next/image";

const RatingModel = ({ profileImage, id }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div>
      <button
        className="border border-gray-400 text-gray-600  text-[12px] p-2 rounded-lg"
        onClick={() => setShowModel((prev) => !prev)}
      >
        قيم الدكتور
      </button>
      {showModel && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black/70 z-50">
          <div className="p-4 w-[300px] ">
            <div className="relative bg-white rounded-lg shadow border flex flex-col items-center gap-4">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-400 rounded-lg text-sm w-8 h-8 flex items-center justify-center "
                onClick={() => setShowModel((prev) => !prev)}
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center flex flex-col items-center gap-2">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border flex items-center justify-center">
                  <Image
                    src={profileImage}
                    alt="doctor-image"
                    width={400}
                    height={400}
                    className="h-full object-fill"
                  />
                </div>
                <RatingFunctionalComp setShowModel={setShowModel} id={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingModel;
