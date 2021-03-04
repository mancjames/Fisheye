const cardContainer = document.getElementById('cardContainer');

function processData() {
  const data = request.response;
  const { photographers } = data;
  console.log(photographers);
  console.log(photographers[0].tags);

  function showCards() {
    for (let i = 0; i < photographers.length; i++) {
      // create elements
      const article = document.createElement('article');
      const photographerImage = document.createElement('img');
      const divPhotographerTitle = document.createElement('div');
      const divPhotographerPortrait = document.createElement('div');
      const h2PhotographerTitle = document.createElement('h2');
      const divPhotographerDescription = document.createElement('div');
      const pPhotographerDescriptionLocation = document.createElement('p');
      const pPhotographerDescriptionTagline = document.createElement('p');
      const pPhotographerDescriptionPrice = document.createElement('p');
      const divTag = document.createElement('div');
      
      
      // Attaching classes to divs
      divPhotographerPortrait.className = 'card__photographer-portrait';
      article.className = 'card card__photographer';
      divPhotographerTitle.className = 'card__photographer-title';
      photographerImage.className = 'card__photographer-portrait-img';
      h2PhotographerTitle.className = 'card__photographer-title-name';
      divPhotographerDescription.className = 'card__photographer-description';
      pPhotographerDescriptionLocation.className = 'card__photographer-description-location';
      pPhotographerDescriptionTagline.className = 'card__photographer-description-tagline';
      pPhotographerDescriptionPrice.className = 'card__photographer-description-price';
      divTag.className = 'card__photographer-tags';
      
      
      // Image Properties
      photographerImage.src = `./assets/img/Photographers ID Photos/${photographers[i].portrait}`;
      photographerImage.alt = `${photographers[i].name}`;
      // Anchor Properties

      // adding text to elements
      h2PhotographerTitle.innerText = `${photographers[i].name}`;
      pPhotographerDescriptionLocation.innerText = `${photographers[i].city}, ${photographers[i].country}`;
      pPhotographerDescriptionTagline.innerText = `${photographers[i].tagline}`;
      pPhotographerDescriptionPrice.innerText = `$${photographers[i].price}/day`;

      for (let j = 0; j < photographers[i].tags.length; j++) {
        const divTagAnchor = document.createElement('a');
        const divTagSpan = document.createElement('span');
        divTagAnchor.className = 'tag card__photographer-tags-item';
        divTagSpan.className = 'sr-only';
        divTagAnchor.innerText = `${photographers[i].tags[j]}`;
        divTagSpan.innerText = `${photographers[i].tags[j]}`;
        divTag.appendChild(divTagAnchor);
        divTagAnchor.appendChild(divTagSpan);
      };



      // Appending elements to parent elements
      cardContainer.appendChild(article);
      article.append(divPhotographerPortrait, divPhotographerTitle, divPhotographerDescription);
      divPhotographerPortrait.appendChild(photographerImage);
      divPhotographerTitle.appendChild(h2PhotographerTitle);
      divPhotographerDescription.append(pPhotographerDescriptionLocation,
        pPhotographerDescriptionPrice,
        pPhotographerDescriptionTagline,
        divTag);
    }
  }
  showCards();
}

/*
function createElement(elementName, element, className, parentName){
    this.elementName = elementName;
    this.element = element;
    this.className = className;
    this.parentName = parentName;
    this.create = function() {
        const this.elementName = document.createElement('`${this.element}`');
        this.elementName.className = '`${this.className}`';
        ${this.parentName}.appendChild(${this.elementName})
    }
}
*/

const requestURL = '../fisheyedata.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = processData;
