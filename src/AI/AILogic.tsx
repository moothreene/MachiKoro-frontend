import { Cards, GameData, Player, Roll } from '../components/Types/GameTypes';
import {
  ConfirmRollHelper,
  calculateRoll,
  onBuyHelper,
  onNextTurnHelper,
  spRoll,
} from '../utils/helper';

export const AITurn = async (
  gameState: GameData,
  gameStateSetter: (value: React.SetStateAction<GameData>) => void,
  AIPlayer: Player
) => {
  function stageZero() {
    const bestRoll = getAIBestRoll(gameState, AIPlayer);
    const diceAmount = bestRoll[0] > bestRoll[1] ? 1 : 2;
    spRoll(diceAmount, AIPlayer, gameState, gameStateSetter);
  }

  function stageOne() {
    ConfirmRollHelper(gameStateSetter);
  }

  function stageTwo() {
    const prop = getAIBestProp(gameState, AIPlayer);
    if (prop) {
      onBuyHelper({ player: AIPlayer, property: prop }, gameStateSetter);
    }
  }

  function stageThree() {
    if (
      gameState.lastRoll.length > 1 &&
      gameState.lastRoll[0] === gameState.lastRoll[1] &&
      gameState.players[AIPlayer].properties['amusement_park'] > 0
    ) {
      return onNextTurnHelper(2, gameStateSetter);
    }
    return onNextTurnHelper(1, gameStateSetter);
  }

  if (gameState.stage !== 0) return;
  setTimeout(stageZero, 1000);
  setTimeout(stageOne, 2000);
  //TODO add delay for AI to roll
  //TODO add reroll logic
  setTimeout(stageTwo, 3000);
  setTimeout(stageThree, 4000);
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
  targetPlayer: Player
): keyof Cards | null {
  return null;
}
