import React, { useState } from 'react';
import './TeacherMessages.css';
import SendMessage from '../components/TeacherComponent/SendMessage';
import ViewMessage from '../components/TeacherComponent/ViewMessage';

const TeacherMessages = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);

  const handleSendMessage = (message) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="teacher-messages-container">
      <SendMessage onSendMessage={handleSendMessage} />
      <ViewMessage messages={receivedMessages} />
    </div>
  );
};

export default TeacherMessages;
