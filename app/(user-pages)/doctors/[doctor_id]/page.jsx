import Footer from "@/Components/Footer";
import Doctor from "@/mongoDB/Schemas/doctorSchema";
import connect from "@/mongoDB/mongoConnect";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }) => {
  let errorMessage = null;
  const { doctor_id } = await params;
  let doctorInfo = [];
  try {
    await connect();
    doctorInfo = await Doctor.findOne({
      _id: JSON.parse(JSON.stringify(doctor_id)),
    });
    if (!doctorInfo) {
      errorMessage =
        "حدث خطأ ما رجاءا قم بتحديث الصفحة او عد مجددا في وقت لاحق";
    }
  } catch (err) {
    errorMessage = "حدث خطأ ما رجاءا قم بتحديث الصفحة او عد مجددا في وقت لاحق";
  }

  return (
    <main className="min-h-screen max-w-[1000px] lg:mx-auto">
      {errorMessage ? (
        <div className="flex items-center justify-center p-11 h-screen">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <>
          <div className="md:p-16">
            <div className="p-8 bg-white shadow-lg rounded-xl border-[1.5px]">
              <div className="">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 ">
                  <div className="w-36 h-36 bg-indigo-100 overflow-hidden rounded-full shadow-2xl  flex items-center justify-center text-indigo-500">
                    <Image
                      src={
                        doctorInfo?.profileImage ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                      }
                      alt="doctor-image"
                      width={300}
                      height={300}
                      className="h-full object-fill"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-end">
                    <h1 className="text-4xl font-medium text-gray-700 text-center">{`${doctorInfo.first_name} ${doctorInfo.last_name}`}</h1>
                    <p className="font-light text-gray-600 mt-3 text-sm text-center">
                      {doctorInfo?.university || "هذا الحقل فارغ"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center border-b pb-12">
                <p className="mt-8 text-gray-500 text-center">
                  {doctorInfo?.clinic || "هذا الحقل فارغ"}
                </p>
                <p className="mt-2 text-gray-500 text-center">
                  {doctorInfo?.university || "هذا الحقل فارغ"}
                </p>
              </div>

              <div className="mt-12 flex flex-col justify-center">
                <p className="text-gray-600 text-center font-light lg:px-16 ">
                  {doctorInfo?.bio || "هذا الحقل فارغ"}
                </p>
                <Link
                  href={`/appointment/${doctor_id}`}
                  className="text-indigo-500 py-2 px-4 font-medium mt-4 text-center"
                >
                  احجز الان
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </main>
  );
};

export default Page;
