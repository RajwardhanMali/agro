import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Optional field
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    mandi: {
      type: String, // Optional field
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "farmer",
      enum: ["farmer", "admin", "vendor", "transporter"],
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
