export type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: Date;
};

const isValidTeamName = (name: string): boolean =>
  name != null && name.length > 0;

const isNaturalNumber = (n: number): boolean => Number.isInteger(n) && n >= 0;

export class Scoreboard {
  matches: Match[] = [];

  ensureMatchExists(homeTeam: string, awayTeam: string) {
    if (
      !this.matches.some(
        (m) => m.homeTeam === homeTeam && m.awayTeam === awayTeam
      )
    ) {
      throw new Error(`Match between ${homeTeam} and ${awayTeam} not found`);
    }
  }
  startMatch(homeTeam: string, awayTeam: string): void {
    if (!isValidTeamName(homeTeam)) {
      throw new Error('Home team name cannot be an empty string');
    }

    if (!isValidTeamName(awayTeam)) {
      throw new Error('Away team name cannot be an empty string');
    }

    if (homeTeam === awayTeam) {
      throw new Error('Home and away team names must be different');
    }

    if (
      this.matches.some(
        (m) => m.homeTeam === homeTeam && m.awayTeam === awayTeam
      )
    ) {
      throw new Error(
        `Match between ${homeTeam} and ${awayTeam} is already started`
      );
    }

    this.matches.push({
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
    });
  }
  updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ): void {
    if (!isNaturalNumber(homeScore) || !isNaturalNumber(awayScore)) {
      throw new Error('Scores must be natural numbers');
    }

    this.ensureMatchExists(homeTeam, awayTeam);

    this.matches = this.matches.map((m) =>
      m.homeTeam === homeTeam && m.awayTeam === awayTeam
        ? {...m, homeScore, awayScore}
        : m
    );
  }
  finishMatch(homeTeam: string, awayTeam: string): void {
    this.ensureMatchExists(homeTeam, awayTeam);

    this.matches = this.matches.filter(
      (m) => m.homeTeam !== homeTeam || m.awayTeam !== awayTeam
    );
  }
  getSummary(): Match[] {
    return [...this.matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;

      return totalScoreA !== totalScoreB
        ? totalScoreB - totalScoreA
        : b.startTime.getTime() - a.startTime.getTime();
    });
  }
}
