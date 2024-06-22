import { Backdrop, Box, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { TutorialContext } from './Game';
import TutorialColors from './TutorialColors';
import CustomTooltip from './CustomTooltip';
import TutorialProperty from './TutorialProperty';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TutorialWin from './TutorialWin';

function Tutorial({
  fontSize,
  setOpen,
  setClose,
  setNext,
  setPrev,
}: {
  fontSize: number;
  setOpen: () => void;
  setClose: () => void;
  setNext: () => void;
  setPrev: () => void;
}) {
  const tutorialStage = useContext(TutorialContext);
  return (
    <>
      <Button
        onClick={setOpen}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: tutorialStage > 0 ? 'none' : 'block',
        }}
      >
        <Typography fontFamily={'Preahvihear'}>How to Play?</Typography>
      </Button>
      <Backdrop
        open={tutorialStage > 0}
        sx={{
          color: '#fff',
          zIndex: '100',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          position: 'fixed',
          maxHeight: 'none',
          height: '100%',
        }}
        onClick={setClose}
      >
        <Button
          sx={{
            position: 'absolute',
            left: 0,
            top: '40%',
            color: 'white',
            zIndex: 200,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setPrev();
          }}
        >
          <ArrowBackIosNewIcon />
        </Button>
        <Button
          sx={{
            position: 'absolute',
            right: 0,
            top: '40%',
            color: 'white',
            zIndex: 200,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setNext();
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
        {tutorialStage === 1 && (
          <Typography
            fontFamily={'Preahvihear'}
            maxWidth={'60%'}
            align="center"
          >
            Hello and welcome to my Machi Koro game! This is a tutorial to help
            you better understand how to play the game. Click the right arrow to
            continue.
          </Typography>
        )}
        {tutorialStage === 2 && (
          <Typography
            fontFamily={'Preahvihear'}
            maxWidth={'60%'}
            align="center"
          >
            Gameboard is divided into 4 areas - Your properties, your opponent's
            properties, the store and action buttons
          </Typography>
        )}
        {tutorialStage === 5 && <TutorialProperty />}
        {tutorialStage === 6 && <TutorialColors />}
        {tutorialStage === 7 && <TutorialWin />}
      </Backdrop>
    </>
  );
}

export default Tutorial;
