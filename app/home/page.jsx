import GridContainer from "@/Components/GridContainer";
import MainContainer from "@/Components/MainContainer";
import DoctorContainer from "@/Components/DoctorContainer";
import SquareContainer from "@/Components/SquareContainer";
import capsule from "@/Assets/Images/capsule.png";
import handsHeart from "@/Assets/Images/handsHeart.png";
import medicalPhone from "@/Assets/Images/phoneMedical.png";
import doctor1 from "@/Assets/Images/doctor1.png";
import doctor2 from "@/Assets/Images/doctor2.png";
import doctor3 from "@/Assets/Images/doctor3.png";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <main>
      <section>
        <GridContainer>
          <MainContainer className="bg-red-500/80 lg:h-80 md:h-full lg:col-span-3 md:col-span-2 md:row-span-3 md:py-3 pt-3 " />
          <SquareContainer
            className="border-2 border-red-500/80 text-gray-700"
            image={medicalPhone}
            title="احجز الان"
            text="يمكنك الحجز الان من راحة بيتك ومن هاتفك"
          />
          <SquareContainer
            className="bg-red-500/80 text-white"
            image={capsule}
            title="ادوية فعالة"
            text="ادوية وبدائل فعالة وينصج بها من قبل الاخبراء"
          />
          <SquareContainer
            className="border-2 border-red-500/80 text-gray-700"
            image={handsHeart}
            title="رعاية على مدار اليوم"
            text="خبراء واطباء متاحين على مدار اليوم و الاسبوع"
          />
        </GridContainer>
      </section>
      <section className="flex flex-col items-center my-28 gap-20">
        <h1 className="text-gray-700 text-2xl mb-10 text-center leading-10">
          افضل الاطباء تقييما على نبض الحياة
        </h1>
        <div className="md:flex md:flex-row flex flex-col  justify-center items-center w-full lg:gap-10 md:gap-5 gap-24 ">
          <DoctorContainer
            image={doctor1}
            doctorName="جنى محمد"
            title="اخصائي امراض مزمنه"
            rating={4}
          />
          <DoctorContainer
            image={doctor2}
            doctorName="اميرة الشوربجي"
            title="استشاري عظام "
            rating={4}
          />
          <DoctorContainer
            image={doctor3}
            doctorName="حسن المعتز"
            title="استاذ دكتور قلب واوعية دموية"
            rating={5}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
