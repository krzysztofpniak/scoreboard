import {advanceTo, advanceBy} from 'jest-date-mock';
import {Scoreboard} from './scoreboard';

describe('Scoreboard', () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  describe('startMatch', () => {
    it('should start match with current time and 0 - 0 score', () => {
      //arrange
      advanceTo(new Date(2024, 11, 26));

      //act
      scoreboard.startMatch('Team A', 'Team B');

      //assert
      const summary = scoreboard.getSummary();
      expect(summary).toEqual([
        {
          homeTeam: 'Team A',
          awayTeam: 'Team B',
          homeScore: 0,
          awayScore: 0,
          startTime: new Date(2024, 11, 26),
        },
      ]);
    });
    it('should throw when home or away names are empty strings', () => {
      expect(() => {
        scoreboard.startMatch('', 'Team B');
      }).toThrow('Home team name cannot be an empty string');

      expect(() => {
        scoreboard.startMatch('Team A', '');
      }).toThrow('Away team name cannot be an empty string');
    });
    it('should throw when home and away names are the same', () => {
      expect(() => {
        scoreboard.startMatch('Team A', 'Team A');
      }).toThrow('Home and away team names must be different');
    });
    it('should throw when starting an already started match', () => {
      scoreboard.startMatch('Team A', 'Team B');

      expect(() => {
        scoreboard.startMatch('Team A', 'Team B');
      }).toThrow('Match between Team A and Team B is already started');
    });
  });
  describe('updateScore', () => {
    it('should update match score', () => {
      //arrange
      scoreboard.startMatch('Team A', 'Team B');

      //act
      scoreboard.updateScore('Team A', 'Team B', 3, 2);

      //assert
      const match = scoreboard
        .getSummary()
        .find((m) => m.homeTeam === 'Team A' && m.awayTeam === 'Team B');

      expect(match).toBeDefined();
      expect(match?.homeScore).toBe(3);
      expect(match?.awayScore).toBe(2);
    });
    it('should not modify other matches scores', () => {
      //arrange
      scoreboard.startMatch('Team A', 'Team B');
      scoreboard.startMatch('Team C', 'Team D');

      //act
      scoreboard.updateScore('Team A', 'Team B', 3, 2);

      //assert
      const otherMatch = scoreboard
        .getSummary()
        .find((m) => m.homeTeam === 'Team C' && m.awayTeam === 'Team D');

      expect(otherMatch).toBeDefined();
      expect(otherMatch?.homeScore).toBe(0);
      expect(otherMatch?.awayScore).toBe(0);
    });
    it('should throw when match is not found', () => {
      expect(() => {
        scoreboard.updateScore('Nonexistent Team', 'Another Team', 1, 1);
      }).toThrow('Match between Nonexistent Team and Another Team not found');
    });
    it('should throw when scores are not natural numbers', () => {
      expect(() => {
        scoreboard.updateScore('Team A', 'Team B', -1, 2);
      }).toThrow('Scores must be natural numbers');

      expect(() => {
        scoreboard.updateScore('Team A', 'Team B', 1.5, 2);
      }).toThrow('Scores must be natural numbers');

      expect(() => {
        scoreboard.updateScore('Team A', 'Team B', 1, 'two' as any);
      }).toThrow('Scores must be natural numbers');
    });
  });
  describe('finishMatch', () => {
    it('should remove match', () => {
      //arrange
      scoreboard.startMatch('Team A', 'Team B');

      //act
      scoreboard.finishMatch('Team A', 'Team B');

      //assert
      const match = scoreboard
        .getSummary()
        .find((m) => m.homeTeam === 'Team A' && m.awayTeam === 'Team B');

      expect(match).toBeUndefined();
    });
    it('should not modify other matches', () => {
      //arrange
      scoreboard.startMatch('Team A', 'Team B');
      scoreboard.startMatch('Team B', 'Team C');
      scoreboard.startMatch('Team A', 'Team C');

      //act
      scoreboard.finishMatch('Team A', 'Team B');

      //assert
      const remainingMatch1 = scoreboard
        .getSummary()
        .find((m) => m.homeTeam === 'Team B' && m.awayTeam === 'Team C');

      expect(remainingMatch1).toBeDefined();
      expect(remainingMatch1?.homeTeam).toBe('Team B');
      expect(remainingMatch1?.awayTeam).toBe('Team C');

      const remainingMatch2 = scoreboard
        .getSummary()
        .find((m) => m.homeTeam === 'Team A' && m.awayTeam === 'Team C');

      expect(remainingMatch2).toBeDefined();
      expect(remainingMatch2?.homeTeam).toBe('Team A');
      expect(remainingMatch2?.awayTeam).toBe('Team C');
    });
    it('should throw when match is not found', () => {
      expect(() => {
        scoreboard.finishMatch('Nonexistent Team', 'Another Team');
      }).toThrow('Match between Nonexistent Team and Another Team not found');
    });
  });
  describe('getSummary', () => {
    it('should return summary order by total score', () => {
      //arrange
      advanceTo(new Date(2024, 11, 26));
      scoreboard.startMatch('Team A', 'Team B');
      scoreboard.updateScore('Team A', 'Team B', 2, 1);

      scoreboard.startMatch('Team C', 'Team D');
      scoreboard.updateScore('Team C', 'Team D', 1, 1);

      scoreboard.startMatch('Team E', 'Team F');
      scoreboard.updateScore('Team E', 'Team F', 4, 2);

      //act
      const summary = scoreboard.getSummary();

      //assert
      expect(summary).toEqual([
        {
          awayScore: 2,
          awayTeam: 'Team F',
          homeScore: 4,
          homeTeam: 'Team E',
          startTime: new Date(2024, 11, 26, 0, 0, 0),
        },
        {
          awayScore: 1,
          awayTeam: 'Team B',
          homeScore: 2,
          homeTeam: 'Team A',
          startTime: new Date(2024, 11, 26, 0, 0, 0),
        },
        {
          awayScore: 1,
          awayTeam: 'Team D',
          homeScore: 1,
          homeTeam: 'Team C',
          startTime: new Date(2024, 11, 26, 0, 0, 0),
        },
      ]);
    });
    it('should return summary with most recently started match for equal total scores', () => {
      //arrange
      advanceTo(new Date(2024, 11, 26));

      scoreboard.startMatch('Team A', 'Team B');
      scoreboard.updateScore('Team A', 'Team B', 0, 4);
      advanceBy(100);

      scoreboard.startMatch('Team C', 'Team D');
      scoreboard.updateScore('Team C', 'Team D', 1, 3);
      advanceBy(100);

      scoreboard.startMatch('Team E', 'Team F');
      scoreboard.updateScore('Team E', 'Team F', 2, 2);

      //act
      const summary = scoreboard.getSummary();

      //assert
      expect(summary).toEqual([
        {
          awayScore: 2,
          awayTeam: 'Team F',
          homeScore: 2,
          homeTeam: 'Team E',
          startTime: new Date(2024, 11, 26, 0, 0, 0, 200),
        },
        {
          awayScore: 3,
          awayTeam: 'Team D',
          homeScore: 1,
          homeTeam: 'Team C',
          startTime: new Date(2024, 11, 26, 0, 0, 0, 100),
        },
        {
          awayScore: 4,
          awayTeam: 'Team B',
          homeScore: 0,
          homeTeam: 'Team A',
          startTime: new Date(2024, 11, 26, 0, 0, 0, 0),
        },
      ]);
    });
    it('should return empty array when no matches in progress', () => {
      const matches = scoreboard.getSummary();
      expect(matches).toEqual([]);
      expect(matches.length).toBe(0);
    });
  });
});
