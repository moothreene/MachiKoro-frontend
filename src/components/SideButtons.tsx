import {
  Button,
  Grid,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { Cards } from './Types/GameTypes';
import { MdNavigateNext } from 'react-icons/md';
import { ImRedo } from 'react-icons/im';
import { GiConfirmed } from 'react-icons/gi';
import { TutorialContext } from './Game';
import { useContext } from 'react';

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
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      placement={windowSize > 900 ? 'left' : 'top'}
      open={tutorial}
      arrow
      disableFocusListener
      disableHoverListener
      disableTouchListener
      disableInteractive
    />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: windowSize > 900 ? 'none' : windowSize > 600 ? '70px' : '50px',
    },
  });

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
        <CustomWidthTooltip
          title={
            <Typography
              sx={{ fontFamily: 'Preahvihear', fontSize: fontSize + 2 }}
            >
              First,on your turn you roll a dice
            </Typography>
          }
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
        </CustomWidthTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomWidthTooltip
          title={
            <Typography sx={{ fontFamily: 'Preahvihear', fontSize: fontSize + 2}}>
              Or later even two dices, if you have a train station
            </Typography>
          }
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
        </CustomWidthTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomWidthTooltip
          title={
            <Typography sx={{ fontFamily: 'Preahvihear', fontSize: fontSize + 2 }}>
              Then - you confirm your roll and get/loose money
            </Typography>
          }
        >
          <Button
            onClick={tutorial ? () => {} : handleConfirmRoll}
            disabled={!tutorial && stage !== 1}
            sx={{ color: 'white', zIndex: 100 }}
          >
            <GiConfirmed size={25} />
          </Button>
        </CustomWidthTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomWidthTooltip
          title={
            <Typography sx={{ fontFamily: 'Preahvihear', fontSize: fontSize + 2 }}>
              Later in the game you will be able to reroll your dices
            </Typography>
          }
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
        </CustomWidthTooltip>
      </Grid>
      <Grid item xs={2}>
        <CustomWidthTooltip
          title={
            <Typography sx={{ fontFamily: 'Preahvihear', fontSize: fontSize + 2}}>
              End turn
            </Typography>
          }
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
        </CustomWidthTooltip>
      </Grid>
    </Grid>
  );
}

export default SideButtons;
