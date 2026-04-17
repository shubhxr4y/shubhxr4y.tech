import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Verification route
app.get('/health', (req, res) => {
  res.json({ status: 'SYSTEM_OPTIMAL', timestamp: new Date() });
});

// Mail route
app.post('/api/send-email', async (req, res) => {
  const { name, email, type, message, date, time } = req.body;

  // IMPORTANT: Resend requires a verified domain to send FROM anyone else.
  // Using onboarding@resend.dev as the default sender for the free tier.
  const fromEmail = 'onboarding@resend.dev'; 
  const toEmail = process.env.EMAIL_RECEIVER || 'Xports.34@gmail.com';

  try {
    // 1. Send notification to YOU (the owner)
    const { data: ownerData, error: ownerError } = await resend.emails.send({
      from: `Portfolio System <${fromEmail}>`,
      to: [toEmail],
      subject: `[SYSTEM_ENQUIRY] New Submission from ${name}`,
      replyTo: email,
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
          
          <p style="opacity: 0.5; font-size: 0.7rem; margin-top: 3rem;">AUTHENTICATED_BY_PORTFOLIO_V2.0 via RESEND</p>
        </div>
      `
    });

    if (ownerError) throw ownerError;

    // 2. Send 'Thank You' email to the CLIENT
    const { data: clientData, error: clientError } = await resend.emails.send({
      from: `Engineer's Workshop <${fromEmail}>`,
      to: [email],
      subject: `SYNC_CONFIRMED: Thank you for reaching out, ${name}`,
      html: `
        <div style="background: #000; color: #f5f5f5; padding: 2rem; font-family: monospace; border: 1px solid #f5f5f5;">
          <h2 style="color: #ff2d2d; border-bottom: 1px solid #ff2d2d; padding-bottom: 1rem;">TRANSMISSION_RECEIVED</h2>
          <p>Hello ${name},</p>
          <p>Your data sync with the <strong>Engineer's Workshop</strong> was successful.</p>
          
          <div style="border-left: 3px solid #ff2d2d; padding-left: 1rem; margin: 2rem 0; color: #ccc;">
            "We have received your enquiry regarding <strong>${type || 'General System Sync'}</strong>. Our neural agents are reviewing your request, and we will contact you shortly via this channel."
          </div>

          <p>Stay tuned for synchronization. // END_OF_LINE</p>
          
          <div style="margin-top: 4rem; font-size: 0.7rem; opacity: 0.4;">
            <p>ENGINEER_WORKSHOP_PORTFOLIO // SECURE_LINE_01</p>
          </div>
        </div>
      `
    });

    if (clientError) {
      console.warn(`[WARNING] Owner email sent, but client 'Thank You' email failed:`, clientError.message);
    }

    console.log(`[SUCCESS] System transmissions complete. IDs: ${ownerData.id}, ${clientData?.id || 'N/A'}`);
    res.status(200).json({ success: true, message: 'ALL_TRANSMISSIONS_SUCCESSFUL' });
  } catch (err) {
    console.error(`[ERROR] Resend failed:`, err);
    res.status(500).json({ success: false, message: 'TRANSMISSION_FAILED', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[SYSTEM] Backend server running on port ${PORT}`);
});
