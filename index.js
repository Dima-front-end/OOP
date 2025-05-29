const matches = [
  {
    teamA: "Barcelona",
    teamB: "Real Madrid",
    date: "2025-05-11",
    coef: {
      A: 2.5,
      B: 2.3,
      draw: 3.8,
      bothToScoreTrue: 1.4,
      bothToScoreFlase: 2.75
    },
    result: {
      winner: "A",
      bothToScore: true
    }
  },
  {
    teamA: "Tottenham",
    teamB: "Manchester United",
    date: "2025-05-21",
    coef: {
      A: 2.2,
      B: 3.0,
      draw: 3.5,
      bothToScoreTrue: 2.1,
      bothToScoreFalse: 1.7
    },
    result: {
      winner: "A",
      bothToScore: false
    }
  },
  {
    teamA: "Paris Saint-Germain",
    teamB: "Arsenal",
    date: "2025-05-07",
    coef: {
      A: 2.1,
      B: 3.2,
      draw: 3.6,
      bothToScoreTrue: 1.65,
      bothToScoreFalse: 2.2
    },
    result: {
      winner: "A",
      bothToScore: true
    }
  },
  {
    teamA: "Chelsea",
    teamB: "Liverpool",
    date: "2025-05-04",
    coef: {
      A: 3.0,
      B: 2.2,
      draw: 3.8,
      bothToScoreTrue: 1.5,
      bothToScoreFalse: 2.5
    },
    result: {
      winner: "A",
      bothToScore: true
    }
  },
  {
    teamA: "Bournemouth",
    teamB: "Lester City",
    date: "2025-05-25",
    coef: {
      A: 2.4,
      B: 2.9,
      draw: 3.3,
      bothToScoreTrue: 1.8,
      bothToScoreFalse: 1.95
    },
    result: {
      winner: "A",
      bothToScore: false
    }
  },
  {
    teamA: "Manchester City",
    teamB: "Southampton",
    date: "2025-10-05",
    coef: {
      A: 1.25,
      B: 9.0,
      draw: 5.5,
      bothToScoreTrue: 1.45,
      bothToScoreFalse: 2.75
    },
    result: {
      winner: "draw",
      bothToScore: false
    }
  },
  {
    teamA: "Bayern Munich",
    teamB: "Leipzig FC",
    date: "2025-05-03",
    coef: {
      A: 2.0,
      B: 3.2,
      draw: 4.0,
      bothToScoreTrue: 1.3,
      bothToScoreFalse: 3.4
    },
    result: {
      winner: "draw",
      bothToScore: true
    }
  },
  {
    teamA: "Juventus",
    teamB: "Bologna FC",
    date: "2025-05-04",
    coef: {
      A: 2.5,
      B: 2.75,
      draw: 3.2,
      bothToScoreTrue: 1.65,
      bothToScoreFalse: 2.2
    },
    result: {
      winner: "draw",
      bothToScore: true
    }
  },
  {
    teamA: "Lazio FC",
    teamB: "Inter",
    date: "2025-05-18",
    coef: {
      A: 4.2,
      B: 1.8,
      draw: 3.6,
      bothToScoreTrue: 1.5,
      bothToScoreFalse: 2.5
    },
    result: {
      winner: "draw",
      bothToScore: true
    }
  },
  {
    teamA: "Borussia Dortmund",
    teamB: "Bayer 04",
    date: "2025-05-11",
    coef: {
      A: 2.9,
      B: 2.1,
      draw: 3.75,
      bothToScoreTrue: 1.35,
      bothToScoreFalse: 3.1
    },
    result: {
      winner: "B",
      bothToScore: true
    }
  },
];

class Match {
  constructor({ teamA, teamB, date, coef, result }) {
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
    return `${this.getMatchTitle()} — Winner: ${this.result.winner}, Both scores: ${isBothToScore}`;
  }  
}

const matchObjects = matches.map(data => new Match(data));