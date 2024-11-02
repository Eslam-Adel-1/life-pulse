import Link from "next/link";
import RatingModel from "./RatingModel";
import StarsComponent from "./StarsComponent";
import Image from "next/image";

const DoctorCard = ({
  first_name,
  last_name,
  speciality,
  id,
  profileImage,
  rating,
  numberOfRating,
}) => {
  //========================================================
  let sum = 0;
  const sumOfRatings = rating.forEach((element) => {
    sum = sum + element;
  });

  let average = sum === 0 ? 0 : Math.round(sum / rating.length);

  //========================================================

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-[350px] max-w-sm bg-white border-[1.5px] border-gray-200 rounded-lg shadow-md pt-5">
        <div className="flex flex-col items-center justify-between  pb-10">
          <Image
            className="w-28 h-28 mb-3 rounded-full shadow-lg"
            src={profileImage}
            alt="doctor-image"
            width={500}
            height={500}
            loading="lazy"
          />
          <h5 className="mt-3 mb-1 text-[14px] font-medium text-gray-900 ">
            {`${first_name} ${last_name}`}
          </h5>
          <span className="text-[12px] text-gray-600 dark:text-gray-600 mb-2">
            {speciality}
          </span>
          <StarsComponent rating={average} />
          <div className="flex items-center gap-2">
            <p className="text-[12px] text-slate-400">تقييم</p>
            <p className="text-[12px] text-slate-400">{numberOfRating}</p>
          </div>
          <div className="flex mt-4 gap-2 ">
            <Link
              href={`doctors/${JSON.parse(id)}`}
              className="py-2 px-4 ms-2 text-[12px] font-medium text-white focus:outline-none bg-red-500/80 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:hover:text-white dark:hover:bg-gray-700"
            >
              احجز موعد
            </Link>
            <RatingModel profileImage={profileImage} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
