import { createContext, useEffect, useRef, useState } from 'react';
import { Cards, GameData, Player } from './Types/GameTypes';
import { Box, Container, Grid } from '@mui/material';
import { Properties } from '../data/Properties';
import PlayerState from './PlayerState';
import Store from './Store';
import SideButtons from './SideButtons';
import Dice from './Dice';
import Tutorial from './Tutorial';
import {
  ConfirmRollHelper,
  onBuyHelper,
  onNextTurnHelper,
  spRoll,
} from '../utils/helper';
import { AITurn } from '../AI/AILogic';

export const SPTutorialContext = createContext(0);

function SinglePlayer({
  windowSize,
  fontSize,
  player,
  gameState,
  gameStateSetter,
}: {
  windowSize: number;
  fontSize: number;
  player: Player;
  gameState: GameData;
  gameStateSetter: (value: React.SetStateAction<GameData>) => void;
}) {
  const [rerolled, setRerolled] = useState(true);
  const [rolling, setRolling] = useState(false);
  const [tutorial, setTutorial] = useState(0);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [bought, setBought] = useState<boolean>(false);

  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const handleTutorialClose = () => {
    setTutorial(0);
  };

  const handleTutorialOpen = () => {
    setTutorial(1);
  };

  const handleTutorialNext = () => {
    if (tutorial < 7) {
      setTutorial(tutorial + 1);
    } else {
      setTutorial(0);
    }
  };

  const handleTutorialPrev = () => {
    if (tutorial > 0) {
      setTutorial(tutorial - 1);
    } else {
      setTutorial(0);
    }
  };

  useEffect(() => {
    if (2 - (gameState.currentMove % 2) !== player) {
      AITurn(
        gameStateRef,
        gameStateSetter,
        player === 2 ? 1 : 2,
        setHighlighted
      );
    }
  }, [gameState.currentMove]);

  useEffect(() => {
    if (gameState.lastRoll.length > 0) {
      setRolling(true);
      setTimeout(() => setRolling(false), 1000);
    }
  }, [gameState.lastRoll]);

  function roll(num: number) {
    spRoll(num, player, gameState, gameStateSetter);
  }

  function confirmRoll() {
    setRerolled(false);
    ConfirmRollHelper(gameStateSetter);
  }

  function reroll() {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (gameState.stage === 0) return alert('You have to roll the dice first!');
    gameStateSetter({ ...gameState, stage: 0 });
    setRerolled(true);
  }

  function buy(property: keyof Cards) {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (gameState.stage === 0) return alert('You have to roll the dice first!');
    if (gameState.store[property] === 0)
      return alert('Property not available!');
    if (gameState.players[player].money < Properties[property].cost)
      return alert('Not enough money!');
    if (
      gameState.players[player].properties[property] > 0 &&
      ['orange', 'purple'].includes(Properties[property].color)
    )
      return alert('Cannot buy more than one of this property!');
    onBuyHelper({ player: player, property: property }, gameStateSetter);
    setHighlighted(property);
    setBought(true);
  }

  function nextTurn() {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (gameState.stage < 2) return alert('You have to roll the dice first!');
    if (
      gameState.lastRoll.length > 1 &&
      gameState.lastRoll[0] === gameState.lastRoll[1] &&
      gameState.players[player].properties['amusement_park'] > 0
    ) {
      return onNextTurnHelper(2, gameStateSetter);
    }
    onNextTurnHelper(1, gameStateSetter);
    if (bought === false) {
      setHighlighted(null);
    }
    setBought(false);
  }

  return (
    <SPTutorialContext.Provider value={tutorial}>
      <Tutorial
        setOpen={handleTutorialOpen}
        setClose={handleTutorialClose}
        setNext={handleTutorialNext}
        setPrev={handleTutorialPrev}
      />
      <Container
        maxWidth={false}
        sx={{
          margin: 0,
          padding: 1,
          fontSize: `${fontSize}px`,
        }}
      >
        <Box
          className="background-gradient enemy"
          sx={{
            position: 'fixed',
            width: '100vw',
            height: '30vh',
            top: 0,
            left: 0,
            background:'linear-gradient(0deg, rgba(253,187,45,.2) 0, rgba(253,187,45,.2) 20%, rgba(253,187,45,.4) 20%, rgba(253,187,45,.4) 40%, rgba(253,187,45,.6) 40%, rgba(253,187,45,.6) 60%, rgba(253,187,45,.8) 60%, rgba(253,187,45,.8) 80%, rgba(253,187,45,1) 80%, rgba(253,187,45,1) 100%)',
              /*'linear-gradient(0deg, rgba(0,0,0,0) 40%, rgba(253,187,45,1) 100%)',*/
            opacity: 2 - (gameState.currentMove % 2) !== player ? 1 : 0,
            transition: 'opacity .5s linear',
            zIndex: -1,
          }}
        />
        <Box
          className="background-gradient player"
          sx={{
            position: 'fixed',
            width: '100vw',
            height: '30vh',
            bottom: 0,
            left: 0,
            background:'linear-gradient(180deg, rgba(253,187,45,.2) 0, rgba(253,187,45,.2) 20%, rgba(253,187,45,.4) 20%, rgba(253,187,45,.4) 40%, rgba(253,187,45,.6) 40%, rgba(253,187,45,.6) 60%, rgba(253,187,45,.8) 60%, rgba(253,187,45,.8) 80%, rgba(253,187,45,1) 80%, rgba(253,187,45,1) 100%)',
              /*'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(253,187,45,1) 100%)',*/
            opacity: 2 - (gameState.currentMove % 2) !== player ? 0 : 1,
            transition: 'opacity .5s linear',
            zIndex: -1,
          }}
        />
        <Grid
          container
          direction={'column'}
          m={0}
          p={0}
          height={'100%'}
          minHeight={'90vh'}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item xs={3}>
            <PlayerState
              position={'top'}
              key={'player_enemy'}
              fontSize={fontSize}
              properties={gameState.players[(player % 2) + 1].properties}
              money={gameState.players[(player % 2) + 1].money}
              money_to_earn={gameState.players[(player % 2) + 1].money_to_earn}
            />
          </Grid>
          <Grid item xs={6} sx={{ margin: '10px 0' }}>
            <Grid
              container
              columns={21}
              spacing={windowSize > 900 ? 0 : 2}
              sx={{ justifyContent: 'space-between', height: '100%' }}
            >
              <Grid
                item
                xs={21}
                md={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Dice dice={gameState.lastRoll} rolling={rolling} />
              </Grid>
              <Grid
                item
                xs={21}
                md={17}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Store
                  gameState={gameState}
                  player={player}
                  stage={gameState.stage}
                  handleBuy={buy}
                  highlighted={highlighted}
                />
              </Grid>
              <Grid
                item
                xs={21}
                md={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SideButtons
                  stage={gameState.stage}
                  currentMove={gameState.currentMove}
                  player={player}
                  playerProperties={gameState.players[player].properties}
                  rerolled={rerolled}
                  windowSize={windowSize}
                  handleRoll={roll}
                  handleConfirmRoll={confirmRoll}
                  handleReroll={reroll}
                  handleNextTurn={nextTurn}
                ></SideButtons>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <PlayerState
              position={'bottom'}
              key={'player_you'}
              fontSize={fontSize}
              properties={gameState.players[player].properties}
              money={gameState.players[player].money}
              money_to_earn={gameState.players[player].money_to_earn}
            />
          </Grid>
        </Grid>
      </Container>
    </SPTutorialContext.Provider>
  );
}

export default SinglePlayer;
