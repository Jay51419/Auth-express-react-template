import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});
interface IUser extends Document {
  email: string;
  password: string;
}
export default mongoose.model<IUser>("User", UserSchema);
