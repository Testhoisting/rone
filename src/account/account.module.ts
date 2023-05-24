import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { accoundSchema } from '../models/account.model';
import { accountController } from './account.controller';
import { accountService } from './account.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'account_tbs', schema: accoundSchema }]),
  ],
  controllers: [accountController],
  providers: [accountService],
})
export class accountModule {}
