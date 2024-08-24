import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import io from 'socket.io-client';
const ENDPOINT="http://localhost:8000/";

const socket = io(ENDPOINT,{ transports: ['websocket'] });

ReactDOM.render(
  <>
    <App socket={socket} />
  </>,
  document.getElementById('root')
);
