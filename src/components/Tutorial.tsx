import { Backdrop, Button, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import TutorialButtons from './TutorialButtons';

function Tutorial({
  fontSize,
  windowSize,
}: {
  fontSize: number;
  windowSize: number;
}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        How to Play?
      </Button>
      <Backdrop
        open={open}
        sx={{
          color: '#fff',
          zIndex: '1000',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        onClick={handleClose}
      >
        <Container
          maxWidth={false}
          sx={{
            margin: 0,
            padding: 1,
            fontSize: `${fontSize}px`,
            minHeight: '95vh',
          }}
        >
          <Grid
            container
            direction={'column'}
            m={0}
            p={0}
            height={'100%'}
            minHeight={'95vh'}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item xs={3}>
              {/*PlayerState*/}
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize + 2}>
                That's your opponent's side: information about his properties
                and money is here
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ margin: '10px 0' }}>
              <Grid
                container
                columns={21}
                sx={{ justifyContent: 'space-between', height: '100%' }}
              >
                <Grid
                  item
                  xs={21}
                  md={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/*Dice*/}
                  <Typography fontFamily={'Preahvihear'} fontSize={fontSize + 2}>
                    Here's the result of a last dice roll
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={21}
                  md={17}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20vh',
                  }}
                >
                  {/*Store*/}
                  <Typography fontFamily={'Preahvihear'} fontSize={fontSize + 2}>
                    Here's the store: you can buy new properties here
                  </Typography>
                  <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                    Click on a property to see more details
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={21}
                  md={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/*SideButtons*/}
                  <TutorialButtons windowSize={windowSize} open={open} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              {/*PlayerState*/}
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize + 2}>
                That's your side: information about your properties and money is
                here
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Backdrop>
    </>
  );
}

export default Tutorial;
