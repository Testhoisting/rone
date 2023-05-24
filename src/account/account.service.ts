import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { accountModel } from '../models/account.model';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable({})
export class accountService {
  constructor(
    @InjectModel('account_tbs')
    private readonly accountModel: Model<accountModel>,
  ) {}
  async saveAccount_data(userId, accountDetails) {
    const id = new mongoose.Types.ObjectId(userId);
    const accountData = await this.accountModel.findOne({ which_user: id });
    if (accountData) {
      const updateAccount = await this.accountModel.updateOne(
        { which_user: id },
        { $set: accountDetails },
      );
      return { status: 200, message: 'updated' };
    } else {
      const newData = new this.accountModel({
        QrCode: accountDetails.QrCode,
        upi_Id: accountDetails.upiId,
        which_user: userId,
      });
      const response = await newData
        .save()
        .then((response) => {
          return { status: 200, message: 'saved' };
        })
        .catch((error) => {
          console.log(error);
        });
      return response;
    }
  }
  async getAccountData(userId) {
    const id = new mongoose.Types.ObjectId(userId);
    const data = await this.accountModel.findOne({ which_user: id });
    if (data) {
      return { status: 200, account: data };
    } else {
      return { status: 404, message: 'Upi and Qrcode not found' };
    }
  }
}
