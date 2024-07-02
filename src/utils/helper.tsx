import {
  Buy,
  Cards,
  GameData,
  Player,
  Roll,
} from '../components/Types/GameTypes';
import { Properties } from '../data/Properties';

export const calculateRoll = (roll: Roll, gameState: GameData) => {
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
        let multiplier = 0;
        multiplier += playerProperties[name];
        console.log(multiplier);
        money_to_earn[player] += income * multiplier;
        money_to_earn[currentPlayer] -= income * multiplier;
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
        let addition = playerProperties['shopping_mall'] > 0 ? 1 : 0;
        if (income.length === 1) {
          money_to_earn[player] +=
            (parseInt(income[0]) + +addition) * playerProperties[name];
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
          (parseInt(income[0]) + addition) *
          multiplier *
          playerProperties[name];
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
};
export const ConfirmRollHelper = (
  gameStateSetter: (value: React.SetStateAction<GameData>) => void
) => {
  gameStateSetter((prev: GameData) => {
    return {
      ...prev,
      stage: 2,
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
};

export const onBuyHelper = (
  msg: Buy,
  gameStateSetter: (value: React.SetStateAction<GameData>) => void
) => {
  gameStateSetter((prev) => {
    return {
      ...prev,
      stage: 3,
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
          money: prev.players[msg.player].money - Properties[msg.property].cost,
        },
      },
    };
  });
};

export const onNextTurnHelper = (
  amount: number,
  gameStateSetter: (value: React.SetStateAction<GameData>) => void
) => {
  gameStateSetter((prev) => {
    return { ...prev, currentMove: prev.currentMove + amount, stage: 0 };
  });
};
