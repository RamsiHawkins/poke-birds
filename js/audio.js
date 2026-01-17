// Audio system using Web Audio API for generated sound effects

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.initialized = false;
        this.muted = false;
        // Background music properties
        this.bgMusicGain = null;
        this.bgOscillators = [];
        this.currentMusicType = null;
        this.musicInterval = null;
    }

    /**
     * Initialize the audio context
     * Must be called after user interaction due to browser restrictions
     */
    init() {
        if (this.initialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.3; // Master volume at 30%
            this.masterGain.connect(this.audioContext.destination);
            this.initialized = true;
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    /**
     * Resume audio context if suspended (required by some browsers)
     */
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    /**
     * Create an oscillator with envelope
     */
    createOscillator(type, frequency, duration = 0.1) {
        if (!this.initialized || this.muted) return { osc: null, gain: null };

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = type;
        osc.frequency.value = frequency;

        osc.connect(gain);
        gain.connect(this.masterGain);

        return { osc, gain, duration };
    }

    /**
     * Play a simple tone
     */
    playTone(frequency, duration = 0.1, type = 'sine') {
        if (!this.initialized || this.muted) return;

        const now = this.audioContext.currentTime;
        const { osc, gain } = this.createOscillator(type, frequency, duration);

        if (!osc || !gain) return;

        // ADSR envelope: Attack, Decay, Sustain, Release
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05); // Decay
        gain.gain.setValueAtTime(0.2, now + duration - 0.05); // Sustain
        gain.gain.linearRampToValueAtTime(0, now + duration); // Release

        osc.start(now);
        osc.stop(now + duration);
    }

    /**
     * Poke sound effect - quick boop
     */
    pokeSFX() {
        if (!this.initialized || this.muted) return;

        const now = this.audioContext.currentTime;
        const { osc, gain } = this.createOscillator('sine', 800);

        if (!osc || !gain) return;

        // Quick envelope with pitch bend
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.05);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.01);
        gain.gain.linearRampToValueAtTime(0, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
    }

    /**
     * Bird spawn sound - chirp
     */
    spawnSFX() {
        if (!this.initialized || this.muted) return;

        const now = this.audioContext.currentTime;
        const { osc, gain } = this.createOscillator('square', 1200);

        if (!osc || !gain) return;

        // Rising chirp
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.linearRampToValueAtTime(1800, now + 0.08);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain.gain.linearRampToValueAtTime(0, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    /**
     * Finale sound - dramatic effect
     */
    finaleSFX() {
        if (!this.initialized || this.muted) return;

        const now = this.audioContext.currentTime;

        // Low dramatic tone
        const { osc: osc1, gain: gain1 } = this.createOscillator('sawtooth', 200);
        if (osc1 && gain1) {
            gain1.gain.setValueAtTime(0, now);
            gain1.gain.linearRampToValueAtTime(0.3, now + 0.1);
            gain1.gain.setValueAtTime(0.3, now + 0.5);
            gain1.gain.linearRampToValueAtTime(0, now + 1.0);
            osc1.start(now);
            osc1.stop(now + 1.0);
        }

        // High accent tone
        const { osc: osc2, gain: gain2 } = this.createOscillator('square', 400);
        if (osc2 && gain2) {
            gain2.gain.setValueAtTime(0, now);
            gain2.gain.linearRampToValueAtTime(0.2, now + 0.05);
            gain2.gain.linearRampToValueAtTime(0, now + 0.3);
            osc2.start(now);
            osc2.stop(now + 0.3);
        }
    }

    /**
     * Reset/transition sound - gentle whoosh
     */
    resetSFX() {
        if (!this.initialized || this.muted) return;

        const now = this.audioContext.currentTime;

        // Create noise-like effect with filtered sawtooth
        const { osc, gain } = this.createOscillator('sawtooth', 100);

        if (!osc || !gain) return;

        // Sweep down
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
        gain.gain.setValueAtTime(0.15, now + 0.3);
        gain.gain.linearRampToValueAtTime(0, now + 0.5);

        osc.start(now);
        osc.stop(now + 0.5);
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    /**
     * Set master volume (0.0 to 1.0)
     */
    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.value = clamp(volume, 0, 1);
        }
    }

    /**
     * Play procedural chiptune background music (splash screen)
     */
    playChiptuneBG() {
        this.stopBackgroundMusic();
        if (!this.initialized || this.muted) return;

        this.currentMusicType = 'chiptune';
        this.bgMusicGain = this.audioContext.createGain();
        this.bgMusicGain.gain.value = 0.15; // Quieter than SFX
        this.bgMusicGain.connect(this.masterGain);

        // Chiptune arpeggio pattern: C-E-G-C loop
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        let noteIndex = 0;

        this.musicInterval = setInterval(() => {
            if (!this.initialized || this.muted) return;

            const osc = this.audioContext.createOscillator();
            osc.type = 'square'; // Chiptune sound
            osc.frequency.value = notes[noteIndex % notes.length];

            const gain = this.audioContext.createGain();
            gain.gain.value = 0.3;
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

            osc.connect(gain);
            gain.connect(this.bgMusicGain);

            osc.start();
            osc.stop(this.audioContext.currentTime + 0.3);

            noteIndex++;
        }, 200); // 8th note at 150 BPM
    }

    /**
     * Play procedural upbeat game music
     */
    playGameBG() {
        this.stopBackgroundMusic();
        if (!this.initialized || this.muted) return;

        this.currentMusicType = 'game';
        this.bgMusicGain = this.audioContext.createGain();
        this.bgMusicGain.gain.value = 0.12;
        this.bgMusicGain.connect(this.masterGain);

        // Upbeat rhythm: bass + melody
        const bassNotes = [130.81, 164.81]; // C3, E3 alternating
        const melodyNotes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5

        let beat = 0;
        this.musicInterval = setInterval(() => {
            if (!this.initialized || this.muted) return;

            // Bass on every beat
            if (beat % 2 === 0) {
                const bass = this.audioContext.createOscillator();
                bass.type = 'sawtooth';
                bass.frequency.value = bassNotes[(beat / 2) % 2];
                const bassGain = this.audioContext.createGain();
                bassGain.gain.value = 0.4;
                bassGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                bass.connect(bassGain);
                bassGain.connect(this.bgMusicGain);
                bass.start();
                bass.stop(this.audioContext.currentTime + 0.2);
            }

            // Melody on off-beats
            if (beat % 4 === 1) {
                const melody = this.audioContext.createOscillator();
                melody.type = 'square';
                melody.frequency.value = melodyNotes[Math.floor(beat / 4) % 4];
                const melGain = this.audioContext.createGain();
                melGain.gain.value = 0.25;
                melGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
                melody.connect(melGain);
                melGain.connect(this.bgMusicGain);
                melody.start();
                melody.stop(this.audioContext.currentTime + 0.15);
            }

            beat++;
        }, 150); // 400 BPM feel
    }

    /**
     * Play guitar power chord riff (finale)
     */
    playGuitarRiff() {
        this.stopBackgroundMusic();
        if (!this.initialized || this.muted) return;

        const now = this.audioContext.currentTime;

        // Power chord: root + fifth
        const playChord = (rootFreq, startTime, duration) => {
            const root = this.createOscillator('sawtooth', rootFreq);
            const fifth = this.createOscillator('sawtooth', rootFreq * 1.5);

            if (!root.gain || !fifth.gain) return;

            root.gain.gain.setValueAtTime(0.4, startTime);
            root.gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            fifth.gain.gain.setValueAtTime(0.35, startTime);
            fifth.gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

            root.osc.start(startTime);
            root.osc.stop(startTime + duration);
            fifth.osc.start(startTime);
            fifth.osc.stop(startTime + duration);
        };

        // Metal riff: E-E-E-D-C progression
        playChord(82.41, now, 0.3);        // E2
        playChord(82.41, now + 0.35, 0.3); // E2
        playChord(82.41, now + 0.7, 0.3);  // E2
        playChord(73.42, now + 1.05, 0.3); // D2
        playChord(65.41, now + 1.4, 0.5);  // C2 (longer)
    }

    /**
     * Stop background music
     */
    stopBackgroundMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
        if (this.bgMusicGain) {
            this.bgMusicGain.gain.exponentialRampToValueAtTime(
                0.01,
                this.audioContext.currentTime + 0.5
            );
            setTimeout(() => {
                if (this.bgMusicGain) {
                    this.bgMusicGain.disconnect();
                    this.bgMusicGain = null;
                }
            }, 500);
        }
        this.bgOscillators = [];
    }

    /**
     * Species-specific spawn chirps
     */
    chirpSFX(species) {
        if (!this.initialized || this.muted) return;

        const chirpProfiles = {
            sparrow: { freq: [2800, 3200], wave: 'sine', duration: 0.08 },
            crow: { freq: [600, 800], wave: 'square', duration: 0.15 },
            duck: { freq: [400, 600], wave: 'square', duration: 0.12 },
            pigeon: { freq: [1000, 1200], wave: 'sine', duration: 0.1 },
            robin: { freq: [3500, 4000], wave: 'sine', duration: 0.09 },
            seagull: { freq: [1800, 2200], wave: 'sawtooth', duration: 0.18 },
            hummingbird: { freq: [4500, 5500], wave: 'sine', duration: 0.05 },
            owl: { freq: [200, 350], wave: 'triangle', duration: 0.25 }
        };

        const profile = chirpProfiles[species] || chirpProfiles.sparrow;
        const { osc, gain } = this.createOscillator(profile.wave, profile.freq[0]);

        if (!osc || !gain) return;

        const now = this.audioContext.currentTime;
        osc.frequency.exponentialRampToValueAtTime(profile.freq[1], now + profile.duration);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + profile.duration);

        osc.start(now);
        osc.stop(now + profile.duration);
    }

    /**
     * Species-specific poke squawks
     */
    squawkSFX(species) {
        if (!this.initialized || this.muted) return;

        const squawkProfiles = {
            sparrow: { freq: [3000, 2200], wave: 'sine', duration: 0.12 },
            crow: { freq: [700, 400], wave: 'sawtooth', duration: 0.2 },
            duck: { freq: [500, 350], wave: 'square', duration: 0.15 },
            pigeon: { freq: [1100, 800], wave: 'sine', duration: 0.13 },
            robin: { freq: [3800, 2800], wave: 'sine', duration: 0.11 },
            seagull: { freq: [2000, 1400], wave: 'sawtooth', duration: 0.22 },
            hummingbird: { freq: [5000, 4000], wave: 'sine', duration: 0.06 },
            owl: { freq: [300, 150], wave: 'triangle', duration: 0.3 }
        };

        const profile = squawkProfiles[species] || squawkProfiles.sparrow;
        const { osc, gain } = this.createOscillator(profile.wave, profile.freq[0]);

        if (!osc || !gain) return;

        const now = this.audioContext.currentTime;

        // Frequency sweep down (angry squawk)
        osc.frequency.exponentialRampToValueAtTime(profile.freq[1], now + profile.duration);

        // ADSR envelope for squawk
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.02); // Attack
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05); // Decay
        gain.gain.setValueAtTime(0.25, now + profile.duration * 0.7); // Sustain
        gain.gain.exponentialRampToValueAtTime(0.01, now + profile.duration); // Release

        osc.start(now);
        osc.stop(now + profile.duration);
    }
}

// Global audio system instance
const audioSystem = new AudioSystem();
