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

// Verkrijg alle verhalen
var allTitles = document.querySelectorAll('.stories article h4');

// Check welke verhalen er nog zichtbaar zijn
function checkAmountOfVisibleTitles() {
    var visibleTitles = [];

    for (var i = 0; i < allTitles.length; i++) {
        if (!returnArticle(allTitles[i]).classList.contains('visually-hidden')) {
            visibleTitles.push(allTitles[i]);
        }
    }

    return visibleTitles.length;
}

// Check welke verhalen er nog zichtbaar zijn per genre
function checkVisibleTitlesPerGenre(genre) {
    var storiesInGenre = document.getElementsByClassName(genre);
    var visibleTitlesInGenre = [];

    for (var i = 0; i < storiesInGenre.length; i++) {
        if (!storiesInGenre[i].classList.contains('visually-hidden')) {
            visibleTitlesInGenre.push(storiesInGenre[i]);
        }
    }

    return visibleTitlesInGenre.length;
}

function getAllStoriesInGenre(genre) {
    var allStories = document.getElementsByClassName(genre);
    return allStories.length;
}

// Verkrijg de p die het aantal resultaten weergeeft
var results = document.querySelector('#results');
var resultsSection = document.querySelector('#resultsSection');
var fallBackButton = document.querySelector('#fallBackButton');

if (fallBackButton) {
    fallBackButton.addEventListener('click', fixInput);
}

function fixInput() {
    // Verander de input naar 'droom'.
    searchField.value = "Droom";
    // Filter stories on the searchField value, in this case droom
    filterStories();
}


var firstStoriesTitle = document.querySelector('#chaotischTitle');
var secondStoriesTitle = document.querySelector('#humorTitle');
var thirdStoriesTitle = document.querySelector('#horrorTitle');
var fourthStoriesTitle = document.querySelector('#liefdeTitle');

firstStoriesTitle.textContent = "Chaotisch (" + getAllStoriesInGenre('chaotischVerhaal') + ")";
secondStoriesTitle.textContent = "Humor (" + getAllStoriesInGenre('humorVerhaal') + ")";
thirdStoriesTitle.textContent = "Horror (" + getAllStoriesInGenre('horrorVerhaal') + ")";
fourthStoriesTitle.textContent = "Liefde (" + getAllStoriesInGenre('liefdeVerhaal') + ")";

// Filter de verhalen
function filterStories() {
    checkUserInput();
    checkAmountOfVisibleTitles();
    checkVisibleTitlesPerGenre('chaotischVerhaal');
    checkVisibleTitlesPerGenre('humorVerhaal');
    checkVisibleTitlesPerGenre('horrorVerhaal');
    checkVisibleTitlesPerGenre('liefdeVerhaal');

    var input = checkUserInput();
    var visibleTitles = checkAmountOfVisibleTitles();

    var visibleChaotisch = checkVisibleTitlesPerGenre('chaotischVerhaal');
    var visibleHumor = checkVisibleTitlesPerGenre('humorVerhaal');
    var visibleHorror = checkVisibleTitlesPerGenre('horrorVerhaal');
    var visibleLiefde = checkVisibleTitlesPerGenre('liefdeVerhaal');
        
    firstStoriesTitle.textContent = "Chaotisch (" + visibleChaotisch + ")";
    secondStoriesTitle.textContent = "Humor (" + visibleHumor + ")";
    thirdStoriesTitle.textContent = "Horror (" + visibleHorror + ")";
    fourthStoriesTitle.textContent = "Liefde (" + visibleLiefde + ")";

    if (input === "") {
        // Als er totaal geen input is, doe dan dit:
        visibleTitles = 15;
        visibleChaotisch = getAllStoriesInGenre('chaotischVerhaal');
        visibleHumor = getAllStoriesInGenre('humorVerhaal');
        visibleHorror = getAllStoriesInGenre('horrorVerhaal');
        visibleLiefde = getAllStoriesInGenre('liefdeVerhaal');

        if (results && fallBackButton) {
            results.classList.add('visually-hidden');
            fallBackButton.classList.add('visually-hidden');
        }
        if (visibleTitles === 15) {
            allTitles.forEach(function(title) {
                returnArticle(title).classList.remove('visually-hidden');
            });
        }
    } else if (input && visibleTitles <= 15 && visibleTitles >= 1) {

        if (results) {
            results.classList.remove('visually-hidden');
            results.textContent =  visibleTitles + " verhalen gevonden.";

        }
        allTitles.forEach(function(title) {
            if (title.textContent.toLowerCase().includes(input.toLowerCase())) {
                returnArticle(title).classList.remove('visually-hidden');
            } else {
                returnArticle(title).classList.add('visually-hidden');
            }
        });
    } else {

        if (results && fallBackButton) {
            results.textContent = "Oeps, we hebben geen resultaten kunnen vinden voor " + input + ", bedoelde je misschien 'Droom'?";
            fallBackButton.classList.remove('visually-hidden');
            fallBackButton.addEventListener('click', fixInput);
        }

        visibleChaotisch = 0;
        visibleHumor = 0;
        visibleHorror = 0;
        visibleLiefde = 0;
    }
}

