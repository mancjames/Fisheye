/* eslint-disable max-classes-per-file */
const cardContainer = document.getElementById('cardContainer');

function processData() {
  const data = request.response;
  const { photographers } = data;
  console.log(photographers);

  function showCards() {
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

    class CreateCardElementImage extends CreateCardElement {
      constructor(elementType, classProperties, parentName, imgSrc, imgAlt) {
        super(elementType, classProperties, parentName);
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.element.src = imgSrc;
        this.element.alt = imgAlt;
      }
    }

    class CreateCardElementDescription extends CreateCardElement {
      constructor(elementType, classProperties, parentName, JSONtype) {
        super(elementType, classProperties, parentName);
        this.JSONtype = JSONtype;
        this.element.innerText = this.JSONtype;
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < photographers.length; i++) {
      const article = new CreateCardElement('article', 'card card__photographer', cardContainer);
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

      // Loop for adding tags to end of card
      for (let j = 0; j < photographers[i].tags.length; j++) {
        const photographerTagsAnchor = new CreateCardElementDescription('a', 'tag card__photographer-tags-item', photographerTags.element, `${photographers[i].tags[j]}`);
        const photographerTagsSpan = new CreateCardElementDescription('span', 'sr-only', photographerTagsAnchor.element, `${photographers[i].tags[j]}`);
        /*

        divTagAnchor.setAttribute('data-tag', `${photographers[i].tags[j]}`);
        */
      }
    }
  }
  showCards();
}

const requestURL = '../fisheyedata.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = processData;
