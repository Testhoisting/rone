import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { profileModule } from './user_profile/profile.module';
import { imageModule } from './image_gallery/gallery.module';
import { new_userModule } from './create_new_user/new_user.module';
import { productModule } from './Product/product.module';
import { walletModule } from './wallet/wallet.module';
import { MailModule } from './Mailer/mailer.module';
import { paymentModule } from './payment/payment.module';
import { accountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    profileModule,
    imageModule,
    new_userModule,
    profileModule,
    productModule,
    walletModule,
    MailModule,
    paymentModule,
    accountModule,
  ],
})
export class AppModule {}
