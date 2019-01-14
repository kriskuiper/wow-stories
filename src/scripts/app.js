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
        console.log('form is shown');
        isShown = true;
    }
    else {
        theInput.classList.remove('show');
        searchButton.classList.remove('hide');

        event.preventDefault();
        console.log('form is gone');
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

// Verkrijg de verhalenblokken uit de website

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

// Filter de verhalen
function filterStories(input, titles) {
    checkUserInput();
    getTitles();

    input = checkUserInput();
    titles = getTitles();
    

    // Wanneer de titel gelijk is aan de input of er geen input is, toon dan elk verhaal
    titles.forEach(function(title) {
        if (input === "" || title.textContent.toLowerCase().includes(input.toLowerCase())) {
            returnArticle(title).classList.remove('visually-hidden');
        } else {
            returnArticle(title).classList.add('visually-hidden');
        }
    });
}

searchField.addEventListener('input', filterStories);
// Einde verhalenfilter

// Pas getal achter het genre aan aan het aantal verhalen dat in de lijst staat



// Einde getalaanpassing