"use client";

import { CldUploadWidget } from "next-cloudinary";
import upload_image from "@/Assets/Images/Authentication_Images/upload-image.png";
import Image from "next/image";

const UploadImage = ({ setIdImage, title }) => {
  return (
    <CldUploadWidget
      uploadPreset="life-pulse"
      onSuccess={(result, { widget }) => {
        setIdImage(result?.info.secure_url); // { public_id, secure_url, etc }
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setIdImage("");
          open();
        }
        return (
          <div className="cursor-pointer" onClick={handleOnClick}>
            <p className="block text-sm font-semibold leading-6 text-gray-700 text-end">
              {title}
            </p>
            <div className="w-full border-2 border-gray-300 border-dashed mt-2 flex items-center justify-center gap-1 rounded-lg py-2">
              <Image
                src={upload_image}
                alt="upload-image"
                width={50}
                height={50}
              />
              <p className="text-[12px]">تحميل صورة</p>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
