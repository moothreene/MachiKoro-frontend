import { Button, Container, Typography } from '@mui/material';
import ConfettiExplosion from 'react-confetti-explosion';

function WinLooseScreen({ win, reset }: { win: boolean; reset: () => void }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
      }}
    >
      <Typography fontFamily="Preahvihear" variant="h2" color={'white'}>
        You {win ? 'Won!' : 'Lost'}
      </Typography>
      {win && (
        <ConfettiExplosion
          force={2}
          duration={5000}
          particleCount={350}
          width={2000}
        />
      )}
      <Button variant="contained" sx={{ marginTop: 10 }} onClick={()=>{reset();window.localStorage.setItem("roomId",'');}}>
        Go to Menu
      </Button>
    </Container>
  );
}

export default WinLooseScreen;
