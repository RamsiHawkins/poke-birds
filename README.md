# Poke Birds! 🐦

A humorous web-based game where you poke rude, taunting cartoon birds before they overwhelm you with attitude!

## Game Description

Poke Birds is a vertical mobile-optimized casual game where players interact with increasingly sassy cartoon birds. Each bird taunts you with humorous insults while bobbing on the screen. Your mission: poke them before 15 birds accumulate!

### Game Flow

1. **Splash Screen**: Tap "Poke Birds!" to start
2. **Main Game**: Birds spawn gradually with increasing frequency
3. **Poke Birds**: Touch/click birds to make them react and disappear
4. **The Finale**: When 15 birds appear, they all flip you off simultaneously
5. **Reset**: After 10 seconds of bird rebellion, the game fades and returns to the splash screen

## Features

- **Mobile-Optimized**: Designed for vertical play on phones
- **SVG/CSS Graphics**: Lightweight, scalable cartoon birds with 5 color variants
- **Dynamic Taunts**: 20 different humorous insults from the birds
- **Generated Sound Effects**: Web Audio API creates poke, spawn, and finale sounds
- **Progressive Difficulty**: Birds spawn faster as time progresses
- **Touch & Mouse Support**: Works on mobile and desktop
- **Click Indicator**: Animated hand appears for mouse clicks (not on touch)

## How to Play

### On Mobile
1. Open `index.html` in your mobile browser
2. Tap the splash screen to start
3. Tap birds as they appear to poke them
4. Try to keep poking before 15 birds accumulate!

### On Desktop
1. Open `index.html` in any modern browser
2. Click the splash screen to start
3. Click birds to poke them (watch for the poke hand indicator)
4. The game resets automatically after the finale

## Technical Details

### Stack
- Pure HTML5, CSS3, and Vanilla JavaScript
- No external dependencies or frameworks
- Web Audio API for sound generation
- CSS animations for smooth 60fps performance

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari (iOS)
- Edge

### File Structure
```
poke-birds/
├── index.html           # Main HTML structure
├── css/
│   ├── main.css        # Core styles and layout
│   ├── birds.css       # Bird graphics and states
│   └── animations.css  # Animation definitions
├── js/
│   ├── game.js         # Main game loop and state management
│   ├── bird.js         # Bird class and behavior
│   ├── audio.js        # Web Audio API sound system
│   └── utils.js        # Helper functions
└── README.md           # This file
```

## Game Mechanics

### Spawn Rate
- Initial: 1 bird every 3 seconds
- Increases: Spawn delay reduces by 5% per spawn after 5 seconds
- Minimum: 0.5 seconds between spawns
- Maximum: Stops spawning at 15 birds (triggers finale)

### Bird States
- **Idle**: Bobbing and taunting
- **Poked**: Startled reaction when clicked/touched
- **Despawning**: Spin away after being poked
- **Flipping Off**: Finale state with raised wing

### Audio System
All sounds are generated programmatically using Web Audio API:
- **Poke**: Quick "boop" sound with pitch bend
- **Spawn**: Rising chirp when birds appear
- **Finale**: Dramatic multi-tone effect
- **Reset**: Gentle descending whoosh

## Development

### Running Locally
Simply open `index.html` in a web browser. No build process or server required!

### Mobile Testing
For best mobile testing experience:
1. Use Chrome DevTools mobile emulation
2. Or serve via local server and access from phone:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve
   ```
3. Navigate to `http://[your-ip]:8000` on your phone

### Customization

**Change spawn rate:**
Edit `js/game.js` line 16:
```javascript
this.currentSpawnDelay = 3000; // milliseconds
```

**Modify max birds:**
Edit `js/game.js` line 18:
```javascript
this.maxBirds = 15; // number of birds
```

**Add more taunts:**
Edit `js/bird.js` lines 3-24:
```javascript
const TAUNTS = [
    "Your custom taunt here!",
    // ... more taunts
];
```

**Change bird colors:**
Edit `css/birds.css` lines 12-26 to modify color variants.

**Adjust audio:**
Edit `js/audio.js` to tweak sound frequencies and envelopes.

## Performance

The game is optimized for 60fps on mobile devices:
- CSS transforms for GPU acceleration
- `will-change` hints for animated elements
- Minimal DOM manipulation
- Efficient collision detection
- RequestAnimationFrame-ready architecture

## Accessibility

- Reduced motion support via CSS media queries
- Touch-friendly minimum 44px tap targets
- High contrast bird colors
- Optional audio muting (extend `AudioSystem` class)

## Known Limitations

- Web Audio API requires user interaction to initialize (browser security)
- Some mobile browsers may restrict auto-play audio
- Performance may vary on older devices

## Future Enhancements

Potential additions:
- Score tracking
- High score persistence (localStorage)
- Difficulty modes
- More bird varieties
- Power-ups
- Background music
- Social sharing
- PWA features for installation

## Credits

Created with Claude Code as a humorous vertical mobile game experiment.

## License

Free to use, modify, and share. Have fun poking birds!
