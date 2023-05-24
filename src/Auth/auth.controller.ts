import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwtAuth/guards/jwt-guard.gaurds';
import { GetCurrentUserById } from '../jwtAuth/utils/get-userid-decorator';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { registerDto, otpDto, VerifyOtp } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // User registration
  @Post('register')
  @ApiCreatedResponse({ description: 'user Registration' })
  @ApiBody({ type: registerDto })
  signup(@Body('roneId') roneId: string, @Body('email') email: string) {
    const result = this.authService.signup(roneId, email);
    return result;
  }

  // OTP Registration
  @Post('verify_contact')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'OTP registration' })
  @ApiBody({ type: otpDto })
  otpRegister(
    @GetCurrentUserById('userId') Id: any,
    @Body('contact') contact: number,
  ) {
    const response = this.authService.sendOtp(contact, Id.userId);
    return response;
  }
  // Verify Otp
  @Post('verify_otp')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'OTP verfication' })
  @ApiBody({ type: VerifyOtp })
  verify_otp(@GetCurrentUserById() Id: any, @Body('otp') otp: number) {
    const response = this.authService.verifyOtp(Id.contact, otp, Id.userId);
    return response;
  }
  // user Login
  @Post('login')
  userLogin(@Body('credentials') credential: object) {
    return this.authService.userLogin(credential);
  }
}
