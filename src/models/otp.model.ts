import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

otpSchema.index({ createdAt: 1 }, { expires: '2m' });

export class otpModel {
  constructor(public phone: number, public code: number) {
    this.phone = phone;
    this.code = code;
  }
}
