import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import io from 'socket.io-client';
const ENDPOINT="https://chat-app-new-a7tz.onrender.com/";

const socket = io(ENDPOINT,{ transports: ['websocket'] });

ReactDOM.render(
  <>
    <App socket={socket} />
  </>,
  document.getElementById('root')
);
