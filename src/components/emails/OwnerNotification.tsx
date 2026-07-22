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

  const badgeStyle: React.CSSProperties = {
    backgroundColor: "rgba(249,115,22,0.1)",
    border: "1px solid rgba(249,115,22,0.25)",
    color: "#F97316",
    fontSize: "11px",
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: "9999px",
    display: "inline-block",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "16px",
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: 700,
    color: "#FFFFFF",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
  };

  const timeTextStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#737373",
    margin: "0 0 24px 0",
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

  const highlightedValueTdStyle: React.CSSProperties = {
    ...valueTdStyle,
    color: "#F97316",
    fontWeight: 600,
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

  const actionContainerStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
  };

  const primaryButtonStyle: React.CSSProperties = {
    backgroundColor: "#F97316",
    color: "#000000",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
    padding: "14px 20px",
    borderRadius: "12px",
    display: "block",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(249,115,22,0.2)",
    letterSpacing: "0.02em",
  };

  const secondaryButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
    padding: "13px 20px",
    borderRadius: "12px",
    display: "block",
    textAlign: "center",
    letterSpacing: "0.02em",
  };

  const footerStyle: React.CSSProperties = {
    padding: "32px 24px 0 24px",
    textAlign: "center",
    color: "#737373",
    fontSize: "11px",
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
                      <a href={`mailto:${email}`} style={{ color: "#E5E5E5", textDecoration: "none" }}>{email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style={labelTdStyle}>Contact Number</td>
                    <td style={highlightedValueTdStyle}>
                      <a href={`tel:${phone}`} style={{ color: "#F97316", textDecoration: "none" }}>{phone}</a>
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

              <h3 style={{ ...sectionHeadingStyle, fontSize: "12px", marginBottom: "8px" }}>Requirements Description</h3>
              <div style={messageBoxStyle}>{message}</div>

              <hr style={dividerStyle} />

              <table style={actionContainerStyle}>
                <tbody>
                  <tr>
                    <td style={{ width: "48%", paddingRight: "4%" }}>
                      <a href={`tel:${phone}`} style={primaryButtonStyle}>
                        📞 Call Customer
                      </a>
                    </td>
                    <td style={{ width: "48%" }}>
                      <a href={`mailto:${email}`} style={secondaryButtonStyle}>
                        ✉️ Reply via Email
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={footerStyle}>
              <p style={{ margin: 0 }}>PK Travel Delhi Admin Notification System</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
