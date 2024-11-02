import React from "react";
import UploadImage from "../UploadImage";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Image from "next/image";

const Profile = ({ doctorData }) => {
  return (
    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <hr className="mt-4 mb-8" />
      <p className="py-2 text-xl font-semibold text-end text-gray-600">
        : الاسم الكامل
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
          تغيير
        </button>
        <p className="text-gray-600">
          اسمك الكامل هو{" "}
          <strong>
            {doctorData?.first_name} {doctorData?.last_name}
          </strong>
        </p>
      </div>
      <hr className="mt-4 mb-8" />
      <p className="py-2 text-xl font-semibold text-end text-gray-600">
        صورة الملف الشخصي
      </p>
      <div>
        <div className="h-36 w-36 flex items-center justify-center">
          <Image
            src={
              doctorData?.profileImage ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            }
            alt="doctor-image"
            width={300}
            height={300}
            className="h-full object-fill "
          />
        </div>
        <UploadImage />

        <div className="flex justify-center my-3">
          <button className="bg-blue-500 p-2 px-4 rounded-lg text-white">
            تغيير صورة الملف الشخصي
          </button>
        </div>
      </div>

      <div className="my-10 border-t">
        <p className="py-2 text-xl font-semibold text-end text-gray-600">
          رقم الهاتف
        </p>
        <div className="flex items-center justify-between">
          <PhoneInput
            defaultCountry="eg"
            className="flex-[0.75] "
            placeholder="1515151515151515"
          />
          <div>
            <p className="flex-[0.25] text-center text-gray-600">رقم هاتفك</p>
            <p className="text-gray-600">{doctorData?.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
