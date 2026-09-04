import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let ai: GoogleGenAI | null = null;
function getAI() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is required');
    }
    ai = new GoogleGenAI({ 
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// In-memory chat store for simplicity (in a real app, use a DB)
// Note: Since this is just a single user preview, a global map is fine for now, 
// keyed by a simple session ID or just using a single global chat.
const chats: Record<string, any> = {};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;
    const aiClient = getAI();
    
    if (!chats[sessionId]) {
      chats[sessionId] = aiClient.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction: 'You are the official AI assistant for Factura. You help users understand how Factura extracts data from invoices in any language and integrates with their ERPs. Keep answers concise, helpful, and professional.',
        }
      });
    }
    
    const chat = chats[sessionId];
    const response = await chat.sendMessage({ message });
    
    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred' });
  }
});


import crypto from 'crypto';

app.post('/api/v1/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetLink = `https://${req.get('host')}/reset-password?token=${resetToken}`;
    
    // In a production environment, you would send this link via SendGrid, Postmark, AWS SES, etc.
    // For now, we simulate the email sending process:
    console.log(`[EMAIL SIMULATION] Sending password reset link to ${email}`);
    console.log(`[EMAIL SIMULATION] Reset Link: ${resetLink}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({ success: true, message: 'If an account exists with this email, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot Password API Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
