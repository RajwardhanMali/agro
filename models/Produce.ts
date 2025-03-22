import mongoose, { Schema, model, models } from "mongoose";

const ProduceSchema = new Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commodity: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
      enum: ["Grade A", "Grade B", "Grade C"],
    },
    availableUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Produce || model("Produce", ProduceSchema);
