import { Resend } from 'resend';

// Force Node.js runtime (required for Resend SDK)
export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      full_name,
      email,
      phone,
      rental_start_date,
      rental_end_date,
      delivery_location,
      number_of_carts,
      cart_type,
      notes
    } = body;

    // Validation
    if (!full_name || !phone) {
      return new Response(
        JSON.stringify({ success: false, message: 'Name and phone required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format dates for display
    const formatDate = (dateStr: string) => {
      if (dateStr === 'Flexible' || !dateStr) return 'Flexible';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead - Website</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0A1F44; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🚨 New Lead from Website</h1>
          <p style="color: #99C2FF; margin: 5px 0 0 0; font-size: 14px;">Triple W Rentals</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <div style="background-color: #FFF3CD; border-left: 4px solid #FFC107; padding: 15px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #856404; font-weight: 600;">⚡ Action Required: Contact this lead immediately</p>
          </div>

          <h2 style="color: #0A1F44; margin-top: 0;">Contact Information</h2>
          <div style="background-color: #ffffff; border: 2px solid #0B5FFF; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; width: 35%; font-weight: 600;">Name:</td>
                <td style="padding: 10px 0; color: #0A1F44; font-weight: 700; font-size: 16px;">${full_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: 600;">Phone:</td>
                <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #0B5FFF; text-decoration: none; font-weight: 700; font-size: 16px;">${phone}</a></td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: 600;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #0B5FFF; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              ` : ''}
            </table>
          </div>

          <h2 style="color: #0A1F44; margin-top: 20px;">Rental Details</h2>
          <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 35%; font-weight: 600;">Rental Period:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 500;">${formatDate(rental_start_date)} — ${formatDate(rental_end_date)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Delivery Location:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 500;">${delivery_location}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Number of Carts:</td>
                <td style="padding: 8px 0; color: #0A1F44; font-size: 20px; font-weight: 700;">${number_of_carts}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Cart Type:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 700;">${cart_type}</td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600; vertical-align: top;">Notes:</td>
                <td style="padding: 8px 0; color: #333;">${notes}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="background-color: #E6F0FF; border-left: 4px solid #0B5FFF; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #0A1F44;"><strong>📞 Next Action</strong></p>
            <p style="margin: 10px 0 0 0; color: #333;">Call <strong>${full_name}</strong> at <strong>${phone}</strong> to confirm availability and provide pricing.</p>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">Automated lead notification from triple-w-golf-carts.vercel.app</p>
          <p style="margin: 5px 0 0 0;">Triple W Rentals Lead System</p>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'Triple W Leads <onboarding@resend.dev>',
      to: ['jcpl-07@hotmail.com'],
      subject: `New Lead – Website (${full_name} - ${number_of_carts} carts)`,
      html: emailHtml,
      replyTo: ['jcpl-07@hotmail.com'],
    });

    console.log('✅ Lead email sent to Juan at jcpl-07@hotmail.com');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead notification sent',
        emailId: result.data?.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ Error sending lead email:', error?.message);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send notification',
        error: error?.message || String(error)
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ success: false, message: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}
