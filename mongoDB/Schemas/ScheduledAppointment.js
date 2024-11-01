import { Schema, models, model } from "mongoose";

const scheduledAppointment = new Schema({
  doctor_id: { type: "string", required: true },
  patient_id: { type: "string", required: true },
});

const ScheduledAppointment =
  models.ScheduledAppointment ||
  model("ScheduledAppointment", scheduledAppointment);

export default ScheduledAppointment;
