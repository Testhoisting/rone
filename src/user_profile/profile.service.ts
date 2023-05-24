import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userModel } from '../models/userdata.model';
import * as mongoose from 'mongoose';

@Injectable({})
export class profileService {
  constructor(
    @InjectModel('usersDta_tbs') private readonly userModel: Model<userModel>,
  ) {}
  userProfile(userData: any, userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const data = this.userModel
      .updateOne({ _id: id }, { $set: userData })
      .then((response) => {
        return { status: 200, message: 'user Profile updated' };
      })
      .catch((error) => {
        return {
          status: 409,
          error: `${Object.keys(error.keyPattern)} already exists!`,
        };
      });
    return data;
  }
  async getUserData(userId: string, roneId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const Data = await this.userModel.findById({ _id: id });
    if (Data) {
      if (Data.roneId == roneId) {
        return { status: 200, message: 'user profile Details', userData: Data };
      } else {
        return { status: 403, error: 'Rone Id is not same' };
      }
    } else {
      return { status: 404, error: 'User data not found' };
    }
  }
  async shareData(username) {
    const userData = await this.userModel.findOne({ username: username });
    if (userData) {
      return { status: 200, userData: userData };
    } else {
      return { status: 404, message: 'User data not found' };
    }
  }
}
