import nodemailer from 'nodemailer'

export interface SendEmailProps {
  to: string
  subject: string
  text?: string
  html?: string
}

export async function sendMail({ to, subject, text, html }: SendEmailProps) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for other ports
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : null,
  })

  const mailOptions = {
    from: `${process.env.SMTP_SENDER} <${process.env.SMTP_FROM}>`,
    to,
    subject,
    text,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${to}`)
  } catch (error) {
    console.error(`Error sending email: ${error}`)
  }
}
