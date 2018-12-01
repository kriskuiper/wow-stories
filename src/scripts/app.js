var searchForm = document.getElementById('story-search');
var searchButton = document.getElementById('story-search_button');
var toonVerhalenButton = document.getElementById('submitButton');

function viewSearchForm() {
    searchForm.classList.toggle('visually-hidden');
    searchForm.classList.toggle('show');

    searchButton.classList.toggle('visually-hidden');
}

searchButton.addEventListener('click', viewSearchForm);
submitButton.addEventListener('click', viewSearchForm);

