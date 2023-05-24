import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paymentModel } from '../models/payment.model';
import { InjectRazorpay } from 'nestjs-razorpay';
import * as Razorpay from 'razorpay';
import { referralModel } from '../models/referral.model';
import * as mongoose from 'mongoose';
import { MailService } from '../Mailer/mailer.service';

@Injectable({})
export class paymentService {
  constructor(
    @InjectModel('payment_tbs')
    private readonly paymentModel: Model<paymentModel>,
    @InjectRazorpay() private readonly razorpayClient: any = Razorpay,
    @InjectModel('refe_links_tbs')
    private readonly refferalModel: Model<referralModel>,
    private MailerService: MailService,
  ) {}

  async createOrder(referralId: string) {
    const getDetails = await this.refferalModel.findOne({
      referralId: referralId,
    });
    console.log(referralId);
    if (getDetails.status === 'valid') {
      const id = new mongoose.Types.ObjectId(getDetails._id);
      const orderId_taken = await this.paymentModel.findOne({
        referral_id: id,
      });
      if (orderId_taken) {
        console.log(orderId_taken);

        return {
          status: 200,
          orderId: orderId_taken.orderId,
          userData: {
            name: orderId_taken.name,
            email: orderId_taken.email,
            phone: orderId_taken.contact,
          },
        };
      } else {
        const orderDetails = await this.razorpayClient.orders
          .create({
            amount: 1465.41 * 100,
            currency: 'INR',
          })
          .then((order) => {
            return { order: order };
          })
          .catch((error) => {
            return { error: error };
          });
        if (orderDetails.order && orderDetails.order.status == 'created') {
          const payment = new this.paymentModel({
            name: getDetails.to_name,
            email: getDetails.to_email,
            contact: getDetails.to_contact,
            orderId: orderDetails.order.id,
            referral_id: getDetails._id,
          });
          const result: any = await payment
            .save()
            .then((insert) => {
              return { status: true, data: insert };
            })
            .catch((error) => {
              return { status: false, error: error };
            });
          if (result.status) {
            return {
              status: 200,
              orderId: result.data.orderId,
              userData: {
                name: result.data.name,
                email: result.data.email,
                phone: result.data.contact,
              },
            };
          }
        } else {
          return { status: 404, message: 'order creation failed' };
        }
      }
    } else if (getDetails.status === 'used') {
      return { status: 406, message: 'referral link already used' };
    } else {
      return { status: 404, message: 'referral link not found' };
    }
  }
  async verify_Payment_id(paymentId: string) {
    const response = await this.razorpayClient.payments
      .fetch(paymentId)
      .then((response) => {
        return { status: true, data: response };
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
    if (response.status) {
      if (
        response.data.status == 'captured' ||
        response.data.status == 'authorized'
      ) {
        const update_paymentDetails = await this.paymentModel.findOneAndUpdate(
          { orderId: response.data.order_id },
          {
            $set: {
              paymentId: response.data.id,
              method: response.data.method,
              status: response.data.status,
              price: response.data.amount / 100,
              accquire_data: response.data.acquirer_data,
            },
          },
        );

        const change_status = await this.refferalModel.updateOne(
          {
            orderId: update_paymentDetails.orderId,
          },
          { $set: { status: 'success' } },
        );
        return this.MailerService.send_receipt_and_welcome(
          response.data,
          update_paymentDetails,
        );
      }
    }
  }
  // User email for send credentials
  async getUserEmail(id) {
    const obj_id = new mongoose.Types.ObjectId(id);
    const data = await this.paymentModel.findOne({ _id: obj_id });
    if (data) {
      return {
        status: 200,
        email: data.email,
        contact: data.contact,
      };
    } else {
      return { status: 404, message: 'Data not found' };
    }
  }
}
