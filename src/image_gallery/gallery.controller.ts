import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwtAuth/guards/jwt-guard.gaurds';
import { GetCurrentUserById } from '../jwtAuth/utils';
import { imageGalleryService } from './gallery.service';

@Controller('image_Gallery')
export class imageGalleryController {
  constructor(private imageGalleryService: imageGalleryService) {}
  // Add Image Gallery
  @UseGuards(JwtAuthGuard)
  @Post('add_image_gallery')
  addGallery(@GetCurrentUserById() Id: any, @Body('img_url') imageurl: string) {
    return this.imageGalleryService.addGallery(imageurl, Id.userId);
  }
  // Get Images
  @UseGuards(JwtAuthGuard)
  @Get('get_images')
  getImages(@GetCurrentUserById() Id: any) {
    return this.imageGalleryService.getimages(Id.userId);
  }
  // Delete Images
  @UseGuards(JwtAuthGuard)
  @Delete('delete_images')
  deleteImages(@Body('img_id') img_id: string) {
    return this.imageGalleryService.deleteImage(img_id);
  }
  // share imageGallery data
  @Get('share_imageGallery')
  shareImages(@Query() query: { userId: string }) {}
}
