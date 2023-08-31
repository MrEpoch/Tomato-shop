import { MAIL_PASS, MAIL_USER, MAIL_SMTP_HOST } from '$env/static/private';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';
import ConfirmEmail from "$lib/email/templates/confirm.svelte";
import ResetPassword from "$lib/email/templates/reset.svelte";

const credentials = {
  host: MAIL_SMTP_HOST,
  port: 2525,
  auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
  }
}

const transporter = nodemailer.createTransport(credentials);


function EmailHTML(subject: string, email_token: string, name: string, email: string) {
    switch (subject) {
        case 'Confirm Email':
            return render({
                template: ConfirmEmail,
                props: {
                    token: email_token,
                    name,
                }
            })
        case 'Reset Password':
            return render({
                template: ResetPassword,
                props: {
                    token: email_token,
                    name,
                    email
                }
            })
    }
}

export async function SendMail(email: string, subject: string, email_token: string, name: string) {
  await transporter.sendMail({
      from: MAIL_USER,
      to: email,
      subject,
      html: EmailHTML(subject, email_token, name, email) 
  });
}
