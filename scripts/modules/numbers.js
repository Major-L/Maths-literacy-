function initNumbersModule(container) {
    container.innerHTML = '';
    
    // Module header
    const header = document.createElement('h2');
    header.textContent = 'Numbers 1-20';
    container.appendChild(header);
    
    // Number grid
    const numberGrid = document.createElement('div');
    numberGrid.className = 'number-grid';
    
    for (let i = 1; i <= 20; i++) {
        const numberCard = document.createElement('div');
        numberCard.className = 'number-card';
        numberCard.innerHTML = `
            <span class="number">${i}</span>
            <div class="number-image"></div>
        `;
        
        // Add click event to speak the number
        numberCard.addEventListener('click', () => {
            speak(`Number ${i}`);
            
            // Fetch and show image for the number
            fetchImage(`${i} objects`).then(imgUrl => {
                const imgContainer = numberCard.querySelector('.number-image');
                imgContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = `${i} objects`;
                imgContainer.appendChild(img);
            });
        });
        
        numberGrid.appendChild(numberCard);
    }
    
    container.appendChild(numberGrid);
    
    // Add some CSS for this module
    const style = document.createElement('style');
    style.textContent = `
        .number-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .number-card {
            background-color: #FFE66D;
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .number-card:hover {
            transform: scale(1.05);
        }
        
        .number {
            font-size: 2rem;
            font-weight: bold;
            color: #FF6B6B;
        }
        
        .number-image {
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0.5rem;
        }
        
        .number-image img {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
        }
    `;
    container.appendChild(style);
    
    // Speak initial instructions
    speak("Click on any number to hear it and see examples!");
}