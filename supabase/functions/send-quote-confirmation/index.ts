import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QuoteEmailData {
  email: string;
  full_name: string;
  rental_start_date: string;
  rental_end_date: string;
  delivery_location: string;
  number_of_carts: number;
  cart_type: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: QuoteEmailData = await req.json();

    if (!data.email) {
      return new Response(
        JSON.stringify({ success: false, message: "No email provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Request Received</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0A1F44; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Triple W Rentals</h1>
          <p style="color: #99C2FF; margin: 5px 0 0 0; font-size: 14px;">Golf Cart Rentals</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0A1F44; margin-top: 0;">Hi ${data.full_name},</h2>
          
          <p>Thank you for your quote request! We received your information and will call you shortly to confirm availability and provide your total price.</p>
          
          <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #0A1F44; margin-top: 0; margin-bottom: 15px;">Your Request Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 40%;">Rental Period:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 500;">${formatDate(data.rental_start_date)} - ${formatDate(data.rental_end_date)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Delivery Location:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 500;">${data.delivery_location}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Number of Carts:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 500;">${data.number_of_carts}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Cart Type:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 500;">${data.cart_type}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #E6F0FF; border-left: 4px solid #0B5FFF; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #0A1F44;"><strong>What happens next?</strong></p>
            <p style="margin: 10px 0 0 0; color: #333;">Our team will review your request and call you to confirm availability and provide your exact total price. We typically respond within a few hours during business hours.</p>
          </div>
          
          <p style="margin-bottom: 5px;"><strong>Need it faster?</strong></p>
          <p style="margin-top: 5px;">Call us directly at <a href="tel:+19729656901" style="color: #0B5FFF; text-decoration: none; font-weight: 600;">(972) 965-6901</a></p>
          
          <hr style="border: none; border-top: 1px solid #e9ecef; margin: 25px 0;">
          
          <p style="color: #666; font-size: 14px; margin-bottom: 5px;">Thank you for choosing Triple W Rentals.</p>
          <p style="color: #666; font-size: 14px; margin-top: 5px;">Tyler, Texas and East Texas</p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p style="margin: 0;">Triple W Rentals | Golf Cart Rentals</p>
          <p style="margin: 5px 0 0 0;">(972) 965-6901 | Tyler, Texas</p>
          <p style="margin: 10px 0 0 0;">Rates vary by dates and location. 3-day minimum rental.</p>
        </div>
      </body>
      </html>
    `;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY) {
      // Email de confirmation au client
      const customerEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Triple W Rentals <noreply@triplewrentals.com>",
          to: [data.email],
          subject: "Quote Request Received - Triple W Rentals Golf Carts",
          html: emailHtml,
        }),
      });

      if (!customerEmailResponse.ok) {
        const errorText = await customerEmailResponse.text();
        console.error("Customer email send failed:", errorText);
        return new Response(
          JSON.stringify({ success: false, message: "Failed to send confirmation email" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Email de notification aux admins
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Quote Request</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #0A1F44; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🚨 New Quote Request</h1>
            <p style="color: #99C2FF; margin: 5px 0 0 0; font-size: 14px;">Triple W Rentals</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background-color: #FFF3CD; border-left: 4px solid #FFC107; padding: 15px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #856404; font-weight: 600;">Action Required: Contact customer to confirm availability and provide pricing</p>
            </div>

            <h2 style="color: #0A1F44; margin-top: 0;">Customer Information</h2>
            <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 40%; font-weight: 600;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${data.full_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0B5FFF; text-decoration: none;">${data.email}</a></td>
                </tr>
              </table>
            </div>

            <h2 style="color: #0A1F44; margin-top: 20px;">Rental Details</h2>
            <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 40%; font-weight: 600;">Rental Period:</td>
                  <td style="padding: 8px 0; color: #333;">${formatDate(data.rental_start_date)} - ${formatDate(data.rental_end_date)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Delivery Location:</td>
                  <td style="padding: 8px 0; color: #333;">${data.delivery_location}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Number of Carts:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 18px; font-weight: 700;">${data.number_of_carts}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Cart Type:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.cart_type}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #E6F0FF; border-left: 4px solid #0B5FFF; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #0A1F44;"><strong>📞 Next Steps</strong></p>
              <p style="margin: 10px 0 0 0; color: #333;">Contact ${data.full_name} to confirm cart availability for these dates and provide the total rental price.</p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p style="margin: 0;">This is an automated notification from your website</p>
            <p style="margin: 5px 0 0 0;">Triple W Rentals Quote System</p>
          </div>
        </body>
        </html>
      `;

      const adminEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Triple W Rentals <noreply@triplewrentals.com>",
          to: ["jcpl-07@hotmail.com", "Triplewrentals@gmail.com"],
          subject: `🚨 New Quote Request - ${data.full_name} (${data.number_of_carts} carts)`,
          html: adminEmailHtml,
          reply_to: data.email,
        }),
      });

      if (!adminEmailResponse.ok) {
        const errorText = await adminEmailResponse.text();
        console.error("Admin email send failed:", errorText);
        // On continue même si l'email admin fail, le client a reçu sa confirmation
      }

      return new Response(
        JSON.stringify({ success: true, message: "Confirmation email sent" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Email would be sent to:", data.email);
    console.log("Email content prepared for:", data.full_name);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request logged (email service not configured)",
        note: "Set RESEND_API_KEY to enable email sending"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});