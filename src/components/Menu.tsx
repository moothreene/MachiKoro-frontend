import { useState } from 'react';
import { socket } from '../socket';
import { Box, Button, Container, Grid, Input, Typography } from '@mui/material';

function Menu({ roomId }: { roomId: string }) {
  const [id, setId] = useState<string>('');

  function connect() {
    socket.connect();
  }

  function host() {
    disconnect();
    connect();
    socket.emit('host');
  }

  function join() {
    disconnect();
    connect();
    socket.emit('join', id);
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <Box width={'40vw'} m={'150px auto'}>
      <Typography variant="h1" color={'white'} align="center" marginBottom={3}>
        Machi Koro
      </Typography>
      <Box width={'50%'} m={'auto'}>
        {!roomId && (
          <>
            <Grid item xs={12} m={1} marginBottom={3}>
              <Button variant="contained" fullWidth onClick={host}>
                Host
              </Button>
            </Grid>
            <Grid item xs={12} m={1}>
              <Button variant="contained" fullWidth onClick={join}>
                Join
              </Button>
              <Input
                fullWidth
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Grid>
          </>
        )}
        {roomId && (
          <>
            <Grid item xs={12} m={1} marginBottom={3.55}>
              <Typography variant="h6" align="center" m={1}>
                Room ID: {roomId}
              </Typography>
            </Grid>
            <Grid item xs={12} m={1}>
              <Button variant="contained" fullWidth onClick={disconnect}>
                Disconnect
              </Button>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Menu;
