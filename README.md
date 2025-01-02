# Memory Card Game

A fun and interactive memory card game built with HTML, CSS, and JavaScript. Test your memory by matching pairs of cards while racing against time!

## Features

- Three difficulty levels:
  - Easy (4x4 grid)
  - Medium (6x6 grid)
  - Hard (8x8 grid)
- Score tracking
- Timer
- Sound effects
- Responsive design for mobile and desktop
- Score submission system

## Setup Instructions

1. Prerequisites:
   - XAMPP or similar local server environment
   - MySQL database

2. Database Setup:
   ```sql
   CREATE DATABASE memorygame;
   USE memorygame;
   
   CREATE TABLE scores (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) NOT NULL,
       level VARCHAR(20) NOT NULL,
       time INT NOT NULL,
       score INT NOT NULL,
       date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. Installation:
   - Clone this repository to your `htdocs` folder
   - Start Apache and MySQL services in XAMPP
   - Access the game through `http://localhost/memoryGame/game.html`

## How to Play

1. Enter your name to start
2. Choose a difficulty level
3. Click on cards to flip them
4. Match pairs of identical cards
5. Complete the game as quickly as possible for a higher score
6. Submit your score to save your achievement

## Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery
- PHP
- MySQL

## File Structure

- `game.html` - Main game interface
- `css.css` - Styling
- `actions.js` - Game logic
- `database.php` - Database connection
- `insert_user.php` - Score submission handler
- Sound files:
  - `game-sound.mp3` - Background music
  - `win-sound.mp3` - Victory sound effect
