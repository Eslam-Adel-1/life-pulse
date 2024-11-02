import Image from "next/image";

const SquareContainer = ({ className, image, title, text }) => {
  return (
    <div
      className={`${className} rounded-lg lg:h-56 lg:p-7 lg:block md:h-60 md:p-6 md:flex md:flex-col flex items-center justify-center p-10 md:gap-2 px-10 hover:transform hover:scale-105 transition-all cursor-pointer`}
    >
      <Image
        src={image}
        alt="capsule"
        height={100}
        width={100}
        className="lg:w-24 lg:h-24 md:w-32 md:h-32 sm:w-40 sm:h-40 w-24 h-24"
      />
      <div className="h-fit">
        <p className="text-end lg:text-base md:text-sm mb-3 sm:text-xl text-xl font-semibold">
          {title}
        </p>
        <p className="text-end lg:text-[12px] md:text-[11px] sm:text-[15px]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SquareContainer;
