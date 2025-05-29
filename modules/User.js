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

module.exports = { User, EasyUser, MediumUser, HardUser };