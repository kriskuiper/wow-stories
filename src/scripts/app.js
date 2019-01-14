// Animeer het zoekformulier in on click
var theForm = document.querySelector('form#story-search');
var searchButton = document.querySelector('form#story-search > button');
var theInput = document.querySelector('form#story-search > fieldset');
var searchField = document.querySelector('form#story-search > fieldset input');
var isShown = false;

function toggleSearchForm() {
    if (!isShown) {
        theInput.classList.add('show');
        searchButton.classList.add('hide');
    
        searchField.focus();
    
        event.preventDefault();
        isShown = true;
    }
    else {
        theInput.classList.remove('show');
        searchButton.classList.remove('hide');

        event.preventDefault();
        isShown = false;
    }
}

theForm.addEventListener('click', toggleSearchForm);
// Einde animatie

// Animeer het filter in on click (inclusief de hamburger strepen)
var theFilter = document.querySelector('form#filter');
var filterButton = document.querySelector('header > nav button');
var buttonStripes = document.querySelectorAll('header > nav button > span');

function toggleFilter() {
    theFilter.classList.toggle('show');
    buttonStripes.forEach(function(buttonStripe){
        buttonStripe.classList.toggle('is-open');
    });
    document.body.classList.toggle('noScroll');
}

filterButton.addEventListener('click', toggleFilter);
// Einde filter animatie

// Filter verhalen on type
// Verkrijg de input van de gebruiker
function checkUserInput(userInput) {
    userInput = searchField.value;
    return userInput;
}


// Zorg dat je de articles kan hitten met een class ipv alleen de titel
function returnParent(e) {
    var parent = e.parentElement;
    return parent;
}

function returnGrandParent(parent) {
    var grandParent = returnParent(parent).parentElement;
    return grandParent;
}

function returnArticle(grandParent) {
    var article = returnGrandParent(grandParent).parentElement;
    return article;
}

// Verkrijg alle verhalentitels uit de website
function getTitles(titles) {
    titles = document.querySelectorAll('.stories article h4');
    return titles;
}

// Verkrijg de p die het aantal resultaten weergeeft
var results = document.querySelector('body > section:first-of-type > p');

// Filter de verhalen
function filterStories() {
    checkUserInput();
    getTitles();

    var input = checkUserInput();
    var titles = getTitles();
    var resultItems = document.getElementsByClassName('result');
    

    // Wanneer de titel gelijk is aan de input of er geen input is, toon dan elk verhaal
    titles.forEach(function(title) {
        results.classList.remove('visually-hidden');
        results.textContent = resultItems.length + " resultaten gevonden."
        if (input === "") {
            results.classList.add('visually-hidden');
        }
        else if (input === "" || title.textContent.toLowerCase().includes(input.toLowerCase())) {
            returnArticle(title).classList.remove('visually-hidden');
            returnArticle(title).classList.add('result');
        } else {
            returnArticle(title).classList.add('visually-hidden');
            returnArticle(title).classList.remove('result');
        }
    });
}

searchField.addEventListener('keyup', filterStories);
// Einde verhalenfilter

// Download animation

// Grijp alle downloadbuttons
var downloadButtons = document.querySelectorAll('#download');

// Zorg dat de classlist wordt aangepast op hetgeen de gebruiker klikt

function loadingState() {
    // Bind this to the function so that setTimeout doesn't set it to the window
    var e = this;

    e.classList.add('loading');
    setTimeout(function() {
        e.classList.remove('loading');
        e.classList.add('finished');

        // Pas de text van de onderliggende li aan naar "Gedownload"
        e.parentElement.nextElementSibling.textContent = "Gedownload";
    }, 3600);
}

// Voeg de eventListener toe aan elke downloadbutton
for (i = 0; i < downloadButtons.length; i++) {
    downloadButtons[i].addEventListener('click', loadingState);
}
// End download animation