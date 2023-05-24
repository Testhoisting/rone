import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwtAuth/guards/jwt-guard.gaurds';
import { accountService } from './account.service';
import { GetCurrentUserById } from '../jwtAuth/utils';

@Controller('account')
export class accountController {
  constructor(private accountService: accountService) {}
  @Put('save_details')
  @UseGuards(JwtAuthGuard)
  saveAccount(
    @GetCurrentUserById() Id: any,
    @Body('accountDetails') accountDetails: Object,
  ) {
    return this.accountService.saveAccount_data(Id.userId, accountDetails);
  }
  @Get('getData')
  @UseGuards(JwtAuthGuard)
  getData(@GetCurrentUserById() Id: any) {
    return this.accountService.getAccountData(Id.userId);
  }
}
