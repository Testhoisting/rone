import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { imageGalleryModel } from '../models/imageGallery.model';
import * as mongoose from 'mongoose';

@Injectable({})
export class imageGalleryService {
  constructor(
    @InjectModel('imageGallery_tbs')
    private readonly imageGalleryModel: Model<imageGalleryModel>,
  ) {}
  addGallery(imgurl: string, userId: string) {
    const save_image = new this.imageGalleryModel({
      img_url: imgurl,
      which_user: userId,
    });
    const response = save_image
      .save()
      .then((result) => {
        return { status: 200, message: 'Image Uploaded' };
      })
      .catch((error) => {
        console.log(error);
        return { status: 406, error: 'Image not added' };
      });
    return response;
  }
  async getimages(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const images = await this.imageGalleryModel.find({ which_user: id });
    if (images) {
      return { status: 200, images: images };
    } else {
      return { status: 404, message: 'No images found' };
    }
  }
  async deleteImage(img_id: string) {
    const id = new mongoose.Types.ObjectId(img_id);
    const deleteImage = await this.imageGalleryModel.deleteOne({
      _id: id,
    });
    if (deleteImage.deletedCount === 1) {
      return { status: 200, message: 'Image deleted' };
    } else {
      return { status: 409, error: 'Image not delete' };
    }
  }
}
