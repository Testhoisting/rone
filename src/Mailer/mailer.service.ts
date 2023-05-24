import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private MailerService: MailerService) {}

  async shareLink(link: string, email: string, name: string) {
    console.log(name, link, email);
    const response = await this.MailerService.sendMail({
      to: email,
      from: 't67206475@gmail.com',
      subject: 'Invitation to Rone services',
      template: './sharelink',
      context: {
        name: name,
        link: link,
      },
    })
      .then((response) => {
        return { status: 202, message: 'mail sended successfully' };
      })
      .catch((error) => {
        console.log(error);
        return { status: 401 };
      });
    return response;
  }
  // ============== send receipt and welcome mail helper //
  async send_receipt_and_welcome(data, userData) {
    const date = new Date().toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const mail_response = await this.MailerService.sendMail({
      to: data.email,
      from: 't67206475@gmail.com',
      subject: 'Payment of 1500 Rs received for Rone services',
      template: 'receipt',
      context: {
        amount: 1500,
        paymentId: data.id,
        status: data.status,
        method: data.method,
        currency: data.currency,
        total: 1500,
        date: date,
        name: userData.name,
        email: userData.email,
        contact: userData.contact,
        orderId: data.order_id,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: join(__dirname, 'public', 'image', 'logo.png'),
          cid: 'logo',
        },
      ],
    })
      .then((response) => {
        console.log(response);
        this.MailerService.sendMail({
          from: 't67206475@gmail.com',
          to: data.email,
          subject: 'Welcome to Rone card services',
          template: 'welcomeMail',
          context: {
            name: 'Ronecard',
          },
          attachments: [
            {
              filename: 'welcome.png',
              path: join(__dirname, 'public/image', 'welcome.png'),
              cid: 'welcome',
            },
            {
              filename: 'youtube.png',
              path: join(__dirname, 'public/image', 'youtube.png'),
              cid: 'youtube',
            },
          ],
        })
          .then((response) => {
            console.log(response);
            return response;
          })
          .catch((error) => {
            console.log(error);

            return { status: 401, error: error };
          });
      })
      .catch((error) => {
        console.log(error);

        return { status: 401, error: error };
      });
    return {
      status: 200,
      url:
        'http://localhost:3000/success-payment/paymentSuccess?id=' +
        userData._id,
    };
  }
  async sendRoneId(data: any) {
    const result = await this.MailerService.sendMail({
      to: data.email,
      from: 't67206475@gmail.com',
      subject: 'Youer RONE_ID from Team Ronecard.',
      template: 'Send_new_credentials',
      context: {
        roneid: data.roneId,
      },
    })
      .then((response) => {
        return { status: 200, email: data.email };
      })
      .catch((error) => {
        return { status: 401, error: error };
      });
    return result;
  }
}
