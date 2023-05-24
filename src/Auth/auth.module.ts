import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userSchema } from '../models/userdata.model';
import { MongooseModule } from '@nestjs/mongoose';
import { otpSchema } from '../models/otp.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwtAuth/strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-ronedomainholder@New',
    }),
    MongooseModule.forFeature([
      { name: 'usersDta_tbs', schema: userSchema },
      { name: 'otp_tbs', schema: otpSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
