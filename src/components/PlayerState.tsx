import { Box, Grid, Stack, Typography } from '@mui/material';
import { Cards } from './Types/GameTypes';
import PropertyButton from './PropertyButton';
import images from './Images';
import Money from './Money';
import { Properties } from '../data/Properties';

function PlayerState({
  position,
  properties,
  fontSize,
  money,
  money_to_earn,
}: {
  position: string;
  properties: Cards;
  fontSize: number;
  money: number;
  money_to_earn: number;
}) {

  function compareDices(a: [keyof Cards, number], b: [keyof Cards, number]) {
    if (Properties[a[0]].dice[0] - Properties[b[0]].dice[0] === 0){
      return Properties[a[0]].dice.length - Properties[b[0]].dice.length;
    }
    return Properties[a[0]].dice[0] - Properties[b[0]].dice[0];
  }

  const propertiesEntries = Object.entries(properties) as [keyof Cards, number][];
  const propertiesSorted = propertiesEntries.sort(compareDices)
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
          <Money size={fontSize} amount={money} />
          {money_to_earn !== 0 && (
            <>
              <Typography variant='h6' color='white' fontFamily={'Preahvihear'} sx={{marginLeft:1, marginRight:1}}>+</Typography>
              <Money size={fontSize} amount={money_to_earn} />
            </>
          )}
        </Stack>
      </legend>
      <Grid container columns={16} spacing={1} sx={{ margin: 'auto' }}>
        {propertiesSorted.map(([key, value]) => {
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
              }}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default PlayerState;
