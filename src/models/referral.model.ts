import * as mongoose from 'mongoose';

export const referralSchema = new mongoose.Schema(
  {
    to_name: {
      type: String,
      required: true,
    },
    to_email: {
      type: String,
      unique: true,
      required: true,
    },
    referralId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    to_contact: {
      type: Number,
      unique: true,
      required: true,
    },
    referral_roneId: {
      type: String,
      required: true,
    },
    referral_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_tbs',
      required: true,
    },
  },
  { timestamps: true },
);

export class referralModel {
  constructor(
    public to_name: string,
    public to_email: string,
    public referralId: string,
    public status: string,
    public to_contact: number,
    public referral_roneId: string,
  ) {
    this.to_name = to_name;
    this.to_email = to_email;
    this.referralId = referralId;
    this.status = status;
    this.to_contact = to_contact;
    this.referral_roneId = referral_roneId;
  }
}
