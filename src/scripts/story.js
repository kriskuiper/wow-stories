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

// Verhaal liken animatie
var likeButton = document.querySelector('footer > button');

likeButton.addEventListener('click', likeVerhaal);

function likeVerhaal() {
    var isLiked = true;
    likeButton.classList.toggle('is-liked');

    if (isLiked) {
        likeButton.removeEventListener('click', likeVerhaal);
    }
}

// Einde verhaal liken animatie