import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  first_name: { type: "string", required: true },
  last_name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  phone_number: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  profileImage: { type: "string" },
});

const User = models.User || model("User", userSchema);

export default User;
