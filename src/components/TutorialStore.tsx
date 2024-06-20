import { Box, Grid, Typography } from '@mui/material';
import PropertyButton from './PropertyButton';
import images from './Images';
import { gameDataInitial } from '../data/GameData';

function TutorialStore() {
  return (
    <Grid
      container
      spacing={0.5}
      columns={12}
      sx={{ width: '100%', padding: 1, visibility: 'hidden', maxHeight: '50vh'}}
    >
      <Box sx={{position:'absolute', visibility:'visible', left:'30%', top:'40%', width:'40%'}}>
      <Typography fontFamily={'Preahvihear'} fontSize={'inherit'}  color={'white'} align='center'>
        In the middle of the screen, you can see the store. You can buy properties from here.
      </Typography>
      <Typography fontFamily={'Preahvihear'} fontSize={'inherit'}  color={'white'} fontWeight={600} align='center'>
      First to buy all 4 orange properties wins the game.
      </Typography>
      </Box>
      {Object.entries(gameDataInitial.store).map(([key, value]: any[]) => {
        return (
          <PropertyButton
            placement="store"
            key={key}
            amount={value}
            name={key}
            image={''}
            isDisabled={true}
            onClick={() => {}}
          />
        );
      })}
    </Grid>
  );
}

export default TutorialStore;