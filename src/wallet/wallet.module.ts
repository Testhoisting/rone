import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../Mailer/mailer.module';
import { referralSchema } from '../models/referral.model';
import { walletSchema } from '../models/wallet.model';
import { walletController } from './wallet.controller';
import { walletService } from './wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'wallet_tbs', schema: walletSchema },
      { name: 'refe_links_tbs', schema: referralSchema },
    ]),
    MailModule,
  ],
  controllers: [walletController],
  providers: [walletService],
})
export class walletModule {}
