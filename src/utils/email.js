import nodemailer from 'nodemailer';
export function otpHtml(otp, purpose = 'verification') {
  return `<div style="font-family:Arial"><h2>Saraha App ${purpose}</h2><p>Your code is <strong>${otp}</strong>.</p><p>It expires in 10 minutes.</p></div>`;
}
export async function sendOtpEmail(email, otp, purpose) {
  // SMTP is optional for local development; configure it to deliver real mail.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log(`[email mock] ${purpose} code for ${email}: ${otp}`);
    return;
  }
  const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
  await transport.sendMail({ from: process.env.EMAIL_FROM, to: email, subject: `Saraha App ${purpose} code`, html: otpHtml(otp, purpose) });
}
