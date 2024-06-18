import { useState } from 'react';
import { socket } from '../socket';

export function ConnectionManager() {
  const [id, setId] = useState<string>('');

  function connect() {
    socket.connect();
  }

  function host() {
    connect();
    socket.emit('host');
  }

  function join() {
    connect();
    socket.emit('join', id);
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={host}>Host</button>
      <button onClick={join}>Join</button>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
