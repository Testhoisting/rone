import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { imageGallerySchema } from '../models/imageGallery.model';
import { imageGalleryController } from './gallery.controller';
import { imageGalleryService } from './gallery.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'imageGallery_tbs', schema: imageGallerySchema },
    ]),
  ],
  controllers: [imageGalleryController],
  providers: [imageGalleryService],
})
export class imageModule {}
