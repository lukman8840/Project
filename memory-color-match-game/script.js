// Selecting the container for cards
const cardsContainer = document.querySelector(".cards");

// Array of colors for the game
const colors = ["aqua", "blue", "gold", "green", "yellow", "teal", "pink", "red"];

// Duplicating the colors to create a picklist for pairs
const colorsPicklist = [...colors, ...colors];

// Total number of cards
const cardsCount = colorsPicklist.length;

// Add these variables at the beginning
let startTime;
let timerInterval;


const timerDisplay = document.getElementById('timer');
let revealedCount = 0; // Count of revealed cards, starts at 0
let activeCard = null; // Reference to the card the user just clicked
let awaitingEndOfMove = false; // Flag to check if the user is waiting for unmatched cards

// Add a new function for updating the timer
// Add a new function for updating the timer
function updateTimer() {
    const currentTime = new Date();
    const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(elapsedTimeInSeconds / 60);
    const seconds = elapsedTimeInSeconds % 60;

    // Format the time with leading zeros
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update the timer display
    timerDisplay.textContent = `Time: ${formattedTime}`;
}

// Function to handle card matching
function matchCards(cards) {
    cards.forEach(card => {
        card.classList.add('done');
    });

    incrementMoveCounter();
    resetClickedCard();

    if (revealedCount === cardsCount) {
        const endTime = new Date();
        const elapsedTime = Math.floor((endTime - startTime) / 1000); // in seconds
        alert(`You win! Total time: ${elapsedTime} seconds`);
        clearInterval(timerInterval);
    }
}


// Modify the 'OncardClicked' function
function OncardClicked(e) {
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }

    const target = e.currentTarget;

    // Check conditions before processing the click
    if (awaitingEndOfMove || target.classList.contains('done')) {
        return;
    }

    // Reveal the color of the clicked card
    target.style.backgroundColor = target.getAttribute("data-color");

    // If no active card, set the current card as the active one
    if (!activeCard) {
        activeCard = target;
        return;
    }

    // Check for a match
    const colorToMatch = activeCard.getAttribute("data-color");

    if (colorToMatch === target.getAttribute("data-color")) {
        // If cards match, disable click events and mark as revealed
        target.removeEventListener("click", OncardClicked);
        activeCard.removeEventListener("click", OncardClicked);
        target.setAttribute("data-revealed", "true");
        activeCard.setAttribute("data-revealed", "true");
        activeCard = null;
        revealedCount += 2;

        // Check if all cards are revealed to declare the win
        if (revealedCount === cardsCount) {
            alert("You win! The game will refresh to play again.");
        }
    } else {
        // If cards don't match, hide them after a short delay
        awaitingEndOfMove = true;

        setTimeout(() => {
            target.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeCard = null;
        }, 1000);
    }
}


// Add a resetGame function
function resetGame() {
    clearInterval(timerInterval);
    startTime = null;
    timerDisplay.textContent = "Time: 00:00";
    revealedCount = 0;
    activeCard = null;
    awaitingEndOfMove = false;

    // Remove all cards from the container
    cardsContainer.innerHTML = "";

    // Rebuild cards
    for (let i = 0; i < cardsCount; i++) {
        const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
        const color = colorsPicklist[randomIndex];
        const card = buildCard(color);
        colorsPicklist.splice(randomIndex, 1);
        cardsContainer.appendChild(card);
    }
}
// Function to build a card element
function buildCard(color) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.setAttribute("data-color", color);

    // Event listener for card clicks
    element.addEventListener("click", OncardClicked);

    return element;
}

// Build up cards dynamically
for (let i = 0; i < cardsCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const card = buildCard(color);

    // Remove the color from the picklist to avoid duplicates
    colorsPicklist.splice(randomIndex, 1);

    // Append the card to the container
    cardsContainer.appendChild(card);
}
