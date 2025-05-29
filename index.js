const matches = require('./matches.js');

class Match {
  constructor({id, teamA, teamB, date, coef, result }) {
    this.id = id;
    this.teamA = teamA;
    this.teamB = teamB;
    this.date = date;
    this.coef = coef;
    this.result = result;
  }

  getMatchTitle() {
    return `${this.teamA} vs ${this.teamB}`;
  }

  getResultSummary() {
    let isBothToScore;
    isBothToScore = this.result.bothToScore === true ? "Yes" : "No";
    return `[${this.getFormattedDate()}] ${this.getMatchTitle()} — Winner: ${this.result.winner}, Both scores: ${isBothToScore}`;
  }  

  getCoefSummary() {
    return `${this.getMatchTitle()} — Coefficients:
      ${this.teamA}: ${this.coef.A},
      ${this.teamB}: ${this.coef.B},
      Draw: ${this.coef.draw};
      Both Team To Score:
      Yes - ${this.coef.bothToScoreTrue},
      No - ${this.coef.bothToScoreFalse}`
  }

  getFormattedDate() {
    const [year, month, day] = this.date.split("-");
    return `${day}.${month}.${year}`;
  }
}

const matchObjects = matches.map(data => new Match(data));
// console.log(matchObjects[0]);

class Bet {
  constructor(matchId, type, prediction, amount, coef) {
    this.matchId = matchId;
    this.type = type;
    this.prediction = prediction;
    this.amount = amount;
    this.coef = coef;
    this.isResolved = false;
    this.isWin = null;
  }

  calculatePotentialWin() {
    return this.amount * this.coef;
  }
  resolve(matchResult) {
    if (this.type === "winner") {
      this.isWin = this.prediction === matchResult.winner;
    } else if (this.type === "bothToScore") {
      this.isWin = this.prediction === matchResult.bothToScore;
    }

    this.isResolved = true;
  }
}

class User {
  constructor(initialBalance = 100) {
    this.balance = initialBalance;
    this.bets = [];
    this.initialBalance = initialBalance;
  }

  placeBet(bet) {
    if (bet.amount > this.balance) {
      console.log("Not enough money to bet.");
      return false;
    }
    this.balance -= bet.amount;
    this.bets.push(bet);
    return true;
  }

  resolveAllBets(matchObjects) {
    for (const bet of this.bets) {
      if (!bet.isResolved) {
        const match = matchObjects.find(m => m.id === bet.matchId);
        if (match) {
          bet.resolve(match.result);
          if (bet.isWin) {
            const winnings = bet.calculatePotentialWin();
            this.balance += winnings;
          }
        }
      }
    }
  }

  showFinalStats() {
    const profit = this.balance - this.initialBalance;
    const sign = profit >= 0 ? "+" : "-";
    console.log(`\nAll bets are completed. Financial result: ${sign}${Math.abs(profit).toFixed(2)}`);
  }
}