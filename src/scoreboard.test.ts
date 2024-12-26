import {Scoreboard} from './scoreboard';

describe('Scoreboard', () => {
  describe('startMatch', () => {
    it.todo('should start match with current time and 0 - 0 score');
    it.todo('should throw when home or away names are empty strings');
    it.todo('should throw when home and away names are the same');
    it.todo('should throw when scores are not natural numbers');
    it.todo('should throw when starting an already started match');
  });
  describe('updateScore', () => {
    it.todo('should update match score');
    it.todo('should not modify other matches scores');
    it.todo('should throw when match is not found');
    it.todo('should throw when scores are not natural numbers');
  });
  describe('finishMatch', () => {
    it.todo('should remove match');
    it.todo('should not modify other matches');
    it.todo('should throw when match is not found');
  });
  describe('getSummary', () => {
    it.todo('should return summary order by total score');
    it.todo('should return summary with most recently started match for ties');
    it.todo('should return empty array when no matches in progress');
  });
});
