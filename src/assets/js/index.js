/* eslint-disable max-classes-per-file */
const requestURL = './fisheyedata.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

/* eslint-disable max-classes-per-file */
function processData() {
  const data = request.response;
  const { photographers } = data;
  const { media } = data;

  // Creating Card Elements
  class CreateCardElement {
    constructor(imgSrc, name, city, country, tagline, price, id) {
      this.imgSrc = imgSrc;
      this.name = name;
      this.city = city;
      this.country = country;
      this.tagline = tagline;
      this.price = price;
      this.id = id;
    }

    createCard() {
      const cardContainer = document.getElementById('cardContainer');
      const article = document.createElement('article');
      article.className = 'card card__photographer';
      article.innerHTML = `
          <a href="?dc=${this.id}"><div class="card__photographer-portrait">
            <img class="card__photographer-portrait-img" src="./assets/img/Photographers ID Photos/${this.imgSrc}" alt="${this.name}">
          </div>
          <div class="card__photographer-description">
          <div class="card__photographer-title">
            <h2 class="card__photographer-title-name">${this.name}</h2>
            </div></a>
            <p class="card__photographer-description-location">${this.city}, ${this.country}</p>
            <p class="card__photographer-description-tagline">${this.tagline}</p>
            <p class="card__photographer-description-price">$${this.price}/day</p>
          <div class="card__photographer-tags">
            <ul class="card__photographer-tags-list" role="navigation" aria-label="Links to tagged photographers">
            </ul>
          </div>
          </div>
      `;
      cardContainer.appendChild(article);
    }

    createBanner() {
      const article = document.getElementById('singlePhotographerBanner');
      article.innerHTML = `
        <div class="card__banner-information">
          <div class="card__banner-description">
            <div class="card__banner-title">
              <h2 class="card__banner-title-name">${this.name}</h2>
              </div>
              <p class="card__banner-description-location">${this.city}, ${this.country}</p>
              <p class="card__banner-description-tagline">${this.tagline}</p>
            <div class="card__banner-tags">
              <ul class="card__banner-tags-list" id="card__banner-tags-list" role="navigation" aria-label="Links to tagged photographs">
              </ul>
            </div>
          </div>
          <div class="card__banner-contact">
              <button class="btn btn-contact">Contact Me</button>
          </div>
        </div>
          <div class="card__banner-portrait">
            <img class="card__banner-portrait-img" src="./assets/img/Photographers ID Photos/${this.imgSrc}" alt="${this.name}">
          </div>

      `;
    }
  }
  // loop created below so objects created dependent on length of photographer array in JSON
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < photographers.length; i++) {
    const photographerCards = new CreateCardElement(photographers[i].portrait,
      photographers[i].name,
      photographers[i].city,
      photographers[i].country,
      photographers[i].tagline,
      photographers[i].price,
      photographers[i].id);
    photographerCards.createCard();
    // Loop to create tags based on JSON data
    for (let j = 0; j < photographers[i].tags.length; j++) {
      const tags = photographers[i].tags[j];
      const ul = document.getElementsByClassName('card__photographer-tags-list');
      const li = document.createElement('li');
      li.className = ('tag card__photographer-tags-list-item');
      li.innerHTML = `
          <span class="sr-only">${tags}</span>
          ${tags}
          `;
      ul[i].appendChild(li);
      // add classes for each of the photographer articles based on tags for searching
      const articleSelection = document.getElementsByTagName('article');
      articleSelection[i].classList.add(tags);
      // code to add data-tag to tags on card for help with searching
      const dataTag = document.createAttribute('data-filter-tag');
      dataTag.value = tags;
      li.setAttributeNode(dataTag);
      const tabIndexTag = document.createAttribute('tabindex');
      tabIndexTag.value = '0';
      li.setAttributeNode(tabIndexTag);
    }
  }

  // Filter navigation section
  const tagList = document.querySelectorAll('.nav ul li, .card__photographer-tags-list-item');
  const selectionArt = document.querySelectorAll('.art');
  const selectionPortrait = document.querySelectorAll('.portrait');
  const selectionFashion = document.querySelectorAll('.fashion');
  const selectionArchitecture = document.querySelectorAll('.architecture');
  const selectionTravel = document.querySelectorAll('.travel');
  const selectionSport = document.querySelectorAll('.sport');
  const selectionAnimals = document.querySelectorAll('.animals');
  const selectionEvents = document.querySelectorAll('.events');
  const cardSelections = document.querySelectorAll('.card__photographer');

  const selection = {
    art: selectionArt,
    portrait: selectionPortrait,
    fashion: selectionFashion,
    architecture: selectionArchitecture,
    travel: selectionTravel,
    sport: selectionSport,
    animals: selectionAnimals,
    events: selectionEvents,
    all: cardSelections,
  };

  // forEach loop to get each tag option
  tagList.forEach((tagListItem) => {
    const tagValue = tagListItem.getAttribute('data-filter-tag');
    // function for selecting tags to use in event listener
    function tagSelection(tagValueSelection) {
      // To add/remove active class on selected tags
      tagList.forEach((tagListItem) => {
        tagListItem.classList.remove('active');
      });
      tagListItem.classList.add('active');
      cardSelections.forEach((cardSelection) => {
        cardSelection.style.display = 'none';
      });
      // allow filtering based on nav option
      tagValueSelection = tagValue;
      selectionChoice = selection[tagValueSelection];
      selectionChoice.forEach((selectionCard) => {
        selectionCard.style.display = 'block';
      });
    }
    // adding Event Listener for selecting options
    tagListItem.addEventListener('click', () => {
      tagSelection();
    });
    tagListItem.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        tagSelection();
      }
    });
  });

  // creating array to help with URL parsing
  const photographersId = [];
  for (let i = 0; i < photographers.length; i++) {
    const photographersString = JSON.stringify(photographers[i].id);
    photographersId.push(photographersString);
  }
  // Parse the URL parameter
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  // Give the parameter a variable name
  const dynamicContent = getParameterByName('dc');

  $(document).ready(() => {
    // Check if the URL parameter is apples
    if (photographersId.indexOf(dynamicContent) !== -1) {
      $('#photographer-page').show();
    }
    // Check if the URL parmeter is empty or not defined, display default content
    else {
      $('#default-content').show();
    }
  });

  const singlePhotographer = photographers.find((photographer) => photographer.id == dynamicContent);
  const photographerBanner = new CreateCardElement(singlePhotographer.portrait,
    singlePhotographer.name,
    singlePhotographer.city,
    singlePhotographer.country,
    singlePhotographer.tagline);
  photographerBanner.createBanner();

  for (let i = 0; i < singlePhotographer.tags.length; i++) {
    const tags = singlePhotographer.tags[i];
    const ul = document.getElementById('card__banner-tags-list');
    const li = document.createElement('li');
    li.className = ('tag card__banner-tags-list-item');
    li.innerHTML = `
            <span class="sr-only">${tags}</span>
            ${tags}
            `;
    ul.appendChild(li);
    const dataTag = document.createAttribute('data-filter-tag');
    dataTag.value = tags;
    li.setAttributeNode(dataTag);
    const tabIndexTag = document.createAttribute('tabindex');
    tabIndexTag.value = '0';
    li.setAttributeNode(tabIndexTag);
  }
}

// show and hide dropdown list item on button click
document.querySelector('.singlephotographer__dropdown-wrapper').addEventListener('click', function() {
  this.querySelector('.singlephotographer__dropdown').classList.toggle('open');
})
for (const option of document.querySelectorAll(".singlephotographer__dropdown-option")) {
  option.addEventListener('click', function() {
      if (!this.classList.contains('selected')) {
          this.parentNode.querySelector('.singlephotographer__dropdown-option.selected').classList.remove('selected');
          this.classList.add('selected');
          this.closest('.singlephotographer__dropdown').querySelector('.singlephotographer__dropdown-trigger span').textContent = this.textContent;
      }
  })
}

request.onload = processData;

