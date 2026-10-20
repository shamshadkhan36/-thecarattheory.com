import React, { useState } from 'react';

export const FloatingWidgets = ({ onOpenAppointment }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'concierge',
      text: 'Hello! I am your The Carat Theory Diamond Concierge. How may I assist you with lab-grown diamonds, custom ring sizing, or bespoke settings today?'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: 'Thank you for reaching out! A senior gemologist is reviewing your request. For immediate ring customization or odd size guidance (e.g. 6.5), you can also book a direct one-on-one consultation with our atelier.'
        }
      ]);
    }, 900);
  };

  return (
    <>
      {/* Rare Carat Floating Concierge Chat Bubble (Matching Screenshots 1 & 2) */}
      <div className="rare-floating-chat-container">
        {/* Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="rare-floating-chat-btn"
          aria-label="Open Diamond Concierge Chat"
          title="Chat with Diamond Concierge"
        >
          {/* White Speech Bubble Icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>

          {/* Green Online Status Dot (Matching Screenshot Bottom Right) */}
          <span className="rare-chat-online-dot" />
        </button>

        {/* Live Concierge Popout Card */}
        {isChatOpen && (
          <div className="rare-chat-popout">
            <div className="rare-chat-popout-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div className="rare-chat-avatar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600 }}>
                    The Carat Theory Concierge
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }} />
                    Senior Gemologist Online
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            <div className="rare-chat-messages-body">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '0.75rem'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background: m.sender === 'user' ? '#2563EB' : '#F1F5F9',
                      color: m.sender === 'user' ? '#FFFFFF' : '#1E293B',
                      fontSize: '0.85rem',
                      lineHeight: '1.5'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="rare-chat-input-row">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about diamonds, odd sizes, purity..."
                style={{
                  flex: 1,
                  padding: '0.55rem 0.75rem',
                  fontSize: '0.82rem',
                  border: '1px solid #CBD5E1',
                  borderRadius: '20px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#2563EB',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>

            <div style={{ padding: '0.5rem 0.85rem', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setIsChatOpen(false);
                  if (onOpenAppointment) onOpenAppointment();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Or Book a 1-on-1 Virtual Atelier Appointment &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
