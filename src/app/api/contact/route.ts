import { fail, fieldErrorsOf, noContent, withErrors } from "@/lib/api/server";
import { MAIL_TO, mailConfigured, sendMail } from "@/lib/mail";
import { ContactSchema } from "@/lib/validation/schemas";

// Public: emails a contact form message to the firm
export const POST = withErrors(async (request) => {
  const parsed = ContactSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return fail(400, "Check your details.", fieldErrorsOf(parsed.error));

  const { name, email, phone, area, message, website } = parsed.data;
  if (website) return noContent(); // bot: pretend it worked
  if (!mailConfigured()) return fail(503, `The form is not available right now. Please email ${MAIL_TO}.`);

  await sendMail({
    subject: `Website enquiry from ${name}${area ? ` – ${area}` : ""}`,
    replyTo: email,
    text: `${message}\n\n---\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not given"}\nPractice area: ${area || "Not specified"}`,
  });
  return noContent();
});
