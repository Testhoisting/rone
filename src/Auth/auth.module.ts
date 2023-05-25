import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userSchema } from '../models/userdata.model';
import { MongooseModule } from '@nestjs/mongoose';
import { otpSchema } from '../models/otp.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwtAuth/strategy/jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { otpService } from './otpService';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: 'super-secret-ronedomainholder@New',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: 'usersDta_tbs', schema: userSchema },
      { name: 'otp_tbs', schema: otpSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, otpService],
})
export class AuthModule {}
