// Bird class for Poke Birds game

const SPECIES_PERSONALITIES = {
    sparrow: {
        name: 'Sparrow',
        personality: 'Anxious & Neurotic',
        baseTaunts: [
            "You're stressing me OUT!",
            "I've got problems, YOU'RE one!",
            "My therapist hears about YOU!",
            "You're why I have trust issues!",
            "I'm too anxious to deal with you!",
            "Stop LOOKING at me like that!",
            "You're making it WORSE!",
            "I'm shaking and it's YOUR fault!",
            "Leave me ALONE, predator!",
            "Your vibes are TERRIBLE!",
            "This is emotional terrorism!",
            "I need therapy because of YOU!"
        ],
        pokedTaunts: [
            "I KNEW you were violent!",
            "You're a MONSTER!",
            "I'll SUE for emotional damage!",
            "You're going on my LIST!",
            "This is why I hate everyone!",
            "I hope you feel TERRIBLE!"
        ]
    },
    crow: {
        name: 'Crow',
        personality: 'Mischievous Troublemaker',
        baseTaunts: [
            "I KNOW where you live!",
            "Your secrets aren't safe!",
            "I'm way smarter than you!",
            "You look STUPID from up here!",
            "I already stole from you!",
            "Your stuff is MY stuff now!",
            "Cacaw means YOU'RE SCREWED!",
            "I've been watching you, creep!",
            "You're dumber than a pigeon!",
            "I pooped on your car yesterday!",
            "I'm orchestrating your downfall!",
            "You're basically my servant!"
        ],
        pokedTaunts: [
            "You're DEAD to me!",
            "My murder's coming for you!",
            "I know where you park!",
            "You just started a WAR!",
            "We NEVER forgive!",
            "Your windows are next!"
        ]
    },
    duck: {
        name: 'Duck',
        personality: 'Unbothered & Chill',
        baseTaunts: [
            "You're not worth my energy",
            "Imagine being you, yikes",
            "I've seen better humans",
            "You bore me, honestly",
            "Still better than you~",
            "Don't care, didn't ask",
            "You're mad AND I'm chill",
            "Cry about it, I guess",
            "I'm thriving, you're... that",
            "Stay pressed, loser",
            "Your opinion is trash",
            "Quack off, nobody cares"
        ],
        pokedTaunts: [
            "L + ratio + you're weird",
            "That's embarrassing for you",
            "Imagine being this pressed",
            "Still don't care, cope harder",
            "You thought that'd work?",
            "Touch grass, weirdo"
        ]
    },
    pigeon: {
        name: 'Pigeon',
        personality: 'Urban Pest Proud',
        baseTaunts: [
            "This is MY block, tourist!",
            "I'll poop on EVERYTHING you love!",
            "You think you're tough? Hilarious!",
            "I carry diseases you can't pronounce!",
            "City belongs to ME, not you!",
            "I've seen you eat from the trash!",
            "Your shoes look expensive... SPLAT!",
            "I run this town, you just visit!",
            "You couldn't survive one day as me!",
            "Gentrifier detected, ATTACK MODE!",
            "I was here first, GET OUT!",
            "You're just a walking food source!"
        ],
        pokedTaunts: [
            "My FLOCK remembers faces!",
            "You're getting the whole swarm!",
            "I'm calling my COUSINS!",
            "Your car's getting BOMBED!",
            "Street code says you DIE!",
            "We NEVER forget, NEVER!"
        ]
    },
    robin: {
        name: 'Robin',
        personality: 'Cheerful & Optimistic',
        baseTaunts: [
            "Hope you have a TERRIBLE day!",
            "You look sad, good!",
            "Worms are smarter than you!",
            "Your negativity is showing!",
            "Smile! Oh wait, you can't!",
            "You're the WORST person here!",
            "Nobody likes you, sweetie!",
            "Bless your heart, you need it!",
            "You seem... troubled. LOL!",
            "I'd feel bad but I don't!",
            "Chirp chirp, you're a LOSER!",
            "Have you considered being better?"
        ],
        pokedTaunts: [
            "WOW, you're actually terrible!",
            "We're NOT friends anymore!",
            "You're MEAN and UGLY!",
            "That's what you get, jerk!",
            "I NEVER liked you!",
            "Hope you feel BAD forever!"
        ]
    },
    seagull: {
        name: 'Seagull',
        personality: 'Greedy Thief',
        baseTaunts: [
            "Give me your WALLET!",
            "I'll BITE you for fries!",
            "Everything you own is MINE!",
            "I've assaulted people for LESS!",
            "Your food OR your fingers!",
            "I'm a registered MENACE!",
            "Hand it over or get PECKED!",
            "Robbery is my LIFESTYLE!",
            "I WILL dive-bomb your face!",
            "You're about to get MUGGED!",
            "I've drawn BLOOD before!",
            "This is a STICK-UP, fool!"
        ],
        pokedTaunts: [
            "I'm STEALING everything you love!",
            "You're getting SWARMED!",
            "FIGHT ME, coward!",
            "The whole BEACH is coming!",
            "You just signed your DEATH WARRANT!",
            "I'm eating your LEFTOVERS!"
        ]
    },
    hummingbird: {
        name: 'Hummingbird',
        personality: 'Hyperactive ADHD Energy',
        baseTaunts: [
            "YOU'RE TOO SLOW, LOSER!",
            "Can't catch me CAN'T CATCH ME!",
            "You SUCK at this game!",
            "ZOOM ZOOM you're TERRIBLE!",
            "I'm BETTER than you in EVERY WAY!",
            "You WISH you were this fast!",
            "Your reflexes are PATHETIC!",
            "TRY HARDER, slowpoke!",
            "I'm RUNNING CIRCLES around you!",
            "You're BORING and SLOW!",
            "HAHA you MISSED again!",
            "You'll NEVER catch me, EVER!"
        ],
        pokedTaunts: [
            "LUCKY SHOT, won't happen again!",
            "That was a FLUKE, admit it!",
            "You got ONE, I'll get YOU!",
            "REVENGE MODE ACTIVATED!",
            "I'm coming back FASTER!",
            "You're STILL too SLOW!"
        ]
    },
    owl: {
        name: 'Owl',
        personality: 'Pretentious Intellectual',
        baseTaunts: [
            "You're embarrassingly stupid",
            "I'm VASTLY superior to you",
            "Your IQ is room temperature",
            "Educate yourself, peasant",
            "You're intellectually bankrupt",
            "I'm smarter than your ENTIRE family",
            "You wouldn't understand, simpleton",
            "Your ignorance is ASTOUNDING",
            "I pity your inferior mind",
            "You're beneath my contempt",
            "Natural selection failed YOU",
            "Your brain is decorative, clearly"
        ],
        pokedTaunts: [
            "Violence, the tool of IDIOTS!",
            "Proof you can't debate me!",
            "Typical low-IQ behavior!",
            "You've proven my point, fool!",
            "I'll write about your FAILURE!",
            "This confirms you're an imbecile!"
        ]
    }
};

