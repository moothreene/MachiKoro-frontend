import { Button, Container, Typography } from '@mui/material';
import ConfettiExplosion from 'react-confetti-explosion';

function WinLooseScreen({ win, reset, setSingle }: { win: boolean; reset: () => void, setSingle: (value: React.SetStateAction<boolean>) => void}) {
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
      <Button variant="contained" sx={{ marginTop: 10 }} onClick={()=>{reset();window.localStorage.setItem("roomId",''); setSingle(false)}}>
        Go to Menu
      </Button>
    </Container>
  );
}

export default WinLooseScreen;
