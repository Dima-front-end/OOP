const listOfMatches = [
  {
    id: 1,
    teamA: "Barcelona",
    teamB: "Real Madrid",
    date: "2025-05-11",
    coef: {
      A: 2.5,
      B: 2.3,
      draw: 3.8,
      bothToScoreTrue: 1.4,
      bothToScoreFalse: 2.75
    },
    result: {
      winner: "Barcelona",
      bothToScore: true
    }
  },
  {
    id: 2,
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
      winner: "Tottenham",
      bothToScore: false
    }
  },
  {
    id: 3,
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
      winner: "Paris Saint-Germain",
      bothToScore: true
    }
  },
  {
    id: 4,
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
      winner: "Chelsea",
      bothToScore: true
    }
  },
  {
    id: 5,
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
      winner: "Bournemouth",
      bothToScore: false
    }
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
      winner: "Bayer 04",
      bothToScore: true
    }
  },
];

module.exports = listOfMatches;