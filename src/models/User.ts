import mongoose from "mongoose";

export interface UserAttrs {
  profileUrl: string;
  email: string;
  googleId: string;
}

interface UserDocument extends mongoose.Document {
  body: string;
  status: string;
  id: string;
}

export interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    profileUrl: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    googleId: {
      unique: true,
      required: true,
      type: String,
    },
    bond: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bond",
    },
    bondRequests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Bond",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model<UserDocument, UserModel>(
  "Users",
  userSchema
);