searchField.addEventListener('input', filterStories);
searchField.addEventListener('keydown', filterStories);
searchField.addEventListener('keyup', filterStories);
// Einde verhalenfilter

// Download animation

// Grijp alle downloadbuttons
var downloadButtons = document.querySelectorAll('button#download');


var melding = document.querySelector('body > div');
function showMelding(meldingSoort) {
    melding.classList.add('show');
    melding.classList.add(meldingSoort);
}

function deleteMelding() {
    setTimeout(function() {
        melding.classList.remove('show');
    }, 4000);
}

// Zorg dat de classlist wordt aangepast op hetgeen de gebruiker klikt

function loadingState() {
    // Bind this to the function so that setTimeout doesn't set it to the window
    var e = this;
    var betreffendeTitel = returnArticle(e).childNodes[1].childNodes[1].textContent; // Titel van het betreffende verhaal voor de melding
    e.classList.add('loading');
    setTimeout(function() {
        // Check internet connectie door een httprequest te doen.
        // Bron: https://www.kirupa.com/html5/check_if_internet_connection_exists_in_javascript.html
        var xhr = new XMLHttpRequest();
        var file = "https://picsum.photos/200/300";
        var randomNum = Math.round(Math.random() * 10000);

        xhr.open('HEAD', file + "?rand=" + randomNum, true);
        xhr.send();

        xhr.addEventListener('readystatechange', processRequest, false);

        function processRequest(el) {
            if (xhr.readyState == 4) {
                // Als er internet is, toon dan de success state
                if (xhr.status >= 200 && xhr.status < 304) {
                    e.classList.remove('loading');
                    e.classList.add('finished');
                    melding.classList.remove('error');
                    showMelding('success');
                    melding.childNodes[1].textContent = "'" + betreffendeTitel + "'" + " is gedownload op dit apparaat";
                    // Pas de text van de onderliggende li aan naar "Gedownload"
                    e.parentElement.nextElementSibling.textContent = "Gedownload";
                    deleteMelding();
                // Als er geen internet is, toon dan de error state
                } else {
                    e.classList.remove('loading');
                    e.classList.add('error');
                    melding.classList.remove('success');
                    showMelding('error');
                    melding.childNodes[1].textContent = "Het downloaden van " + "'" + betreffendeTitel + "'" + " is mislukt.";
                    // Pas de text van de onderliggende li aan naar "Mislukt"
                    e.parentElement.nextElementSibling.textContent = "Mislukt!";
                    deleteMelding();
                }
            }
        }
    }, 3600);
}

// Voeg de eventListener toe aan elke downloadbutton
for (i = 0; i < downloadButtons.length; i++) {
    downloadButtons[i].addEventListener('click', loadingState);
}

// End download animation

// Verras me flow
var submitInput = document.querySelector('#sortOptions input[type="submit"]');
var genreButton = document.querySelector('#sortOptions label');
var surpriseButton = document.querySelector('#sortOptions label:last-of-type');

var sections = document.querySelectorAll('.genre');
var firstSection = document.querySelector('.stories:first-of-type');
var secondSection = sections[1];
var thirdSection = sections[2];
var fourthSection = sections[3];

var allStories = document.querySelectorAll('.stories article');
var firstStories = document.querySelectorAll('.stories:first-of-type article');

function getRandomStory() {
    var randomNumber = Math.round(Math.random() * allStories.length-1);
    var randomStory = allStories[randomNumber];
    var clonedStory = randomStory.cloneNode(true);
    clonedStory.classList.remove('chaotischVerhaal');
    clonedStory.classList.remove('visually-hidden');

    return clonedStory;
}

var isToggled = false;

function surpriseUser() {
    genreButton.classList.toggle('active');
    surpriseButton.classList.toggle('active');

    secondSection.classList.toggle('visually-hidden');
    thirdSection.classList.toggle('visually-hidden');
    fourthSection.classList.toggle('visually-hidden');

    firstStories.forEach(function(story) {
        story.classList.toggle('visually-hidden');
    })

    // Het gegenereerde verhaal is altijd het laatste article in de eerste lijst. 
    // Deze moet weer verwijderd worden wanneer de gebruiker terug gaat naar alle verhalen.

    var generatedStory = document.querySelector('.stories:first-of-type article:last-child');

    if (!isToggled) {
        firstStoriesTitle.textContent = "Speciaal voor jou:";
        isToggled = true;
        firstSection.classList.toggle('loading');
        setTimeout(function() {
            firstSection.classList.toggle('loading');
            firstSection.appendChild(getRandomStory());
        }, 2000);
    } else {
        firstStoriesTitle.textContent = "Chaotisch (" + getAllStoriesInGenre('chaotischVerhaal') + ")";
        // Het verhaal wordt weer verwijderd.
        firstSection.removeChild(generatedStory);
        isToggled = false;
    }

    event.preventDefault();
}

submitInput.addEventListener('click', surpriseUser);

// End verras me flow

