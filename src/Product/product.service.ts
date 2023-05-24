import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { productModel } from '../models/product.model';
import * as mongoose from 'mongoose';

@Injectable({})
export class productService {
  constructor(
    @InjectModel('product_tbs')
    private readonly productModel: Model<productModel>,
  ) {}
  addProducts(userId: string, productData: any) {
    const save_Product = new this.productModel({
      product_name: productData.product_name,
      product_description: productData.product_description,
      product_price: productData.product_price,
      img_url: productData.img_url,
      which_user: userId,
    });
    const result = save_Product
      .save()
      .then((response) => {
        return { status: 200, message: 'Product added' };
      })
      .catch((error) => {
        console.log(error);
        return { status: 406, error: 'product not added' };
      });
    return result;
  }
  async getall_products(userId) {
    const id = new mongoose.Types.ObjectId(userId);
    const all_products = await this.productModel.find({ which_user: id });
    if (all_products.length > 0) {
      return { status: 200, products_data: all_products };
    } else {
      return { status: 404, message: 'products not found' };
    }
  }
  async deleteProducts(productId) {
    const id = new mongoose.Types.ObjectId(productId);
    const delete_response = await this.productModel.deleteOne({ _id: id });
    if (delete_response.acknowledged === true) {
      return { status: 200, message: 'product deleted' };
    } else {
      return { status: 409, error: 'product not deleted' };
    }
  }
}
