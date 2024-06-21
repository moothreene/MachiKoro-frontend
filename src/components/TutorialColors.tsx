import {
  Container,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';

function TutorialColors({
  open,
  fontSize,
  setClose,
}: {
  open: boolean;
  fontSize: number;
  setClose: () => void;
}) {
  return (
    <Dialog open={open} onClick={setClose} sx={{ zIndex: 200, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <DialogTitle>
        <Typography variant={'h5'} fontFamily={'Preahvihear'} fontSize={fontSize}>
          Colors Guide
        </Typography>
      </DialogTitle>
      <DialogContentText sx={{height:'fit-content'}}>
        <Container sx={{marginBottom:2}}>
          <List>
            <ListItem>
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                <Typography
                  fontFamily={'Preahvihear'} fontSize={fontSize}
                  fontWeight={'600'}
                  display={'inline'}
                  color={'blue'}
                >
                  Blue
                </Typography>{' '}
                Can be activated on anyone's turn
              </Typography>
            </ListItem>
            <ListItem>
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                <Typography
                  fontFamily={'Preahvihear'} fontSize={fontSize}
                  fontWeight={'600'}
                  display={'inline'}
                  color={'green'}
                >
                  Green
                </Typography>{' '}
                Can only be activated on your turn
              </Typography>
            </ListItem>
            <ListItem>
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                <Typography
                  fontFamily={'Preahvihear'} fontSize={fontSize}
                  fontWeight={'600'}
                  display={'inline'}
                  color={'red'}
                >
                  Red
                </Typography>{' '}
                Can only be activated on others' turn
              </Typography>
            </ListItem>
            <ListItem>
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                <Typography
                  fontFamily={'Preahvihear'} fontSize={fontSize}
                  fontWeight={'600'}
                  display={'inline'}
                  color={'purple'}
                >
                  Purple
                </Typography>{' '}
                Can only be activated on your turn
                <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                  Can't buy more than 1 of a kind
                </Typography>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
                <Typography
                  fontFamily={'Preahvihear'} fontSize={fontSize}
                  fontWeight={'600'}
                  display={'inline'}
                  color={'orange'}
                >
                  Orange
                </Typography>{' '}
                Can't be activated, but provide strong bonuses
              </Typography>
            </ListItem>
            <ListItem>
              <Typography fontFamily={'Preahvihear'} fontSize={fontSize} fontWeight={600}>
                Get all 4 orange properties to win the game!
              </Typography>
            </ListItem>
            <ListItem>
              <Divider />
            </ListItem>
          </List>
          <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
            Order of activation, when multiple properties can be activated:
            <Typography fontFamily={'Preahvihear'} fontSize={fontSize}>
              <Typography
                fontFamily={'Preahvihear'} fontSize={fontSize}
                fontWeight={'600'}
                display={'inline'}
                color={'blue'}
              >
                Blue
              </Typography>{'➡️'}
              <Typography
                fontFamily={'Preahvihear'} fontSize={fontSize}
                fontWeight={'600'}
                display={'inline'}
                color={'green'}
              >
                Green
              </Typography>{'➡️'}
              <Typography
                fontFamily={'Preahvihear'} fontSize={fontSize}
                fontWeight={'600'}
                display={'inline'}
                color={'red'}
              >
                Red
              </Typography>{'➡️'}
              <Typography
                fontFamily={'Preahvihear'} fontSize={fontSize}
                fontWeight={'600'}
                display={'inline'}
                color={'purple'}
              >
                Purple
              </Typography>{'➡️'}
              <Typography
                fontFamily={'Preahvihear'} fontSize={fontSize}
                fontWeight={'600'}
                display={'inline'}
                color={'orange'}
              >
                Orange
            </Typography>
            </Typography>
          </Typography>
        </Container>
      </DialogContentText>
    </Dialog>
  );
}

export default TutorialColors;
