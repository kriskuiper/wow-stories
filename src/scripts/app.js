
var theForm = document.querySelector('form#story-search');
var searchButton = document.querySelector('form#story-search > button');
var theInput = document.querySelector('form#story-search > fieldset');
var searchField = document.querySelector('form#story-search > fieldset input');
var isShown = false;

var theFilter = document.querySelector('form#filter');
var filterButton = document.querySelector('header > nav button');
var buttonStripes = document.querySelectorAll('header > nav button > span');

// Verkrijg alle verhalen (voor filtering)
var allTitles = document.querySelectorAll('.stories article h4');

// Verkrijg de p die het aantal resultaten weergeeft
var results = document.querySelector('#results');
var resultsSection = document.querySelector('#resultsSection');
var fallBackButton = document.querySelector('#fallBackButton');



// Genre titles
var firstStoriesTitle = document.querySelector('#chaotischTitle');
var secondStoriesTitle = document.querySelector('#humorTitle');
var thirdStoriesTitle = document.querySelector('#horrorTitle');
var fourthStoriesTitle = document.querySelector('#liefdeTitle');

// Titles for downloads / likes page
var downloadsTitle = document.querySelector('#downloadsTitle');
var likesTitle = document.querySelector('#likesTitle');

// Title for resultspage
var resultsTitle = document.querySelector('#resultsTitle');

var allGenreStoryTitles = [
    firstStoriesTitle,
    secondStoriesTitle,
    thirdStoriesTitle,
    fourthStoriesTitle,
]

// Grijp alle downloadbuttons
var downloadButtons = document.querySelectorAll('button#download');
var melding = document.querySelector('body > div');

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

var isToggled = false;

if (firstStoriesTitle && secondStoriesTitle && thirdStoriesTitle && fourthStoriesTitle) {
    firstStoriesTitle.textContent = "Chaotisch (" + getAllStoriesInGenre('chaotischVerhaal') + ")";
    secondStoriesTitle.textContent = "Humor (" + getAllStoriesInGenre('humorVerhaal') + ")";
    thirdStoriesTitle.textContent = "Horror (" + getAllStoriesInGenre('horrorVerhaal') + ")";
    fourthStoriesTitle.textContent = "Liefde (" + getAllStoriesInGenre('liefdeVerhaal') + ")";
} else if (downloadsTitle && likesTitle) {
    downloadsTitle.textContent = "Gedownloade verhalen (" + getAllStoriesInGenre('gedownloadVerhaal') + ")";
    likesTitle.textContent = "Gelikete verhalen (" + getAllStoriesInGenre('likedVerhaal') + ")";
} else if (resultsTitle) {
    resultsTitle.textContent = getAllStoriesInGenre('resultaatVerhaal') + " verhalen gevonden";
}


searchField.addEventListener('input', filterStories);
searchField.addEventListener('keydown', filterStories);
searchField.addEventListener('keyup', filterStories);

theForm.addEventListener('click', toggleSearchForm);
filterButton.addEventListener('click', toggleFilter);

for (i = 0; i < downloadButtons.length; i++) {
    downloadButtons[i].addEventListener('click', loadingState);
}

submitInput.addEventListener('click', surpriseUser);


// Animeer het zoekformulier in on click
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
// Einde animatie

// Animeer het filter in on click (inclusief de hamburger strepen)
function toggleFilter() {
    theFilter.classList.toggle('show');
    buttonStripes.forEach(function(buttonStripe){
        buttonStripe.classList.toggle('is-open');
    });
    document.body.classList.toggle('noScroll');
}
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

// Zorg dat je het totaal aantal verhalen in een bepaald genre
function getAllStoriesInGenre(genre) {
    var allStories = document.getElementsByClassName(genre);
    return allStories.length;
}

// Fix de droom verhalen wanneer fallBackButton gebruikt wordt
function fixInput() {
    // Zet alle droom verhalen op block
    var droomVerhalen = document.querySelectorAll('.droomVerhaal');
    droomVerhalen.forEach(function(droomVerhaal) {
        droomVerhaal.classList.remove('visually-hidden');
    });
    if (allGenreStoryTitles) {
        allGenreStoryTitles.forEach(function(genreStoryTitles) {
            genreStoryTitles.classList.remove('visually-hidden');
        });
    } else if (downloadsTitle) {
        downloadsTitle.classList.remove('visually-hidden');
    } else if (resultsTitle) {
        resultsTitle.classList.remove('visually-hidden');
    }
    searchField.focus();
}

