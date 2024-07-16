import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function After(props) {
  const { name, id, socket } = props;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  var audio=new Audio('notify.mp3');

  useEffect(() => {
    const newUserJoinedHandler = (data) => {
      appendMessage(data.message, 'left');
    };

    const messageReceivedHandler = (data) => {
      appendMessage(data.message, 'left');
     
    };

    socket.on('new-user-joined', newUserJoinedHandler);
    socket.on('message-received', messageReceivedHandler);

    return () => {
      socket.off('new-user-joined', newUserJoinedHandler);
      socket.off('message-received', messageReceivedHandler);
    };
  }, [socket]);

  const appendMessage = (msg, position) => {
    setMessages((prevMessages) => [...prevMessages, { message: msg, position }]);
  };

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      const message = inputValue.trim();
      setMessages((prevMessages) => [...prevMessages, { message: `You: ${message}`, position: 'right' }]);
      socket.emit('message', message);
      setInputValue('');

    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <ScrollToBottom className="after">
        {messages.map((msg, index) => (
          <div className={`message ${msg.position}`} key={index}>
            <h2>{msg.message}</h2>
          </div>
        ))}
      </ScrollToBottom>
      <div className="message-box">
        <input
          type="text"
          className="input-2"
          placeholder="Enter your message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage} />
      </div>
    </>
  );
}
