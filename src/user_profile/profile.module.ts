import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { profileController } from './profile.controller';
import { profileService } from './profile.service';
import { userSchema } from '../models/userdata.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'usersDta_tbs', schema: userSchema }]),
  ],
  controllers: [profileController],
  providers: [profileService],
})
export class profileModule {}
