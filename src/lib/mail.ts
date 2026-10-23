import nodemailer, { type Transporter } from "nodemailer";

/**
 * Sends site emails (contact form, newsletter sign-ups) through the firm's own mailbox.
 * Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS; MAIL_TO defaults to info@lawage.co.tz.
 */
const env = (name: string) => process.env[name]?.trim() || undefined;

export const MAIL_TO = env("MAIL_TO") ?? "info@lawage.co.tz";

let transporter: Transporter | undefined;

/** False until the SMTP settings are filled in */
export const mailConfigured = () => Boolean(env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS"));

function getTransporter(): Transporter {
  if (!transporter) {
    const port = Number(env("SMTP_PORT") ?? 465);
    transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      secure: port === 465, // 465 is TLS from the start; 587 upgrades with STARTTLS
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    });
  }
  return transporter;
}

export async function sendMail(message: { subject: string; text: string; replyTo?: string }) {
  await getTransporter().sendMail({
    from: { name: "LawAge Advocates Website", address: env("SMTP_FROM") ?? env("SMTP_USER")! },
    to: MAIL_TO,
    ...message,
  });
}
