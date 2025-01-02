# Memory Card Game

A fun and interactive memory card game built with HTML, CSS, and JavaScript. Test your memory by matching pairs of cards featuring colorful emojis while racing against time!

## Features

- Three difficulty levels:
  - Easy (4x4 grid - 16 cards)
  - Medium (6x6 grid - 36 cards)
  - Hard (8x8 grid - 64 cards)
- Dynamic emoji-based cards with smooth flip animations
- Real-time score tracking
- Timer to track your completion time
- Interactive sound effects
- Responsive design for all devices
- Score submission and storage system
- User-friendly interface
- Persistent leaderboard system

## Setup Instructions

1. Prerequisites:
   - XAMPP or similar local server environment
   - MySQL database
   - Web browser with JavaScript enabled

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
   - Configure database connection in `database.php`
   - Access the game through `http://localhost/memoryGame/game.html`

## How to Play

1. Enter your name (minimum 2 characters) to start
2. Choose your preferred difficulty level
3. Click on any card to reveal its emoji
4. Try to find the matching pair by clicking another card
5. If the cards match, they stay face up
6. If they don't match, they flip back after a short delay
7. Complete the game by matching all pairs
8. Your score is based on completion time and difficulty level
9. Submit your score to compete on the leaderboard

## Game Features in Detail

### Scoring System
- Points are awarded based on successful matches
- Time taken affects the final score
- Higher difficulty levels offer more points

### Card System
- Dynamic card generation based on difficulty
- Smooth flip animations
- Randomized emoji placement
- Wide variety of colorful emojis

## Technologies Used

- Frontend:
  - HTML5
  - CSS3 (with animations)
  - JavaScript (ES6+)
  - jQuery
- Backend:
  - PHP 7+
  - MySQL
- Additional Features:
  - CSS Grid for responsive layout
  - Custom audio integration
  - AJAX for score submission

## File Structure

- `game.html` - Main game interface and structure
- `css.css` - Styling and animations
- `actions.js` - Core game logic and interactions
- `database.php` - Database connection handler
- `insert_user.php` - Score submission processing
- Assets:
  - `game-sound.mp3` - Background game music
  - `win-sound.mp3` - Victory celebration sound

## Recent Updates

- Fixed card flip mechanics for consistent behavior
- Improved emoji visibility on all clicks
- Enhanced animation smoothness
- Optimized card matching logic
- Added more emoji varieties

## Contributing

Feel free to fork this project and submit pull requests for any improvements you'd like to add!
