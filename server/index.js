import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verification route
app.get('/health', (req, res) => {
  res.json({ status: 'SYSTEM_OPTIMAL', timestamp: new Date() });
});

// Mail route
app.post('/api/send-email', async (req, res) => {
  const { name, email, type, message, date, time } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: `[SYSTEM_ENQUIRY] New Submission from ${name}`,
    text: `
      NEW SYSTEM TRANSMISSION RECEIVED
      -------------------------------
      SOURCE: ${name} (${email})
      TYPE: ${type || 'BOOKING'}
      
      MESSAGE_LOG:
      ${message || 'N/A'}
      
      ${date ? `RESERVATION_DATE: ${date}` : ''}
      ${time ? `RESERVATION_TIME: ${time}` : ''}
      
      --- END OF LINE ---
    `,
    html: `
      <div style="background: #000; color: #ff2d2d; padding: 2rem; font-family: monospace; border: 1px solid #ff2d2d;">
        <h2 style="border-bottom: 1px solid #ff2d2d; padding-bottom: 1rem;">SYSTEM_TRANSMISSION_INBOUND</h2>
        <p><strong>SOURCE:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>TYPE:</strong> ${type || 'BOOKING'}</p>
        
        <div style="background: #111; padding: 1.5rem; border: 1px solid rgba(255,45,45,0.2); margin: 2rem 0;">
          <p style="color: #f5f5f5;">${message || 'No additional message log.'}</p>
        </div>

        ${date ? `<p><strong>DATE:</strong> ${date}</p>` : ''}
        ${time ? `<p><strong>TIME:</strong> ${time}</p>` : ''}
        
        <p style="opacity: 0.5; font-size: 0.7rem; margin-top: 3rem;">AUTHENTICATED_BY_PORTFOLIO_V2.0</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[SUCCESS] Email sent from ${email}`);
    res.status(200).json({ success: true, message: 'TRANSMISSION_SUCCESSFUL' });
  } catch (error) {
    console.error(`[ERROR] Failed to send email:`, error);
    res.status(500).json({ success: false, message: 'TRANSMISSION_FAILED', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[SYSTEM] Backend server running on port ${PORT}`);
});
