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
  const tutorialStage = useContext(TutorialContext);

  return (
    <CustomTooltip
      open={tutorialStage === 3}
      maxWidth="none"
      title={'Action Buttons'}
      placement={windowSize > 900 ? 'left' : 'top'}
    >
      <Grid
        container
        columns={10}
        direction={windowSize > 900 ? 'column' : 'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={2}>
          <CustomTooltip
            open={tutorialStage === 4}
            maxWidth={
              windowSize > 900
                ? 'none'
                : windowSize > 600
                ? '70px'
                : windowSize > 400
                ? '60px'
                : '50px'
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
                !(tutorialStage > 0) &&
                !(stage === 0 && 2 - (currentMove % 2) === player)
              }
              sx={{
                '&.Mui-disabled': {
                  color: 'rgb(130,130,190)',
                },
                color: 'red',
                zIndex: tutorialStage === 4 ? 100 : tutorialStage === 3? 100 : 'auto',
              }}
              onClick={
                tutorialStage > 0
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
            open={tutorialStage === 4}
            maxWidth={
              windowSize > 900
                ? 'none'
                : windowSize > 600
                ? '70px'
                : windowSize > 400
                ? '60px'
                : '50px'
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
                !(tutorialStage > 0) &&
                (!(stage === 0 && 2 - (currentMove % 2) === player) ||
                  playerProperties['train_station'] === 0)
              }
              sx={{
                '&.Mui-disabled': {
                  color: 'rgb(130,130,190)',
                },
                color: 'red',
                zIndex: tutorialStage === 4 ? 100 : tutorialStage === 3? 100 : 'auto',
              }}
              onClick={
                tutorialStage > 0
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
            open={tutorialStage === 4}
            maxWidth={
              windowSize > 900
                ? 'none'
                : windowSize > 600
                ? '70px'
                : windowSize > 400
                ? '60px'
                : '50px'
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
              onClick={tutorialStage > 0 ? () => {} : handleConfirmRoll}
              disabled={!(tutorialStage > 0) && stage !== 1}
              sx={{
                color: 'white',
                zIndex: tutorialStage === 4 ? 100 : tutorialStage === 3? 100 : 'auto',
              }}
            >
              <GiConfirmed size={25} />
            </Button>
          </CustomTooltip>
        </Grid>
        <Grid item xs={2}>
          <CustomTooltip
            open={tutorialStage === 4}
            maxWidth={
              windowSize > 900
                ? 'none'
                : windowSize > 600
                ? '70px'
                : windowSize > 400
                ? '60px'
                : '50px'
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
              onClick={tutorialStage > 0 ? () => {} : handleReroll}
              disabled={
                !(tutorialStage > 0) &&
                (rerolled ||
                  stage !== 1 ||
                  2 - (currentMove % 2) !== player ||
                  playerProperties['radio_tower'] === 0)
              }
              sx={{
                color: 'white',
                zIndex: tutorialStage === 4 ? 100 : tutorialStage === 3? 100 : 'auto',
              }}
            >
              <ImRedo size={25} />
            </Button>
          </CustomTooltip>
        </Grid>
        <Grid item xs={2}>
          <CustomTooltip
            open={tutorialStage === 4}
            maxWidth={
              windowSize > 900
                ? 'none'
                : windowSize > 600
                ? '70px'
                : windowSize > 400
                ? '60px'
                : '50px'
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
                !(tutorialStage > 0) &&
                (!(2 - (currentMove % 2) === player) || stage < 2)
              }
              onClick={tutorialStage > 0 ? () => {} : handleNextTurn}
              sx={{
                color: 'white',
                zIndex: tutorialStage === 4 ? 100 : tutorialStage === 3? 100 : 'auto',
              }}
            >
              <MdNavigateNext size={30} />
            </Button>
          </CustomTooltip>
        </Grid>
      </Grid>
    </CustomTooltip>
  );
}

export default SideButtons;
