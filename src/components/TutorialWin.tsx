import { Box, List, ListItem, Typography } from '@mui/material';

function TutorialWin() {
  return (
    <Box sx={{}}>
      <Typography fontFamily={'Preahvihear'}>Order of Activation:</Typography>
      <Typography fontFamily={'Preahvihear'}>
        <Typography
          fontFamily={'Preahvihear'}
          fontWeight={'600'}
          display={'inline'}
          color={'blue'}
        >
          Blue
        </Typography>
        {'➡️'}
        <Typography
          fontFamily={'Preahvihear'}
          fontWeight={'600'}
          display={'inline'}
          color={'green'}
        >
          Green
        </Typography>
        {'➡️'}
        <Typography
          fontFamily={'Preahvihear'}
          fontWeight={'600'}
          display={'inline'}
          color={'red'}
        >
          Red
        </Typography>
        {'➡️'}
        <Typography
          fontFamily={'Preahvihear'}
          fontWeight={'600'}
          display={'inline'}
          color={'purple'}
        >
          Purple
        </Typography>
      </Typography>
      <Typography fontFamily={'Preahvihear'}>
        Get All 4{' '}
        <Typography display="inline" fontFamily={'Preahvihear'} color="orange">
          Orange
        </Typography>{' '}
        Properties to Win!
      </Typography>
      <Typography fontFamily={'Preahvihear'}>
        Good Luck!
      </Typography>
    </Box>
  );
}

export default TutorialWin;
