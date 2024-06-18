import { Grid } from '@mui/material';
import { Cards, GameData } from './Types/GameTypes';
import PropertyButton from './PropertyButton';
import images from './Images';

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
  return (
    <Grid
      container
      spacing={0.5}
      columns={12}
      sx={{ width: '100%', padding: 1 }}
    >
      {Object.entries(gameState.store).map(([key, value]: any[]) => {
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
            onClick={() => handleBuy(key)}
          />
        );
      })}
    </Grid>
  );
}

export default Store;
