class User {
  constructor(initialBalance) {
    this.balance = initialBalance;
    this.bets = [];
    this.initialBalance = initialBalance;
  }

  getDifficultyName() {
    return "Unknown";
  }

  canPlaceBet(amount) {
    return amount > 0 && amount <= this.balance;
  }

  placeBet(bet) {
    if (!this.canPlaceBet(bet.amount)) {
      console.log(this.getBetRejectionMessage(bet.amount));
      return false;
    }
    this.balance -= bet.amount;
    this.bets.push(bet);
    console.log(this.getBetConfirmationMessage(bet));
    return true;
  }

  getBetRejectionMessage(amount) {
    return `Cannot place bet of ${amount}.`;
  }

  getBetConfirmationMessage(bet) {
    return `Bet placed: ${bet.type} on match ${bet.matchId} with amount ${bet.amount}`;
  }

  resolveAllBets(matchObjects) {
    for (const bet of this.bets) {
      if (!bet.isResolved) {
        this.resolveSingleBet(bet, matchObjects);
      }
    }
  }

  resolveSingleBet(bet, matchObjects) {
    const match = matchObjects.find(m => m.id === bet.matchId);
    if (match) {
      bet.resolve(match.result);
      if (bet.isWin) {
        const winnings = bet.calculatePotentialWin();
        this.balance += winnings;
        console.log(this.getWinMessage(bet, winnings));
      } else {
        console.log(this.getLossMessage(bet));
      }
    }
  }

  getWinMessage(bet, winnings) {
    return `You won ${winnings.toFixed(2)}!`;
  }

  getLossMessage(bet) {
    return `You lost the bet.`;
  }

  showFinalStats() {
    const profit = this.balance - this.initialBalance;
    const sign = profit >= 0 ? "+" : "-";
    console.log(this.getFinalStatsMessage(profit, sign));
  }

  getFinalStatsMessage(profit, sign) {
    return `\nGame over. Result: ${sign}${Math.abs(profit).toFixed(2)}`;
  }
}

class EasyUser extends User {
  constructor() {
    super(150);
  }

  getDifficultyName() {
    return "Easy";
  }

  canPlaceBet(amount) {
    return super.canPlaceBet(amount) && amount <= this.balance * 0.5;
  }

  getBetRejectionMessage(amount) {
    return `Easy mode: Cannot bet ${amount} (max ${(this.balance * 0.5).toFixed(2)})`;
  }

  getWinMessage(bet, winnings) {
    return `Easy win! You got ${winnings.toFixed(2)}!`;
  }

  getFinalStatsMessage(profit, sign) {
    return `\nEasy mode completed. Your result: ${sign}${Math.abs(profit).toFixed(2)}`;
  }
}

class MediumUser extends User {
  constructor() {
    super(100);
  }

  getDifficultyName() {
    return "Medium";
  }

  canPlaceBet(amount) {
    return super.canPlaceBet(amount) && amount <= this.balance * 0.75;
  }

  getBetConfirmationMessage(bet) {
    return `Medium risk bet placed: ${bet.type} with ${bet.amount}`;
  }

  getFinalStatsMessage(profit, sign) {
    const percentage = (Math.abs(profit) / this.initialBalance * 100).toFixed(1);
    return `\nMedium mode completed. Result: ${sign}${Math.abs(profit).toFixed(2)} (${percentage}%)`;
  }
}

class HardUser extends User {
  constructor() {
    super(50);
  }

  getDifficultyName() {
    return "Hard";
  }

  canPlaceBet(amount) {
    return super.canPlaceBet(amount);
  }

  getBetConfirmationMessage(bet) {
    return `High risk bet! ${bet.amount} on ${bet.type}`;
  }

  getLossMessage(bet) {
    return `Hard loss! You lost ${bet.amount}`;
  }

  getFinalStatsMessage(profit, sign) {
    return `\nHardcore results: ${sign}${Math.abs(profit).toFixed(2)}`;
  }
}

module.exports = { User, EasyUser, MediumUser, HardUser };