import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwtAuth/guards/jwt-guard.gaurds';
import { GetCurrentUserById } from '../jwtAuth/utils';
import { profileService } from './profile.service';

@Controller('profile')
export class profileController {
  constructor(private profileService: profileService) {}
  // User Data add and create
  @Put('upsert')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'User details create and update' })
  profile(@GetCurrentUserById() Id: any, @Body('userData') userData: object) {
    return this.profileService.userProfile(userData, Id.userId);
  }
  @Get('getuser_data')
  @UseGuards(JwtAuthGuard)
  getData(@GetCurrentUserById() Id: any, @Query() query: { id: string }) {
    return this.profileService.getUserData(Id.userId, query.id);
  }
  @Get('share_userData')
  shareUserData(@Query() username: { username: string }) {
    return this.profileService.shareData(username);
  }
}
