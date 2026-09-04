const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const chatCSS = `
    /* Chatbot Styles */
    .chatbot-toggle {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--accent);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(232, 114, 74, 0.4);
      cursor: pointer;
      z-index: 1000;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .chatbot-toggle:hover {
      transform: scale(1.1);
    }
    .chatbot-toggle svg {
      width: 28px;
      height: 28px;
    }

    .chatbot-window {
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      width: 350px;
      height: 500px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1rem;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .chatbot-window.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .chatbot-header {
      background: var(--accent);
      color: white;
      padding: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .chatbot-header-close {
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .chatbot-header-close:hover {
      opacity: 1;
    }

    .chatbot-messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .chat-msg {
      max-width: 85%;
      padding: 0.75rem 1rem;
      border-radius: 1rem;
      font-size: 0.9rem;
      line-height: 1.4;
      word-wrap: break-word;
    }
    .chat-msg.user {
      background: var(--border-light);
      color: var(--text);
      align-self: flex-end;
      border-bottom-right-radius: 0.25rem;
    }
    .chat-msg.bot {
      background: rgba(232, 114, 74, 0.1);
      border: 1px solid rgba(232, 114, 74, 0.2);
      color: var(--text);
      align-self: flex-start;
      border-bottom-left-radius: 0.25rem;
    }
    .chat-msg.loading {
      color: var(--text-muted);
      font-style: italic;
    }

    .chatbot-input {
      padding: 1rem;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 0.5rem;
      background: var(--bg);
    }
    .chatbot-input input {
      flex: 1;
      background: var(--bg-alt);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .chatbot-input input:focus {
      border-color: var(--accent);
    }
    .chatbot-input button {
      background: var(--accent);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .chatbot-input button:hover {
      background-color: #d1623d;
    }
    .chatbot-input button svg {
      width: 18px;
      height: 18px;
    }
`;

html = html.replace('</style>', chatCSS + '\n</style>');

const chatHTML = `
  <!-- Chatbot -->
  <div class="chatbot-toggle" id="chatToggle" aria-label="Open Chat">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  </div>
  
  <div class="chatbot-window" id="chatWindow">
    <div class="chatbot-header">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
        Factura Assistant
      </div>
      <div class="chatbot-header-close" id="chatClose">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    </div>
    <div class="chatbot-messages" id="chatMessages">
      <div class="chat-msg bot">Hi there! I'm the Factura AI assistant. How can I help you today?</div>
    </div>
    <form class="chatbot-input" id="chatForm">
      <input type="text" id="chatInput" placeholder="Ask about our features..." autocomplete="off" />
      <button type="submit" aria-label="Send">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </form>
  </div>
`;

html = html.replace('</body>', chatHTML + '\n</body>');

const chatJS = `
    // Chatbot Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    let isChatOpen = false;
    
    function toggleChat() {
      isChatOpen = !isChatOpen;
      if (isChatOpen) {
        chatWindow.classList.add('open');
        chatInput.focus();
      } else {
        chatWindow.classList.remove('open');
      }
    }
    
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);
    
    function appendMessage(text, sender) {
      const msgDiv = document.createElement('div');
      msgDiv.className = \`chat-msg \${sender}\`;
      msgDiv.textContent = text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return msgDiv;
    }
    
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      
      // User message
      appendMessage(text, 'user');
      chatInput.value = '';
      
      // Loading indicator
      const loadingMsg = appendMessage('Thinking...', 'bot loading');
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, sessionId: 'user-session' })
        });
        
        const data = await response.json();
        chatMessages.removeChild(loadingMsg);
        
        if (response.ok) {
          appendMessage(data.text, 'bot');
        } else {
          appendMessage('Sorry, I encountered an error. Please try again.', 'bot');
          console.error(data.error);
        }
      } catch (err) {
        chatMessages.removeChild(loadingMsg);
        appendMessage('Network error. Is the server running?', 'bot');
      }
    });
`;

html = html.replace('</script>', chatJS + '\n  </script>');

fs.writeFileSync('index.html', html);
console.log('patched chat');
