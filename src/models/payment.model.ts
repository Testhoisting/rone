import * as mongoose from 'mongoose';
export const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    method: {
      type: String,
    },
    status: {
      type: String,
    },
    price: {
      type: Number,
    },
    referral_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'refe_links_tbs',
      required: true,
    },
    accquire_data: [],
  },
  { timestamps: true },
);

export class paymentModel {
  constructor(
    public name: string,
    public email: string,
    public contact: number,
    public orderId: string,
    public paymentId: string,
    public method: string,
    public status: string,
    public price: number,
    public accquire_data: [],
  ) {
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.orderId = orderId;
    this.paymentId = paymentId;
    this.method = method;
    this.status = status;
    this.price = price;
    this.accquire_data = accquire_data;
  }
}
