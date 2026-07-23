import { NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";
import { CustomerConfirmationEmail } from "@/components/emails/CustomerConfirmation";
import { OwnerNotificationEmail } from "@/components/emails/OwnerNotification";

// In-memory deduplication cache
const recentSubmissions = new Map<string, number>();
const DEDUPLICATION_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(request: Request) {
  console.log("[API CONTACT] POST request received.");
  try {
    console.log("[API CONTACT] Parsing request body JSON...");
    let body;
    try {
      body = await request.json();
    } catch (parseErr) {
      console.error("[API CONTACT] Failed to parse request body:", parseErr);
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }
    
    console.log("[API CONTACT] Request body successfully parsed:", body);
    const { name, email, phone, date, service, pickup, destination, passengers, message } = body;

    console.log("[API CONTACT] Validating required parameters...");
    if (!name || !email || !phone || !date || !service || !pickup || !destination || !passengers || !message) {
      console.warn("[API CONTACT] Validation failed: missing parameters.");
      return NextResponse.json(
        { success: false, error: "All contact fields are required." },
        { status: 400 }
      );
    }
    console.log("[API CONTACT] Required parameters verified successfully.");

    // Deduplication Key: hash of name + phone + date
    const dedupeKey = `${name.toLowerCase().trim()}_${phone.trim()}_${date}`;
    const now = Date.now();
    
    console.log("[API CONTACT] Checking deduplication cache for key:", dedupeKey);
    if (recentSubmissions.has(dedupeKey)) {
      const lastTime = recentSubmissions.get(dedupeKey) || 0;
      if (now - lastTime < DEDUPLICATION_WINDOW_MS) {
        console.warn("[API CONTACT] Duplicate submission blocked for key:", dedupeKey);
        return NextResponse.json(
          { success: false, error: "Duplicate submission detected. Please wait a minute before requesting another quote." },
          { status: 400 }
        );
      }
    }
    
    // Register submission timestamp
    recentSubmissions.set(dedupeKey, now);

    // Clean up cache
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > DEDUPLICATION_WINDOW_MS) {
        recentSubmissions.delete(key);
      }
    }

    let recipientEmails: string[] = [
      "pktravelsdelhi1@gmail.com",
      "pankajkapoor1212@yahoo.com",
      "rahul.kapoor4u@yahoo.com"
    ];
    if (process.env.NOTIFICATION_EMAIL) {
      recipientEmails = process.env.NOTIFICATION_EMAIL.split(",").map(e => e.trim());
    }
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.SENDER_EMAIL || "PK Travel Delhi <noreply@pktravelsdelhi.com>";

    console.log("[API CONTACT] Environment configuration details:", {
      recipientEmails,
      hasApiKey: !!apiKey,
      fromEmail,
    });

    if (!apiKey) {
      console.warn("[API CONTACT] RESEND_API_KEY is not defined. Simulating submission in development mode...");
      console.log(`[API CONTACT DEV MOCK LOGS] Name: ${name}, Email: ${email}, Phone: ${phone}, Date: ${date}, Service: ${service}`);
      return NextResponse.json({
        success: true,
      });
    }

    console.log("[API CONTACT] Initializing Resend client...");
    const resend = new Resend(apiKey);
    const timestampStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    console.log("[API CONTACT] Constructing OwnerNotificationEmail element...");
    const ownerEmailElement = React.createElement(OwnerNotificationEmail, {
      name,
      email,
      phone,
      date,
      service,
      pickup,
      destination,
      passengers,
      message,
      timestamp: timestampStr,
    });

    console.log("[API CONTACT] Sending Owner Notification email via Resend...");
    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: fromEmail,
        to: recipientEmails,
        replyTo: email,
        subject: `🚍 New Booking Inquiry - ${name}`,
        react: ownerEmailElement,
      });
    } catch (resendOwnerErr) {
      console.error("[API CONTACT] Resend SDK owner email send operation threw an error:", resendOwnerErr);
      return NextResponse.json(
        { success: false, error: resendOwnerErr instanceof Error ? resendOwnerErr.message : "Failed to execute Resend email send call." },
        { status: 500 }
      );
    }

    console.log("[API CONTACT] Owner Notification Resend API response:", emailResponse);

    if (emailResponse.error) {
      console.error("[API CONTACT] Resend API reported an error for owner notification:", emailResponse.error);
      return NextResponse.json(
        { success: false, error: emailResponse.error.message || "Failed to send email enquiry via Resend." },
        { status: 500 }
      );
    }

    // Send Customer Confirmation Email
    console.log("[API CONTACT] Constructing CustomerConfirmationEmail element...");
    const customerEmailElement = React.createElement(CustomerConfirmationEmail, {
      name,
      email,
      phone,
      date,
      service,
      pickup,
      destination,
      passengers,
      message,
    });

    try {
      console.log("[API CONTACT] Sending Customer Confirmation email via Resend to:", email);
      const customerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: recipientEmails[0],
        subject: "✅ We've Received Your Inquiry | PK Travel Delhi",
        react: customerEmailElement,
      });
      console.log("[API CONTACT] Customer email Resend API response:", customerEmailResponse);
      if (customerEmailResponse.error) {
        console.error("[API CONTACT] Resend API reported an error for customer email:", customerEmailResponse.error);
      }
    } catch (custError) {
      console.error("[API CONTACT] Failed to send customer confirmation email:", custError);
    }

    console.log("[API CONTACT] Transaction completed successfully. Returning success.");
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("[API CONTACT CRITICAL EXCEPTION] Unhandled route handler exception:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
