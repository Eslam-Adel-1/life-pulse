import Footer from "@/Components/Footer";
import Doctor from "@/mongoDB/Schemas/doctorSchema";
import connect from "@/mongoDB/mongoConnect";
import { notFound } from "next/navigation";
import DoctorInformationForm from "@/Components/Forms/DoctorInformationForm/DoctorInformationForm";
import GoToDashboard from "@/Components/GoToDashboard";

const Page = async ({ params }) => {
  const { doctor_id } = await params;
  let doctorInfo = [];
  try {
    await connect();
    doctorInfo = await Doctor.findOne({
      _id: JSON.parse(JSON.stringify(doctor_id)),
    });
  } catch (err) {
    console.error(err);
    return notFound();
  }

  if (doctorInfo === null || doctorInfo?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">No doctor found</p>
      </div>
    );
  }

  if (
    doctorInfo?.bio &&
    doctorInfo?.university &&
    doctorInfo?.clinic &&
    doctorInfo?.profileImage
  ) {
    return <GoToDashboard doctor_id={doctor_id} />;
  }

  return (
    <>
      <main className="py-10">
        <DoctorInformationForm doctor_id={doctor_id} />
        <Footer />
      </main>
    </>
  );
};

export default Page;
