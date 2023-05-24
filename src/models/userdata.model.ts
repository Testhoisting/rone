import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    roneId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
    },
    profession: {
      type: String,
    },
    bio: {
      type: String,
    },
    address: [],
    socialLinks: [],
    registered: {
      default: false,
      type: Boolean,
    },
    img_url: {
      type: String,
    },
  },
  { timestamps: true },
);
export class userModel {
  constructor(
    public roneId: string,
    public email: string,
    public contact: number,
  ) {
    this.roneId = roneId;
    this.email = email;
    this.contact = contact;
  }
}
