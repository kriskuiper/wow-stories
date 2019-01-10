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

// Animeer het filter in on click
var theFilter = document.querySelector('form#filter');
var filterButton = document.querySelector('header > nav button');

function toggleFilter() {
    theFilter.classList.toggle('show');
    document.body.classList.toggle('noScroll')
}

filterButton.addEventListener('click', toggleFilter);
// Einde filter animatie