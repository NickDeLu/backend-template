import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';

export const mailConfigFactory = (
  configService: ConfigService,
): MailerOptions => {
  return {
    transport: {
      rejectUnauthorized: false,
      secure: false, // in prod remove this
      host: configService.get<string>('mail.host'),
      port: configService.get<string>('mail.port'),
      auth: {
        user: configService.get<string>('mail.email'),
        pass: configService.get<string>('mail.password'),
      },
      tls: {
        rejectUnauthorized: false, //in prod remove this
      },
    },
    defaults: {
      from: `"No Reply" <${configService.get<string>('mail.from')}>`,
    },
    template: {
      dir: path.join(__dirname, '../../../src/mail/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};
