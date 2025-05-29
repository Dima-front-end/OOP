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

module.exports = Match;