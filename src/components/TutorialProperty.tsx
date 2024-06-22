import { Button, Grid, Typography } from '@mui/material';
import { FaCoins } from 'react-icons/fa6';
import CustomTooltip from './CustomTooltip';

function TutorialProperty() {
  return (
    <Button
      variant="contained"
      onClick={() => {}}
      sx={{
        padding: 0.2,
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        width: '160px',
        height: '50px',
        '&:hover': {
          backgroundColor: 'blue',
        },
        justifyContent: 'space-between',
        fontSize: 'inherit',
        pointerEvents: 'none',
      }}
    >
      <CustomTooltip
        open
        title={
          <Typography
            variant="body2"
            fontFamily={'Preahvihear'}
            fontSize={'inherit'}
            sx={{ padding: 0, margin: 0 }}
          >
            Property Name
          </Typography>
        }
        maxWidth="none"
        zIndex={100}
        placement="top"
      >
        <Typography
          variant="body2"
          fontFamily={'Preahvihear'}
          fontSize={'inherit'}
          sx={{ padding: 0, margin: 0 }}
        >
          Ranch
        </Typography>
      </CustomTooltip>
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        sx={{ width: '100%' }}
      >
        <CustomTooltip
          open
          title={
            <Typography
              variant="body2"
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              sx={{ padding: 0, margin: 0 }}
            >
              Property cost
            </Typography>
          }
          maxWidth="80px"
          zIndex={100}
          placement="left"
        >
          <Grid item xs={4}>
            <Typography
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              align="left"
              sx={{ padding: 0, margin: 0, marginLeft: 1 }}
            >
              <FaCoins size={8} color="gold" /> {1}
            </Typography>{' '}
          </Grid>
        </CustomTooltip>
        <CustomTooltip
          open
          title={
            <Typography
              variant="body2"
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              sx={{ padding: 0, margin: 0 }}
            >
              Amount of properties
            </Typography>
          }
          maxWidth="none"
          zIndex={100}
          placement="bottom"
        >
          <Grid item xs={4}>
            <Typography
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              sx={{ padding: 0, margin: 0 }}
            >
              x{6}
            </Typography>{' '}
          </Grid>
        </CustomTooltip>
        <CustomTooltip
          open
          title={
            <Typography
              variant="body2"
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              sx={{ padding: 0, margin: 0 }}
            >
              Dice that activates the property
            </Typography>
          }
          maxWidth="80px"
          zIndex={100}
          placement="right"
        >
          <Grid item xs={4}>
            <Typography
              fontFamily={'Preahvihear'}
              fontSize={'inherit'}
              align="right"
              sx={{ padding: 0, margin: 0, marginRight: 1 }}
            >
              {'🎲' + 2}
            </Typography>{' '}
          </Grid>
        </CustomTooltip>
      </Grid>
    </Button>
  );
}

export default TutorialProperty;
