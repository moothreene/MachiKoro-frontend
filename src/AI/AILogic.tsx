import { RefObject, useEffect, useRef } from 'react';
import { Cards, GameData, Player, Roll } from '../components/Types/GameTypes';
import { Properties } from '../data/Properties';
import {
  ConfirmRollHelper,
  calculateRoll,
  onBuyHelper,
  onNextTurnHelper,
  spRoll,
} from '../utils/helper';

export const AITurn = async (
  gameState: RefObject<GameData>,
  gameStateSetter: (value: React.SetStateAction<GameData>) => void,
  AIPlayer: Player,
  setHighlighted: (value: string | null) => void
) => {
  const strategies = [
    'random',
    'one_die',
    'bakery',
    'convenience',
    'cheese',
    'furniture',
  ];

  let strategy = strategies[Math.floor(Math.random() * strategies.length)];

  function stageZero(current: GameData | null) {
    if (!current) return;
    const bestRoll = getAIBestRoll(current, AIPlayer);
    const diceAmount = bestRoll[0] > bestRoll[1] ? 1 : 2;
    spRoll(diceAmount, AIPlayer, current, gameStateSetter);
  }

  function stageOne() {
    ConfirmRollHelper(gameStateSetter);
  }

  function stageTwo(current: GameData | null) {
    if (!current) return;
    //strategy = evalStrategy(current, AIPlayer, strategy);
    const prop = getAIBestProp(current, AIPlayer, 'one_die');
    if (prop !== null) {
      let turns = 1;
      if (
        current.lastRoll.length > 1 &&
        current.lastRoll[0] === current.lastRoll[1] &&
        current.players[AIPlayer].properties['amusement_park'] > 0
      ) {
        turns = 2;
      }
      onBuyHelper({ player: AIPlayer, property: prop, turns:turns }, gameStateSetter);
      setHighlighted(prop);
    }else{
      setHighlighted('none');
    }
  }

  function stageThree(current: GameData | null) {
    if (!current) return;
    if (2 - (current.currentMove % 2) !== AIPlayer) return;
    if (
      current.lastRoll.length > 1 &&
      current.lastRoll[0] === current.lastRoll[1] &&
      current.players[AIPlayer].properties['amusement_park'] > 0
    ) {
      return onNextTurnHelper(2, gameStateSetter);
    }
    return onNextTurnHelper(1, gameStateSetter);
  }

  if (gameState.current?.stage !== 0) return;
  setTimeout(() => stageZero(gameState.current), 1000);
  setTimeout(() => stageOne(), 2000);
  setTimeout(() => stageTwo(gameState.current), 3000);
  setTimeout(() => stageThree(gameState.current), 3100);
};

function getAIBestRoll(gameState: GameData, targetPlayer: Player) {
  let oneDieExpected = 0;
  let twoDieExpected = 0;

  // Calculate expected value of one die
  const oneDieResults = getAllDiceResults(1);
  for (let result of oneDieResults) {
    const roll: Roll = {
      dice: result,
      player: targetPlayer,
    };
    oneDieExpected += calculateRoll(roll, gameState)[targetPlayer];
  }
  oneDieExpected /= oneDieResults.length;

  // Calculate expected value of two dice
  const twoDieResults = getAllDiceResults(2);
  for (let result of twoDieResults) {
    const roll: Roll = {
      dice: result,
      player: targetPlayer,
    };
    twoDieExpected += calculateRoll(roll, gameState)[targetPlayer];
  }
  twoDieExpected /= twoDieResults.length;

  return [oneDieExpected, twoDieExpected];
}

function getAllDiceResults(num: 1 | 2) {
  let results = [] as number[][];
  for (let i = 1; i <= 6; i++) {
    if (num === 1) {
      results.push([i]);
    } else {
      for (let j = 1; j <= 6; j++) {
        results.push([i, j]);
      }
    }
  }
  return results;
}

function getAIBestProp(
  gameState: GameData,
  targetPlayer: Player,
  strategy: string
): keyof Cards | null {
  if (strategy === 'random') {
    return strategyRandom(gameState, targetPlayer);
  }
  if (strategy === 'one_die') {
    return strategyOneDie(gameState, targetPlayer);
  }
  if (strategy === 'bakery') {
    //
  }
  return null;
}

function evalStrategy(
  gameState: GameData,
  targetPlayer: Player,
  strategy: string
): string {
  const enemyPlayer = targetPlayer === 1 ? 2 : 1;
  let options = [] as string[];
  switch (strategy) {
    case 'random':
      return 'random';
    case 'bakery':
      if (
        gameState.players[enemyPlayer].properties['bakery'] <= 3 &&
        gameState.players[targetPlayer].properties['bakery'] >=
          gameState.players[enemyPlayer].properties['bakery']
      ) {
        return 'bakery';
      } else {
        return changeStrategy(gameState, targetPlayer);
      }
    case 'convenience':
      if (
        gameState.players[enemyPlayer].properties['convenience_store'] <= 2 &&
        gameState.players[targetPlayer].properties['convenience_store'] >=
          gameState.players[enemyPlayer].properties['convenience_store']
      ) {
        return 'convenience';
      } else {
        return changeStrategy(gameState, targetPlayer);
      }
    case 'cheese':
      if (
        gameState.players[enemyPlayer].properties['ranch'] <= 2 &&
        gameState.players[targetPlayer].properties['ranch'] >=
          gameState.players[enemyPlayer].properties['ranch']
      ) {
        return 'cheese';
      } else {
        return changeStrategy(gameState, targetPlayer);
      }
    case 'furniture':
      if (
        gameState.players[enemyPlayer].properties['forest'] <= 2 &&
        gameState.players[targetPlayer].properties['forest'] >=
          gameState.players[enemyPlayer].properties['forest']
      ) {
        return 'furniture';
      } else {
        return changeStrategy(gameState, targetPlayer);
      }
    case 'one_die':
      return 'one_die';
  }
  return '';
}

