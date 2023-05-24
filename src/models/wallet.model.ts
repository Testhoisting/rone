import * as mongoose from 'mongoose';

export const walletSchema = new mongoose.Schema(
  {
    card_balance: {
      type: Number,
    },
    roneId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export class walletModel {
  constructor(public card_balance: number, public roneId: string) {
    this.card_balance = card_balance;
    this.roneId = roneId;
  }
}
