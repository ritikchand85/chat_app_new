import React, { useState } from 'react';
import After from './after.jsx';

export default function Front(props) {
  const socket=props.socket;
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  function handleEnter(e) {
    e.preventDefault();
    const Name = document.querySelector('[id="name"]').value;
    const Id = document.querySelector('[id="id"]').value;
    setName(Name);
    setId(Id);
    setHasSearched(true);
    socket.emit('user-joined', Name); // Emit user-joined event
  }

  return (
    <div className="outer">
      <div className="front-box">
        <h2>Welcome to the app</h2>
        <input className="input" type="text" id="name" placeholder="Enter your name" />
        <input className="input" type="text" id="id" placeholder="Enter your id" />
        <button className="btn" type="submit" onClick={handleEnter}>
          Enter
        </button>
      </div>
      {hasSearched && <After name={name} id={id} socket={socket} />}
    </div>
  );
}
