import type { SendMailInput } from "./sendmail.js";

type LoginMailInput = {
	to: string;
	userName?: string;
	appName?: string;
};

export const loginSuccessMail = ({
	to,
	userName = "User",
	appName = "Auth",
}: LoginMailInput): SendMailInput => {
	const subject = `Login alert - ${appName}`;
	const currentYear = new Date().getFullYear();
	const html = `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>${subject}</title>
			</head>
			<body style="margin:0;padding:0;background:#f1f3f4;font-family:Arial,Helvetica,sans-serif;color:#202124;">
				<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f3f4;padding:24px 12px;">
					<tr>
						<td align="center">
							<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #dadce0;border-radius:12px;overflow:hidden;">
								<tr>
									<td style="background:linear-gradient(90deg,#4285F4,#34A853);padding:20px 24px;color:#ffffff;font-size:22px;font-weight:600;">
										${appName}
									</td>
								</tr>
								<tr>
									<td style="padding:24px;">
										<h2 style="margin:0 0 12px 0;font-size:22px;color:#202124;">New sign-in detected</h2>
										<p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;">Hi ${userName},</p>
										<p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;">You just logged in to <strong>${appName}</strong>.</p>
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:16px 0;background:#e8f0fe;border:1px solid #c6dafc;border-radius:10px;">
											<tr>
												<td style="padding:14px 16px;font-size:14px;line-height:1.6;color:#1967d2;">
													If this was you, no further action is needed.<br />
													If this was not you, change your password immediately.
												</td>
											</tr>
										</table>
										<a href="https://auth.gouravindoriya.live" style="display:inline-block;background:#4285F4;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600;">Review account activity</a>
									</td>
								</tr>
								<tr>
									<td style="padding:16px 24px 24px;color:#5f6368;font-size:12px;line-height:1.5;">
										This is an automated security message from ${appName}.<br />
										&copy; ${currentYear} ${appName}. All rights reserved.
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</body>
		</html>
	`;

	return {
		to,
		subject,
		html,
	};
};

export default {
	loginSuccessMail,
};
