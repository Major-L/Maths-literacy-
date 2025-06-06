// App Configuration
const config = {
    voiceRSSKey: 'YOUR_VOICERSS_API_KEY',
    pexelsKey: 'YOUR_PEXELS_API_KEY',
    giphyKey: 'YOUR_GIPHY_API_KEY',
    soundEnabled: true
};

// DOM Elements
const homeScreen = document.querySelector('.home-screen');
const moduleContainer = document.querySelector('.module-container');
const moduleContent = document.querySelector('.module-content');
const backBtn = document.querySelector('.back-btn');
const soundToggle = document.getElementById('soundToggle');
const menuButtons = document.querySelectorAll('.menu-btn');

// Load module scripts dynamically
function loadModule(moduleName) {
    const script = document.createElement('script');
    script.src = `scripts/modules/${moduleName}.js`;
    script.onload = () => {
        // Each module should expose an init function
        window[`init${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Module`](moduleContent);
    };
    document.body.appendChild(script);
}

// Toggle between home and module views
function showModule(moduleName) {
    homeScreen.classList.add('hidden');
    moduleContainer.classList.remove('hidden');
    loadModule(moduleName);
}

function showHome() {
    homeScreen.classList.remove('hidden');
    moduleContainer.classList.add('hidden');
    moduleContent.innerHTML = '';
    
    // Remove any module scripts that were added
    document.querySelectorAll('script[src^="scripts/modules/"]').forEach(script => {
        script.remove();
    });
}

// Event Listeners
menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        const moduleName = button.dataset.module;
        showModule(moduleName);
    });
});

backBtn.addEventListener('click', showHome);

soundToggle.addEventListener('click', () => {
    config.soundEnabled = !config.soundEnabled;
    soundToggle.textContent = config.soundEnabled ? '🔊' : '🔇';
});

// API Functions
async function fetchImage(query) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
            headers: {
                'Authorization': config.pexelsKey
            }
        });
        const data = await response.json();
        return data.photos[0]?.src.medium || `assets/fallback-images/${query.replace(/\s+/g, '-')}.jpg`;
    } catch (error) {
        console.error('Error fetching image:', error);
        return `assets/fallback-images/${query.replace(/\s+/g, '-')}.jpg`;
    }
}

async function fetchGif(query) {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${config.giphyKey}&q=${encodeURIComponent(query)}&limit=1`);
        const data = await response.json();
        return data.data[0]?.images.fixed_height.url || `assets/fallback-images/${query.replace(/\s+/g, '-')}.gif`;
    } catch (error) {
        console.error('Error fetching GIF:', error);
        return `assets/fallback-images/${query.replace(/\s+/g, '-')}.gif`;
    }
}

function speak(text) {
    if (!config.soundEnabled) return;
    
    // Using VoiceRSS API
    const audioSrc = `http://api.voicerss.org/?key=${config.voiceRSSKey}&hl=en-us&src=${encodeURIComponent(text)}`;
    const audio = new Audio(audioSrc);
    audio.play().catch(e => console.error('Audio play failed:', e));
}

// Utility Functions
function createElement(type, classes = [], attributes = {}) {
    const element = document.createElement(type);
    if (classes.length) element.classList.add(...classes);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    speak("Welcome to Math Magic! What would you like to learn today?");
});