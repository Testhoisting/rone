import * as mongoose from 'mongoose';
export const imageGallerySchema = new mongoose.Schema(
  {
    img_url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    which_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_tbs',
      required: true,
    },
  },
  { timestamps: true },
);
export class imageGalleryModel {
  constructor(public img_url: string, public description: string) {
    this.img_url = img_url;
    this.description = description;
  }
}
