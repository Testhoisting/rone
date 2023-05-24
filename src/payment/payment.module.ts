import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchema } from '../models/payment.model';
import { paymentController } from './payment.controller';
import { paymentService } from './payment.service';
import { RazorpayModule } from 'nestjs-razorpay';
import { referralSchema } from '../models/referral.model';
import { MailModule } from '../Mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'payment_tbs', schema: paymentSchema },
      { name: 'refe_links_tbs', schema: referralSchema },
    ]),
    RazorpayModule.forRoot({
      key_id: 'rzp_test_RVRFuJkkOrYw1Y',
      key_secret: 'QG47mfNjZLaaPbHLxtyfCgjd',
    }),
    MailModule,
  ],
  controllers: [paymentController],
  providers: [paymentService],
})
export class paymentModule {}
