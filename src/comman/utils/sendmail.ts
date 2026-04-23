import { Resend } from "resend";

type SendMailInput = {
	to: string | string[];
	subject: string;
	html: string;
	text?: string;
	from?: string;
};

const DEFAULT_FROM = "auth@gouravindoriya.live";

const sendMail = async ({ to, subject, html, text="comming soon", from }: SendMailInput) => {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) throw new Error("Missing RESEND_API_KEY");

	const resend = new Resend(apiKey);
	const recipients = Array.isArray(to) ? to : [to];

	const payload = {
		from: from || process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
		to: recipients,
		subject,
		html,
		...(text ? { text } : {}),
	};

	const { data, error } = await resend.emails.send(payload);
	if (error) throw new Error(error.message || "Unable to send email");

	return data;
};

export type { SendMailInput };
export default sendMail;
