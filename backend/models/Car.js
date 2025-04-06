import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
    },
    brand: {
      type: String,
      required: [true, "Car brand is required"],
    },
    model: {
      type: String,
      required: [true, "Model year is required"],
    },
    rentPerDay: {
      type: Number,
      required: [true, "Rent per day is required"],
    },
    image: {
      type: String,
      default: "", // you can add image URLs or file paths
    },
    available: {
      type: Boolean,
      default: true,
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
