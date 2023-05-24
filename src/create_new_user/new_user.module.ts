import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../models/userdata.model';
import { new_userController } from './new_user.controller';
import { new_userService } from './new_user.service';
import { paymentSchema } from '../models/payment.model';
import { MailModule } from '../Mailer/mailer.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'usersDta_tbs', schema: userSchema },
      { name: 'payment_tbs', schema: paymentSchema },
    ]),
    MailModule,
  ],
  controllers: [new_userController],
  providers: [new_userService],
})
export class new_userModule {}
