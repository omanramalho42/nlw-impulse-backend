import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "72797623c10bf6",
      pass: "34831e0c47967c"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe  <oi@feedget.com>',
            to: 'Oman Ramalho <omanapple42@hotmail.com>',
            subject,
            html: body,
        })
    };
}