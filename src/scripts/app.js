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
var resultsSection = document.querySelector('body > section:first-of-type');

// Tag de resultaten met een class zodat er bijgehouden kan worden hoeveel resultaten er zijn
var resultItems = document.getElementsByClassName('result');

// Filter de verhalen
function filterStories() {
    checkUserInput();
    getTitles();

    var input = checkUserInput();
    var titles = getTitles();
    

    // Wanneer de titel gelijk is aan de input of er geen input is, toon dan elk verhaal
    titles.forEach(function(title) {
        results.classList.remove('visually-hidden');
        results.textContent = resultItems.length + " verhalen gevonden."
        if (input === "") {
            results.classList.add('visually-hidden');
            returnArticle(title).classList.remove('visually-hidden');

            allGenreTitles.forEach(function(genreTitle) {
                genreTitle.classList.remove('visually-hidden');
            });

        } else if (input === "" || title.innerText.toLowerCase().includes(input.toLowerCase())) {
            returnArticle(title).classList.remove('visually-hidden');
            returnArticle(title).classList.add('result');

            allGenreTitles.forEach(function(genreTitle) {
                genreTitle.classList.remove('visually-hidden');
            });
        } else if (!title.textContent.toLowerCase().includes(input.toLowerCase())) {
            returnArticle(title).classList.add('visually-hidden');
            returnArticle(title).classList.remove('result');

            allGenreTitles.forEach(function(genreTitle) {
                genreTitle.classList.add('visually-hidden');
            });
        }
    });
}

searchField.addEventListener('input', filterStories);
// Einde verhalenfilter

// Download animation

// Grijp alle downloadbuttons
var downloadButtons = document.querySelectorAll('#download');


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

// Change the number of the results at each Genre
// Get all titles
var firstStories = document.querySelectorAll('body > section:nth-of-type(2) > section > article');
var secondStories = document.querySelectorAll('body > section:nth-of-type(3) > section > article');
var thirdStories = document.querySelectorAll('body > section:nth-of-type(4) > section > article');
var fourthStories = document.querySelectorAll('body > section:nth-of-type(5) > section > article');

var firstStoriesTitle = document.querySelector('body > section:nth-of-type(2) > h2');
var secondStoriesTitle = document.querySelector('body > section:nth-of-type(3) > h2');
var thirdStoriesTitle = document.querySelector('body > section:nth-of-type(4) > h2');
var fourthStoriesTitle = document.querySelector('body > section:nth-of-type(5) > h2');

// Set all titles in an array for later purposes
var allGenreTitles = [
    firstStoriesTitle,
    secondStoriesTitle,
    thirdStoriesTitle,
    fourthStoriesTitle
]

// Set the initial state of the titles
firstStoriesTitle.textContent = "Chaotisch" + " (" + firstStories.length + ")";
secondStoriesTitle.textContent = "Humor" + " (" + secondStories.length + ")";
thirdStoriesTitle.textContent = "Horror" + " (" + thirdStories.length + ")";
fourthStoriesTitle.textContent = "Liefde" + " (" + fourthStories.length + ")";

// Change the number of results
// Function that takes all vars of every story as arguments
function storyChecker(listOfStories, updatedStoryList, storiesTitleElement, titleName) {
    updatedStoryList = [];

    listOfStories.forEach(function(story) {
        if (story.classList.contains('result')) {
            updatedStoryList.push(story);
            storiesTitleElement.textContent = titleName + " (" + updatedStoryList.length + ")";
        }
    });
}

function checkStories() {
    storyChecker(firstStories, [], firstStoriesTitle, "Chaotisch");
    storyChecker(secondStories, [], secondStoriesTitle, "Humor");
    storyChecker(thirdStories, [], thirdStoriesTitle, "Horror");
    storyChecker(fourthStories, [], fourthStoriesTitle, "Liefde");    
}

searchField.addEventListener('input', checkStories);

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

function getRandomStory() {
    var randomNumber = Math.floor(Math.random() * allStories.length);
    var randomStory = allStories[randomNumber];
    var clonedStory = randomStory.cloneNode(true);

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
        firstStoriesTitle.textContent = "Chaotisch" + " (" + firstStories.length + ")";
        // Het verhaal wordt weer verwijderd.
        firstSection.removeChild(generatedStory);
        isToggled = false;
    }

    event.preventDefault();
}

submitInput.addEventListener('click', surpriseUser);