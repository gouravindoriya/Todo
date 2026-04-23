import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Todo from "../todo/todo.modal.js";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "teacher" | "student";
  isVerified: boolean;
  verificationToken?: string;
  isblocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(clearTextPassword: string): Promise<boolean>;
}

type UserModel = mongoose.Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8,"password has must be minimum 8 char"],
      select: false,
    },
    role: {
      type: String,
      enum: ["superadmin","admin","teacher","student"],  //super admin, admin, teacher, student
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: { type: String, select: false },
    isblocked:{
      type:Boolean,default:false
    },
  },
  { timestamps: true },
);


userSchema.pre("save", async function () {
  const user = this as mongoose.HydratedDocument<IUser, IUserMethods>;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 12);
});

userSchema.methods.comparePassword = async function (
  this: mongoose.HydratedDocument<IUser, IUserMethods>,
  clearTextPassword: string
): Promise<boolean> {
  return bcrypt.compare(clearTextPassword, this.password);
};

// Cascade delete todos when a single user document is deleted.
userSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await Todo.deleteMany({ userId: this._id });
  },
);

// Cascade delete todos when user is deleted with findOneAndDelete/findByIdAndDelete.
userSchema.post("findOneAndDelete", async function (doc) {
  if (!doc?._id) return;
  await Todo.deleteMany({ userId: doc._id });
});



export default mongoose.model<IUser, UserModel>("User",userSchema)