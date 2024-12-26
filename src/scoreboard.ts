export type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: Date;
};

export class Scoreboard {
  startMatch(homeName: string, awayName: string): void {}
  updateScore(
    homeName: string,
    awayName: string,
    homePoints: number,
    awayPoints: number
  ): void {}
  finishMatch(homeName: string, awayName: string): void {}
  getSummary(): Match[] {
    return [];
  }
}
