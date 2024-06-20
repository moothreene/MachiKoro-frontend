import { Button, Grid, Tooltip, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { Cards } from './Types/GameTypes';
import { MdNavigateNext } from 'react-icons/md';
import { ImRedo } from 'react-icons/im';
import { GiConfirmed } from 'react-icons/gi';

function TutorialButtons({ windowSize, open, fontSize}: { windowSize: number, open: boolean, fontSize: number}) {
  return (
    <Grid
      container
      columns={10}
      direction={windowSize > 900 ? 'column' : 'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid item xs={2}>
        <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"top"}
          title={<Typography sx={{ fontSize: {fontSize}, fontFamily: 'Preahvihear' }}>Roll the Dice</Typography>}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100' }}
        >
          <Button
            sx={{
              color: 'red',
              padding: 0,
              paddingBottom: '8px'
            }}
            onClick={()=>{}}
          >
            <CasinoIcon fontSize='large'/>
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
      <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"top"}
          title={<Typography sx={{ fontSize: {fontSize}, fontFamily: 'Preahvihear' }}>Roll two Dices</Typography>}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100'}}
        >
        <Button
          sx={{
            color: 'red',
            padding: 0,
            paddingBottom: '8px'
          }}
          onClick={() => {}}
        >
          <CasinoIcon />
          <CasinoIcon />
        </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
      <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"top"}
          title={<Typography sx={{ fontSize: {fontSize}, fontFamily: 'Preahvihear' }}>Comfirm Roll</Typography>}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100' }}
        >
        <Button
          onClick={()=>{}}
          sx={{ color: 'white', padding:0, paddingBottom: '8px'}}
        >
          <GiConfirmed size={25} />
        </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
      <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"top"}
          title={<Typography sx={{ fontSize: {fontSize}, fontFamily: 'Preahvihear' }}>Reroll</Typography>}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100' }}
        >
        <Button
          onClick={()=>{}}
          sx={{ color: 'white', padding:0, paddingBottom: '8px' }}
        >
          <ImRedo size={25} />
        </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
      <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"top"}
          title={<Typography sx={{ fontSize: {fontSize}, fontFamily: 'Preahvihear' }}>Next Turn</Typography>}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100',}}
        >
        <Button
          onClick={()=>{}}
          sx={{ color: 'white', padding:0, paddingBottom: '8px'}}
        >
          <MdNavigateNext size={30} />
        </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default TutorialButtons;
