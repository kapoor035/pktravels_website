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
        <div style="font-family: Arial, sans-serif; background-color: #0A0A0A; color: #FFFFFF; padding: 30px; border-radius: 15px; border: 1px solid #FF8A00; max-width: 600px;">
          <h2 style="color: #FF8A00; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 15px;">New Quote Request</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px; width: 140px;"><strong>Client Name:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px;"><strong>Contact Phone:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;"><a href="tel:${phone}" style="color: #FF8A00; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #BDBDBD; font-size: 14px;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;"><a href="mailto:${email}" style="color: #FF8A00; text-decoration: none;">${email}</a></td>
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

    // Log the full response from the admin email send call
    console.log("Admin email Resend response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API returned an error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send email enquiry via Resend provider. Please contact us directly by phone." },
        { status: 500 }
      );
    }

    // Send Customer Confirmation Email (Only if the first email to PK Travels is successful)
    try {
      console.log("Executing second Resend send call to customer email address:", email);
      const customerEmailResponse = await resend.emails.send({
        from: "PK Travels <onboarding@resend.dev>",
        to: email,
        subject: "Thank You for Contacting PK Travels",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0A0A0A; color: #FFFFFF; padding: 30px; border-radius: 15px; border: 1px solid #FF8A00; max-width: 600px; margin: 0 auto; box-sizing: border-box;">
            <!-- Logo Header -->
            <div style="text-align: center; margin-bottom: 25px;">
              <img src="https://pktraveldelhi.com/assets/logo/logo.png" alt="PK Travels Logo" style="width: 55px; height: 55px; border-radius: 50%; border: 1px solid #FF8A00; object-fit: cover; display: inline-block;" />
              <h1 style="color: #FF8A00; font-size: 24px; font-weight: bold; margin-top: 12px; margin-bottom: 5px; letter-spacing: 1px; font-family: 'Times New Roman', Times, serif;">PK TRAVELS</h1>
              <p style="color: #FF8A00; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; margin: 0; opacity: 0.85;">Premium Luxury Coaches</p>
            </div>
            
            <p style="font-size: 15px; line-height: 1.6; color: #FFFFFF; margin-bottom: 15px;">
              Dear <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #E0E0E0; margin-bottom: 15px;">
              Thank you for choosing PK Travels.
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #E0E0E0; margin-bottom: 15px;">
              We have successfully received your enquiry and our booking team is currently reviewing your requirements.
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #E0E0E0; margin-bottom: 15px;">
              One of our travel specialists will contact you within approximately <strong>2 hours</strong> to discuss availability, pricing and booking details.
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #E0E0E0; margin-bottom: 25px;">
              If your requirement is urgent, please feel free to contact us directly via phone or WhatsApp.
            </p>
            
            <!-- Summary Card -->
            <div style="background-color: #151515; border: 1px solid rgba(255, 138, 0, 0.25); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #FF8A00; font-size: 15px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">Enquiry Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #BDBDBD; font-size: 13px; width: 140px; vertical-align: top;"><strong>Full Name:</strong></td>
                  <td style="padding: 6px 0; color: #FFFFFF; font-size: 13px; vertical-align: top;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #BDBDBD; font-size: 13px; vertical-align: top;"><strong>Contact Number:</strong></td>
                  <td style="padding: 6px 0; color: #FFFFFF; font-size: 13px; vertical-align: top;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #BDBDBD; font-size: 13px; vertical-align: top;"><strong>Journey Date:</strong></td>
                  <td style="padding: 6px 0; color: #FFFFFF; font-size: 13px; vertical-align: top;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #BDBDBD; font-size: 13px; vertical-align: top;"><strong>Service Type:</strong></td>
                  <td style="padding: 6px 0; color: #FFFFFF; font-size: 13px; vertical-align: top;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #BDBDBD; font-size: 13px; vertical-align: top;"><strong>Requirements:</strong></td>
                  <td style="padding: 6px 0; color: #FFFFFF; font-size: 13px; line-height: 1.5; white-space: pre-wrap; vertical-align: top;">${message}</td>
                </tr>
              </table>
            </div>

            <!-- Important Booking Notice -->
            <div style="background-color: rgba(255, 138, 0, 0.05); border: 1px solid rgba(255, 138, 0, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
              <h4 style="color: #FF8A00; font-size: 14px; margin-top: 0; margin-bottom: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Important Booking Information</h4>
              <p style="font-size: 13px; line-height: 1.5; color: #E0E0E0; margin: 0 0 8px 0;">
                This email only confirms that we have successfully received your enquiry.
              </p>
              <p style="font-size: 13px; line-height: 1.5; color: #E0E0E0; margin: 0 0 8px 0; font-weight: bold;">
                Your booking is NOT confirmed at this stage.
              </p>
              <p style="font-size: 13px; line-height: 1.5; color: #E0E0E0; margin: 0;">
                A booking is considered confirmed only after our team contacts you, discusses your requirements, confirms vehicle availability and provides final booking confirmation.
              </p>
            </div>
            
            <!-- Contact Details Card -->
            <div style="background-color: #151515; border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
              <h4 style="color: #FF8A00; margin-top: 0; margin-bottom: 5px; font-size: 14px; font-weight: bold; text-transform: uppercase;">PK Travels</h4>
              <p style="color: #BDBDBD; font-size: 11px; margin-top: 0; margin-bottom: 15px; letter-spacing: 0.5px;">Luxury Bus Rental in Delhi NCR</p>
              
              <p style="color: #FFFFFF; font-size: 13px; margin: 6px 0;">
                <strong>Phone:</strong> <a href="tel:+919911016644" style="color: #FF8A00; text-decoration: none;">+91 99110 16644</a> | <a href="tel:+919876565656" style="color: #FF8A00; text-decoration: none;">+91 98765 65656</a>
              </p>
              <p style="color: #FFFFFF; font-size: 13px; margin: 6px 0;">
                <strong>Email:</strong> <a href="mailto:pktravelsdwarka@gmail.com" style="color: #FF8A00; text-decoration: none;">pktravelsdwarka@gmail.com</a>
              </p>
              <p style="color: #FFFFFF; font-size: 13px; margin: 6px 0;">
                <strong>Website:</strong> <a href="https://pktraveldelhi.com" style="color: #FF8A00; text-decoration: none;">https://pktraveldelhi.com</a>
              </p>
            </div>

            <!-- Divider & Footer -->
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 25px 0;" />
            
            <p style="font-size: 12px; line-height: 1.6; color: #BDBDBD; margin-bottom: 10px; text-align: center; opacity: 0.8;">
              Please do not reply to this automated email.
            </p>
            <p style="font-size: 12px; line-height: 1.6; color: #BDBDBD; margin-bottom: 20px; text-align: center; opacity: 0.8;">
              For urgent assistance, kindly contact PK Travels directly via phone or WhatsApp.
            </p>
            
            <p style="font-size: 11px; color: #BDBDBD; opacity: 0.5; margin: 0; text-align: center; line-height: 1.4;">
              &copy; 2026 PK Travels. All Rights Reserved.<br />
              <span style="font-size: 10px; tracking-wider; text-transform: uppercase;">Luxury Bus Rental &bull; Delhi NCR</span>
            </p>
          </div>
        `
      });

      // Log the full response from the customer email send call
      console.log("Customer email Resend response:", customerEmailResponse);

      if (customerEmailResponse.error) {
        console.error("Resend API customer email error occurred:", customerEmailResponse.error);
      } else {
        console.log("Customer email sent successfully! Message ID:", customerEmailResponse.data?.id);
      }
    } catch (custError) {
      console.error("Failed to execute customer confirmation email call:", custError);
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
