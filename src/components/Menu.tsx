import { useEffect, useState } from 'react';
import { socket } from '../socket';
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  Link,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { gameDataInitial } from '../data/GameData';
import { FaGithub } from 'react-icons/fa6';
import { IconContext } from 'react-icons';

function Menu({
  roomId,
  setSinglePlayer,
}: {
  roomId: string;
  setSinglePlayer: (singlePlayer: boolean) => void;
}) {
  const [id, setId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [roomDoesNotExist, setRoomDoesNotExist] = useState(false);
  const [roomFull, setRoomFull] = useState(false);
  const [hostInProcess, setHostInProcess] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const errorLabel = roomDoesNotExist
    ? 'Room does not exist'
    : roomFull
    ? 'Room is full'
    : '';
  const [roomIdPersist, setRoomIdPersist] = useState('');

  useEffect(() => {
    setRoomIdPersist(window.localStorage.getItem('roomId') || '');
  }, []);

  useEffect(() => {
    if (roomIdPersist !== '') {
      disconnect();
      connect();
      socket.emit('join', roomIdPersist);
    }
  }, [roomIdPersist]);

  useEffect(() => {
    if (roomId !== '') {
      window.localStorage.setItem('roomId', roomId);
    }
  }, [roomId]);

  const handleTooltipClose = () => {
    setTooltip(false);
  };

  const handleTooltipOpen = () => {
    setTooltip(true);
  };

  useEffect(() => {
    function onRoomDoesNotExist() {
      setRoomDoesNotExist(true);
    }

    function onRoomFull() {
      setRoomFull(true);
    }

    function onHostError() {
      setHostInProcess(false);
    }

    socket.on('invalidRoom', onRoomDoesNotExist);
    socket.on('host_error', onHostError);
    socket.on('roomFull', onRoomFull);

    return () => {
      socket.off('invalidRoom', onRoomDoesNotExist);
      socket.off('host_error', onHostError);
      socket.off('roomFull', onRoomFull);
    };
  }, []);

  function connect() {
    socket.connect();
  }

  function host() {
    disconnect();
    setHostInProcess(true);
    connect();
    socket.emit('host', gameDataInitial);
  }

  function join() {
    disconnect();
    connect();
    socket.emit('join', id);
  }

  function disconnect() {
    setHostInProcess(false);
    socket.disconnect();
  }

  return (
    <>
      <Box
        width={'fit-content'}
        m={'100px auto'}
        sx={{ userSelect: 'none' }}
        className="game-menu"
      >
        <Box sx={{ position: 'relative' }}>
          <Typography
            variant="h1"
            color={'white'}
            align="center"
            marginBottom={0}
            sx={{ WebkitTextStroke: '2px black', textShadow: '3px 3px 0 #000' }}
          >
            Machi Koro
          </Typography>
        </Box>
        <Grow in={true} mountOnEnter unmountOnExit timeout={1000}>
          <Box sx={{ position: 'relative', width:'75%', margin:'auto' }}>
            <Typography
              variant="h2"
              color={'white'}
              align="center"
              marginBottom={3}
              sx={{
                WebkitTextStroke: '2px black',
                textShadow: '2px 2px 0 #000',
                transform:'rotate(-7deg)',
              }}
            >
              TEL AVIV
            </Typography>
          </Box>
        </Grow>

        <Box width={'55%'} m={'auto'}>
          {!roomId && (
            <>
              <Grid item xs={12} m={1} marginBottom={3}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={hostInProcess}
                  onClick={() => setSinglePlayer(true)}
                >
                  <Typography variant="h6" fontFamily={'Preahvihear'}>
                    Single Player
                  </Typography>
                </Button>
              </Grid>
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
                  onClick={() => {
                    setOpen(!open);
                  }}
                  sx={{ fontFamily: 'Preahvihear' }}
                >
                  <Typography variant="h6" fontFamily={'Preahvihear'}>
                    Join
                  </Typography>
                </Button>
                <TextField
                  error={roomDoesNotExist || roomFull}
                  label={errorLabel}
                  size="small"
                  fullWidth
                  type="text"
                  margin="dense"
                  inputProps={{
                    style: { textAlign: 'center', fontFamily: 'Preahvihear' },
                  }}
                  sx={{
                    boxSizing: 'border-box',
                    visibility: open ? 'visible' : 'hidden',
                    opacity: open ? 1 : 0,
                    transition: 'all .5s ease',
                  }}
                  focused
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  disabled={hostInProcess || !open}
                  onClick={join}
                  sx={{
                    fontFamily: 'Preahvihear',
                    visibility: open ? 'visible' : 'hidden',
                    opacity: open ? 1 : 0,
                    transition: 'all .5s ease',
                  }}
                >
                  <Typography variant="h6" fontFamily={'Preahvihear'}>
                    Confirm
                  </Typography>
                </Button>
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
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <Tooltip
                    placement="right"
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={tooltip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Copied!"
                  >
                    <Typography
                      variant="h5"
                      display={'inline'}
                      fontFamily={'Preahvihear'}
                      fontWeight={600}
                      color={'white'}
                      onClick={() => {
                        handleTooltipOpen();
                        navigator.clipboard.writeText(roomId);
                        setTimeout(handleTooltipClose, 1000);
                      }}
                    >
                      {roomId}
                    </Typography>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12} m={1}>
                <Button variant="contained" fullWidth onClick={disconnect}>
                  <Typography variant="h6" fontFamily={'Preahvihear'}>
                    Disconnect
                  </Typography>
                </Button>
              </Grid>
            </>
          )}
        </Box>
      </Box>
      <Box
        width={'50px'}
        height={'50px'}
        marginLeft={'auto'}
        marginRight={'auto'}
        left={'0'}
        right={'0'}
        position={'absolute'}
        bottom={'5%'}
        className="game-menu"
        sx={{
          backgroundColor: 'rgba(0,0,0)',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '5px',
        }}
      >
        <Link href="https://github.com/moothreene/MachiKoro-frontend">
          <IconContext.Provider value={{ color: 'white' }}>
            <FaGithub size={50} />
          </IconContext.Provider>
        </Link>
      </Box>
    </>
  );
}

export default Menu;
