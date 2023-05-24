import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwtAuth/guards/jwt-guard.gaurds';
import { GetCurrentUserById } from '../jwtAuth/utils';
import { productService } from './product.service';

@Controller('products')
export class productController {
  constructor(private productService: productService) {}
  // Add Products
  @UseGuards(JwtAuthGuard)
  @Post('add_product')
  addProduct(
    @GetCurrentUserById() Id: any,
    @Body('productData') productData: object,
  ) {
    return this.productService.addProducts(Id.userId, productData);
  }
  // Get all products
  @UseGuards(JwtAuthGuard)
  @Get('all_products')
  getall_products(@GetCurrentUserById() Id: any) {
    return this.productService.getall_products(Id.userId);
  }
  // delete product
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  delete_product(@Query() query: { product_id: string }) {
    return this.productService.deleteProducts(query.product_id);
  }
}
