import { Schema, model, models } from "mongoose";

const doctorSchema = new Schema({
  first_name: { type: "string", required: true },
  last_name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  phone_number: { type: "string", required: true, unique: true },
  speciality: { type: "string", required: true },
  password: { type: "string", required: true },
  idImage: { type: "string", required: true, unique: true },
  profileImage: { type: "string" },
  bio: { type: "string" },
  university: { type: "string" },
  clinic: { type: "string" },
  rating: { type: [Number] },
  schedule: { type: "object" },
  price: { type: "object" },
});

const Doctor = models?.Doctor || model("Doctor", doctorSchema);

export default Doctor;
