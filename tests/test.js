const assert = require('assert');
const Match = require('../modules/match.js');
const Bet = require('../modules/Bet.js');
const { EasyUser, MediumUser, HardUser } = require('../modules/User.js');



const mockMatchData = {
  id: 1,
  teamA: "Team A",
  teamB: "Team B",
  date: "2023-12-01",
  result: {
    winner: "Team A",
    bothToScore: true
  },
  coef: {
    A: 2.0,
    B: 3.5,
    draw: 3.0,
    bothToScoreTrue: 1.8,
    bothToScoreFalse: 2.2
  }
};

const match = new Match(mockMatchData);

function testEasyUserWin() {
  const user = new EasyUser();
  const startingBalance = user.balance;
  const betAmount = 50;
  const bet = new Bet(match.id, 'winner', 'Team A', betAmount, match.coef.A);

  const success = user.placeBet(bet);
  assert.strictEqual(success, true, "Bet should be placed successfully");
  assert.strictEqual(user.balance, startingBalance - betAmount, "Balance should decrease after placing a bet");

  bet.resolve(match.result);

  assert.strictEqual(bet.isWin, true, "Bet should be a win");
  user.balance += bet.calculatePotentialWin();

  const expectedBalance = startingBalance - betAmount + (betAmount * match.coef.A);
  assert.strictEqual(user.balance, expectedBalance, "Balance should update after winning");
}

function testHardUserLoss() {
  const user = new HardUser();
  const startingBalance = user.balance;
  const betAmount = 25;
  const bet = new Bet(match.id, 'bothToScore', false, betAmount, match.coef.bothToScoreFalse);

  const success = user.placeBet(bet);
  assert.strictEqual(success, true, "Bet should be placed successfully");
  assert.strictEqual(user.balance, startingBalance - betAmount, "Balance should decrease after placing a bet");

  bet.resolve(match.result);
  assert.strictEqual(bet.isWin, false, "Bet should be a loss");

  const expectedBalance = startingBalance - betAmount;
  assert.strictEqual(user.balance, expectedBalance, "Balance should remain unchanged after losing");
}

function runTests() {
  testEasyUserWin();
  testHardUserLoss();
  console.log("All tests passed!");
}

runTests();
