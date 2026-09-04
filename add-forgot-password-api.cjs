const fs = require('fs');
let serverCode = fs.readFileSync('server.ts', 'utf8');

const apiCode = `
import crypto from 'crypto';

app.post('/api/v1/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetLink = \`https://\${req.get('host')}/reset-password?token=\${resetToken}\`;
    
    // In a production environment, you would send this link via SendGrid, Postmark, AWS SES, etc.
    // For now, we simulate the email sending process:
    console.log(\`[EMAIL SIMULATION] Sending password reset link to \${email}\`);
    console.log(\`[EMAIL SIMULATION] Reset Link: \${resetLink}\`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({ success: true, message: 'If an account exists with this email, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot Password API Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});
`;

// Insert before startServer();
serverCode = serverCode.replace('async function startServer()', apiCode + '\nasync function startServer()');
fs.writeFileSync('server.ts', serverCode);
console.log('Added API endpoint to server.ts');
