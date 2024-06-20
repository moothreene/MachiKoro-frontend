import { Backdrop, Button, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import TutorialButtons from './TutorialButtons';
import TutorialStore from './TutorialStore';

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
        <Typography fontFamily={'Preahvihear'}>How to Play?</Typography>
      </Button>
      <Backdrop
        open={open}
        sx={{
          color: '#fff',
          zIndex: '100',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          position: 'fixed',
          maxHeight:'none',
          height:'100%',
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
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                At the top is your opponent's side: information about his properties
                and money can be found here
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
                  <Typography
                    fontFamily={'Preahvihear'}
                    fontSize={fontSize}
                  >
                    Near the store you can see the last roll of the dice
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
                  }}
                >
                  {/*Store*/}
                  <TutorialStore />
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
                  <TutorialButtons windowSize={windowSize} open={open} fontSize={fontSize}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              {/*PlayerState*/}
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                On the bottom is your side of the board: your properties and your money can be seen here
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Backdrop>
    </>
  );
}

export default Tutorial;
