import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  console.log('========================================');
  console.log('🔵 API ROUTE CALLED: /api/send-lead');
  console.log('Timestamp:', new Date().toISOString());
  console.log('========================================');

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const isTestMode = !apiKey || apiKey === 'test_mode';

    console.log('Environment check:');
    console.log('- RESEND_API_KEY exists:', !!apiKey);
    console.log('- RESEND_API_KEY length:', apiKey?.length || 0);
    console.log('- RESEND_API_KEY starts with "re_":', apiKey?.startsWith('re_') || false);
    console.log('- Test mode:', isTestMode);
    console.log('========================================');

    const body = await req.json();
    console.log('Request body received:', JSON.stringify(body, null, 2));

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
      return NextResponse.json(
        { success: false, message: 'Name and phone are required' },
        { status: 400 }
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

    // TEST MODE: Log email instead of sending
    if (isTestMode) {
      console.log('========================================');
      console.log('📧 EMAIL TEST MODE (Resend not configured)');
      console.log('========================================');
      console.log('FROM: Website Leads <onboarding@resend.dev>');
      console.log('TO: jcpl-07@hotmail.com, Triplewrentals@gmail.com');
      console.log(`SUBJECT: New Lead – Website (${full_name} - ${number_of_carts} carts)`);
      console.log('REPLY-TO:', email || 'None');
      console.log('----------------------------------------');
      console.log('LEAD DATA:');
      console.log('- Name:', full_name);
      console.log('- Phone:', phone);
      console.log('- Email:', email || 'Not provided');
      console.log('- Dates:', `${rental_start_date} to ${rental_end_date}`);
      console.log('- Location:', delivery_location);
      console.log('- Carts:', number_of_carts, 'x', cart_type);
      if (notes) console.log('- Notes:', notes);
      console.log('========================================');

      return NextResponse.json({
        success: true,
        message: 'Lead logged (test mode - configure RESEND_API_KEY for real emails)',
        testMode: true
      });
    }

    // PRODUCTION MODE: Send email via Resend
    console.log('🔵 Initializing Resend client...');
    console.log('API Key preview:', apiKey?.substring(0, 10) + '...');

    const resend = new Resend(apiKey);
    console.log('✅ Resend client created');

    console.log('🔵 Preparing email send...');
    console.log('FROM: onboarding@resend.dev');
    console.log('TO:', ['jcpl-07@hotmail.com', 'Triplewrentals@gmail.com']);
    console.log('Subject:', `New Lead – Website (${full_name} - ${number_of_carts} carts)`);
    console.log('Reply-To:', email || 'undefined');
    console.log('HTML length:', emailHtml.length, 'characters');

    console.log('🔵 Calling Resend API...');
    const { data, error } = await resend.emails.send({
      from: 'Website Leads <onboarding@resend.dev>',
      to: ['jcpl-07@hotmail.com', 'Triplewrentals@gmail.com'],
      subject: `New Lead – Website (${full_name} - ${number_of_carts} carts)`,
      html: emailHtml,
      replyTo: email || undefined,
    });

    console.log('🔵 Resend API call completed');
    console.log('Has data:', !!data);
    console.log('Has error:', !!error);

    if (error) {
      console.error('========================================');
      console.error('❌ RESEND ERROR:');
      console.error('Error object:', JSON.stringify(error, null, 2));
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
      console.error('========================================');
      return NextResponse.json(
        { success: false, message: 'Failed to send notification', error: error.message },
        { status: 500 }
      );
    }

    console.log('========================================');
    console.log('✅ Email sent successfully via Resend!');
    console.log('Email ID:', data?.id);
    console.log('========================================');

    return NextResponse.json({
      success: true,
      message: 'Lead notification sent',
      emailId: data?.id
    });

  } catch (error: any) {
    console.error('========================================');
    console.error('💥 CRITICAL ERROR IN API ROUTE:');
    console.error('Error type:', typeof error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('========================================');
    return NextResponse.json(
      { success: false, message: 'Internal server error', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
