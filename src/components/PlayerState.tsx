import { Box, Grid, Stack, Typography } from '@mui/material';
import { Cards } from './Types/GameTypes';
import PropertyButton from './PropertyButton';
import images from './Images';
import Money from './Money';
import { Properties } from '../data/Properties';
import { TutorialContext } from './Game';
import { SPTutorialContext } from './SinglePlayer';
import { useContext } from 'react';
import CustomTooltip from './CustomTooltip';

function PlayerState({
  position,
  properties,
  fontSize,
  money,
  money_to_earn,
}: {
  position: string;
  properties: Cards;
  fontSize: number;
  money: number;
  money_to_earn: number;
}) {
  const tutorialStage = useContext(TutorialContext);
  const spTutorialStage = useContext(SPTutorialContext);

  function compareDices(a: [keyof Cards, number], b: [keyof Cards, number]) {
    if (Properties[a[0]].dice[0] - Properties[b[0]].dice[0] === 0) {
      return Properties[a[0]].dice.length - Properties[b[0]].dice.length;
    }
    return Properties[a[0]].dice[0] - Properties[b[0]].dice[0];
  }

  const propertiesEntries = Object.entries(properties) as [
    keyof Cards,
    number
  ][];

  const propertiesSorted = propertiesEntries.sort(compareDices);

  return (
    <CustomTooltip
      title={
        <Typography sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}>
          {position === 'top' ? "Enemy's side" : 'Your side'}
        </Typography>
      }
      open={tutorialStage === 3 || spTutorialStage === 3}
      placement={position === 'top' ? 'bottom' : 'top'}
      maxWidth="none"
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        <legend>
          <CustomTooltip
            open={tutorialStage === 3 || spTutorialStage === 3}
            maxWidth="100px"
            title={
              <Typography
                sx={{ fontFamily: 'Preahvihear', fontSize: 'inherit' }}
              >
                {position === 'bottom' ? 'Your' : 'Enemy'} money
              </Typography>
            }
            placement={'right'}
          >
            <Stack
              alignItems="center"
              alignContent={'center'}
              direction={'row'}
              width={'fit-content'}
            >
              <Money
                size={fontSize}
                amount={money}
                zIndex={tutorialStage === 3 || spTutorialStage === 3 ? 100 : 'auto'}
              />
              {money_to_earn !== 0 && (
                <>
                  <Typography
                    variant="body1"
                    color="white"
                    fontFamily={'Preahvihear'}
                    sx={{ marginLeft: 1, marginRight: 1 }}
                    fontSize={fontSize * 1.3}
                  >
                    {money_to_earn > 0 ? '+' : '-'}
                  </Typography>
                  <Money
                    size={fontSize}
                    amount={money_to_earn}
                    zIndex={'auto'}
                  />
                </>
              )}
            </Stack>
          </CustomTooltip>
        </legend>
        <Grid container columns={16} spacing={1} sx={{ margin: 'auto' }}>
          {propertiesSorted.map(([key, value]) => {
            if (value === 0) return <></>;
            return (
              <PropertyButton
                placement={`player_${position}`}
                key={`player_prop${key}`}
                amount={value}
                name={key}
                isDisabled={false}
                opaque = {false}
                image={images[key]}
                onClick={() => {}}
              />
            );
          })}
        </Grid>
      </Box>
    </CustomTooltip>
  );
}

export default PlayerState;
