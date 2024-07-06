import { createContext, useEffect, useState } from 'react';
import { Cards, GameData, Player } from './Types/GameTypes';
import { socket } from '../socket';
import { Box, Container, Grid } from '@mui/material';

import { Properties } from '../data/Properties';
import PlayerState from './PlayerState';
import Store from './Store';
import SideButtons from './SideButtons';
import Dice from './Dice';
import Tutorial from './Tutorial';

export const TutorialContext = createContext(0);

function Game({
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
  gameStateSetter: (gameState: GameData) => void;
}) {
  const [rerolled, setRerolled] = useState(true);
  const [rolling, setRolling] = useState(false);
  const [tutorial, setTutorial] = useState(0);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    if (2 - (gameState.currentMove % 2) === player) {
      socket.emit('updateGame', gameState);
    }
  }, [gameState]);

  useEffect(() => {
    socket.on('roll', onRoll);
    return () => {
      socket.off('roll', onRoll);
    };
  }, []);

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

  function onRoll() {
    setRolling(true);
    setTimeout(() => setRolling(false), 1000);
  }

  function roll(dice_count: number) {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (gameState.stage > 0) return alert('You have already rolled this turn!');
    let roll = [];
    for (let i = 0; i < dice_count; i++) {
      roll.push(Math.floor(Math.random() * 6 + 1));
    }
    socket.emit('roll', {
      player: player,
      dice: roll,
    });
  }

  function confirmRoll() {
    setRerolled(false);
    socket.emit('confirmRoll');
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
    let turns = 1;
    if (
      gameState.lastRoll.length > 1 &&
      gameState.lastRoll[0] === gameState.lastRoll[1] &&
      gameState.players[player].properties['amusement_park'] > 0
    ) {
      turns = 2;
    }
    socket.emit('buy', { player: player, property: property, turns: turns});
    setHighlighted(property);
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
      return socket.emit('nextTurn', 2);
    }
    socket.emit('nextTurn', 1);
  }

  return (
    <TutorialContext.Provider value={tutorial}>
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
            height: '50vh',
            top: 0,
            left: 0,
            background:
              'linear-gradient(0deg, rgba(0,0,0,0) 40%, rgba(253,187,45,1) 100%)',
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
            height: '50vh',
            bottom: 0,
            left: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(253,187,45,1) 100%)',
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
              active={2 - (gameState.currentMove % 2) !== player}
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
              active={2 - (gameState.currentMove % 2) === player}
            />
          </Grid>
        </Grid>
      </Container>
    </TutorialContext.Provider>
  );
}

export default Game;
