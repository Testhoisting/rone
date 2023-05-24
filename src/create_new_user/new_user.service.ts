import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userModel } from '../models/userdata.model';
import { paymentModel } from '../models/payment.model';
import { MailService } from '../Mailer/mailer.service';
import * as mongoose from 'mongoose';

@Injectable({})
export class new_userService {
  constructor(
    @InjectModel('usersDta_tbs') private readonly userModel: Model<userModel>,
    @InjectModel('payment_tbs')
    private readonly paymentModel: Model<paymentModel>,
    private MailerService: MailService,
  ) {}
  async create_roneId(Id: string) {
    const id = new mongoose.Types.ObjectId(Id);
    const getEmail = await this.paymentModel.findOne({ _id: id });
    if (getEmail) {
      const roneId = `RONE${
        (Math.random() + 1).toString(36).substring(7).toUpperCase() +
        Date.now().toString(36).substring(6).toUpperCase()
      }`;
      const newId = new this.userModel({
        roneId,
        email: getEmail.email,
        userName: ' ',
        contact: ' ',
      });
      const result: any = await newId
        .save()
        .then((response) => {
          return {
            status: 200,
            message: 'New roneId created',
            response: response,
          };
        })
        .catch((err) => {
          console.log(err);
          if (err.code) {
            const field = Object.keys(err.keyPattern);
            if (field[0] == 'roneId') {
              this.create_roneId(getEmail.email);
            } else {
              return { status: 406, error: `${field[0]} is already taken` };
            }
          }
        });
      if (result.status === 200) {
        const response = await this.MailerService.sendRoneId(result.response);
        return response;
      } else {
        return result;
      }
    } else {
      return { status: 404, message: 'User email not found' };
    }
  }
  async create_user(userData: any, userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const updatedResult = this.userModel
      .updateOne({ _id: id }, { $set: userData })
      .then((response) => {
        console.log(response);

        return { status: 200, message: 'user Registered' };
      })
      .catch((error) => {
        if (error.code === 11000) {
          return {
            status: 401,
            error: `${Object.keys(error.keyPattern)} already exists!`,
          };
        }
      });
    return updatedResult;
  }

  async createuser(email) {
    const roneId = `RONE${
      (Math.random() + 1).toString(36).substring(7).toUpperCase() +
      Date.now().toString(36).substring(6).toUpperCase()
    }`;
    const newId = new this.userModel({
      roneId,
      email: email,
      userName: ' ',
      contact: ' ',
    });
    const result: any = await newId
      .save()
      .then((response) => {
        return {
          status: 200,
          message: 'New roneId created',
          response: response,
        };
      })
      .catch((err) => {
        console.log(err);
        if (err.code) {
          const field = Object.keys(err.keyPattern);
          if (field[0] == 'roneId') {
            this.createuser;
          } else {
            return { status: 406, error: `${field[0]} is already taken` };
          }
        }
      });
    return result;
  }
}
