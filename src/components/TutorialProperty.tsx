import { Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { FaCoins } from 'react-icons/fa6';
import CustomTooltip from './CustomTooltip';

function TutorialProperty({
  open,
  setClose,
}: {
  open: boolean;
  setClose: () => void;
}) {
  return (
    <Dialog
      onClick={setClose}
      open={open}
      sx={{ zIndex: 200, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <DialogContent
        sx={{
          overflow: 'clip',
          padding: 0,
        }}
      >
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
            open={open}
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
            zIndex={200}
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
              open={open}
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
              zIndex={200}
              placement="left"
            >
              <Grid item xs={4}>
                <Typography
                  fontFamily={'Preahvihear'}
                  fontSize={'inherit'}
                  align='left'
                  sx={{ padding: 0, margin: 0, marginLeft:1}}
                >
                  <FaCoins size={8} color="gold" /> {1}
                </Typography>{' '}
              </Grid>
            </CustomTooltip>
            <CustomTooltip
              open={open}
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
              zIndex={200}
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
              open={open}
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
              zIndex={200}
              placement="right"
            >
            <Grid item xs={4}>
              <Typography
                fontFamily={'Preahvihear'}
                fontSize={'inherit'}
                align='right'
                sx={{ padding: 0, margin: 0, marginRight:1}}
              >
                {'🎲' + 2}
              </Typography>{' '}
            </Grid>
            </CustomTooltip>
          </Grid>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default TutorialProperty;
