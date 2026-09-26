const nodemailer = require("nodemailer");

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// Welcome email to new member
const sendWelcomeEmail = async ({ name, email, interest }) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to CodeFlow! 🚀",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:auto;background:#0a0a0f;color:#e2e8f0;border-radius:16px;padding:40px;border:1px solid #1e1e2e">
        <div style="text-align:center;margin-bottom:32px">
          <div style="display:inline-flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#06b6d4);border-radius:10px;display:inline-block"></div>
            <span style="font-size:22px;font-weight:900;color:#fff">Code<span style="background:linear-gradient(135deg,#6366f1,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Flow</span></span>
          </div>
        </div>
        <h1 style="color:#fff;font-size:26px;margin-bottom:8px">Welcome, ${name}! 🎉</h1>
        <p style="color:#94a3b8;line-height:1.7">You've successfully joined the <strong style="color:#6366f1">CodeFlow Community</strong>. We're thrilled to have you!</p>
        <div style="background:#16161f;border-radius:12px;padding:20px;margin:24px 0;border:1px solid #1e1e2e">
          <p style="margin:0;color:#94a3b8;font-size:14px">Your interest: <strong style="color:#fff">${interest}</strong></p>
        </div>
        <p style="color:#94a3b8;line-height:1.7">Here's what to do next:</p>
        <ul style="color:#94a3b8;line-height:2">
          <li>Join our <strong style="color:#6366f1">Discord server</strong> — link in your welcome kit</li>
          <li>Check out upcoming <strong style="color:#6366f1">events</strong> on codeflow.dev/events</li>
          <li>Browse open-source <strong style="color:#6366f1">projects</strong> to contribute</li>
        </ul>
        <div style="text-align:center;margin-top:32px">
          <a href="${process.env.CLIENT_URL || "http://localhost:5173"}" style="background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">Visit CodeFlow →</a>
        </div>
        <p style="color:#475569;font-size:12px;text-align:center;margin-top:32px">© 2026 CodeFlow Community • Built with ❤️</p>
      </div>
    `,
  });
};

// Notification email to admin when someone joins
const sendAdminNotification = async ({ name, email, college, interest }) => {
  if (!process.env.EMAIL_USER) return;
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `[CodeFlow] New member joined: ${name}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:auto">
        <h2>New CodeFlow Member 🚀</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;color:#666">Name:</td><td style="padding:8px;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px;color:#666">Email:</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;color:#666">College:</td><td style="padding:8px">${college || "—"}</td></tr>
          <tr><td style="padding:8px;color:#666">Interest:</td><td style="padding:8px">${interest}</td></tr>
        </table>
      </div>
    `,
  });
};

// Contact form acknowledgement
const sendContactAck = async ({ name, email }) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "We received your message — CodeFlow",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:auto;color:#1e293b">
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out to CodeFlow! We've received your message and will get back to you within 24–48 hours.</p>
        <p style="color:#64748b;font-size:13px">— CodeFlow Team</p>
      </div>
    `,
  });
};

module.exports = { sendWelcomeEmail, sendAdminNotification, sendContactAck };