function changeStrategy(gameState: GameData, targetPlayer: Player): string {
  let options = ['one_die'] as string[];
  if (
    gameState.players[targetPlayer].properties['bakery'] +
      gameState.store['bakery'] >=
    6
  ) {
    options.push('bakery');
  }
  if (
    gameState.players[targetPlayer].properties['convenience_store'] +
      gameState.store['convenience_store'] >=
    6
  ) {
    options.push('convenience');
  }
  if (
    gameState.players[targetPlayer].properties['ranch'] +
      gameState.store['ranch'] >=
    6
  ) {
    options.push('cheese');
  }
  if (
    gameState.players[targetPlayer].properties['forest'] +
      gameState.store['forest'] >=
    6
  ) {
    options.push('furniture');
  }
  return options[Math.floor(Math.random() * options.length)];
}

function strategyRandom(
  gameState: GameData,
  targetPlayer: Player
): keyof Cards | null {
  const options = [null] as (keyof Cards | null)[];
  for (let prop of Object.keys(gameState.store) as (keyof Cards)[]) {
    if (
      gameState.store[prop] > 0 &&
      gameState.players[targetPlayer].money >= Properties[prop].cost
    ) {
      options.push(prop);
    }
  }
  return options[Math.floor(Math.random() * options.length)];
}

function strategyOneDie(
  gameState: GameData,
  targetPlayer: Player
): keyof Cards | null {
  let options = [] as (keyof Cards)[];
  const target = {
    wheat_field: 2,
    ranch: 2,
    forest: 2,
    cafe: 2,
    convenience_store: 2,
    bakery: 2,
    family_restaraunt: 1,
    tv_station: 1,
    train_station: 0.5,
    shopping_mall: 5,
    amusement_park: 10,
    radio_tower: 10,
  };
  const singleProps = [
    'publisher',
    'tv_station',
    'tax_office',
    'train_station',
    'shopping_mall',
    'amusement_park',
    'radio_tower',
  ];
  const enemyPlayer = targetPlayer === 1 ? 2 : 1;
  for (let prop of Object.keys(target) as (keyof typeof target)[]) {
    if (gameState.store[prop] === 0) {
      continue;
    }
    if (gameState.players[targetPlayer].money < Properties[prop].cost) {
      continue;
    }
    if (target[prop] <= gameState.players[targetPlayer].properties[prop]) {
      continue;
    }
    if (
      singleProps.includes(prop) &&
      gameState.players[targetPlayer].properties[prop] > 0
    ) {
      continue;
    }
    if (
      prop === 'family_restaraunt' &&
      gameState.players[enemyPlayer].properties['train_station'] === 0
    ) {
      continue;
    }
    let propsArr = new Array(
      (target[prop] - gameState.players[targetPlayer].properties[prop]) * 2
    ).fill(prop);
    options.push(...propsArr);
  }
  if (options.length === 0) {
    return null;
  }
  return options[Math.floor(Math.random() * options.length)];
}

function strategyBakery(
  gameState: GameData,
  targetPlayer: Player
): keyof Cards | null {
  let options = [] as (keyof Cards)[];
  const target = {
    wheat_field: 2,
    ranch: 2,
    forest: 2,
    cafe: 2,
    convenience_store: 2,
    bakery: 2,
    family_restaraunt: 1,
    tv_station: 1,
    train_station: 1,
    shopping_mall: 1,
    amusement_park: 1,
    radio_tower: 1,
  };
  const singleProps = [
    'publisher',
    'tv_station',
    'tax_office',
    'train_station',
    'shopping_mall',
    'amusement_park',
    'radio_tower',
  ];
  const enemyPlayer = targetPlayer === 1 ? 2 : 1;
  for (let prop of Object.keys(target) as (keyof typeof target)[]) {
    if (gameState.store[prop] === 0) {
      continue;
    }
    if (gameState.players[targetPlayer].money < Properties[prop].cost) {
      continue;
    }
    if (target[prop] <= gameState.players[targetPlayer].properties[prop]) {
      continue;
    }
    if (
      singleProps.includes(prop) &&
      gameState.players[targetPlayer].properties[prop] > 0
    ) {
      continue;
    }
    if (
      prop === 'family_restaraunt' &&
      gameState.players[enemyPlayer].properties['train_station'] === 0
    ) {
      continue;
    }
    let propsArr = new Array(
      (target[prop] - gameState.players[targetPlayer].properties[prop]) * 2
    ).fill(prop);
    options.push(...propsArr);
  }
  if (options.length === 0) {
    return null;
  }
  return options[Math.floor(Math.random() * options.length)];
}
