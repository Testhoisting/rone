import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userModel } from '../models/userdata.model';
import { otpModel } from '../models/otp.model';
import { Fast2sms_integration } from './fast2sms_int';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel('usersDta_tbs') private readonly userModel: Model<userModel>,
    @InjectModel('otp_tbs') private readonly otpModel: Model<otpModel>,
    private jwtService: JwtService,
  ) {}

  // user sign up
  async signup(roneId, email) {
    const user = await this.userModel.findOne({ roneId: roneId });
    if (user) {
      if (user.email === email) {
        const token = this.jwtService.sign(
          {
            userId: user._id,
          },
          { expiresIn: '24h' },
        );
        return { status: 200, message: 'Otp verified successfully', token };
      } else {
        return { status: 401, message: 'InCorrect Email' };
      }
    } else {
      return { status: 401, message: 'InCorrect RoneId' };
    }
  }

  // Send Otp to Mobile number
  async sendOtp(phone: number, userId) {
    const code = Math.floor(100000 + Math.random() * 900000);
    const gen_otp = new this.otpModel({
      phone,
      code,
    });
    const response = await gen_otp.save();
    if (response.phone && response.code) {
      const result = await Fast2sms_integration(response);
      if (result.return === true) {
        const token = this.jwtService.sign(
          {
            contact: response.phone,
            userId: userId,
          },
          { expiresIn: '2m' },
        );
        return { status: 200, message: result.message[0], token };
      } else {
        return { status: 409, message: 'Otp sending failed' };
      }
    } else {
      return {
        status: 409,
        message: 'Otp code Not generated please try again',
      };
    }
  }
  // verify Otp code
  async verifyOtp(phone: number, code: number, userId) {
    const result = await this.otpModel
      .findOne({ phone: phone })
      .sort({ createdAt: -1 });
    if (result && result.code == code) {
      const token = this.jwtService.sign(
        {
          userId: userId,
        },
        { expiresIn: '24h' },
      );
      return { status: 200, message: 'Otp verified successfully', token };
    } else {
      return { status: 401, message: 'Invalid Otp' };
    }
  }

  // user Login
  async userLogin(credentials: any) {
    const result: any = await this.userModel.findOne({
      roneId: credentials.roneId,
    });
    if (result) {
      if (result.contact == credentials.contact) {
        const token = this.jwtService.sign(
          {
            userId: result._id,
          },
          { expiresIn: '24h' },
        );
        return { status: 200, message: 'Otp verified successfully', token };
      } else {
        return {
          status: 401,
          error: 'Please Enter registered mobile number',
        };
      }
    } else {
      return { status: 401, error: 'User Login failed!. Invalid Rone Id' };
    }
  }
}
