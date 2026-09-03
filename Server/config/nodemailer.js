import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: (process.env.SMTP_USER || '').replace(/['"]/g, '').trim(),
    pass: (process.env.SMTP_PASS || '').replace(/['"]/g, '').trim(),
  },
});

export default transporter;