import { Backdrop, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import  { TutorialContext } from './Game';

function Tutorial({setOpen,setClose}: {setOpen: () => void, setClose: () => void}) {
  const open = useContext(TutorialContext);
  return (
    <>
      <Button
        onClick={setOpen}
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        <Typography fontFamily={'Preahvihear'}>How to Play?</Typography>
      </Button>
      <Backdrop
        open={open}
        sx={{
          color: '#fff',
          zIndex: '100',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          position: 'fixed',
          maxHeight:'none',
          height:'100%',
        }}
        onClick={setClose}
      >
      </Backdrop>
    </>
  );
}

export default Tutorial;
