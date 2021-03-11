/* eslint-disable max-classes-per-file */
const cardContainer = document.getElementById('cardContainer');

function processData() {
  const data = request.response;
  const { photographers } = data;

  function showCards() {
    // class constructor for creating card elements
    class CreateCardElement {
      constructor(elementType, classProperties, parentName) {
        this.elementType = elementType;
        this.classProperties = classProperties;
        this.parentName = parentName;
        this.element = document.createElement(this.elementType);
        this.element.className = classProperties;
        parentName.appendChild(this.element);
      }
    }
    // extender to include additional properties needed for images
    class CreateCardElementImage extends CreateCardElement {
      constructor(elementType, classProperties, parentName, imgSrc, imgAlt) {
        super(elementType, classProperties, parentName);
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.element.src = imgSrc;
        this.element.alt = imgAlt;
      }
    }
    // extender to include additional elements needed to get JSON data
    class CreateCardElementDescription extends CreateCardElement {
      constructor(elementType, classProperties, parentName, JSONdata) {
        super(elementType, classProperties, parentName);
        this.JSONdata = JSONdata;
        this.element.innerText = JSONdata;
      }
    }

    // loop created below so objects created dependent on length of photographer array in JSON
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < photographers.length; i++) {
      // setting Data-tag's on cards to help with creating filter
      // getting array from JSON
      const tagArray = photographers[i].tags;
      // Turning it into a string
      const tagString = String(tagArray);
      // Replacing commas to help seperate
      const tagOptions = tagString.replace(/,/g, ' ');
      // Adding to article element to help change display options for filter

      // Created elements below by making each a new object from the class constructor created above
      const article = new CreateCardElement('article', `card card__photographer ${tagOptions}`, cardContainer);
      const photographerPortrait = new CreateCardElement('div', 'card__photographer-portrait', article.element);
      const photographerImage = new CreateCardElementImage('img', 'card__photographer-portrait-img', photographerPortrait.element, `./assets/img/Photographers ID Photos/${photographers[i].portrait}`, `${photographers[i].name}`);
      const photographerTitle = new CreateCardElement('div', 'card__photographer-title', article.element);
      const photographerTitleName = new CreateCardElementDescription('h2', 'card__photographer-title-name', photographerTitle.element, `${photographers[i].name}`);
      const photographerDescription = new CreateCardElement('div', 'card__photographer-description', article.element);
      const photographerDescriptionLocation = new CreateCardElementDescription('p', 'card__photographer-description-location', photographerDescription.element, `${photographers[i].city}, ${photographers[i].country}`);
      const photographerDescriptionTagline = new CreateCardElementDescription('p', 'card__photographer-description-tagline', photographerDescription.element, `${photographers[i].tagline}`);
      const photographerDescriptionPrice = new CreateCardElementDescription('p', 'card__photographer-description-price', photographerDescription.element, `$${photographers[i].price}/day`);
      const photographerTags = new CreateCardElement('div', 'card__photographer-tags', article.element);

      // Anchor Properties

      // Loop to go through the tags array nested in the JSON photographer data
      for (let j = 0; j < photographers[i].tags.length; j++) {
        const photographerTagsAnchor = new CreateCardElementDescription('li', 'tag card__photographer-tags-item', photographerTags.element, `${photographers[i].tags[j]}`);
        const photographerTagsSpan = new CreateCardElementDescription('span', 'sr-only', photographerTagsAnchor.element, `${photographers[i].tags[j]}`);
      }
    }

    const navList = document.querySelectorAll('.nav ul li');
    // if statement options
    const selectionArt = document.querySelectorAll('.art');
    const selectionPortrait = document.querySelectorAll('.portrait');
    const selectionFashion = document.querySelectorAll('.fashion');
    const selectionArchitecture = document.querySelectorAll('.architecture');
    const selectionTravel = document.querySelectorAll('.travel');
    const selectionSport = document.querySelectorAll('.sport');
    const selectionAnimals = document.querySelectorAll('.animals');
    const selectionEvents = document.querySelectorAll('.events');

    const cardSelections = document.querySelectorAll('.card__photographer');
    // forEach loop to get each tag Option
    navList.forEach((navListItem) => {
      // adding Event Listener for selecting options
      navListItem.addEventListener('click', () => {
        navList.forEach((navListItem) => {
          navListItem.classList.remove('active');
        });

        navListItem.classList.add('active');
        var tagValue = navListItem.getAttribute('data-filter-tag');
        console.log(tagValue);

        cardSelections.forEach((cardSelection) => {
          cardSelection.style.display = 'none';
        });

        if (tagValue == 'art') {
          selectionArt.forEach((cardArt) => {
            cardArt.style.display = 'block';
          });
        } else if (tagValue == 'portrait') {
          selectionPortrait.forEach((cardPortrait) => {
            cardPortrait.style.display = 'block';
          });
        } else if (tagValue == 'fashion') {
          selectionFashion.forEach((cardFashion) => {
            cardFashion.style.display = 'block';
          });
        } else if (tagValue == 'architecture') {
          selectionArchitecture.forEach((cardArchitecture) => {
            cardArchitecture.style.display = 'block';
          });
        } else if (tagValue == 'travel') {
          selectionTravel.forEach((cardTravel) => {
            cardTravel.style.display = 'block';
          });
        } else if (tagValue == 'sports') {
          selectionSport.forEach((cardSport) => {
            cardSport.style.display = 'block';
          });
        } else if (tagValue == 'animals') {
          selectionAnimals.forEach((cardAnimals) => {
            cardAnimals.style.display = 'block';
          });
        } else if (tagValue == 'events') {
          selectionEvents.forEach((cardEvents) => {
            cardEvents.style.display = 'block';
          });
        } else if (tagValue == 'all') {
          cardSelections.forEach((cardSelection) => {
            cardSelection.style.display = 'block';
          });
        }
      });
    });
  }

  showCards();
}

const requestURL = './fisheyedata.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = processData;
