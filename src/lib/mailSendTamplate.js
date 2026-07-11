export const getMailTemplate = ({
    firstName,
    lastName,
    email,
    type,
    subject,
    message,
    recipient = 'user'
}) => {
    const requestType =
        type === 'support' ? 'Support Request' : 'Subscription Request';

    const isAdmin = recipient === 'admin';
    const logoUrl = 'https://i.ibb.co.com/DfVdzyLv/mohammed.png';

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${requestType}</title>
  </head>
  <body style="margin:0;padding:0;background:#DEF0FA;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#DEF0FA;">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0"
                      style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08);">

                      <!-- Header -->
                      <tr>
                          <td style="background:#ffffff;padding:30px;text-align:center;border-bottom:4px solid #DEF0FA;">
                              <img src="${logoUrl}" alt="Logo" style="max-height:60px;width:auto;margin-bottom:20px;display:block;margin-left:auto;margin-right:auto;" />
                              <h1 style="margin:0;color:#2563eb;font-size:24px;">
                                  ${requestType}
                              </h1>
                              <p style="margin:8px 0 0;color:#64748b;font-size:13px;">
                                  ${isAdmin ? 'New request submitted from the website' : 'We have successfully received your request'}
                              </p>
                          </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                          <td style="padding:40px 35px;">

                              ${isAdmin ? `
                              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
                                  A new ${requestType.toLowerCase()} has been submitted and requires your review.
                              </p>
                              ` : `
                              <p style="margin:0 0 8px;font-size:16px;color:#111827;">
                                  Dear <strong>${firstName} ${lastName}</strong>,
                              </p>
                              <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.8;">
                                  Thank you for contacting us. We have successfully received your request.
                                  Our team is currently reviewing the information and will get back to you as soon as possible.
                              </p>
                              `}

                              <!-- Request Info Box -->
                              <h2 style="margin:24px 0 12px;font-size:16px;color:#111827;">Request Information</h2>
                              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px;">
                                  <p style="margin:0 0 10px;font-size:14px;color:#111827;"><strong>First Name:</strong> <span style="color:#4b5563;">${firstName}</span></p>
                                  <p style="margin:0 0 10px;font-size:14px;color:#111827;"><strong>Last Name:</strong> <span style="color:#4b5563;">${lastName}</span></p>
                                  <p style="margin:0 0 10px;font-size:14px;color:#111827;"><strong>Email:</strong> <span style="color:#4b5563;">${email}</span></p>
                                  <p style="margin:0 0 10px;font-size:14px;color:#111827;"><strong>Request Type:</strong> <span style="color:#4b5563;">${requestType}</span></p>
                                  <p style="margin:0;font-size:14px;color:#111827;"><strong>Subject:</strong> <span style="color:#4b5563;">${subject}</span></p>
                              </div>

                              <!-- Message Box -->
                              <h2 style="margin:24px 0 12px;font-size:16px;color:#111827;">Message</h2>
                              <div style="background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;padding:20px;color:#374151;white-space:pre-wrap;line-height:1.8;font-size:14px;">
                                  ${message}
                              </div>

                              ${!isAdmin ? `
                              <div style="margin-top:28px;padding:16px 20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
                                  <p style="margin:0;color:#166534;font-size:13px;">
                                      Our support team will review your request and respond shortly.
                                  </p>
                              </div>
                              ` : ''}

                              <hr style="margin:35px 0;border:none;border-top:1px solid #DEF0FA;" />
                             

                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td style="background:#f8fafc;padding:20px;text-align:center;">
                              <p style="margin:0;font-size:13px;color:#777;">
                                  &copy; ${new Date().getFullYear()} Customer Support Team. All rights reserved.
                              </p>
                          </td>
                      </tr>

                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
};
