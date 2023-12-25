import mongoose from "mongoose";
import ProductModel from "@/app/models/product";

// async function migrateProductModel() {
//   try {
//     const products = await ProductModel.find();

//     for (const product of products) {
//       // Apply the necessary changes to the product
//       product.newField = "defaultValue";

//       // Save the updated product back to the collection
//       await product.save();
//     }

//     console.log("Migration completed successfully.");
//   } catch (error) {
//     console.error("Migration failed:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// migrateProductModel();
