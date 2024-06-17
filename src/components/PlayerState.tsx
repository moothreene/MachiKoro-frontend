import { Box, Grid, Stack, Typography } from '@mui/material';
import { Cards } from './Types/GameTypes';
import PropertyButton from './PropertyButton';
import images from './Images';
import { FaCoins } from 'react-icons/fa6';
import Money from './Money';

function PlayerState({
  position,
  properties,
  money,
  money_to_earn,
}: {
  position: string;
  properties: Cards;
  money: number;
  money_to_earn: number;
}) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <legend>
        <Stack alignItems="center" alignContent={'center'} direction={'row'}>
          <Typography fontFamily={'Preahvihear'} fontSize={15} sx={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <FaCoins size={20} color="gold" /> {' '+money}
            {money_to_earn !== 0 &&
              ' ' + (money_to_earn > 0 ? '+' : '') + money_to_earn}
          </Typography>
          <Money size={15} amount={money} />
          {money_to_earn !== 0 && (
            <>
              <Typography variant='h6' color='white' fontFamily={'Preahvihear'} sx={{marginLeft:1, marginRight:1}}>+</Typography>
              <Money size={15} amount={money_to_earn} />
            </>
          )}
        </Stack>
      </legend>
      <Grid
        container
        columns={16}
        spacing={1}
        sx={{margin: 'auto' }}
      >
        {Object.entries(properties).map(([key, value]) => {
          if (value === 0) return <></>;
          return (
            <PropertyButton
              placement={`player_${position}`}
              key={`player_prop${key}`}
              amount={value}
              name={key}
              isDisabled={false}
              image={images[key]}
              onClick={() => {
                console.log('clicked');
              }}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default PlayerState;
