import Image from "next/image";
import StarsComponent from "./StarsComponent";

const DoctorContainer = ({ className, image, doctorName, title, rating }) => {
  return (
    <div className="flex flex-col lg:flex-1 w-[250px] sm:w-[300px] my-5 sm:my-12  sm:hover:flex-[1.7] transition-all duration-[400ms] group text-gray-700">
      <div
        className={`${className} relative flex items-center justify-end h-56 px-5 border-2 border-red-500/80  rounded-b-[30px] rounded-t-[30px] cursor-pointer sm:group-hover:rounded-t-xl sm:group-hover:rounded-b-xl`}
      >
        <div className="h-[300px] w-[75%] absolute bottom-0 left-[50%] -translate-x-[50%] sm:group-hover:translate-x-0 sm:group-hover:left-0 sm:group-hover:w-[55%]">
          <Image
            src={image}
            alt="doctor"
            height={1000}
            width={1000}
            className="h-full object-fill"
            loading="lazy"
          />
        </div>
        <div className="sm:w-[50%] transition-all">
          <p className="hidden text-end text-lg mb-3 sm:group-hover:block transition-all">
            {doctorName}
          </p>
          <p className="hidden text-end text-[12px] sm:group-hover:block transition-all">
            {title}
          </p>
        </div>
      </div>
      <h1 className="text-center my-5">{doctorName}</h1>
      <StarsComponent rating={rating} />
    </div>
  );
};

export default DoctorContainer;
