import * as mongoose from 'mongoose';
export const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
    },
    which_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_tbs',
      required: true,
    },
  },
  { timestamps: true },
);
export class productModel {
  constructor(
    public product_name: string,
    public product_description: string,
    public product_price: number,
    public img_url: string,
    public img_id: string,
  ) {
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_price = product_price;
    this.img_url = img_url;
    this.img_id = img_id;
  }
}
