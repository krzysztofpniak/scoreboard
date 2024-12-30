# Scoreboard

## Features

- Start a new match with initial scores.
- Update scores for matches in progress.
- Finish matches to remove them from the scoreboard.
- Retrieve a summary of matches sorted by total score and start time.

## Installation

IMPORTANT!: not published on npm yet. Demo purpose only.

```bash
npm install scoreboard

```

## Usage

```ts
import { Scoreboard } from 'scoreboard';

// Create an instance of Scoreboard
const scoreboard = new Scoreboard();

// Start a new match
scoreboard.startMatch('Team A', 'Team B');

// Update the score
scoreboard.updateScore('Team A', 'Team B', 3, 2);

// Retrieve the summary
const summary = scoreboard.getSummary();
console.log(summary);

// Finish the match
scoreboard.finishMatch('Team A', 'Team B');

```

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
If total scores are equal, by most recently started match.

**Returns**: An array of match summaries.

## Development

To contribute or modify the library:


### Clone the Repository

```bash
git clone https://github.com/your-username/scoreboard.git
cd scoreboard
```

### Install Dependencies

```bash
npm install

```

### Run Tests

```bash
npm run test

```

### Run Build

```bash
npm run build

```
