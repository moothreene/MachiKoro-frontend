import { Button, Grid, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { Cards } from './Types/GameTypes';
import { MdNavigateNext } from 'react-icons/md';
import { ImRedo } from 'react-icons/im';
import { GiConfirmed } from 'react-icons/gi';
import { TutorialContext } from './Game';
import { useContext } from 'react';
import CustomTooltip from './CustomTooltip';

function SideButtons({
  stage,
  currentMove,
  player,
  playerProperties,
  rerolled,
  windowSize,
  fontSize,
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
  fontSize: number;
  handleRoll: (num: number) => void;
  handleConfirmRoll: () => void;
  handleReroll: () => void;
  handleNextTurn: () => void;
}) {
  const tutorial = useContext(TutorialContext);

  return (
    <Grid
      container
      columns={10}
      direction={windowSize > 900 ? 'column' : 'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid item xs={2}>
        <CustomTooltip
          open={tutorial}
          maxWidth={
            windowSize > 900 ? 'none' : windowSize > 600 ? '80px' : windowSize > 400? '65px' : '50px'
          }
          title={
            <Typography
              sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}
            >
              On your turn you roll a dice
            </Typography>
          }
          placement={windowSize > 900 ? 'left' : 'top'}
        >
          <Button
            disabled={
              !tutorial && !(stage === 0 && 2 - (currentMove % 2) === player)
            }
            sx={{
              '&.Mui-disabled': {
                color: 'rgb(130,130,190)',
              },
              color: 'red',
              zIndex: 100,
            }}
            onClick={
              tutorial
                ? () => {}
                : () => {
                    handleRoll(1);
                  }
            }
          >
            <CasinoIcon fontSize="large" />
          </Button>
        </CustomTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomTooltip
          open={tutorial}
          maxWidth={
            windowSize > 900 ? 'none' : windowSize > 600 ? '80px' : windowSize > 400? '65px' : '50px'
          }
          title={
            <Typography
              sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}
            >
              Or later even two dices, if you have a train station
            </Typography>
          }
          placement={windowSize > 900 ? 'left' : 'top'}
        >
          <Button
            disabled={
              !tutorial &&
              (!(stage === 0 && 2 - (currentMove % 2) === player) ||
                playerProperties['train_station'] === 0)
            }
            sx={{
              '&.Mui-disabled': {
                color: 'rgb(130,130,190)',
              },
              color: 'red',
              zIndex: 100,
            }}
            onClick={
              tutorial
                ? () => {}
                : () => {
                    handleRoll(2);
                  }
            }
          >
            <CasinoIcon />
            <CasinoIcon />
          </Button>
        </CustomTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomTooltip
          open={tutorial}
          maxWidth={
            windowSize > 900 ? 'none' : windowSize > 600 ? '80px' : windowSize > 400? '65px' : '50px'
          }
          title={
            <Typography
              sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}
            >
              Then - confirm your roll
            </Typography>
          }
          placement={windowSize > 900 ? 'left' : 'top'}
        >
          <Button
            onClick={tutorial ? () => {} : handleConfirmRoll}
            disabled={!tutorial && stage !== 1}
            sx={{ color: 'white', zIndex: 100 }}
          >
            <GiConfirmed size={25} />
          </Button>
        </CustomTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomTooltip
          open={tutorial}
          maxWidth={
            windowSize > 900 ? 'none' : windowSize > 600 ? '80px' : windowSize > 400? '65px' : '50px'
          }
          title={
            <Typography
              sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}
            >
              Later in the game you'd be able to reroll
            </Typography>
          }
          placement={windowSize > 900 ? 'left' : 'top'}
        >
          <Button
            onClick={tutorial ? () => {} : handleReroll}
            disabled={
              !tutorial &&
              (rerolled ||
                stage !== 1 ||
                2 - (currentMove % 2) !== player ||
                playerProperties['radio_tower'] === 0)
            }
            sx={{ color: 'white', zIndex: 100 }}
          >
            <ImRedo size={25} />
          </Button>
        </CustomTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomTooltip
          open={tutorial}
          maxWidth={
            windowSize > 900 ? 'none' : windowSize > 600 ? '80px' : windowSize > 400? '65px' : '50px'
          }
          title={
            <Typography
              sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}
            >
              End turn
            </Typography>
          }
          placement={windowSize > 900 ? 'left' : 'top'}
        >
          <Button
            disabled={
              !tutorial && (!(2 - (currentMove % 2) === player) || stage < 2)
            }
            onClick={tutorial ? () => {} : handleNextTurn}
            sx={{ color: 'white', zIndex: 100 }}
          >
            <MdNavigateNext size={30} />
          </Button>
        </CustomTooltip>
      </Grid>
    </Grid>
  );
}

export default SideButtons;
