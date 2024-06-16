import { Box, Grid, Stack, Typography } from '@mui/material';
import { Cards } from './Types/GameTypes';
import PropertyButton from './PropertyButton';
import images from './Images';
import { FaCoins } from 'react-icons/fa6';

function PlayerState({
  properties,
  money,
  money_to_earn,
}: {
  properties: Cards;
  money: number;
  money_to_earn: number;
}) {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
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
        </Stack>
      </legend>
      <Grid
        container
        columns={16}
        spacing={1}
        sx={{ width: '90%', margin: 'auto' }}
      >
        {Object.entries(properties).map(([key, value]) => {
          if (value === 0) return <></>;
          return (
            <PropertyButton
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
