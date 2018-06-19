

function init() {
/* runs the functions that match the cards and end the game */
$('.card').on('click', function() {
    if (ignoreClick === true) {
        setTimeout(startClicking, 100);
    }
    if (ignoreClick === false) {
    displayCard.call(this);
    addToOpen.call(this);
    isItAMatch.call(this);
    starCounter();
    endGame();
    }
});
/* Shuffles the cards when the page reloads */
let cards = Array.from( document.querySelectorAll( ".card > i" ) ); /* created an array that points to the card elements - not just of the strings */
let deck = cards.map(c => c.className); /* creates a new array of the class names */

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(deck); /* shuffles the class names */


for ( let i = 0; i < 16; i++ )
  cards[i].className = deck[i]; /* runs through all the card elements and assigns to them the indices of the shuffled elements */

}

document.addEventListener("DOMContentLoaded", init ); /* runs the shuffler when the page is reloaded */

/* Allows the player to click on cards and see if they match or not */

let openCards = []; /* an array that will hold recently clicked cards so they can be compared for matching */
let matchedCards = []; /* an array of cards that have been matched.*/
let moves = 0; /* a variable showing the number of moves the player has made */
let numberOfMatches = 0; /* a variable showing how many matches the player has made. When it === 8, then game is over */
let starNumber = 3; /* variable showing how many stars the player has. Player starts with 3 and the number decrease as the number of moves increases */
let ignoreClick = false;


function startClicking() {
    ignoreClick = false;
};

function stopClicking() {
    ignoreClick = false;
};

function updateCounter() {  /*replaces the number in the endgame modal with the correct number of moves*/
    $('.moves').text(moves);
};

function updatePluralOrSingularStars() { /*in the endgame modal, makes it so that the word "star" is correctly plural or singular*/
    if (starNumber === 1) {
        $('.pluralOrSingularStars').text("star");
    }
    if (starNumber === 2) {
        $('.pluralOrSingularStars').text("stars");
    }
    if (starNumber === 3) {
        $('.pluralOrSingularStars').text("stars");
    }
};

function updateStarNumber() { /*replaces the number in the endgame modal with the correct number of stars*/
    $('.starNumber').text(starNumber);
};

function addToOpen() { /* pushes recently clicked card into the openCards array */
    openCards.push(this);
};

function addToMoves() { /*increases the moves variable */
    moves++;
};

function displayCard() { /*displays the given card */
    $(this).toggleClass('open show', true);
};

function increaseNumberOfMatches() { /*increases the numberOfMatches variable */
    numberOfMatches++;
};


function starCounter() { /* changes how many stars are displayed above the grid */
    if (moves > 15 && moves < 22) {
        $('.stars li:nth-child(3)').css("text-shadow", "2px 2px 4px #000000");
        $('.stars li:nth-child(3)').css("color", "white");
        starNumber = 2;
    } else if (moves >= 22) {
        $('.stars li:nth-child(2)').css("text-shadow", "2px 2px 4px #000000");
        $('.stars li:nth-child(2)').css("color", "white");
        starNumber = 1;
    }
};

function endGame() {
    updatePluralOrSingularStars();/* sets the word "star" to singular or plural */
    updateStarNumber(); /* updates the modal with the correct star number */
    if (numberOfMatches === 8) { /* displays the modal when the user finishes the game */
        const modal = $('#endGameModal').css('display', 'block');
        clearInterval(clock);
    };
};

function isItAMatch() {
    let previousCard = openCards[openCards.length - 2]; /* the second to last card the user clicked */
    let thisCard = openCards[openCards.length - 1]; /* the card the user just clicked */

    function removeMismatchedCards() { /* function closes two cards if they don't match */
            $(previousCard).toggleClass('open show', false);
            $(thisCard).toggleClass('open show', false);
    };

    if (openCards.length >= 2) {
        if (previousCard !== thisCard && thisCard.children[0].className === previousCard.children[0].className) { /* if the previous card's class matches this card's class */
            $(previousCard).toggleClass('open show', true); /* turn the cards face up */
            $(thisCard).toggleClass('open show', true);
            $(previousCard).css('background', '#42f4ee');/* changes color of the matched cards */
            $(thisCard).css('background', '#42f4ee');
            $(previousCard).effect( 'bounce', 'fast'); /* bounces the matched cards */
            $(thisCard).effect( 'bounce', 'fast');
            matchedCards.push(previousCard, thisCard); /* add them to the list of matched cards */
            openCards.pop(); /* take them off the list of open cards */
            openCards.pop();
            $(matchedCards).toggleClass('open show', true); /* keep them face up */
            $(matchedCards).off(); /* make them unclickable */
            addToMoves(); /* increase the number of moves */
            updateCounter(); /* updates move number in the endgame modal */
            increaseNumberOfMatches(); /* increases NumberOfMatches */
            };
            if (thisCard.children[0].className !== previousCard.children[0].className) { /* if the previous card's class does NOT match this card's class */
                ignoreClick = true;
                setTimeout(removeMismatchedCards, 750); /* wait 3/4 of a second then flip the cards face down */
                openCards.pop(); /* take them off the list of open cards */
                openCards.pop();
                addToMoves(); /* increase the number of moves */
                updateCounter(); /* updates move number in the endgame modal */
                setTimeout(startClicking, 250); // wait 1/4 of a second and then let users click
            }
        }
    };




/* restart button */
$('.restart').on('click', function() {
    window.location.reload();
});


/* allows user to exit out of modal */
$('.exit').on('click', function () {
   $('.modal').css('display', 'none');
});


/* timer */
let seconds = 0;
let min = 0;
let hours = 0;

function displaySeconds() {
    seconds++;
    if ( seconds < 10) {
        seconds = "0" + seconds;
    }
    if ( seconds === 61 ) {
        min++;
        seconds = 1;
    }
    if ( min === 60) {
        hours++;
        min = 1;
    }
    $('.seconds').text(seconds);
    $('.minutes').text(min);
    $('.hours').text(hours);
};


const clock = setInterval(displaySeconds, 1000);



