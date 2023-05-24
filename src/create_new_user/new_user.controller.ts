import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwtAuth/guards/jwt-guard.gaurds';
import { GetCurrentUserById } from '../jwtAuth/utils';
import { new_userService } from './new_user.service';

@Controller('new_user')
export class new_userController {
  constructor(private service: new_userService) {}
  @Post('create_id')
  createId(@Body('id') Id: string) {
    return this.service.create_roneId(Id);
  }
  @Put('create_user')
  @UseGuards(JwtAuthGuard)
  createUser(@GetCurrentUserById() Id: any, @Body('userData') userData: any) {
    return this.service.create_user(userData, Id.userId);
  }
  @Post('create_demo_users')
  createDemo(@Body('email') email: string) {
    return this.service.createuser(email);
  }
}
