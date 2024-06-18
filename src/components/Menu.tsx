import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

function Menu({ roomId }: { roomId: string }) {
  const [id, setId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [roomDoesNotExist, setRoomDoesNotExist] = useState(false);
  const [hostInProcess, setHostInProcess] = useState(false);

  useEffect(() => {
    function onRoomDoesNotExist() {
      setRoomDoesNotExist(true);
    }

    function onHostError() {
      setHostInProcess(false);
    }

    socket.on('invalidRoom', onRoomDoesNotExist);

    return () => {
      socket.off('invalidRoom', onRoomDoesNotExist);
    };
  });

  function connect() {
    socket.connect();
  }

  function host() {
    setHostInProcess(true);
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
    <Box
      width={'fit-content'}
      m={'150px auto'}
      sx={{ userSelect: 'none' }}
      className="game-menu"
    >
      <Typography variant="h1" color={'white'} align="center" marginBottom={3}>
        Machi Koro
      </Typography>
      <Box width={'50%'} m={'auto'}>
        {!roomId && (
          <>
            <Grid item xs={12} m={1} marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                disabled={hostInProcess}
                onClick={host}
              >
                <Typography variant="h6" fontFamily={'Preahvihear'}>
                  Host
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} m={1}>
              <Button
                variant="contained"
                disabled={hostInProcess}
                fullWidth
                onClick={
                  () => {
                    setOpen(!open);
                  } /*join*/
                }
                sx={{ fontFamily: 'Preahvihear' }}
              >
                <Typography variant="h6" fontFamily={'Preahvihear'}>
                  Join
                </Typography>
              </Button>
              {open && (
                <>
                  <TextField
                    error={roomDoesNotExist}
                    size="small"
                    fullWidth
                    type="text"
                    margin="dense"
                    inputProps={{
                      style: { textAlign: 'center', fontFamily: 'Preahvihear' },
                    }}
                    sx={{ boxSizing: 'border-box' }}
                    focused
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={hostInProcess}
                    onClick={join}
                    sx={{ fontFamily: 'Preahvihear' }}
                  >
                    <Typography variant="h6" fontFamily={'Preahvihear'}>
                      Confirm
                    </Typography>
                  </Button>
                </>
              )}
            </Grid>
          </>
        )}
        {roomId && (
          <>
            <Grid
              item
              xs={12}
              m={1}
              marginBottom={3.55}
              sx={{ textAlign: 'center' }}
            >
              <Typography
                display={'inline'}
                variant="h5"
                align="center"
                m={1}
                fontFamily={'Preahvihear'}
                fontWeight={400}
                color={'white'}
              >
                Room ID:
              </Typography>
              <Typography
                variant="h5"
                display={'inline'}
                sx={{ userSelect: 'all' }}
                fontFamily={'Preahvihear'}
                fontWeight={600}
                color={'white'}
              >
                {roomId}
              </Typography>
            </Grid>
            <Grid item xs={12} m={1}>
              <Button
                variant="contained"
                fullWidth
                onClick={disconnect}
                sx={{ fontFamily: 'Preahvihear' }}
              >
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
