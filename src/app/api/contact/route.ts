import { NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory deduplication cache
const recentSubmissions = new Map<string, number>();
const DEDUPLICATION_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, service, message } = body;

    // Validate inputs
    if (!name || !email || !phone || !date || !service || !message) {
      return NextResponse.json(
        { error: "All contact fields are required." },
        { status: 400 }
      );
    }

    // Deduplication Key: hash of name + phone + date
    const dedupeKey = `${name.toLowerCase().trim()}_${phone.trim()}_${date}`;
    const now = Date.now();
    
    if (recentSubmissions.has(dedupeKey)) {
      const lastTime = recentSubmissions.get(dedupeKey) || 0;
      if (now - lastTime < DEDUPLICATION_WINDOW_MS) {
        return NextResponse.json(
          { error: "Duplicate submission detected. Please wait a minute before requesting another quote." },
          { status: 400 }
        );
      }
    }
    
    // Register submission timestamp
    recentSubmissions.set(dedupeKey, now);

    // Clean up cache of items older than deduplication window to prevent memory leaks
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > DEDUPLICATION_WINDOW_MS) {
        recentSubmissions.delete(key);
      }
    }

    const recipientEmail = "pktravelsdwarka@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("=========================================");
      console.warn("WARNING: RESEND_API_KEY environment variable is missing.");
      console.warn("Logging submitted quote request details directly:");
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Phone: ${phone}`);
      console.log(`Date: ${date}`);
      console.log(`Service: ${service}`);
      console.log(`Message: ${message}`);
      console.warn("=========================================");
      
      // Simulate success for local dev preview testing
      return NextResponse.json({
        success: true,
        message: "Enquiry logged successfully (Dev Simulation Mode). Configure RESEND_API_KEY inside your .env file to enable real email sending.",
      });
    }

    const resend = new Resend(apiKey);

    const emailResponse = await resend.emails.send({
      from: "PK Travels Enquiries <onboarding@resend.dev>", // Replace with verified domain in production
      to: recipientEmail,
      subject: `New Luxury Quote Request - ${name} (${service})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0A0A0A; color: #FFFFFF; padding: 30px; border-radius: 15px; border: 1px solid #C8A84E; max-width: 600px;">
          <h2 style="color: #C8A84E; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 15px;">New Quote Request</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px; width: 140px;"><strong>Client Name:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px;"><strong>Contact Phone:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;"><a href="tel:${phone}" style="color: #C8A84E; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;"><a href="mailto:${email}" style="color: #C8A84E; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px;"><strong>Journey Date:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px;"><strong>Service Category:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;">${service}</td>
            </tr>
          </table>
          
          <div style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
            <p style="color: #BDBDBD; font-size: 14px; margin-bottom: 8px;"><strong>Customer Requirements:</strong></p>
            <div style="background-color: #151515; padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); color: #FFFFFF; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message}</div>
          </div>
          
          <p style="font-size: 11px; color: #BDBDBD; opacity: 0.5; margin-top: 30px; text-align: center;">
            This email was sent dynamically from the PK Travels booking desk.
          </p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend API returned an error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send email enquiry via Resend provider. Please contact us directly by phone." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been successfully sent to the PK Travels desk.",
    });
  } catch (error) {
    console.error("Encountered form processing error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please contact us directly by phone or WhatsApp." },
      { status: 500 }
    );
  }
}
