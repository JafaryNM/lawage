import { fail, fieldErrorsOf, noContent, withErrors } from "@/lib/api/server";
import { MAIL_TO, mailConfigured, sendMail } from "@/lib/mail";
import { SubscribeSchema } from "@/lib/validation/schemas";

// Public: tells the firm someone signed up for industry alerts & insights
export const POST = withErrors(async (request) => {
  const parsed = SubscribeSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return fail(400, "Enter a valid email address.", fieldErrorsOf(parsed.error));

  const { email, website } = parsed.data;
  if (website) return noContent();
  if (!mailConfigured()) return fail(503, `Sign-up is not available right now. Please email ${MAIL_TO}.`);

  await sendMail({
    subject: `Newsletter sign-up: ${email}`,
    replyTo: email,
    text: `${email} asked to receive LawAge industry alerts & insights from the website footer.`,
  });
  return noContent();
});
