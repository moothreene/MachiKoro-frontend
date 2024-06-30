import { useEffect, useState } from 'react';
import { socket } from './socket';
import { gameDataInitial } from './data/GameData';
import { Properties } from './data/Properties';
import { ThemeProvider } from '@emotion/react';
import { themeOptions } from './themes/ThemeOptions';
import { createTheme, responsiveFontSizes } from '@mui/material';
import WinLooseScreen from './components/WinLooseScreen';
import {
  Buy,
  Cards,
  GameData,
  Player,
  Roll,
} from './components/Types/GameTypes';
import Menu from './components/Menu';
import Game from './components/Game';
import './App.css';

const default_theme = responsiveFontSizes(createTheme(themeOptions));

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [player, setPlayer] = useState<Player>(1);
  const [roomId, setRoomId] = useState('');
  const [gameState, setGameState] = useState(gameDataInitial);
  const [ready, setReady] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize > 1600) {
      setFontSize(13);
    } else if (windowSize > 1300) {
      setFontSize(11);
    } else if (windowSize > 1000) {
      setFontSize(9);
    } else if (windowSize > 600) {
      setFontSize(7);
    } else {
      setFontSize(5);
    }
  }, [windowSize]);

  function winnerCheck() {
    for (let i = 1; i < Object.keys(gameState.players).length + 1; i++) {
      if (
        gameState.players[i].properties['radio_tower'] === 1 &&
        gameState.players[i].properties['amusement_park'] === 1 &&
        gameState.players[i].properties['shopping_mall'] === 1 &&
        gameState.players[i].properties['train_station'] === 1
      ) {
        setWinner(i as Player);
      }
    }
  }

  function resetGame() {
    setIsConnected(false);
    setGameState(gameDataInitial);
    setWinner(null);
    setReady(false);
    setPlayer(1);
    setRoomId('');
  }

  useEffect(() => {
    winnerCheck();
  }, [gameState.players]);

  useEffect(() => {
    function onStartGame() {
      setReady(true);
    }

    function onHosted(msg: string) {
      setRoomId(msg);
      setPlayer(1);
    }

    function onJoined({
      id,
      gameData,
      player,
    }: {
      id: string;
      gameData: GameData;
      player: Player;
    }) {
      console.log(id, gameData, player);
      setRoomId(id);
      setPlayer(player);
      setGameState(gameData);
    }

    function onDisconnect() {
      setIsConnected(false);
      setRoomId('');
    }

    function onRoll(msg: Roll) {
      const money_to_earn = calculateRoll(msg);
      const gameStateNew = {
        ...gameState,
        lastRoll: msg.dice,
        players: {
          1: {
            ...gameState.players[1],
            money_to_earn: money_to_earn[1],
          },
          2: {
            ...gameState.players[2],
            money_to_earn: money_to_earn[2],
          },
        },
      };
      setGameState(gameStateNew);
    }
    function onBuy(msg: Buy) {
      setGameState((prev) => {
        return {
          ...prev,
          store: {
            ...prev.store,
            [msg.property]: prev.store[msg.property] - 1,
          },
          players: {
            ...prev.players,
            [msg.player]: {
              ...prev.players[msg.player],
              properties: {
                ...prev.players[msg.player].properties,
                [msg.property]:
                  prev.players[msg.player].properties[msg.property] + 1,
              },
              money:
                prev.players[msg.player].money - Properties[msg.property].cost,
            },
          },
        };
      });
    }

    function nextTurn(amount: number) {
      setGameState((prev) => {
        return { ...prev, currentMove: prev.currentMove + amount };
      });
    }

    function onConfirmRoll() {
      setGameState((prev) => {
        return {
          ...prev,
          players: {
            1: {
              ...prev.players[1],
              money: Math.max(
                prev.players[1].money + prev.players[1].money_to_earn,
                prev.currentMove % 2 === 1 ? 1 : 0
              ),
              money_to_earn: 0,
            },
            2: {
              ...prev.players[2],
              money: Math.max(
                prev.players[2].money + prev.players[2].money_to_earn,
                prev.currentMove % 2 === 1 ? 0 : 1
              ),
              money_to_earn: 0,
            },
          },
        };
      });
    }

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', onDisconnect);
    socket.on('hosted', onHosted);
    socket.on('joined', onJoined);
    socket.on('roll', onRoll);
    socket.on('buy', onBuy);
    socket.on('nextTurn', nextTurn);
    socket.on('startGame', onStartGame);
    socket.on('confirmRoll', onConfirmRoll);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('hosted', onHosted);
      socket.off('joined', onJoined);
      socket.off('roll', onRoll);
      socket.off('buy', onBuy);
      socket.off('nextTurn', nextTurn);
      socket.off('startGame', onStartGame);
      socket.off('confirmRoll', onConfirmRoll);
    };
  }, [gameState]);

  function calculateRoll(roll: Roll) {
    let money_to_earn = {
      1: 0,
      2: 0,
    };
    const dice = roll.dice.reduce((a, b) => a + b, 0);
    const currentPlayer = roll.player;
    const players = Object.keys(gameState.players).map(Number) as Player[];
    for (const player of players) {
      const playerProperties = gameState.players[player].properties;
      const enemyPlayer = player === 1 ? 2 : 1;
      const enemyProperties = gameState.players[enemyPlayer].properties;
      for (const [name, amount] of Object.entries(playerProperties) as [
        keyof Cards,
        number
      ][]) {
        if (amount === 0) continue;
        if (!Properties[name].dice.includes(dice)) continue;
        //#Check red cards
        if (Properties[name].color === 'red') {
          if (currentPlayer === player) continue;
          let income = parseInt(Properties[name].income as string);
          if (playerProperties['shopping_mall'] > 0) income += 1;
          money_to_earn[player] += income;
          money_to_earn[currentPlayer] -= income;
        }
        //#Check blue cards
        if (Properties[name].color === 'blue') {
          let income = parseInt(Properties[name].income as string);
          money_to_earn[player] += income * playerProperties[name];
        }
        //#Check green cards
        if (Properties[name].color === 'green') {
          if (currentPlayer !== player) continue;
          let income = String(Properties[name].income).split(' ');
          if (income.length === 1) {
            money_to_earn[player] +=
              parseInt(income[0]) * playerProperties[name];
            continue;
          }
          let multiplier = 0;
          if (income[2] === 'PLAYER') {
            multiplier = players.length;
          } else if (income[2] === 'WHEAT') {
            multiplier += playerProperties['wheat_field'];
            multiplier += playerProperties['apple_orchard'];
          } else if (income[2] === 'COW') {
            multiplier += playerProperties['ranch'];
          } else if (income[2] === 'GEAR') {
            multiplier += playerProperties['forest'];
            multiplier += playerProperties['mine'];
          }
          money_to_earn[player] +=
            parseInt(income[0]) * multiplier * playerProperties[name];
        }
        //#Check purple cards
        if (Properties[name].color === 'purple') {
          if (currentPlayer !== player) continue;
          if (name === 'tv_station') {
            money_to_earn[player] += 5;
            money_to_earn[enemyPlayer] -= 5;
          }
          if (name === 'publisher') {
            let multiplier = 0;
            multiplier += enemyProperties['bakery'];
            multiplier += enemyProperties['cafe'];
            multiplier += enemyProperties['convenience_store'];
            multiplier += enemyProperties['family_restaraunt'];
            money_to_earn[player] += multiplier;
            money_to_earn[enemyPlayer] -= multiplier;
          }
        }
      }
    }
    //#Check tax office
    if (
      gameState.players[currentPlayer].properties['tax_office'] > 0 &&
      Properties['tax_office'].dice.includes(dice)
    ) {
      let enemy: Player = currentPlayer === 1 ? 2 : 1;
      let tax = Math.floor(
        (gameState.players[enemy].money + money_to_earn[enemy]) / 2
      );
      if (tax >= 5) {
        money_to_earn[currentPlayer] += tax;
        money_to_earn[enemy] -= tax;
      }
    }
    return money_to_earn;
  }

  if (winner) {
    return (
      <ThemeProvider theme={default_theme}>
        <WinLooseScreen win={winner === player} reset={resetGame} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={default_theme}>
      {!ready && <Menu roomId={roomId} />}
      {isConnected && ready && (
        <Game
          windowSize={windowSize}
          fontSize={fontSize}
          player={player}
          gameState={gameState}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
