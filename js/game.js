// Main game logic for Poke Birds

const GameStates = {
    SPLASH: 'splash',
    PLAYING: 'playing',
    FINALE: 'finale',
    RESET: 'reset'
};

class PokebirdsGame {
    constructor() {
        this.state = GameStates.SPLASH;
        this.birds = [];
        this.birdIdCounter = 0;
        this.spawnInterval = null;
        this.currentSpawnDelay = 1500; // Start at 1.5 seconds
        this.minSpawnDelay = 0; // No speed limit - infinite acceleration!
        this.spawnCount = 0;
        this.exponentialDecayRate = 0.08;
        this.maxBirds = 10; // Changed from 12
        this.pokeCount = 0;
        this.pokedSpeciesHistory = new Set();
        this.gameStartTime = 0;
        this.finaleTimer = null;

        // DOM elements
        this.splashScreen = document.getElementById('splash-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.finaleScreen = document.getElementById('finale-screen');
        this.birdContainer = document.getElementById('bird-container');

        this.init();
    }

    init() {
        // Set up event listeners
        this.splashScreen.addEventListener('click', () => this.startGame());
        this.splashScreen.addEventListener('touchstart', () => this.startGame());
    }

    startGame() {
        if (this.state !== GameStates.SPLASH) return;

        // Initialize audio on first user interaction
        audioSystem.init();
        audioSystem.resume();

        // Start game background music
        audioSystem.playGameBG();

        // Transition to game
        this.setState(GameStates.PLAYING);
        this.gameStartTime = Date.now();

        // Start spawning birds
        this.startSpawning();
    }

    setState(newState) {
        this.state = newState;

        // Update screen visibility
        this.splashScreen.classList.remove('active');
        this.gameScreen.classList.remove('active');
        this.finaleScreen.classList.remove('active');

        switch (newState) {
            case GameStates.SPLASH:
                this.splashScreen.classList.add('active');
                audioSystem.playChiptuneBG();
                break;
            case GameStates.PLAYING:
                this.gameScreen.classList.add('active');
                // Music started in startGame()
                break;
            case GameStates.FINALE:
                this.finaleScreen.classList.add('active');
                audioSystem.stopBackgroundMusic();
                audioSystem.playGuitarRiff();
                break;
        }
    }

    startSpawning() {
        this.spawnBird(); // Spawn first bird immediately

        // Set up recurring spawn
        this.spawnInterval = setInterval(() => {
            if (this.getAliveBirdCount() < this.maxBirds) {
                this.spawnBird();
                this.updateSpawnRate();
            } else {
                // Max birds reached, trigger finale
                this.triggerFinale();
            }
        }, this.currentSpawnDelay);
    }

    spawnBird() {
        const containerRect = this.birdContainer.getBoundingClientRect();
        const birdWidth = 80;
        const birdHeight = 80;

        const position = generateSafePosition(
            containerRect.width,
            containerRect.height,
            birdWidth,
            birdHeight,
            this.birds
        );

        const bird = new Bird(this.birdContainer, position.x, position.y, this.birdIdCounter++);
        this.birds.push(bird);

        // Species-specific chirp now played in Bird constructor
    }

    updateSpawnRate() {
        // Exponential spawn rate increase - NO CAP!
        this.spawnCount++;
        const newDelay = 1500 * Math.exp(-this.exponentialDecayRate * this.spawnCount);

        // Use delay directly without cap - infinite acceleration
        this.currentSpawnDelay = newDelay;

        // Update interval
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = setInterval(() => {
                if (this.getAliveBirdCount() < this.maxBirds) {
                    this.spawnBird();
                } else {
                    this.triggerFinale();
                }
            }, this.currentSpawnDelay);
        }
    }

    getAliveBirdCount() {
        return this.birds.filter(bird => bird.alive()).length;
    }

    triggerFinale() {
        if (this.state !== GameStates.PLAYING) return;

        // Stop spawning
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }

        // Change state
        this.setState(GameStates.FINALE);

        // Update poke count display
        const pokeCountDisplay = document.getElementById('poke-count-display');
        if (pokeCountDisplay) {
            pokeCountDisplay.textContent = this.pokeCount;
        }

        // Make all birds flip off
        this.birds.forEach(bird => {
            if (bird.alive()) {
                bird.flipOff();
            }
        });

        // Play finale sound
        audioSystem.finaleSFX();

        // After 10 seconds, reset game
        this.finaleTimer = setTimeout(() => {
            this.resetGame();
        }, 10000);
    }

    resetGame() {
        // Play reset sound
        audioSystem.resetSFX();
        audioSystem.stopBackgroundMusic();

        // Fade out finale screen
        this.finaleScreen.classList.add('crossfade-out');

        setTimeout(() => {
            // Clean up all birds
            this.birds.forEach(bird => bird.destroy());
            this.birds = [];
            this.birdIdCounter = 0;

            // Clean up finale screen
            this.finaleScreen.classList.remove('crossfade-out');

            // Reset spawn rate and counters
            this.currentSpawnDelay = 1500;
            this.spawnCount = 0;
            this.pokeCount = 0;
            this.pokedSpeciesHistory.clear();

            // Return to splash
            this.setState(GameStates.SPLASH);
        }, 1000);
    }
}

// Initialize game when DOM is ready
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new PokebirdsGame();
});
