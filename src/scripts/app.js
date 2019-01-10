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