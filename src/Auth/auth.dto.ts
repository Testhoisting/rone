import { ApiProperty } from '@nestjs/swagger';

class registerDto {
  @ApiProperty({
    description: 'Enter your RoneId',
    example: 'RONE123',
  })
  roneId: string;

  @ApiProperty({
    description: 'Enter your valid mail',
    example: 'Example12@gmail.com',
  })
  email: string;
}
class otpDto {
  @ApiProperty({
    description: 'Enter Mobile number',
    example: 9700000000,
  })
  phone: number;
}
class VerifyOtp {
  @ApiProperty({
    description: 'Enter 6 digit OTP code',
    example: 454637,
  })
  code: number;

  @ApiProperty({
    example: 9747045972,
  })
  phone: number;
}

export { registerDto, otpDto, VerifyOtp };
