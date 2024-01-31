import React from 'react';

function ViewMessage({ messages }){

  return (
    <div className="message-container cardshd ">
      <h3>Received Messages</h3>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewMessage;
