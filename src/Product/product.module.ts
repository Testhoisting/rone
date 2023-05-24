import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from '../models/product.model';
import { productController } from './product.controller';
import { productService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'product_tbs', schema: productSchema }]),
  ],
  controllers: [productController],
  providers: [productService],
})
export class productModule {}
