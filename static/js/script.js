function createCard() {
    const userInput = document.getElementById('userInput').value;

    if (userInput.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    fetch('/add_card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Card created successfully') {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('col-md-4', 'mb-3');
            cardDiv.innerHTML = `
                <div class="card" style="cursor: pointer;" data-card-id="${data.id}">
                    <div class="card-body">
                        <p class="card-text">${userInput}</p>
                        <button class="play-audio">Play</button>
                        <button type="button" class="delete-button" data-card-id="${data.id}">Delete</button>
                    </div>
                </div>
            `;
            document.getElementById('cardContainer').appendChild(cardDiv);

            // Add event listener for the Play button
            cardDiv.querySelector('.play-audio').addEventListener('click', function(event) {
                event.stopPropagation();
                readTextAloud(userInput, cardDiv.querySelector('.card'));
            });

            // Add event listener for the Delete button
            cardDiv.querySelector('.delete-button').addEventListener('click', function(event) {
                event.stopPropagation();
                deleteCard(data.id);
            });

            document.getElementById('userInput').value = ''; // Clear input field
        } else if (data.message === 'Card already exists') {
            alert("This card already exists in the database.");
        }
    })
    .catch(error => console.error('Error:', error));
}

function deleteCard(cardId) {
    const deleteButton = document.querySelector(`[data-delete-id="${cardId}"]`);
    if (deleteButton) {
        deleteButton.disabled = true; // Disable the button immediately
    }

    fetch(`/delete_card/${cardId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) { // Check if response status is 200-299
            const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);            
            if (cardElement) {
                cardElement.parentNode.className = ''; // Reset class name
                cardElement.parentNode.removeChild(cardElement); // Remove the card element
            } else {
                console.warn(`Card element with ID ${cardId} not found`);
            }
        } else {
            console.error(`Error deleting card: ${response.statusText}`); // Log error with status text
        }
    })
    .catch(error => {
        console.error(`Error deleting card: ${error}`);
    })
    .finally(() => {
        // Re-enable the button after the operation completes
        if (deleteButton) {
            deleteButton.disabled = false; // Enable the button again
        }
    });
}



// Function to read text aloud
function readTextAloud(text, cardElement) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('highlight'));
    cardElement.classList.add('highlight');
}

// Add event listeners to existing play-audio buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.play-audio').forEach(button => {
        button.addEventListener('click', function(event) {
            console.log('click'); // Debug log
            // Prevent triggering the card click event
            event.stopPropagation();
            
            // Get the text from the card
            const text = this.closest('.card-body').querySelector('.card-text').innerText;
            const cardElement = this.closest('.card'); // Get the card element
            readTextAloud(text, cardElement);
        });
    });
});
