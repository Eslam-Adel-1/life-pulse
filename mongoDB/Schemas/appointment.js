import { Schema, models, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    doctor_id: { type: "string", required: true },
    patient_id: { type: "string", required: true },
    typeOfAppointment: { type: "Number", required: true },
    day: { type: "string", required: true },
    time: { type: "string", required: true },
    status: { type: "string", required: true },
    payment: { type: "string" },
    price: { type: "number" },
  },
  {
    timestamps: { createdAt: true },
  }
);

const Appointment =
  models?.Appointment || model("Appointment", appointmentSchema);

export default Appointment;
