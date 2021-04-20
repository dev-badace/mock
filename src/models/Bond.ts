import mongoose from "mongoose";

enum BondStatus {
  Pending = "pending",
  Accepted = "accepted",
  Declined = "declined",
}

export interface BondAttrs {
  requester: string;
  bonder: string;
  status: string;
}

interface BondDocument extends mongoose.Document {
  requester: string;
  bonder: string;
  status: string;
}

export interface BondModel extends mongoose.Model<BondDocument> {
  build(attrs: BondAttrs): BondDocument;
}

const bondSchema = new mongoose.Schema<BondDocument>(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bonder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: BondStatus,
      default: BondStatus.Pending,
    },
    bond: {
      type: mongoose.Schema.Types.ObjectId,
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

bondSchema.statics.build = (attrs: BondAttrs) => {
  return new Bond(attrs);
};

export const Bond = mongoose.model<BondDocument, BondModel>(
  "Bonds",
  bondSchema
);
