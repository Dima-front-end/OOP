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

module.exports = Bet;