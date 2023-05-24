import { Body, Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import { query } from 'express';
import { paymentService } from './payment.service';

@Controller('payments')
export class paymentController {
  constructor(private paymentService: paymentService) {}
  @Get('create_Order')
  Order(@Query() query: { Id: string }) {
    console.log(query.Id);
    return this.paymentService.createOrder(query.Id);
  }
  @Post('verify_payment')
  @Redirect()
  verification(@Body('razorpay_payment_id') paymentId: string) {
    return this.paymentService.verify_Payment_id(paymentId);
  }
  @Get('payment_email')
  getEmail(@Query() query: { id: string }) {
    return this.paymentService.getUserEmail(query.id);
  }
}
