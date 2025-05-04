// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('active');
    });
});



// Scroll Animation
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
        } else {
            entry.target.classList.add('hidden');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const text = "REN";
let index = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeWriter() {
    const currentText = text.substring(0, index);
    typewriterElement.textContent = currentText;
    
    if (!isDeleting && index < text.length) {
        index++;
        setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && index > 0) {
        index--;
        setTimeout(typeWriter, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        setTimeout(typeWriter, isDeleting ? 1000 : 500);
    }
}

typeWriter();

// Typology Text Effect
const typologyTextElement = document.getElementById('typology-text');
const typologyText = "IT(S) so136 LSI-3Ti-D VLFE-3111 /s/Lo[E]i Chol-Mel Lawful Neutral [M]o/T/WvRg BNVP ch-chsu-ch";
let typologyIndex = 0;

function typeTypology() {
    const currentText = typologyText.substring(0, typologyIndex);
    typologyTextElement.textContent = currentText;
    
    if (typologyIndex < typologyText.length) {
        typologyIndex++;
        setTimeout(typeTypology, 50);
    } else {
        typologyIndex = 0;
        setTimeout(typeTypology, 3000);
    }
}

typeTypology();

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Kinnies Slider
const slider = document.getElementById('kinnies-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cards = slider.querySelectorAll('.kinnie-card');
let currentIndex = 0;

function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = cards.length - 1;
    }
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length) {
        currentIndex = 0;
    }
    updateSlider();
});

// Music Player
// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Music Player Functionality
    const musicPlayers = document.querySelectorAll('.music-player');
    
    musicPlayers.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const pauseBtn = player.querySelector('.pause-btn');
        const audio = player.querySelector('audio');
        const durationDisplay = player.querySelector('.music-duration');
        const totalDuration = parseInt(player.dataset.duration);
        
        // Initially hide pause button
        pauseBtn.style.display = 'none';
        
        // Format time function
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
        
        // Update duration display
        function updateDuration() {
            const currentTime = audio.currentTime;
            durationDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;
        }
        
        // Play button click
        playBtn.addEventListener('click', function() {
            // Pause all other audio elements first
            musicPlayers.forEach(otherPlayer => {
                const otherAudio = otherPlayer.querySelector('audio');
                const otherPlayBtn = otherPlayer.querySelector('.play-btn');
                const otherPauseBtn = otherPlayer.querySelector('.pause-btn');
                
                if (otherPlayer !== player && !otherAudio.paused) {
                    otherAudio.pause();
                    otherPlayBtn.style.display = 'block';
                    otherPauseBtn.style.display = 'none';
                }
            });
            
            // Play this audio
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
                // If there's an error, it might be because the audio file path is incorrect
                alert('Unable to play audio. The file might not exist or the path is incorrect.');
            });
            
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        });
        
        // Pause button click
        pauseBtn.addEventListener('click', function() {
            audio.pause();
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'block';
        });
        
        // Time update event
        audio.addEventListener('timeupdate', updateDuration);
        
        // When audio ends
        audio.addEventListener('ended', function() {
            audio.currentTime = 0;
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'block';
            updateDuration();
        });
        
        // Initial duration setup
        updateDuration();
    });
});
// Initialize on page load
window.addEventListener('load', () => {
    updateSlider();
});