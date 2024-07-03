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
import { ConfirmRollHelper, calculateRoll, onBuyHelper, onNextTurnHelper } from './utils/helper';
import SinglePlayer from './components/SinglePlayer';

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
  const [singlePlayer, setSinglePlayer] = useState(false);


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
      setRoomId(id);
      setPlayer(player);
      setGameState(gameData);
    }

    function onDisconnect() {
      setIsConnected(false);
      setRoomId('');
    }

    function onRoll(msg: Roll) {
      const money_to_earn = calculateRoll(msg, gameState);
      const gameStateNew = {
        ...gameState,
        stage:1,
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
      onBuyHelper(msg, setGameState);
    }

    function nextTurn(amount: number) {
      onNextTurnHelper(amount, setGameState);
    }

    function onConfirmRoll() {
      ConfirmRollHelper(setGameState);
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

  if (winner) {
    return (
      <ThemeProvider theme={default_theme}>
        <WinLooseScreen win={winner === player} reset={resetGame} setSingle={setSinglePlayer} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={default_theme}>
      {!ready && !singlePlayer && (
        <Menu roomId={roomId} setSinglePlayer={setSinglePlayer} />
      )}
      {singlePlayer && (
        <SinglePlayer
          windowSize={windowSize}
          fontSize={fontSize}
          player={player}
          gameState={gameState}
          gameStateSetter={setGameState}
        />
      )}
      {isConnected && ready && (
        <Game
          windowSize={windowSize}
          fontSize={fontSize}
          player={player}
          gameState={gameState}
          gameStateSetter={setGameState}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
