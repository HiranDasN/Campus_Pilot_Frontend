import React, { useState } from 'react';

function SendMessage({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-container cardshd">
      <h3>Send Message</h3>
      <textarea
        rows="4"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default SendMessage;
