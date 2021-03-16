const requestURL = './fisheyedata.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

/* eslint-disable max-classes-per-file */
function processData() {
  const data = request.response;
  const { photographers } = data;
  // Creating Card Elements
  class CreateCardElement {
    constructor(imgSrc, name, city, country, tagline, price) {
      this.imgSrc = imgSrc;
      this.name = name;
      this.city = city;
      this.country = country;
      this.tagline = tagline;
      this.price = price;
    }

    createCard() {
      const cardContainer = document.getElementById('cardContainer');
      const article = document.createElement('article');
      article.className = 'card card__photographer';
      article.innerHTML = `
          <a href="#"><div class="card__photographer-portrait">
            <img class="card__photographer-portrait-img" src="./assets/img/Photographers ID Photos/${this.imgSrc}" alt="${this.name}">
          </div>
          <div class="card__photographer-title">
            <h2 class="card__photographer-title-name">${this.name}</h2>
            </div></a>
          <div class="card__photographer-description">
            <p class="card__photographer-description-location">${this.city}, ${this.country}</p>
            <p class="card__photographer-description-tagline">${this.tagline}</p>
            <p class="card__photographer-description-price">$${this.price}/day</p>
          </div>
          <div class="card__photographer-tags">
            <ul class="card__photographer-tags-list" role="navigation" aria-label="Links to tagged photographers">
            </ul>
          </div>
      `;
      cardContainer.appendChild(article);
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
      photographers[i].price);
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

  // forEach loop to get each tag option
  tagList.forEach((tagListItem) => {
    const tagValue = tagListItem.getAttribute('data-filter-tag');
    // function for selecting tags to use in event listener
    function tagSelection() {
      // To add/remove active class on selected tags
      tagList.forEach((tagListItem) => {
        tagListItem.classList.remove('active');
      });
      tagListItem.classList.add('active');
      cardSelections.forEach((cardSelection) => {
        cardSelection.style.display = 'none';
      });
      // switch statement showing all selected options as display:block;
      switch (tagValue) {
        case 'art':
          selectionArt.forEach((cardArt) => {
            cardArt.style.display = 'block';
          });
          break;
        case 'portrait':
          selectionPortrait.forEach((cardPortrait) => {
            cardPortrait.style.display = 'block';
          });
          break;
        case 'fashion':
          selectionFashion.forEach((cardFashion) => {
            cardFashion.style.display = 'block';
          });
          break;
        case 'architecture':
          selectionArchitecture.forEach((cardArchitecture) => {
            cardArchitecture.style.display = 'block';
          });
          break;
        case 'travel':
          selectionTravel.forEach((cardTravel) => {
            cardTravel.style.display = 'block';
          });
          break;
        case 'sports':
          selectionSport.forEach((cardSport) => {
            cardSport.style.display = 'block';
          });
          break;
        case 'animals':
          selectionAnimals.forEach((cardAnimals) => {
            cardAnimals.style.display = 'block';
          });
          break;
        case 'events':
          selectionEvents.forEach((cardEvents) => {
            cardEvents.style.display = 'block';
          });
          break;
        case 'all':
          cardSelections.forEach((cardSelection) => {
            cardSelection.style.display = 'block';
          });
          break;
        default:
          cardSelections.forEach((cardSelection) => {
            cardSelection.style.display = 'block';
          });
      }
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
}

request.onload = processData;
