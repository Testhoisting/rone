import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from '../jwtAuth/guards/jwt-guard.gaurds';
import { GetCurrentUserById } from '../jwtAuth/utils';
import { walletService } from './wallet.service';

@Controller('wallet')
export class walletController {
  constructor(private walletService: walletService) {}
  // create Link
  @Post('generate_link')
  @UseGuards(JwtAuthGuard)
  generate_link(
    @GetCurrentUserById() Id: any,
    @Body('referralData') data: string,
  ) {
    return this.walletService.create_referralLink(Id.userId, data);
  }
  // check link
  @Get('link/:id')
  @Redirect()
  check_link(@Param('id') id: string) {
    return this.walletService.validate_link(id);
  }
  // share link;
  @Post('share_link')
  @UseGuards(JwtAuthGuard)
  share_link(
    @Body('Id') id: string,
    @Body('email') email: string,
    @Body('name') name: string,
  ) {
    return this.walletService.sendMail(id, email, name);
  }

  // wallet details
  @Post('wallet_datas')
  @UseGuards(JwtAuthGuard)
  wallet(@Body('roneId') roneId: string) {
    return this.walletService.get_WalletData(roneId);
  }
}
