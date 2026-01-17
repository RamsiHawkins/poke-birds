// Utility functions for Poke Birds game

/**
 * Get random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random float between min and max
 */
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Get random item from array
 */
function randomChoice(array) {
    return array[randomInt(0, array.length - 1)];
}

/**
 * Check if event is a touch event
 */
function isTouchEvent(event) {
    return event.type.includes('touch');
}

/**
 * Get position from mouse or touch event
 */
function getEventPosition(event) {
    if (isTouchEvent(event)) {
        const touch = event.touches[0] || event.changedTouches[0];
        return {
            x: touch.clientX,
            y: touch.clientY
        };
    } else {
        return {
            x: event.clientX,
            y: event.clientY
        };
    }
}

/**
 * Check if two rectangles overlap
 */
function rectsOverlap(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

/**
 * Check if point is inside element
 */
function pointInElement(x, y, element) {
    const rect = element.getBoundingClientRect();
    return x >= rect.left &&
           x <= rect.right &&
           y >= rect.top &&
           y <= rect.bottom;
}

/**
 * Generate random position that doesn't overlap with existing birds
 * Now enforces 80% on-screen visibility (20% margin from edges)
 */
function generateSafePosition(containerWidth, containerHeight, birdWidth, birdHeight, existingBirds = []) {
    const maxAttempts = 50;
    let attempt = 0;

    // Calculate 80% visible area (20% margin on each side)
    const marginX = birdWidth * 0.2;
    const marginY = birdHeight * 0.2;
    const minX = marginX;
    const maxX = containerWidth - marginX;
    const minY = marginY;
    const maxY = containerHeight - marginY;

    while (attempt < maxAttempts) {
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);

        const newRect = {
            left: x - birdWidth / 2,
            right: x + birdWidth / 2,
            top: y - birdHeight / 2,
            bottom: y + birdHeight / 2
        };

        // Check if overlaps with existing birds
        let overlaps = false;
        for (const bird of existingBirds) {
            if (bird.element) {
                const birdRect = bird.element.getBoundingClientRect();
                if (rectsOverlap(newRect, birdRect)) {
                    overlaps = true;
                    break;
                }
            }
        }

        if (!overlaps) {
            return { x, y };
        }

        attempt++;
    }

    // If we couldn't find a non-overlapping position, return random position anyway (still 80% visible)
    return {
        x: randomInt(minX, maxX),
        y: randomInt(minY, maxY)
    };
}

/**
 * Prevent default touch behaviors
 */
function preventDefaultBehaviors() {
    // Prevent pull-to-refresh
    document.body.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Prevent context menu on long press
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

/**
 * Clamp value between min and max
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
function lerp(start, end, t) {
    return start + (end - start) * t;
}

/**
 * Wait for specified milliseconds
 */
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Request animation frame with fallback
 */
const requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
           };
})();

/**
 * Cancel animation frame with fallback
 */
const cancelAnimFrame = (function() {
    return window.cancelAnimationFrame ||
           window.webkitCancelAnimationFrame ||
           window.mozCancelAnimationFrame ||
           function(id) {
               window.clearTimeout(id);
           };
})();

// Initialize utilities on page load
document.addEventListener('DOMContentLoaded', () => {
    preventDefaultBehaviors();
});
