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

        } else if (input === "" || title.innerText.toLowerCase().includes(input.toLowerCase())) {
            returnArticle(title).classList.remove('visually-hidden');
            returnArticle(title).classList.add('result');
        } else if (!title.textContent.toLowerCase().includes(input.toLowerCase())) {
            returnArticle(title).classList.add('visually-hidden');
            returnArticle(title).classList.remove('result');
            results.textContent = "Sorry, we hebben het verhaal " + checkUserInput() + " niet gevonden";

            firstStoriesTitle.textContent = "Chaotisch (0)";
            secondStoriesTitle.textContent = "Humor (0)";
            thirdStoriesTitle.textContent = "Horror (0)";
            fourthStoriesTitle.textContent = "Liefde (0)";
        }
    });
}

searchField.addEventListener('input', filterStories);
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

// Change the number of the results at each Genre
var firstStories = document.querySelectorAll('body > section:nth-of-type(2) > section > article');
var secondStories = document.querySelectorAll('body > section:nth-of-type(3) > section > article');
var thirdStories = document.querySelectorAll('body > section:nth-of-type(4) > section > article');
var fourthStories = document.querySelectorAll('body > section:nth-of-type(5) > section > article');

var firstStoriesTitle = document.querySelector('body > section:nth-of-type(2) > h2');
var secondStoriesTitle = document.querySelector('body > section:nth-of-type(3) > h2');
var thirdStoriesTitle = document.querySelector('body > section:nth-of-type(4) > h2');
var fourthStoriesTitle = document.querySelector('body > section:nth-of-type(5) > h2');

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