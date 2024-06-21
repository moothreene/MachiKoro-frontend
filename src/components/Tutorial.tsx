import { Backdrop, Box, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { TutorialContext } from './Game';
import TutorialColors from './TutorialColors';
import CustomTooltip from './CustomTooltip';

function Tutorial({
  fontSize,
  setOpen,
  setClose,
}: {
  fontSize: number;
  setOpen: () => void;
  setClose: () => void;
}) {
  const open = useContext(TutorialContext);
  const [tutorialColors, setTutorialColors] = useState(false);
  return (
    <>
      <Button
        onClick={setOpen}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: open ? 'none' : 'block',
        }}
      >
        <Typography fontFamily={'Preahvihear'}>How to Play?</Typography>
      </Button>

      <CustomTooltip
        open={open}
        maxWidth="none"
        interactive
        arrow={false}
        title={
          <Typography
            fontFamily={'Preahvihear'}
            fontSize={'inherit'}
            onClick={() => setTutorialColors(true)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography
              display={'inline'}
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              fontWeight={'600'}
            >
              Click
            </Typography>{' '}
            to see Colors Guide
          </Typography>
        }
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: '50%',
            display: open ? 'block' : 'none',
            zIndex: 200,
          }}
        ></Box>
      </CustomTooltip>

      <TutorialColors
        open={tutorialColors}
        fontSize={fontSize}
        setClose={() => setTutorialColors(false)}
      />

      <Backdrop
        open={open}
        sx={{
          color: '#fff',
          zIndex: '100',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          position: 'fixed',
          maxHeight: 'none',
          height: '100%',
        }}
        onClick={setClose}
      ></Backdrop>
    </>
  );
}

export default Tutorial;
