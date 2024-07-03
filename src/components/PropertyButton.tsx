import { useEffect, useState } from 'react';
import { Properties, PropertiesLocalized } from '../data/Properties';
import { Button, Grid, Typography } from '@mui/material';
import { FaCoins } from 'react-icons/fa6';
import PropertyPopup from './PropertyPopup';

function PropertyButton({
  placement,
  amount,
  name,
  image,
  isDisabled,
  highlighted,
  opaque,
  onClick,
}: {
  placement: string;
  amount: number;
  name: string;
  image: string;
  isDisabled: boolean;
  highlighted?: boolean;
  opaque: boolean;
  onClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rolls = Properties[name].dice.join(',');
  const color = Properties[name].color || 'black';
  const cost = Properties[name].cost || 0;
  const nameUpdated = PropertiesLocalized[name] || name;

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

  function handleClose() {
    setOpen(false);
  }

  if (placement === 'store' && name === 'city_hall') {
    return null;
  }

  return (
    <Grid
      item
      xs={3}
      md={2}
      className={`property-button ${placement}`}
      position={'relative'}
      overflow={'visible'}
    >
      <Button
        variant="contained"
        onClick={() => {
          setTimeout(() => setOpen(true));
        }}
        disabled={amount === 0}
        sx={{
          padding: 0.5,
          backgroundColor: color,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          '&:hover': {
            backgroundColor: color,
          },
          justifyContent: 'space-between',
          fontSize: 'inherit',
          opacity: isDisabled || opaque ? 0.6 : 1,
          transition: 'opacity 0.2s linear',
          boxShadow: highlighted ? '0 0 10px 5px gold' : 'none',
        }}
      >
        <Typography
          variant="body2"
          fontFamily={'Preahvihear'}
          fontSize={'inherit'}
          sx={{ padding: 0, margin: 0 }}
        >
          {nameUpdated}
        </Typography>
        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          sx={{ width: '100%' }}
        >
          <Grid item xs={4}>
            <Typography
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              sx={{ padding: 0, margin: 0 }}
            >
              <FaCoins size={8} color="gold" /> {cost}
            </Typography>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              sx={{ padding: 0, margin: 0 }}
            >
              x{amount}
            </Typography>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              sx={{ padding: 0, margin: 0 }}
            >
              {rolls !== '0' ? '🎲' + rolls : '-'}
            </Typography>{' '}
          </Grid>
        </Grid>
      </Button>
      <PropertyPopup
        img={image}
        handleBuy={onClick}
        open={open}
        disabled={isDisabled || opaque}
        placement={placement}
      />
    </Grid>
  );
}

export default PropertyButton;
