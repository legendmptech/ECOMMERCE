import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    image: {
      type: String,
    },
    address: [
      {
        detail: {
          type: String,
        },
        for: {
          type: String,
        },
      },
    ],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.users || mongoose.model("users", UserSchema);
