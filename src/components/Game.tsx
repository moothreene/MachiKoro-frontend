import { createContext, useEffect, useState } from 'react';
import { Cards, GameData, Player } from './Types/GameTypes';
import { socket } from '../socket';
import { Container, Grid } from '@mui/material';

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
  lastRoll,
}: {
  windowSize: number;
  fontSize: number;
  player: Player;
  gameState: GameData;
  lastRoll: number[];
}) {
  const [stage, setStage] = useState(0);
  const [rerolled, setRerolled] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [tutorial, setTutorial] = useState(0);

  useEffect(() => {
    setStage(0);
  }, [gameState.currentMove]);

  useEffect(() => {
    socket.on('roll', onRoll);
    return () => {
      socket.off('roll', onRoll);
    };
  },[]);

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
  }

  const handleTutorialPrev = () => {
    if (tutorial > 0) {
      setTutorial(tutorial - 1);
    } else {
      setTutorial(0);
    }
  }

  function onRoll(){
    setRolling(true);
    setTimeout(() => setRolling(false), 1000);
  }


  function roll(dice_count: number) {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (stage > 0) return alert('You have already rolled this turn!');
    let roll = [];
    for (let i = 0; i < dice_count; i++) {
      roll.push(Math.floor(Math.random() * 6 + 1));
    }
    setRolling(true);
    setTimeout(() => setRolling(false), 1000);
    socket.emit('roll', {
      player: player,
      dice: roll,
    });
    setStage(1);
  }

  function confirmRoll() {
    socket.emit('confirmRoll');
    setStage(2);
    setRerolled(false);
  }

  function reroll() {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (stage === 0) return alert('You have to roll the dice first!');
    setStage(0);
    setRerolled(true);
  }

  function buy(property: keyof Cards) {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (stage === 0) return alert('You have to roll the dice first!');
    if (gameState.store[property] === 0)
      return alert('Property not available!');
    if (gameState.players[player].money < Properties[property].cost)
      return alert('Not enough money!');
    if (
      gameState.players[player].properties[property] > 0 &&
      ['orange', 'purple'].includes(Properties[property].color)
    )
      return alert('Cannot buy more than one of this property!');
    socket.emit('buy', { player: player, property: property });
    setStage(3);
  }

  function nextTurn() {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (stage < 2) return alert('You have to roll the dice first!');
    if (lastRoll.length > 1 && lastRoll[0] === lastRoll[1]) {
      return socket.emit('nextTurn', 2);
    }
    socket.emit('nextTurn', 1);
  }

  return (
    <TutorialContext.Provider value={tutorial}>
      <Tutorial setOpen={handleTutorialOpen} setClose={handleTutorialClose} setNext={handleTutorialNext} setPrev={handleTutorialPrev} fontSize={fontSize}/>
      <Container
        maxWidth={false}
        sx={{
          margin: 0,
          padding: 1,
          fontSize: `${fontSize}px`,
          minHeight: '95vh',
        }}
      >
        <Grid
          container
          direction={'column'}
          m={0}
          p={0}
          height={'100%'}
          minHeight={'95vh'}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            xs={3}
          >
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
                <Dice dice={lastRoll} rolling={rolling} fontSize={fontSize} />
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
                  stage={stage}
                  handleBuy={buy}
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
                  stage={stage}
                  currentMove={gameState.currentMove}
                  player={player}
                  playerProperties={gameState.players[player].properties}
                  rerolled={rerolled}
                  windowSize={windowSize}
                  fontSize={fontSize}
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
    </TutorialContext.Provider>
  );
}

export default Game;
