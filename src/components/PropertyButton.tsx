import { useEffect, useState } from 'react';
import { Properties, PropertiesLocalized } from '../data/Properties';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { FaCoins } from 'react-icons/fa6';

function PropertyButton({
  amount,
  name,
  image,
  isDisabled,
  onClick,
}: {
  amount: number;
  name: string;
  image: string;
  isDisabled: boolean;
  onClick: () => void;
}) {
  const [shiftPressed, setShiftPressed] = useState(false);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Shift') {
      setShiftPressed(true);
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'Shift') {
      setShiftPressed(false);
    }
  }

  useEffect(() => {
    document.addEventListener(
      'keydown',
      handleKeyDown,
      true
    );
    document.addEventListener(
      'keyup',
      handleKeyUp,
      true
    );
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  const rolls = Properties[name].dice.join(',');
  const color = Properties[name].color || 'black';
  const cost = Properties[name].cost || 0;
  const nameUpdated = PropertiesLocalized[name] || name;
  return (
    <Grid
      item
      xs={2}
      className={'property-button' + (shiftPressed ? ' alt' : '')}
    >
      <Button
        variant='contained'
        onClick={onClick}
        disabled={amount === 0 || isDisabled}
        sx={{
          padding: .5,
          backgroundColor: color,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          '&:hover': {
            backgroundColor: color,
          },
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='body2' fontFamily={'Preahvihear'} sx={{ padding: 0, margin: 0 }}>
          {nameUpdated}
        </Typography>
        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          sx={{ width: '100%' }}
        >
          <Grid item xs={4}>
            <Typography fontFamily={'Preahvihear'} fontSize={12} sx={{ padding: 0, margin: 0 }}>
              <FaCoins size={8} color="gold" />
              {' '}
              {cost}
            </Typography>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography fontFamily={'Preahvihear'} fontSize={12} sx={{ padding: 0, margin: 0 }}>
              x{amount}
            </Typography>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography fontFamily={'Preahvihear'} fontSize={12} sx={{ padding: 0, margin: 0 }}>
              {rolls != '0' ? '🎲' + rolls : '-'}
            </Typography>{' '}
          </Grid>
        </Grid>
      </Button>
      <img src={image} />
    </Grid>
  );
}

export default PropertyButton;
