import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const SMS_API = `682b19a3-7047-11eb-a9bc-0200cd936042`;
@Injectable()
export class otpService {
  constructor(private http: HttpService) {}

  async sendOtp(phone, otpreason) {
    const numberDetails = parsePhoneNumberFromString(phone);
    if (numberDetails?.country === 'IN') {
      let response;
      try {
        response = await this.http
          .post(
            `https://2factor.in/API/V1/${SMS_API}/SMS/+91${numberDetails?.nationalNumber}/AUTOGEN/${otpreason}`,
          )
          .toPromise();

        return response;
      } catch (error) {
        return error;
      }
    }
  }
}
