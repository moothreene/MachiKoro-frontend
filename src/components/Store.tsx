import { Box, Grid, Typography } from '@mui/material';
import { Cards, GameData, PlayerProp } from './Types/GameTypes';
import PropertyButton from './PropertyButton';
import images from './Images';
import { TutorialContext } from './Game';
import { useContext } from 'react';
import CustomTooltip from './CustomTooltip';
import { Properties } from '../data/Properties';

function Store({
  gameState,
  stage,
  player,
  handleBuy,
}: {
  gameState: GameData;
  stage: number;
  player: number;
  handleBuy: (key: keyof Cards) => void;
}) {
  const tutorialStage = useContext(TutorialContext);
  const storeData = Object.entries(gameState.store) as PlayerProp[];

  return (
    <Grid
      container
      spacing={0.5}
      columns={12}
      borderRadius={5}
      sx={{ width: '100%', padding: 1 }}
    >
      <CustomTooltip
        title={
          <Typography sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}>
            Store
          </Typography>
        }
        placement="bottom"
        maxWidth="none"
        open={tutorialStage === 3}
      >
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'center',
            position: 'absolute',
            top: 'inherit',
            left: '50%',
          }}
        ></Box>
      </CustomTooltip>
      {storeData.map(([key, value]) => {
        return (
          <PropertyButton
            placement="store"
            key={key}
            amount={value}
            name={key}
            image={images[key]}
            isDisabled={
              !(stage === 2 && 2 - (gameState.currentMove % 2) === player)
            }
            opaque={
              gameState.players[player].money < Properties[key].cost ||
              (Properties[key].color === 'orange' &&
                gameState.players[player].properties[key] === 1)
            }
            onClick={() => handleBuy(key)}
          />
        );
      })}
    </Grid>
  );
}

export default Store;
