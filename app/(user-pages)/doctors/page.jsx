import DoctorCard from "@/Components/DoctorCard";
import Footer from "@/Components/Footer";
import Doctor from "@/mongoDB/Schemas/doctorSchema";
import connect from "@/mongoDB/mongoConnect";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const Page = async () => {
  let doctorsInfo = [];
  let errorMessage = null;
  try {
    await connect();
    doctorsInfo = await Doctor.find();
  } catch {
    errorMessage = " حدث خطأ ما رجاءا قم بتحديث الصفحة او عد مجددا في وقت لاحق";
  }

  return (
    <main className="relative min-h-screen bg-white pt-6">
      {errorMessage ? (
        <div className="flex items-center justify-center p-11 h-screen">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <>
          <h2 className="text-gray-700 my-6 text-center">
            اختر طبيبا واحجز موعد الان
          </h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-6 mb-16">
            {doctorsInfo.map((item, index) => {
              return (
                <DoctorCard
                  key={index}
                  first_name={item.first_name}
                  last_name={item.last_name}
                  speciality={item.speciality}
                  id={JSON.stringify(item._id)}
                  rating={item.rating}
                  numberOfRating={item.rating.length}
                  profileImage={
                    item.profileImage
                      ? item.profileImage
                      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  }
                />
              );
            })}
          </div>
        </>
      )}
      <Footer />
    </main>
  );
};

export default Page;
