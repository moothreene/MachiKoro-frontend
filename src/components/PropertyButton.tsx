import { useEffect, useState } from 'react';
import { Properties, PropertiesLocalized } from '../data/Properties';
import { Button, Grid, Typography } from '@mui/material';
import { FaCoins } from 'react-icons/fa6';
import PropertyPopup from './PropertyPopup';
import OutsideClickHandler from 'react-outside-click-handler';

function PropertyButton({
  placement,
  amount,
  name,
  image,
  isDisabled,
  onClick,
}: {
  placement: string;
  amount: number;
  name: string;
  image: string;
  isDisabled: boolean;
  onClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  const rolls = Properties[name].dice.join(',');
  const color = Properties[name].color || 'black';
  const cost = Properties[name].cost || 0;
  const nameUpdated = PropertiesLocalized[name] || name;
  return (
    <Grid
      item
      xs={3}
      md={2}
      className={`property-button-${placement}`}
    >
      <Button
        variant='contained'
        onClick={()=>{setOpen(true)}}
        disabled={amount === 0}
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
          fontSize: 'inherit',
        }}
      >
        <Typography variant='body2' fontFamily={'Preahvihear'} fontSize={'inherit'} sx={{ padding: 0, margin: 0 }}>
          {nameUpdated}
        </Typography>
        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          sx={{ width: '100%' }}
        >
          <Grid item xs={4}>
            <Typography fontFamily={'Preahvihear'} fontSize={'inherit'} sx={{ padding: 0, margin: 0 }}>
              <FaCoins size={8} color="gold" />
              {' '}
              {cost}
            </Typography>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography fontFamily={'Preahvihear'} fontSize={'inherit'} sx={{ padding: 0, margin: 0 }}>
              x{amount}
            </Typography>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography fontFamily={'Preahvihear'} fontSize={'inherit'} sx={{ padding: 0, margin: 0 }}>
              {rolls != '0' ? '🎲' + rolls : '-'}
            </Typography>{' '}
          </Grid>
        </Grid>
      </Button>
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <PropertyPopup img={image} handleBuy={onClick} open={open} disabled = {isDisabled} placement = {placement}/>
      </OutsideClickHandler>
    </Grid>
  );
}

export default PropertyButton;
