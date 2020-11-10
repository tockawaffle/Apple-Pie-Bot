const SnakeGame = require('snakecord');

module.exports = {
    run: async(client, message, args) => {
        message.delete()
        const snakeGame = new SnakeGame({
            title: `🐍 Snake Game! 🎮`,
            color: "#ff3333",
            timestamp: true,
            gameOverTitle: "👾 You lost!"
            })
        snakeGame.newGame(message); 
    }, aliases: ['snake'], description: 'Snake Game'
}