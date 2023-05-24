import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { walletModel } from '../models/wallet.model';
import { referralModel } from '../models/referral.model';
import { MailService } from '../Mailer/mailer.service';

@Injectable({})
export class walletService {
  constructor(
    @InjectModel('wallet_tbs')
    private readonly walletModel: Model<walletModel>,
    @InjectModel('refe_links_tbs')
    private readonly refferalModel: Model<referralModel>,
    private MailerService: MailService,
  ) {}
  async create_referralLink(userId, data) {
    const check_balance = await this.walletModel.findOne({
      roneId: data.roneId,
    });
    if (check_balance) {
      if (check_balance.card_balance > 0) {
        const randomId =
          Math.random().toString(36).substr(3) + Date.now().toString(5);
        const createlink_doc = new this.refferalModel({
          to_name: data.to_name,
          to_email: data.to_email,
          referralId: randomId,
          status: 'created',
          to_contact: data.to_contact,
          referral_user: userId,
          referral_roneId: data.roneId,
        });
        const save_response: any = await createlink_doc
          .save()
          .then((response) => {
            console.log(response);
            return { status: true, data: response };
          })
          .catch((err) => {
            console.log(err);

            if (err.code == 11000) {
              const field = Object.keys(err.keyPattern);
              if (field[0]) {
                return { status: 406, error: `${field[0]} is already taken` };
              }
            }
          });
        if (save_response.status === true) {
          const reduce_balance: any = await this.walletModel.updateOne(
            { roneId: save_response.data.referral_roneId },
            { $inc: { card_balance: -1 } },
          );
          if (reduce_balance.modifiedCount === 1) {
            return {
              status: 200,
              newLink: save_response,
            };
          }
        } else {
          return save_response;
        }
      } else {
        return { status: 405, error: 'Insufficent Card balance' };
      }
    } else {
      return { status: 405, error: 'Link generation failed' };
    }
  }

  // check link is valid or not
  async validate_link(id) {
    const referralData: any = await this.refferalModel.findOne({
      referralId: id,
    });
    if (referralData.referralId === id && referralData.status === 'valid') {
      return { status: 200, url: `http://localhost:3000/${id}` };
    } else {
      console.log('link is not valid');
      return { status: 404, message: 'Link is not valid' };
    }
  }

  // share link
  async sendMail(id: string, email: string, name: string) {
    const check_refId = await this.refferalModel.findOneAndUpdate(
      { referralId: id },
      { $set: { status: 'valid' } },
    );
    if (check_refId) {
      return this.MailerService.shareLink(
        `https://ronenestjs.herokuapp.com/wallet/link/${id}`,
        email,
        name,
      );
    }
  }
  // Card balance
  async get_WalletData(roneId: string) {
    const wallet = await this.walletModel.findOne({ roneId: roneId });
    const link_details = await this.refferalModel.find({
      referral_roneId: roneId,
    });
    return {
      status: 200,
      wallet: wallet,
      link_histroy: link_details,
    };
  }
}
