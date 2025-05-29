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

class Participant {
  constructor(name, initialBalance) {
    this.name = name;
    this.balance = initialBalance;
    this.bets = [];
  }

  getRole() {
    return "Participant";
  }

  interact() {
    console.log(`${this.name} interacts with the system.`);
  }
}

class User{
  constructor(initialBalance) {
    this.balance = initialBalance;
    this.bets = [];
    this.initialBalance = initialBalance;
  }

  getDifficultyName() {
    return "Unknown";
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

  getWelcomeMessage() {
    return `Welcome, regular user! Your balance is ${this.balance}`;
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

class EasyUser extends User {
  constructor() {
    super(150);
  }

  getDifficultyName() {
    return "Easy";
  }
}

class MediumUser extends User {
  constructor() {
    super(100);
  }

  getDifficultyName() {
    return "Medium";
  }
}

class HardUser extends User {
  constructor() {
    super(50);
  }

  getDifficultyName() {
    return "Hard";
  }
}


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let user;

function askUserType() {
  rl.question("Choose difficulty (easy / medium / hard): ", (answer) => {
    switch(answer.toLowerCase()) {
      case "easy":
        user = new EasyUser();
        console.log("You selected Easy difficulty. Starting balance: 150");
        break;
      case "medium":
        user = new MediumUser();
        console.log("You selected Medium difficulty. Starting balance: 100");
        break;
      case "hard":
        user = new HardUser();
        console.log("You selected Hard difficulty. Starting balance: 50");
        break;
      default:
        console.log("Invalid difficulty. Exiting.");
        rl.close();
        return;
    }

    askBet();
  });
}


askUserType();


function showAvailableMatches() {
  console.log("\nAvailable matches:");
  matchObjects.forEach(match => {
    const alreadyBet = user.bets.some(bet => bet.matchId === match.id);
    if (!alreadyBet) {
      console.log(`${match.id}: ${match.getMatchTitle()} on ${match.date}`);
    }
  });
}

function askBet() {
  const availableMatches = matchObjects.filter(
    match => !user.bets.some(bet => bet.matchId === match.id)
  );

  if (availableMatches.length === 0) {
    console.log("\nNo more available matches to bet on.");
    user.resolveAllBets(matchObjects);
    user.showFinalStats();
    rl.close();
    return;
  }

  showAvailableMatches();

  rl.question('\nEnter match ID to bet on or type "exit": ', (matchIdInput) => {
    if (matchIdInput.toLowerCase() === 'exit') {
      user.resolveAllBets(matchObjects);
      user.showFinalStats();
      rl.close();
      return;
    }

    const matchId = parseInt(matchIdInput);
    const match = matchObjects.find(m => m.id === matchId);

    if (!match || user.bets.some(b => b.matchId === matchId)) {
      console.log("Invalid or already bet match ID.");
      askBet();
      return;
    }

    rl.question('Choose bet type (winner / bothToScore): ', (type) => {
      if (type !== 'winner' && type !== 'bothToScore') {
        console.log("Invalid bet type.");
        askBet();
        return;
      }

      rl.question(`Enter your prediction (${type === 'winner' ? `${match.teamA} / ${match.teamB} / draw` : 'true / false'}): `, (predictionInput) => {
        const prediction = type === 'winner' ? predictionInput : predictionInput === 'true';

        rl.question('Enter amount to bet: ', (amountInput) => {
          const amount = parseFloat(amountInput);
          if (isNaN(amount) || amount <= 0) {
            console.log("Invalid amount.");
            askBet();
            return;
          }

          let coef;
          if (type === 'winner') {
            if (prediction === match.teamA) coef = match.coef.A;
            else if (prediction === match.teamB) coef = match.coef.B;
            else if (prediction === 'draw') coef = match.coef.draw;
            else {
              console.log("Invalid winner prediction.");
              askBet();
              return;
            }
          } else {
            coef = prediction === true ? match.coef.bothToScoreTrue : match.coef.bothToScoreFalse;
          }

          const bet = new Bet(match.id, type, prediction, amount, coef);
          const success = user.placeBet(bet);

          if (success) {
            const match = matchObjects.find(m => m.id === bet.matchId);

            bet.resolve(match.result);
            if (bet.isWin) {
              const winnings = bet.calculatePotentialWin();
              user.balance += winnings;
              console.log(`You won the bet! Win: ${winnings.toFixed(2)}`);
            } else {
              console.log(`You lost the bet.`);
            }
            console.log(`Сurrent balance: ${user.balance.toFixed(2)}`);
          }

          askBet();
        });
      });
    });
  });
}