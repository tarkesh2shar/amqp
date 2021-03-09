import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt                                from "bcrypt";

interface UserDoc extends Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAtAt: string;

  comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<UserDoc> {}

const UserSchema = new Schema({
  email   : String,
  password: String
});

UserSchema.set("collection", "users");
UserSchema.set("timestamps", true);
UserSchema.set("toJSON", {
  transform(_: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.get("password"), 12);
  this.set("password", hash);
  next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.get("password"));
};

export const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);