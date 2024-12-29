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

/**
 * A class to manage a scoreboard for matches, including updating, and summarizing match scores.
 */
export class Scoreboard {
  private matches: Match[] = [];

  /**
   * Validates that a match exists.
   * @private
   * @param {string} homeTeam - The name of the home team.
   * @param {string} awayTeam - The name of the away team.
   * @throws {Error} If the match does not exist.
   */
  private ensureMatchExists(homeTeam: string, awayTeam: string) {
    if (
      !this.matches.some(
        (m) => m.homeTeam === homeTeam && m.awayTeam === awayTeam
      )
    ) {
      throw new Error(`Match between ${homeTeam} and ${awayTeam} not found`);
    }
  }
  /**
   * Starts a new match and adds it to the scoreboard.
   * @param {string} homeTeam - The name of the home team.
   * @param {string} awayTeam - The name of the away team.
   * @throws {Error} If the home or away team names are invalid or already playing.
   */
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
  /**
   * Updates the score of an existing match.
   * @param {string} homeTeam - The name of the home team.
   * @param {string} awayTeam - The name of the away team.
   * @param {number} homeScore - The new score for the home team.
   * @param {number} awayScore - The new score for the away team.
   * @throws {Error} If the match is not found or scores are invalid.
   */
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
  /**
   * Removes a match from the scoreboard.
   * @param {string} homeTeam - The name of the home team.
   * @param {string} awayTeam - The name of the away team.
   * @throws {Error} If the match is not found.
   */
  finishMatch(homeTeam: string, awayTeam: string): void {
    this.ensureMatchExists(homeTeam, awayTeam);

    this.matches = this.matches.filter(
      (m) => m.homeTeam !== homeTeam || m.awayTeam !== awayTeam
    );
  }
  /**
   * Retrieves a summary of matches currently in progress.
   * Matches are ordered by total score (highest first).
   * If total scores are the same, matches are ordered by the most recently started.
   * @returns {Array<{ homeTeam: string, awayTeam: string, homeScore: number, awayScore: number }>}
   */
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
