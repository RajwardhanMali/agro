import mongoose, { Schema, model, models } from "mongoose";

const EquipmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Equipment =
  models.Equipment || model("Equipment", EquipmentSchema);
