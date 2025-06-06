document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const welcomeScreen = document.querySelector('.welcome-screen');
    const activitiesScreen = document.querySelector('.activities');
    const activityScreen = document.querySelector('.activity-screen');
    const startBtn = document.getElementById('start-btn');
    const activityBtns = document.querySelectorAll('.activity-btn');
    const backBtn = document.querySelector('.back-btn');
    const activityContent = document.querySelector('.activity-content');
    
    // Sounds
    const clickSound = document.getElementById('click-sound');
    const correctSound = document.getElementById('correct-sound');
    
    // Activities data
    const activities = {
        colors: {
            title: '🌈 Color Match',
            items: [
                { name: 'Red', color: '#ff5252', emoji: '🍎' },
                { name: 'Blue', color: '#4285f4', emoji: '🔵' },
                { name: 'Yellow', color: '#ffeb3b', emoji: '🌞' },
                { name: 'Green', color: '#0f9d58', emoji: '🌲' },
                { name: 'Orange', color: '#ff9800', emoji: '🍊' },
                { name: 'Purple', color: '#9c27b0', emoji: '🍆' }
            ]
        },
        shapes: {
            title: '🔺 Shape Fun',
            items: [
                { name: 'Circle', emoji: '⚪', sides: '1' },
                { name: 'Triangle', emoji: '🔺', sides: '3' },
                { name: 'Square', emoji: '◼️', sides: '4' },
                { name: 'Rectangle', emoji: '📏', sides: '4' },
                { name: 'Star', emoji: '⭐', sides: '10' },
                { name: 'Heart', emoji: '❤️', sides: '2' }
            ]
        },
        numbers: {
            title: '🔢 Number Time',
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        letters: {
            title: '🔤 Alphabet Adventure',
            items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        }
    };
    
    // Current activity
    let currentActivity = null;
    let currentQuestion = null;
    
    // Event Listeners
    startBtn.addEventListener('click', startLearning);
    backBtn.addEventListener('click', goBackToActivities);
    
    activityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            playSound(clickSound);
            const activity = this.getAttribute('data-activity');
            loadActivity(activity);
        });
    });
    
    // Functions
    function playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }
    
    function startLearning() {
        playSound(clickSound);
        welcomeScreen.classList.add('hidden');
        activitiesScreen.classList.remove('hidden');
    }
    
    function goBackToActivities() {
        playSound(clickSound);
        activityScreen.classList.add('hidden');
        activitiesScreen.classList.remove('hidden');
    }
    
    function loadActivity(activity) {
        currentActivity = activity;
        activitiesScreen.classList.add('hidden');
        activityScreen.classList.remove('hidden');
        
        // Clear previous content
        activityContent.innerHTML = '';
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = activities[activity].title;
        activityContent.appendChild(title);
        
        // Load appropriate activity
        if (activity === 'colors') {
            loadColorsActivity();
        } else if (activity === 'shapes') {
            loadShapesActivity();
        } else if (activity === 'numbers') {
            loadNumbersActivity();
        } else if (activity === 'letters') {
            loadLettersActivity();
        }
    }
    
    function loadColorsActivity() {
        const colors = activities.colors.items;
        
        // Create question
        const question = document.createElement('div');
        question.className = 'question';
        question.textContent = `Tap on the ${colors[0].name} color!`;
        activityContent.appendChild(question);
        
        currentQuestion = colors[0].name;
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'feedback';
        activityContent.appendChild(feedback);
        
        // Create color options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        // Shuffle colors
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
        
        shuffledColors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.style.backgroundColor = color.color;
            colorOption.setAttribute('data-name', color.name);
            
            colorOption.addEventListener('click', function() {
                const selectedColor = this.getAttribute('data-name');
                
                if (selectedColor === currentQuestion) {
                    feedback.textContent = `Yay! ${color.emoji} That's correct!`;
                    feedback.className = 'feedback correct';
                    playSound(correctSound);
                    
                    // Change question after a delay
                    setTimeout(() => {
                        const nextColor = colors[Math.floor(Math.random() * colors.length)];
                        currentQuestion = nextColor.name;
                        question.textContent = `Tap on the ${nextColor.name} color!`;
                        feedback.textContent = '';
                    }, 1500);
                } else {
                    feedback.textContent = 'Oops! Try again!';
                    feedback.className = 'feedback incorrect';
                }
            });
            
            optionsContainer.appendChild(colorOption);
        });
        
        activityContent.appendChild(optionsContainer);
    }
    
    function loadShapesActivity() {
        const shapes = activities.shapes.items;
        
        // Create question
        const question = document.createElement('div');
        question.className = 'question';
        question.textContent = `Find the ${shapes[0].name}!`;
        activityContent.appendChild(question);
        
        currentQuestion = shapes[0].name;
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'feedback';
        activityContent.appendChild(feedback);
        
        // Create shape options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        // Shuffle shapes
        const shuffledShapes = [...shapes].sort(() => Math.random() - 0.5);
        
        shuffledShapes.forEach(shape => {
            const shapeOption = document.createElement('div');
            shapeOption.className = 'shape-option';
            shapeOption.textContent = shape.emoji;
            shapeOption.setAttribute('data-name', shape.name);
            
            shapeOption.addEventListener('click', function() {
                const selectedShape = this.getAttribute('data-name');
                
                if (selectedShape === currentQuestion) {
                    feedback.textContent = `Great job! ${shape.emoji} That's a ${shape.name}!`;
                    feedback.className = 'feedback correct';
                    playSound(correctSound);
                    
                    // Change question after a delay
                    setTimeout(() => {
                        const nextShape = shapes[Math.floor(Math.random() * shapes.length)];
                        currentQuestion = nextShape.name;
                        question.textContent = `Find the ${nextShape.name}!`;
                        feedback.textContent = '';
                    }, 1500);
                } else {
                    feedback.textContent = 'Not quite! Try again!';
                    feedback.className = 'feedback incorrect';
                }
            });
            
            optionsContainer.appendChild(shapeOption);
        });
        
        activityContent.appendChild(optionsContainer);
    }
    
    function loadNumbersActivity() {
        const numbers = activities.numbers.items;
        
        // Create question
        const question = document.createElement('div');
        question.className = 'question';
        question.textContent = `Let's count to ${numbers.length}! Tap the numbers in order.`;
        activityContent.appendChild(question);
        
        let currentNumber = 1;
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'feedback';
        activityContent.appendChild(feedback);
        
        // Create number options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        // Shuffle numbers
        const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
        
        shuffledNumbers.forEach(number => {
            const numberOption = document.createElement('div');
            numberOption.className = 'number-option';
            numberOption.textContent = number;
            numberOption.setAttribute('data-value', number);
            
            numberOption.addEventListener('click', function() {
                const selectedNumber = parseInt(this.getAttribute('data-value'));
                
                if (selectedNumber === currentNumber) {
                    feedback.textContent = `Correct! ${number} 🎉`;
                    feedback.className = 'feedback correct';
                    playSound(correctSound);
                    
                    this.style.backgroundColor = '#4caf50';
                    this.style.transform = 'scale(1.2)';
                    
                    currentNumber++;
                    
                    if (currentNumber > numbers.length) {
                        feedback.textContent = 'You did it! 🎉 You counted to 10!';
                        
                        // Reset after a delay
                        setTimeout(() => {
                            currentNumber = 1;
                            question.textContent = `Let's count to ${numbers.length}! Tap the numbers in order.`;
                            feedback.textContent = '';
                            
                            // Reset all numbers
                            document.querySelectorAll('.number-option').forEach(option => {
                                option.style.backgroundColor = '#ff7e5f';
                                option.style.transform = 'scale(1)';
                            });
                        }, 3000);
                    }
                } else {
                    feedback.textContent = 'Try again! Find the next number in order.';
                    feedback.className = 'feedback incorrect';
                }
            });
            
            optionsContainer.appendChild(numberOption);
        });
        
        activityContent.appendChild(optionsContainer);
    }
    
    function loadLettersActivity() {
        const letters = activities.letters.items;
        
        // Create question
        const question = document.createElement('div');
        question.className = 'question';
        question.textContent = `Let's learn the alphabet! Tap a letter.`;
        activityContent.appendChild(question);
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'feedback';
        activityContent.appendChild(feedback);
        
        // Create letter options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        // Shuffle letters (but keep some order for learning)
        const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
        
        shuffledLetters.forEach(letter => {
            const letterOption = document.createElement('div');
            letterOption.className = 'letter-option';
            letterOption.textContent = letter;
            letterOption.setAttribute('data-letter', letter);
            
            letterOption.addEventListener('click', function() {
                const selectedLetter = this.getAttribute('data-letter');
                
                // Find words that start with this letter
                const words = {
                    'A': 'Apple 🍎',
                    'B': 'Ball ⚽',
                    'C': 'Cat 🐱',
                    'D': 'Dog 🐶',
                    'E': 'Elephant 🐘',
                    'F': 'Fish 🐟',
                    'G': 'Giraffe 🦒',
                    'H': 'House 🏠',
                    'I': 'Ice Cream 🍦',
                    'J': 'Juice 🧃',
                    'K': 'Kite 🪁',
                    'L': 'Lion 🦁',
                    'M': 'Monkey 🐵',
                    'N': 'Nest 🪹',
                    'O': 'Orange 🍊',
                    'P': 'Pizza 🍕',
                    'Q': 'Queen 👑',
                    'R': 'Rainbow 🌈',
                    'S': 'Sun ☀️',
                    'T': 'Tree 🌳',
                    'U': 'Umbrella ☔',
                    'V': 'Violin 🎻',
                    'W': 'Watermelon 🍉',
                    'X': 'Xylophone 🎶',
                    'Y': 'Yacht ⛵',
                    'Z': 'Zebra 🦓'
                };
                
                feedback.textContent = `${selectedLetter} is for ${words[selectedLetter] || selectedLetter}`;
                feedback.className = 'feedback correct';
                playSound(correctSound);
                
                this.style.backgroundColor = '#4caf50';
                this.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    this.style.backgroundColor = '#ff7e5f';
                    this.style.transform = 'scale(1)';
                }, 1000);
            });
            
            optionsContainer.appendChild(letterOption);
        });
        
        activityContent.appendChild(optionsContainer);
    }
});