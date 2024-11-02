import femaleDoctor from "@/Assets/Images/femaleDoctor.png";
import { MdOutlineSchedule } from "react-icons/md";
import { TbCheckupList } from "react-icons/tb";
import Image from "next/image";

const MainContainer = ({ className }) => {
  return (
    <div className={`relative rounded-lg ${className}`}>
      {/* //================================================ */}
      <div className="flex items-center justify-center">
        <div className="lg:text-[70px] font-semibold text-white/90 md:text-[55px] sm:text-[55px] text-[40px] md:mr-0">
          <span className="">نبض </span>
          <span className="lg:mr-5">الحياة</span>
        </div>
      </div>
      {/* //================================================ */}

      <div className="w-full flex lg:flex-row lg:pr-16 lg:ml-0 items-center justify-between sm:px-14 mt-7 flex-col md:gap-8 lg:gap-0 gap-10">
        {/* //================================================ */}

        <div className="flex flex-col items-end px-7 sm:px-10 md:px-0">
          <div className="flex items-center gap-3 ml-5">
            <button className="text-white font-semibold text-lg">
              استشارات فورية
            </button>
            <div className="rounded-full p-1 bg-white">
              <TbCheckupList className="text-2xl text-red-500/80" />
            </div>
          </div>
          <p className="lg:text-[11px] md:text-[13px] text-end lg:w-[200px] md:w-[250px] leading-7 text-white mr-5 mt-3">
            استشارات فورية للحالات الطارئة في خلال خمس دقائق مع خبراء في مجال
            الطب
          </p>
        </div>
        {/* //============================================ */}
        <div className="flex flex-col items-end px-7 sm:px-10 md:px-0">
          <div className="flex items-center gap-3">
            <button className="text-white font-semibold text-lg">
              احجز الان
            </button>
            <div className="rounded-full p-1 bg-white">
              <MdOutlineSchedule className="text-2xl text-red-500/80" />
            </div>
          </div>
          <p className="lg:text-[11px] md:text-[13px] text-end lg:w-[200px] md:w-[250px] leading-7 text-white mr-5 mt-3">
            احجز الان مع طبيب او استشاري وسيتم الرد عليك وتأكيد الحجز خلال
            ساعيتن على اقصلى تقدير
          </p>
        </div>
        {/* //================================================ */}
        <Image
          src={femaleDoctor}
          alt="female-doctor"
          width={300}
          height={300}
          className="md:absolute bottom-0 lg:left-[50%] lg:translate-x-[-50%] md:left-[50%] md:translate-x-[-50%]  lg:w-[300px] lg:h-[300px] md:w-[330px] md:h-[330px] "
        />
      </div>
    </div>
  );
};

export default MainContainer;
