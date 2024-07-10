import { Box, Typography } from '@mui/material';
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
  FaSquare,
} from 'react-icons/fa6';
import { TutorialContext } from './Game';
import { SPTutorialContext } from './SinglePlayer';
import { useContext, useEffect, useState } from 'react';
import CustomTooltip from './CustomTooltip';

function Dice({
  dice,
}: {
  dice: number[];
}) {
  const tutorialStage = useContext(TutorialContext);
  const spTutorialStage = useContext(SPTutorialContext);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (dice.length > 0) {
      setRolling(true);
      setTimeout(() => {
        setRolling(false);
      }, 500);
    }
  }, [dice]);

  return (
    <CustomTooltip
      open={tutorialStage === 4 || spTutorialStage === 4}
      maxWidth="none"
      title={
        <Typography sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}>
          Previous dice roll result
        </Typography>
      }
      placement={'right'}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
          transition: 'transform 0.5s',
          paddingBottom: 5,
        }}
      >
        {dice.length === 0 && (
          <FaSquare size={30} className={`Die${rolling ? '-shaking' : ''}`} />
        )}
        {dice.map((side: number) => {
          switch (side) {
            case 1:
              return (
                <FaDiceOne
                  size={30}
                  className={`Die${rolling ? '-shaking' : ''}`}
                />
              );
            case 2:
              return (
                <FaDiceTwo
                  size={30}
                  className={`Die${rolling ? '-shaking' : ''}`}
                />
              );
            case 3:
              return (
                <FaDiceThree
                  size={30}
                  className={`Die${rolling ? '-shaking' : ''}`}
                />
              );
            case 4:
              return (
                <FaDiceFour
                  size={30}
                  className={`Die${rolling ? '-shaking' : ''}`}
                />
              );
            case 5:
              return (
                <FaDiceFive
                  size={30}
                  className={`Die${rolling ? '-shaking' : ''}`}
                />
              );
            case 6:
              return (
                <FaDiceSix
                  size={30}
                  className={`Die${rolling ? '-shaking' : ''}`}
                />
              );
            default:
              return (
                <FaSquare
                  size={50}
                  className={`Die${rolling ? '-shaking' : ''}`}
                />
              );
          }
        })}
      </Box>
    </CustomTooltip>
  );
}

export default Dice;