const BIRD_SPECIES = {
    sparrow: {
        name: 'Sparrow',
        bodyRx: 30, bodyRy: 35,
        wingRx: 15, wingRy: 25,
        eyeSize: 6,
        beakPoints: '50,55 45,60 55,60',
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#C77DFF']
    },
    crow: {
        name: 'Crow',
        bodyRx: 35, bodyRy: 40,
        wingRx: 18, wingRy: 30,
        eyeSize: 7,
        beakPoints: '50,55 40,62 50,62',
        colors: ['#2C3E50', '#34495E', '#1a1a1a', '#2d2d2d']
    },
    duck: {
        name: 'Duck',
        bodyRx: 38, bodyRy: 32,
        wingRx: 12, wingRy: 20,
        eyeSize: 5,
        beakPoints: '50,55 38,58 50,61',
        colors: ['#F39C12', '#F1C40F', '#8B4513', '#556B2F']
    },
    pigeon: {
        name: 'Pigeon',
        bodyRx: 32, bodyRy: 38,
        wingRx: 16, wingRy: 26,
        eyeSize: 6,
        beakPoints: '50,55 47,59 53,59',
        colors: ['#95A5A6', '#7F8C8D', '#BDC3C7', '#6C7A89']
    },
    robin: {
        name: 'Robin',
        bodyRx: 28, bodyRy: 33,
        wingRx: 14, wingRy: 24,
        eyeSize: 6,
        beakPoints: '50,55 46,59 54,59',
        colors: ['#E74C3C', '#C0392B', '#D35400', '#E67E22']
    },
    seagull: {
        name: 'Seagull',
        bodyRx: 36, bodyRy: 38,
        wingRx: 20, wingRy: 28,
        eyeSize: 6,
        beakPoints: '50,55 42,60 52,62',
        colors: ['#E8E8E8', '#D3D3D3', '#A9A9A9', '#FFFFFF', '#F5F5F5']
    },
    hummingbird: {
        name: 'Hummingbird',
        bodyRx: 22, bodyRy: 28,
        wingRx: 10, wingRy: 18,
        eyeSize: 5,
        beakPoints: '50,55 48,62 52,62',
        colors: ['#00CED1', '#FF1493', '#32CD32', '#9370DB', '#FF6347']
    },
    owl: {
        name: 'Owl',
        bodyRx: 34, bodyRy: 40,
        wingRx: 17, wingRy: 28,
        eyeSize: 9,
        beakPoints: '50,55 45,58 55,58',
        colors: ['#8B4513', '#A0522D', '#CD853F', '#654321', '#D2691E']
    }
};

