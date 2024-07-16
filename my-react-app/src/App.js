import React from 'react';
import Front from './front.jsx';

export default function App(props) {
  const socket=props.socket;
  return (
    <>
      <Front socket={socket} />
    </>
  );
}
