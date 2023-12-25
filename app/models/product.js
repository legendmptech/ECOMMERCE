// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    images: [{ url: { type: String } }],
    related: [
      {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
    ],
    recommendations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.products ||
  mongoose.model("products", ProductSchema);