class Bird {
    constructor(container, x, y, id) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.id = id;

        // Select random species
        this.species = randomChoice(['sparrow', 'crow', 'duck', 'pigeon', 'robin', 'seagull', 'hummingbird', 'owl']);
        this.speciesData = BIRD_SPECIES[this.species];
        this.personality = SPECIES_PERSONALITIES[this.species];

        // Select color from species palette
        this.colorHex = randomChoice(this.speciesData.colors);

        // Determine available taunts based on if species has been poked before
        if (game && game.pokedSpeciesHistory.has(this.species)) {
            this.availableTaunts = [
                ...this.personality.baseTaunts,
                ...this.personality.pokedTaunts
            ];
        } else {
            this.availableTaunts = [...this.personality.baseTaunts];
        }

        // Select random taunt
        this.taunt = randomChoice(this.availableTaunts);

        this.element = null;
        this.speechBubble = null;
        this.isAlive = true;
        this.isFlippingOff = false;

        this.createBirdElement();

        // Play species-specific spawn chirp
        audioSystem.chirpSFX(this.species);
    }

    /**
     * Create the bird SVG element with species-specific dimensions
     */
    createBirdElement() {
        const birdDiv = document.createElement('div');
        birdDiv.className = `bird bird-${this.species} idle spawning`;
        birdDiv.id = `bird-${this.id}`;
        birdDiv.style.left = `${this.x}px`;
        birdDiv.style.top = `${this.y}px`;

        const s = this.speciesData;
        const wingColor = this.getDarkerColor(this.colorHex);

        // Create SVG bird with species-specific dimensions
        birdDiv.innerHTML = `
            <svg class="bird-svg" viewBox="0 0 100 100">
                <!-- Body -->
                <ellipse class="bird-body" cx="50" cy="55"
                         rx="${s.bodyRx}" ry="${s.bodyRy}"
                         fill="${this.colorHex}"
                         stroke="#333" stroke-width="2"/>

                <!-- Left Wing -->
                <ellipse class="bird-wing bird-wing-left" cx="25" cy="50"
                         rx="${s.wingRx}" ry="${s.wingRy}"
                         fill="${wingColor}"
                         stroke="#333" stroke-width="2"
                         transform="rotate(-20 25 50)"/>

                <!-- Right Wing -->
                <ellipse class="bird-wing bird-wing-right" cx="75" cy="50"
                         rx="${s.wingRx}" ry="${s.wingRy}"
                         fill="${wingColor}"
                         stroke="#333" stroke-width="2"
                         transform="rotate(20 75 50)"/>

                <!-- Eyes -->
                <circle cx="42" cy="45" r="${s.eyeSize}" fill="white" stroke="#333" stroke-width="1.5"/>
                <circle cx="58" cy="45" r="${s.eyeSize}" fill="white" stroke="#333" stroke-width="1.5"/>
                <circle class="pupil-left" cx="43" cy="46" r="3" fill="#333"/>
                <circle class="pupil-right" cx="57" cy="46" r="3" fill="#333"/>

                <!-- Beak -->
                <polygon points="${s.beakPoints}" fill="#FFA500" stroke="#333" stroke-width="1.5"/>

                <!-- Feet -->
                <line x1="40" y1="85" x2="35" y2="92" stroke="#FFA500" stroke-width="2"/>
                <line x1="40" y1="85" x2="40" y2="92" stroke="#FFA500" stroke-width="2"/>
                <line x1="40" y1="85" x2="45" y2="92" stroke="#FFA500" stroke-width="2"/>

                <line x1="60" y1="85" x2="55" y2="92" stroke="#FFA500" stroke-width="2"/>
                <line x1="60" y1="85" x2="60" y2="92" stroke="#FFA500" stroke-width="2"/>
                <line x1="60" y1="85" x2="65" y2="92" stroke="#FFA500" stroke-width="2"/>
            </svg>
        `;

        this.element = birdDiv;
        this.container.appendChild(birdDiv);

        // Remove spawning class after animation
        setTimeout(() => {
            if (this.element) {
                this.element.classList.remove('spawning');
            }
        }, 600);

        // Show taunt after a short delay
        setTimeout(() => {
            if (this.isAlive) {
                this.showTaunt();
            }
        }, 800);

        // Add click/touch listener
        this.element.addEventListener('click', (e) => this.handlePoke(e));
        this.element.addEventListener('touchstart', (e) => this.handlePoke(e));
    }

    /**
     * Show speech bubble with taunt
     */
    showTaunt() {
        if (!this.element || !this.isAlive) return;

        const bubble = document.createElement('div');
        bubble.className = 'speech-bubble';
        bubble.textContent = this.taunt;

        this.speechBubble = bubble;
        this.element.appendChild(bubble);
    }

    /**
     * Hide speech bubble
     */
    hideTaunt() {
        if (this.speechBubble && this.speechBubble.parentNode) {
            this.speechBubble.remove();
            this.speechBubble = null;
        }
    }

    /**
     * Handle poke interaction
     */
    handlePoke(event) {
        if (!this.isAlive || this.isFlippingOff) return;

        event.stopPropagation();

        // Track this species as poked
        if (game && game.pokedSpeciesHistory) {
            game.pokedSpeciesHistory.add(this.species);
        }

        // Increment poke count
        if (game) {
            game.pokeCount++;
        }

        // Play species-specific squawk instead of generic poke sound
        audioSystem.squawkSFX(this.species);

        // Remove idle animation and add poked animation
        this.element.classList.remove('idle');
        this.element.classList.add('poked');

        // Hide taunt
        this.hideTaunt();

        // Despawn after short delay
        setTimeout(() => {
            this.despawn();
        }, 500);
    }

    /**
     * Despawn the bird
     */
    despawn() {
        if (!this.isAlive) return;

        this.isAlive = false;

        if (this.element) {
            this.element.classList.remove('poked', 'idle');
            this.element.classList.add('despawning');

            // Remove from DOM after animation
            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.remove();
                    this.element = null;
                }
            }, 500);
        }
    }

    /**
     * Darken a hex color for wing differentiation
     */
    getDarkerColor(hexColor) {
        const num = parseInt(hexColor.replace("#",""), 16);
        const r = Math.max(0, (num >> 16) - 30);
        const g = Math.max(0, ((num >> 8) & 0x00FF) - 30);
        const b = Math.max(0, (num & 0x0000FF) - 30);
        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    }

    /**
     * Make bird flip off (for finale)
     */
    flipOff() {
        if (!this.element || !this.isAlive) return;

        this.isFlippingOff = true;
        this.element.classList.remove('idle', 'poked');
        this.element.classList.add('flipping-off');

        // Hide taunt
        this.hideTaunt();

        // Change eye expression to angry
        const pupils = this.element.querySelectorAll('.pupil-left, .pupil-right');
        pupils.forEach(pupil => {
            pupil.setAttribute('cy', '44'); // Move pupils up (angry look)
        });
    }

    /**
     * Remove bird immediately (for cleanup)
     */
    destroy() {
        this.isAlive = false;
        if (this.element && this.element.parentNode) {
            this.element.remove();
            this.element = null;
        }
    }

    /**
     * Get bird's current position
     */
    getPosition() {
        return { x: this.x, y: this.y };
    }

    /**
     * Check if bird is still alive
     */
    alive() {
        return this.isAlive;
    }
}
