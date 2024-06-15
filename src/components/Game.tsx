import { useEffect, useState } from 'react';
import { Cards, GameData, Player } from './Types/GameTypes';
import { socket } from '../socket';
import { Container, Grid, Typography } from '@mui/material';

import { Properties } from '../data/Properties';
import PlayerState from './PlayerState';
import Store from './Store';
import SideButtons from './SideButtons';
import Dice from './Dice';

function Game({ player, gameState, lastRoll }: { player: Player; gameState: GameData, lastRoll: number[]}) {
  useEffect(() => {
    setStage(0);
  }, [gameState.currentMove]);
  const [stage, setStage] = useState(0);
  const [rerolled, setRerolled] = useState(false);
  const [rolling, setRolling] = useState(false);

  function roll(dice_count: number) {
    if (2 - (gameState.currentMove % 2) !== player)
      return alert('Not your turn!');
    if (stage > 0) return alert('You have already rolled this turn!');
    let roll = [];
    for (let i = 0; i < dice_count; i++) {
      roll.push(Math.floor(Math.random() * 6 + 1));
    }
    setRolling(true);
    setTimeout(()=>setRolling(false), 1000)
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
    socket.emit('nextTurn');
  }

  return (
    <Container maxWidth={false} sx={{ margin: 0, padding:1, height: '100vh', maxHeight:'100vh' }}>
      <PlayerState
        key={'player_enemy'}
        properties={gameState.players[(player % 2) + 1].properties}
        money={gameState.players[(player % 2) + 1].money}
        money_to_earn={gameState.players[(player % 2) + 1].money_to_earn}
      />
      <Grid container columns={21}>
        <Grid item xs={2} sx={{justifyItems:'center'}}>
            <Dice dice={lastRoll} rolling={rolling} />
        </Grid>
        <Grid item xs={17}>
          <Store
            gameState={gameState}
            player={player}
            stage={stage}
            handleBuy={buy}
          />
        </Grid>
        <Grid item xs={2}>
          <SideButtons
            stage={stage}
            currentMove={gameState.currentMove}
            player={player}
            playerProperties={gameState.players[player].properties}
            rerolled={rerolled}
            handleRoll={roll}
            handleConfirmRoll={confirmRoll}
            handleReroll={reroll}
            handleNextTurn={nextTurn}
          ></SideButtons>
        </Grid>
      </Grid>
      <PlayerState
        key={'player_you'}
        properties={gameState.players[player].properties}
        money={gameState.players[player].money}
        money_to_earn={gameState.players[player].money_to_earn}
      />
    </Container>
  );
}

export default Game;
