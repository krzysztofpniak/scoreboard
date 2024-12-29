# Scoreboard

## Features

## Installation

## Usage

## Methods

```ts
startMatch(homeTeam: string, awayTeam: string): void
```
Starts a new match and adds it to the scoreboard.

- Parameters:
  - homeTeam: The name of the home team.
  - awayTeam: The name of the away team.
- Throws:
  - If the home or away team names are invalid or already playing.

```ts
updateScore(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number): void
```
Updates the score of an existing match.

- Parameters:
  - homeTeam: The name of the home team.
  - awayTeam: The name of the away team.
  - homeScore: The new score for the home team.
  - awayScore: The new score for the away team.
- Throws:
  - If the match is not found or scores are invalid.

```ts
finishMatch(homeTeam: string, awayTeam: string): void
```
Removes a match from the scoreboard.

- Parameters:
  - homeTeam: The name of the home team.
  - awayTeam: The name of the away team.
- Throws:
  - If the match is not found.

```ts
getSummary(): Array<{ homeTeam: string, awayTeam: string, homeScore: number, awayScore: number }>
```
Retrieves a summary of matches currently in progress. Matches are sorted:

By total score (highest first).
If scores are tied, by most recently started match.

**Returns**: An array of match summaries.

## Development
