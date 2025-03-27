import Image from "next/image";

const SquareContainer = ({ className, image, title, text }) => {
  return (
    <div
      className={`${className} rounded-lg lg:p-7 lg:block md:p-6  md:flex md:flex-col flex items-center justify-center p-10 md:gap-2 px-10 hover:transform hover:scale-105 transition-all cursor-pointer`}
    >
      <Image
        src={image}
        alt="capsule"
        height={100}
        width={100}
        className="w-[50%] h-[50%] sm:w-[100px] sm:h-[100px] 2xl:h-[65%] 2xl:w-[50%] object-contain max-w-[130px] max-h-[130px] "
      />
      <div className="h-fit mb-5">
        <p className="text-end lg:text-base md:text-sm mb-5 sm:text-xl text-xl 2xl:text-[1.2rem] font-semibold">
          {title}
        </p>
        <p className="text-end lg:text-[12px] md:text-[11px] sm:text-[15px] 2xl:text-[17px]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SquareContainer;
