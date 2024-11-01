import { Schema, models, model } from "mongoose";

const cancelledAppointment = new Schema({
  doctor_id: { type: "string", required: true },
  patient_id: { type: "string", required: true },
});

const CancelledAppointment =
  models.CancelledAppointment ||
  model("CancelledAppointment", cancelledAppointment);

export default CancelledAppointment;
