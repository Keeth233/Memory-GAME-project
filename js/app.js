/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Array of ALL CARDS
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
const iconsTray = [...icons];

//parent CONTAINER for all cards with css class name deck
const cardsContainer = document.querySelector(".deck");

//declared variables for opened and matched cards
let openedCards = [];
let matchedCards = [];

//shuffle cards on pageload and reset all variables
document.body.onload = shuffle(icons);


//CREATE cards & INITIALIZE the Game
function init() {
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"> </i>`;
        cardsContainer.appendChild(card);

        //call CLICK EVENT function to each card
        click(card);
    }

}

/*
 * CLICK EVENT FUNCTION
 */
let firstClick = true;

function click(card) {

    //card click event
    card.addEventListener("click", function() {

        //call TIMER function on click
        if (firstClick) {
            startTimer();
            firstClick = false;
        }

        const currentCard = this;
        const previousCard = openedCards[0];

        //Have OPENED card
        if (openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);


            //Compare 2 OPENED cards that MATCH
            compare(currentCard, previousCard);

        } else {
            //Have NO OPENED cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }

    });

}

/*
 * COMPARE 2 OPENED CARDS
 */
function compare(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {

        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //when Game is DONE; ALL PAIRED, call this function
        gameDone();

    } else {

        //wait 520ms then close cards
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
        }, 800);

        openedCards = [];
    }

    //call MOVE COUNTER function
    countMove();

}


//MOVE COUNTER; Pair Attempts
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function countMove() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}


//TIMER
const timer = document.querySelector(".timer");
let minutes = 0;
let seconds = 0;
let totalTime = '';

function startTimer() {
    totalTime = setInterval(function() {
        //increment of 1 to seconds each 1000ms
        timer.innerHTML = minutes + 'mins' + ' ' + seconds + 'secs';
        seconds++;
        //increment of 1 to minutes at 60secs
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

//reset TIMER
function stopTimer() {
    clearInterval(totalTime);
}



//STAR RATING
const starsContainer = document.querySelector(".stars");

starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;

function rating() {
    if (moves > 12 && moves < 18) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;

  } else if (moves > 18) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i>`;
    }

}


//RESTART BUTTON
const restartGame = document.querySelector(".restart");
restartGame.addEventListener("click", function() {

    //delete ALL OPENED CARDS
    cardsContainer.innerHTML = "";

    // and reINITIATE the cards afresh
    init();

    //call RESET function
    reset();

    //reset all MATCHED Data and MOVES
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
});


//GAME RESET
function reset() {
    //restart TIMER
    stopTimer();
    //reset click statement, minutes and seconds
    firstClick = true;
    minutes = 0;
    seconds = 0;
    timer.innerHTML = minutes + 'mins' + ' ' + seconds + 'secs';
}

// START the GAME
init();


//SHUFFLE CARDS; Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(icons) {
    let iconsTray = icons.length;
    let randomIndex ='';
    let currentIndex ='';

     while (iconsTray !== 0) {
        randomIndex = Math.floor(Math.random() * iconsTray);
        iconsTray -= 1;
        temporaryValue = icons[iconsTray];
        icons[iconsTray] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }

    return icons;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
