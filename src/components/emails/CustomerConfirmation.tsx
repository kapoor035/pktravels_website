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

  const headlineStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 700,
    color: "#FFFFFF",
    margin: "0 0 8px 0",
    textAlign: "center",
    letterSpacing: "-0.02em",
  };

  const introTextStyle: React.CSSProperties = {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#A3A3A3",
    margin: "0 0 20px 0",
    textAlign: "center",
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

  const ctaWrapperStyle: React.CSSProperties = {
    textAlign: "center",
    margin: "12px 0 4px 0",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#D4AF37",
    color: "#000000",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
    padding: "10px 24px",
    borderRadius: "9999px",
    display: "inline-block",
    letterSpacing: "0.02em",
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
                    <td style={valueTdStyle}>
                      <a href={`mailto:${email}`} style={{ color: "#D4AF37", textDecoration: "none" }}>{email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Contact Number</td>
                    <td style={valueTdStyle}>
                      <a href={`tel:${phone}`} style={{ color: "#D4AF37", textDecoration: "none" }}>{phone}</a>
                    </td>
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

              <h3 style={{ ...sectionHeadingStyle, fontSize: "11px", marginBottom: "6px" }}>Special Requirements</h3>
              <div style={messageBoxStyle}>{message}</div>

              <div style={ctaWrapperStyle}>
                <table border={0} cellSpacing={0} cellPadding={0} align="center" style={{ margin: "0 auto" }}>
                  <tbody>
                    <tr>
                      <td align="center" style={{ borderRadius: "9999px", backgroundColor: "#D4AF37" }}>
                        <a href="https://pktravelsdelhi.com" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
                          Visit Website
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
