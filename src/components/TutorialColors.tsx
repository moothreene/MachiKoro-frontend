import { Box, List, ListItem, Typography } from '@mui/material';

function TutorialColors() {
  return (
    <Box sx={{}}>
      <List
        sx={{ zIndex: 100, maxWidth: '80%', margin: 'auto' }}
        disablePadding
        dense
      >
        <ListItem>
          <Typography fontFamily={'Preahvihear'}>
            <Typography
              fontFamily={'Preahvihear'}
              fontWeight={'600'}
              display={'inline'}
              color={'blue'}
            >
              Blue
            </Typography>{' '}
            Activates on anyone's turn
          </Typography>
        </ListItem>
        <ListItem>
          <Typography fontFamily={'Preahvihear'}>
            <Typography
              fontFamily={'Preahvihear'}
              fontWeight={'600'}
              display={'inline'}
              color={'green'}
            >
              Green
            </Typography>{' '}
            Activates on your turn only
          </Typography>
        </ListItem>
        <ListItem>
          <Typography fontFamily={'Preahvihear'}>
            <Typography
              fontFamily={'Preahvihear'}
              fontWeight={'600'}
              display={'inline'}
              color={'red'}
            >
              Red
            </Typography>{' '}
            Activates on others' turn only
          </Typography>
        </ListItem>
        <ListItem>
          <Typography fontFamily={'Preahvihear'}>
            <Typography
              fontFamily={'Preahvihear'}
              fontWeight={'600'}
              display={'inline'}
              color={'purple'}
            >
              Purple
            </Typography>{' '}
            Activates on your turn only
            <Typography fontFamily={'Preahvihear'}>
              Can't buy more than 1 of a kind
            </Typography>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography fontFamily={'Preahvihear'}>
            <Typography
              fontFamily={'Preahvihear'}
              fontWeight={'600'}
              display={'inline'}
              color={'orange'}
            >
              Orange
            </Typography>{' '}
            Can't activate but provides strong bonuses
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
}

export default TutorialColors;