// Filter de verhalen
function filterStories(input) {
    checkUserInput();
    checkAmountOfVisibleTitles();
    checkVisibleTitlesPerGenre('chaotischVerhaal');
    checkVisibleTitlesPerGenre('humorVerhaal');
    checkVisibleTitlesPerGenre('horrorVerhaal');
    checkVisibleTitlesPerGenre('liefdeVerhaal');

    checkVisibleTitlesPerGenre('gedownloadVerhaal');
    checkVisibleTitlesPerGenre('likedVerhaal');

    checkVisibleTitlesPerGenre('resultaatVerhaal');

    input = checkUserInput();
    var visibleTitles = checkAmountOfVisibleTitles();

    // Genre stories
    var visibleChaotisch = checkVisibleTitlesPerGenre('chaotischVerhaal');
    var visibleHumor = checkVisibleTitlesPerGenre('humorVerhaal');
    var visibleHorror = checkVisibleTitlesPerGenre('horrorVerhaal');
    var visibleLiefde = checkVisibleTitlesPerGenre('liefdeVerhaal');

    // Visible stories downloadpage
    var visibleDownloads = checkVisibleTitlesPerGenre('gedownloadVerhaal');
    var visibleLiked = checkVisibleTitlesPerGenre('likedVerhaal');

    // Visible stories resultspage
    var visibleResults = checkVisibleTitlesPerGenre('resultaatVerhaal');
        
    if (firstStoriesTitle && secondStoriesTitle && thirdStoriesTitle && fourthStoriesTitle) {
        if (firstStoriesTitle) {
            firstStoriesTitle.textContent = "Chaotisch (" + visibleChaotisch + ")";
            secondStoriesTitle.textContent = "Humor (" + visibleHumor + ")";
            thirdStoriesTitle.textContent = "Horror (" + visibleHorror + ")";
            fourthStoriesTitle.textContent = "Liefde (" + visibleLiefde + ")";
        } else if (downloadsTitle) {
            downloadsTitle.textContent = "Gedownloade verhalen (" + visibleDownloads + ")";
            likesTitle.textContent = "Gelikete verhalen (" + visibleLiked + ")";
        } else if (resultsTitle) {
            resultsTitle.textContent = visibleResults + " verhalen gevonden";
        }
    }

    if (input === "") {
        // Als er totaal geen input is, doe dan dit:
        visibleTitles = allTitles.length;
        visibleChaotisch = getAllStoriesInGenre('chaotischVerhaal');
        visibleHumor = getAllStoriesInGenre('humorVerhaal');
        visibleHorror = getAllStoriesInGenre('horrorVerhaal');
        visibleLiefde = getAllStoriesInGenre('liefdeVerhaal');

        visibleDownloads = getAllStoriesInGenre('gedownloadVerhaal');
        visibleLiked = getAllStoriesInGenre('likedVerhaal')

        visibleResults = getAllStoriesInGenre('resultaatVerhaal');

        if (results && fallBackButton) {
            results.classList.add('visually-hidden');
            fallBackButton.classList.add('visually-hidden');
        }
        if (visibleTitles >= allTitles.length) {
            allTitles.forEach(function(title) {
                returnArticle(title).classList.remove('visually-hidden');
            });
        }

        if (allGenreStoryTitles) {
            allGenreStoryTitles.forEach(function(genreStoryTitles) {
                genreStoryTitles.classList.remove('visually-hidden');
            });
        } else if (downloadsTitle) {
            downloadsTitle.classList.remove('visually-hidden');
        } else if (resultsTitle) {
            resultsTitle.classList.remove('visually-hidden');
        }

    } else if (input && visibleTitles <= allTitles.length && visibleTitles >= 1) {

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

        visibleDownloads = 0;
        visibleLiked = 0;

        visibleResults = 0;

        if (allGenreStoryTitles) {
            allGenreStoryTitles.forEach(function(genreStoryTitles) {
                genreStoryTitles.classList.add('visually-hidden');
            });
        } else if (downloadsTitle) {
            downloadsTitle.classList.add('visually-hidden');
        } else if (resultsTitle) {
            resultsTitle.classList.add('visually-hidden');
        }
    }
}

function showMelding(meldingSoort) {
    melding.classList.add('show');
    melding.classList.add(meldingSoort);
}

function deleteMelding() {
    setTimeout(function() {
        melding.classList.remove('show');
    }, 4000);
}

// Download animation
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

function getRandomStory() {
    var randomNumber = Math.floor(Math.random() * allStories.length);
    var randomStory = allStories[randomNumber];
    var clonedStory = randomStory.cloneNode(true);
    clonedStory.classList.remove('chaotischVerhaal');
    clonedStory.classList.remove('visually-hidden');

    return clonedStory;
}

function surpriseUser() {
    genreButton.classList.toggle('active');
    surpriseButton.classList.toggle('active');
    
    if (secondSection) {
        secondSection.classList.toggle('visually-hidden');
    }

    if (thirdSection) {
        thirdSection.classList.toggle('visually-hidden');
        fourthSection.classList.toggle('visually-hidden');    
    }

    firstStories.forEach(function(story) {
        story.classList.toggle('visually-hidden');
    });

    // Het gegenereerde verhaal is altijd het laatste article in de eerste lijst. 
    // Deze moet weer verwijderd worden wanneer de gebruiker terug gaat naar alle verhalen.

    var generatedStory = document.querySelector('.stories:first-of-type article:last-child');

    if (!isToggled) {

        if (firstStoriesTitle) {
            firstStoriesTitle.textContent = "Speciaal voor jou:";
        } else if (downloadsTitle) {
            downloadsTitle.textContent = "Speciaal voor jou:";
        } else if (resultsTitle) {
            resultsTitle.textContent = "Speciaal voor jou:"
        }

        isToggled = true;
        firstSection.classList.toggle('loading');
        setTimeout(function() {
            firstSection.classList.toggle('loading');
            firstSection.appendChild(getRandomStory());
        }, 2000);
    } else {
        if (firstStoriesTitle) {
            firstStoriesTitle.textContent = "Chaotisch (" + getAllStoriesInGenre('chaotischVerhaal') + ")";
        } else if (downloadsTitle) {
            downloadsTitle.textContent = "Gedownloade verhalen (" + getAllStoriesInGenre('gedownloadVerhaal') + ")";
        } else if (resultsTitle) {
            resultsTitle.textContent = "3 verhalen gevonden";
        }
        // Het verhaal wordt weer verwijderd.
        firstSection.removeChild(generatedStory);
        isToggled = false;
    }

    event.preventDefault();
}