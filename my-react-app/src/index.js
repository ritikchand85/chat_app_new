import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import io from 'socket.io-client';
const ENDPOINT=process.env.REACT_APP_API_URL;


const socket = io(ENDPOINT,{ transports: ['websocket'] });

ReactDOM.render(
  <>
    <App socket={socket} />
  </>,
  document.getElementById('root')
);
