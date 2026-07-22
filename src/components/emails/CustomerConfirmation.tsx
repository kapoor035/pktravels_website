import React from "react";

interface CustomerConfirmationEmailProps {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  pickup: string;
  destination: string;
  passengers: string;
  message: string;
}

export function CustomerConfirmationEmail({
  name,
  email,
  phone,
  date,
  service,
  pickup,
  destination,
  passengers,
  message,
}: CustomerConfirmationEmailProps) {
  const containerStyle: any = {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    backgroundColor: "#0B0B0B",
    color: "#FFFFFF",
    padding: "40px 20px",
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
    margin: "0 auto 24px auto",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#121212",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "32px 24px",
    textAlign: "left",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: 700,
    color: "#FFFFFF",
    margin: "0 0 12px 0",
    textAlign: "center",
    letterSpacing: "-0.02em",
  };

  const introTextStyle: React.CSSProperties = {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#A3A3A3",
    margin: "0 0 24px 0",
    textAlign: "center",
  };

  const dividerStyle: React.CSSProperties = {
    border: 0,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    margin: "24px 0",
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 700,
    color: "#F97316",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: "0 0 16px 0",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "24px",
  };

  const labelTdStyle: React.CSSProperties = {
    padding: "10px 0",
    fontSize: "13px",
    color: "#737373",
    fontWeight: 600,
    width: "150px",
    verticalAlign: "top",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  };

  const valueTdStyle: React.CSSProperties = {
    padding: "10px 0",
    fontSize: "13px",
    color: "#E5E5E5",
    verticalAlign: "top",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  };

  const messageBoxStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#D4D4D4",
    margin: "0 0 24px 0",
    whiteSpace: "pre-line",
  };

  const ctaWrapperStyle: React.CSSProperties = {
    textAlign: "center",
    margin: "16px 0 8px 0",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#F97316",
    color: "#000000",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
    padding: "12px 32px",
    borderRadius: "9999px",
    display: "inline-block",
    boxShadow: "0 4px 12px rgba(249,115,22,0.2)",
    letterSpacing: "0.02em",
  };

  const footerStyle: React.CSSProperties = {
    padding: "32px 24px 0 24px",
    textAlign: "center",
    color: "#737373",
    fontSize: "11px",
    lineHeight: "1.8",
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
              <h1 style={headlineStyle}>Inquiry Received</h1>
              <p style={introTextStyle}>
                Thank you for choosing PK Travel Delhi. We have successfully received your luxury coach rental inquiry. One of our travel specialists will review your requirements and get back to you shortly with a tailored quote.
              </p>

              <hr style={dividerStyle} />

              <h2 style={sectionHeadingStyle}>Journey Summary</h2>
              
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={labelTdStyle}>Customer Name</td>
                    <td style={valueTdStyle}>{name}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Email Address</td>
                    <td style={valueTdStyle}>{email}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Contact Number</td>
                    <td style={valueTdStyle}>{phone}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Service Chosen</td>
                    <td style={valueTdStyle}>{service}</td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Travel Date</td>
                    <td style={valueTdStyle}>{date}</td>
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

              <h3 style={{ ...sectionHeadingStyle, fontSize: "12px", marginBottom: "8px" }}>Special Requirements</h3>
              <div style={messageBoxStyle}>{message}</div>

              <div style={ctaWrapperStyle}>
                <a href="https://pktravelsdelhi.com" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
                  Visit Website
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style={footerStyle}>
              <h4 style={footerHeadingStyle}>PK Travel Delhi</h4>
              <p style={{ margin: "0 0 8px 0" }}>Luxury Bus Rental in Delhi NCR</p>
              <p style={{ margin: "0 0 12px 0" }}>
                Plot No. 484, Sector 19, Dwarka, New Delhi - 110075<br />
                Bookings: +91 99110 16644 &nbsp;|&nbsp; +91 99996 98020
              </p>
              <p style={{ margin: 0, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "12px" }}>
                <a href="https://pktravelsdelhi.com" style={{ color: "#737373", textDecoration: "none" }}>pktravelsdelhi.com</a> &nbsp;•&nbsp; © 2026 PK Travel Delhi. All rights reserved.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
