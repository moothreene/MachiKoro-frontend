import { Button, Grid, Tooltip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { Cards } from './Types/GameTypes';
import { MdNavigateNext } from 'react-icons/md';
import { ImRedo } from 'react-icons/im';
import { GiConfirmed } from 'react-icons/gi';

function TutorialButtons({ windowSize, open }: { windowSize: number, open: boolean}) {
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
          title={'Roll the dice!'}
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
            }}
            onClick={()=>{}}
          >
            <CasinoIcon fontSize="large" />
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
      <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"bottom"}
          title={'Roll two dices!'}
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
          title={'Confirm roll result'}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100' }}
        >
        <Button
          onClick={()=>{}}
          sx={{ color: 'white' }}
        >
          <GiConfirmed size={25} />
        </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
      <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"bottom"}
          title={'Reroll dices'}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100' }}
        >
        <Button
          onClick={()=>{}}
          sx={{ color: 'white' }}
        >
          <ImRedo size={25} />
        </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
      <Tooltip
          open = {open}
          placement={windowSize > 900?"left":"top"}
          title={'End turn'}
          arrow
          disableFocusListener
          disableHoverListener
          disableInteractive
          disableTouchListener
          sx={{ zIndex: '100' }}
        >
        <Button
          onClick={()=>{}}
          sx={{ color: 'white' }}
        >
          <MdNavigateNext size={30} />
        </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default TutorialButtons;
