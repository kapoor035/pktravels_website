import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CustomerConfirmationEmail } from "@/components/emails/CustomerConfirmation";
import { OwnerNotificationEmail } from "@/components/emails/OwnerNotification";

// In-memory deduplication cache
const recentSubmissions = new Map<string, number>();
const DEDUPLICATION_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, service, pickup, destination, passengers, message } = body;

    // Validate inputs
    if (!name || !email || !phone || !date || !service || !pickup || !destination || !passengers || !message) {
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

    const recipientEmail = process.env.NOTIFICATION_EMAIL || "pktravelsdelhi1@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.SENDER_EMAIL || "PK Travel Delhi <noreply@pktravelsdelhi.com>";

    if (!apiKey) {
      console.warn("=========================================");
      console.warn("WARNING: RESEND_API_KEY environment variable is missing.");
      console.warn("Logging submitted quote request details directly:");
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Phone: ${phone}`);
      console.log(`Date: ${date}`);
      console.log(`Service: ${service}`);
      console.log(`Pickup: ${pickup}`);
      console.log(`Destination: ${destination}`);
      console.log(`Passengers: ${passengers}`);
      console.log(`Message: ${message}`);
      console.warn("=========================================");
      
      // Simulate success for local dev preview testing
      return NextResponse.json({
        success: true,
        message: "Enquiry logged successfully (Dev Simulation Mode). Configure RESEND_API_KEY inside your .env file to enable real email sending.",
      });
    }

    const resend = new Resend(apiKey);
    const timestampStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Send Owner Notification Email
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `🚍 New Booking Inquiry - ${name}`,
      react: (
        <OwnerNotificationEmail
          name={name}
          email={email}
          phone={phone}
          date={date}
          service={service}
          pickup={pickup}
          destination={destination}
          passengers={passengers}
          message={message}
          timestamp={timestampStr}
        />
      ),
    });

    console.log("Admin email Resend response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API returned an error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send email enquiry via Resend provider. Please contact us directly by phone." },
        { status: 500 }
      );
    }

    // Send Customer Confirmation Email
    try {
      console.log("Executing second Resend send call to customer email address:", email);

      const customerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: recipientEmail,
        subject: "✅ We've Received Your Inquiry | PK Travel Delhi",
        react: (
          <CustomerConfirmationEmail
            name={name}
            email={email}
            phone={phone}
            date={date}
            service={service}
            pickup={pickup}
            destination={destination}
            passengers={passengers}
            message={message}
          />
        ),
      });

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

export const dynamic = "force-dynamic";
