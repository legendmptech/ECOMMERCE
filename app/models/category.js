import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
});

export default mongoose.models.products ||
  mongoose.model("categorys", CategorySchema);
