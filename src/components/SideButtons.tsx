import { Button, Grid } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { Cards } from './Types/GameTypes';
import { MdNavigateNext } from 'react-icons/md';
import { ImRedo } from 'react-icons/im';
import { GiConfirmed } from 'react-icons/gi';

function SideButtons({
  stage,
  currentMove,
  player,
  playerProperties,
  rerolled,
  windowSize,
  handleRoll,
  handleConfirmRoll,
  handleReroll,
  handleNextTurn,
}: {
  stage: number;
  currentMove: number;
  player: number;
  playerProperties: Cards;
  rerolled: boolean;
  windowSize: number;
  handleRoll: (num: number) => void;
  handleConfirmRoll: () => void;
  handleReroll: () => void;
  handleNextTurn: () => void;
}) {
  return (
    <Grid
      container
      columns={10}
      direction={windowSize > 900 ? 'column' : 'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid item xs={2}>
        <Button
          disabled={!(stage === 0 && 2 - (currentMove % 2) === player)}
          sx={{
            '&.Mui-disabled': {
              color: 'rgb(130,130,190)',
            },
            color: 'red',
          }}
          onClick={() => {
            handleRoll(1);
          }}
        >
          <CasinoIcon fontSize="large" />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          disabled={
            !(stage === 0 && 2 - (currentMove % 2) === player) ||
            playerProperties['train_station'] === 0
          }
          sx={{
            '&.Mui-disabled': {
              color: 'rgb(130,130,190)',
            },
            color: 'red',
          }}
          onClick={() => {
            handleRoll(2);
          }}
        >
          <CasinoIcon />
          <CasinoIcon />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleConfirmRoll}
          disabled={stage !== 1}
          sx={{ color: 'wheat' }}
        >
          <GiConfirmed size={25} />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={handleReroll}
          disabled={
            rerolled ||
            stage !== 1 ||
            2 - (currentMove % 2) !== player ||
            playerProperties['radio_tower'] === 0
          }
          sx={{ color: 'wheat' }}
        >
          <ImRedo size={25} />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          disabled={!(2 - (currentMove % 2) === player) || stage < 2}
          onClick={handleNextTurn}
          sx={{ color: 'wheat' }}
        >
          <MdNavigateNext size={30} />
        </Button>
      </Grid>
    </Grid>
  );
}

export default SideButtons;
