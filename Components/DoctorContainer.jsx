import Image from "next/image";
import StarsComponent from "./StarsComponent";

const DoctorContainer = ({ className, image, doctorName, title, rating }) => {
  return (
    <div className="flex flex-col lg:flex-1 w-[250px] sm:w-[300px] max-w-[320px] my-5 sm:my-12  lg:hover:flex-[1.7] transition-all duration-[400ms] group text-gray-700">
      <div
        className={`${className} relative flex items-center justify-end h-[200px] px-5 border-2 border-red-500/80  rounded-b-[30px] rounded-t-[30px] cursor-pointer lg:group-hover:rounded-t-xl lg:group-hover:rounded-b-xl`}
      >
        <div className="h-[300px] w-[75%] absolute bottom-0 left-[50%] -translate-x-[50%] lg:group-hover:translate-x-0 lg:group-hover:left-0 lg:group-hover:w-[55%]">
          <Image
            src={image}
            alt="doctor"
            height={1000}
            width={1000}
            className="h-full object-fill"
            loading="lazy"
          />
        </div>
        <div className="sm:w-[50%] transition-all hidden lg:group-hover:block">
          <p className="text-end text-lg mb-3 transition-all">{doctorName}</p>
          <p className="text-end text-[12px]  transition-all">{title}</p>
        </div>
      </div>
      <h1 className="text-center my-5">{doctorName}</h1>
      <StarsComponent rating={rating} />
    </div>
  );
};

export default DoctorContainer;
