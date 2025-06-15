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
    this.isWin = this.checkWinCondition(matchResult);
    this.isResolved = true;
  }

  checkWinCondition(matchResult) {
    if (this.type === "winner") {
      return this.prediction === matchResult.winner;
    } else if (this.type === "bothToScore") {
      return this.prediction === matchResult.bothToScore;
    }
    return false;
  }

  getDescription() {
    return `${this.type} bet on match ${this.matchId}`;
  }
}

class WinnerBet extends Bet {
  constructor(matchId, prediction, amount, coef) {
    super(matchId, "winner", prediction, amount, coef);
  }

  getDescription() {
    return `Winner bet: ${this.prediction} (coefficient: ${this.coef})`;
  }
}

class BothToScoreBet extends Bet {
  constructor(matchId, prediction, amount, coef) {
    super(matchId, "bothToScore", prediction, amount, coef);
  }

  getDescription() {
    return `Both to score: ${this.prediction ? "Yes" : "No"} (coefficient: ${this.coef})`;
  }
}

module.exports = { Bet, WinnerBet, BothToScoreBet };