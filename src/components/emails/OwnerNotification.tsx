/* eslint-disable @next/next/no-img-element */
import React from "react";

interface OwnerNotificationEmailProps {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  pickup: string;
  destination: string;
  passengers: string;
  message: string;
  timestamp: string;
}

export function OwnerNotificationEmail({
  name,
  email,
  phone,
  date,
  service,
  pickup,
  destination,
  passengers,
  message,
  timestamp,
}: OwnerNotificationEmailProps) {
  const containerStyle: React.CSSProperties & { WebkitTextSizeAdjust?: string; msTextSizeAdjust?: string } = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#0A0A0A",
    color: "#FFFFFF",
    padding: "24px 16px",
    margin: 0,
    width: "100%",
    WebkitTextSizeAdjust: "100%",
    msTextSizeAdjust: "100%",
  };

  const innerTableStyle: React.CSSProperties = {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    borderCollapse: "collapse",
  };

  const logoStyle: React.CSSProperties = {
    display: "block",
    width: "90px",
    height: "auto",
    margin: "0 auto 16px auto",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#121212",
    borderRadius: "16px",
    border: "1px solid rgba(212, 175, 55, 0.25)",
    padding: "24px 20px",
    textAlign: "left",
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    color: "#D4AF37",
    fontSize: "11px",
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: "9999px",
    display: "inline-block",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "12px",
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 700,
    color: "#FFFFFF",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
  };

  const timeTextStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#737373",
    margin: "0 0 20px 0",
  };

  const dividerStyle: React.CSSProperties = {
    border: 0,
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    margin: "20px 0",
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 700,
    color: "#D4AF37",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: "0 0 12px 0",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  };

  const labelTdStyle: React.CSSProperties = {
    padding: "8px 0",
    fontSize: "12px",
    color: "#737373",
    fontWeight: 600,
    width: "140px",
    verticalAlign: "top",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  };

  const valueTdStyle: React.CSSProperties = {
    padding: "8px 0",
    fontSize: "12px",
    color: "#E5E5E5",
    verticalAlign: "top",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  };

  const highlightedValueTdStyle: React.CSSProperties = {
    ...valueTdStyle,
    color: "#D4AF37",
    fontWeight: 600,
  };

  const messageBoxStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "12px",
    lineHeight: "1.5",
    color: "#D4D4D4",
    margin: "0 0 20px 0",
    whiteSpace: "pre-line",
  };

  const actionContainerStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
  };

  const primaryButtonStyle: React.CSSProperties = {
    backgroundColor: "#D4AF37",
    color: "#000000",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
    padding: "10px 16px",
    borderRadius: "8px",
    display: "block",
    textAlign: "center",
    letterSpacing: "0.01em",
  };

  const secondaryButtonStyle: React.CSSProperties = {
    backgroundColor: "#121212",
    border: "1px solid rgba(212, 175, 55, 0.35)",
    color: "#D4AF37",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
    padding: "9px 16px",
    borderRadius: "8px",
    display: "block",
    textAlign: "center",
    letterSpacing: "0.01em",
  };

  const footerStyle: React.CSSProperties = {
    padding: "24px 20px 0 20px",
    textAlign: "center",
    color: "#737373",
    fontSize: "11px",
    lineHeight: "1.6",
  };

  const footerHeadingStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 700,
    color: "#A3A3A3",
    margin: "0 0 4px 0",
    letterSpacing: "0.02em",
  };

  return (
    <div style={containerStyle}>
      <table style={innerTableStyle}>
        <tbody>
          <tr>
            <td align="center">
              <img
                src="https://pktravelsdelhi.com/assets/logo/logo.png"
                alt="PK Travel Delhi Logo"
                style={logoStyle}
              />
            </td>
          </tr>
          <tr>
            <td style={cardStyle}>
              <div style={badgeStyle}>Admin Alert</div>
              <h1 style={headlineStyle}>New Booking Inquiry</h1>
              <p style={timeTextStyle}>Received: {timestamp}</p>

              <hr style={dividerStyle} />

              <h2 style={sectionHeadingStyle}>Lead Information</h2>
              
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={labelTdStyle}>Customer Name</td>
                    <td style={highlightedValueTdStyle}>{name}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Email Address</td>
                    <td style={valueTdStyle}>
                      <a href={`mailto:${email}`} style={{ color: "#D4AF37", textDecoration: "none" }}>{email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Contact Number</td>
                    <td style={highlightedValueTdStyle}>
                      <a href={`tel:${phone}`} style={{ color: "#D4AF37", textDecoration: "none" }}>{phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Service Chosen</td>
                    <td style={valueTdStyle}>{service}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Travel Date</td>
                    <td style={highlightedValueTdStyle}>{date}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Pickup Location</td>
                    <td style={valueTdStyle}>{pickup}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Destination</td>
                    <td style={valueTdStyle}>{destination}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>No. of Passengers</td>
                    <td style={valueTdStyle}>{passengers}</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ ...sectionHeadingStyle, fontSize: "11px", marginBottom: "6px" }}>Requirements Description</h3>
              <div style={messageBoxStyle}>{message}</div>

              <hr style={dividerStyle} />

              <table style={actionContainerStyle}>
                <tbody>
                  <tr>
                    <td style={{ width: "48%", paddingRight: "4%" }}>
                      <table border={0} cellSpacing={0} cellPadding={0} style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td align="center" style={{ borderRadius: "8px", backgroundColor: "#D4AF37" }}>
                              <a href={`tel:${phone}`} style={primaryButtonStyle}>
                                📞 Call Customer
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ width: "48%" }}>
                      <table border={0} cellSpacing={0} cellPadding={0} style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td align="center" style={{ borderRadius: "8px", backgroundColor: "#121212" }}>
                              <a href={`mailto:${email}`} style={secondaryButtonStyle}>
                                ✉️ Reply via Email
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={footerStyle}>
              <h4 style={footerHeadingStyle}>PK Travel Delhi</h4>
              <p style={{ margin: "0 0 12px 0" }}>Luxury Bus Rental in Delhi NCR</p>
              <p style={{ margin: "0 0 12px 0" }}>
                Plot No. 484, Sector 19, Dwarka, New Delhi – 110075
              </p>
              <p style={{ margin: "0 0 12px 0" }}>
                Bookings:<br />
                <a href="tel:+919911016644" style={{ color: "#D4AF37", textDecoration: "none" }}>+91 99110 16644</a> | <a href="tel:+919999698020" style={{ color: "#D4AF37", textDecoration: "none" }}>+91 99996 98020</a>
              </p>
              <p style={{ margin: 0, borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "12px" }}>
                Website: <a href="https://pktravelsdelhi.com" style={{ color: "#D4AF37", textDecoration: "none" }}>https://pktravelsdelhi.com</a><br />
                © 2026 PK Travel Delhi. All rights reserved.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
