const cardContainer = document.getElementById('cardContainer');

function processData() {
  const data = request.response;
  const { photographers } = data;
  console.log(photographers);

  function showCards() {
    for (let i = 0; i < photographers.length; i++) {
      const article = document.createElement('article');
      article.className = 'card card__photographer';
      cardContainer.appendChild(article);
      const divPhotographerPortrait = document.createElement('div');
      divPhotographerPortrait.className = 'card__photographer-portrait';
      article.appendChild(divPhotographerPortrait);
      const photographerImage = document.createElement('img');
      photographerImage.src = `./assets/img/Photographers ID Photos/${photographers[i].portrait}`;
      photographerImage.alt = `${photographers[i].name}`;
      photographerImage.className = 'card__photographer-portrait-img';
      divPhotographerPortrait.appendChild(photographerImage);
      const divPhotographerTitle = document.createElement('div');
      divPhotographerTitle.className = 'card__photographer-title';
      article.appendChild(divPhotographerTitle);
      const h2PhotographerTitle = document.createElement('h2');
      h2PhotographerTitle.className = 'card__photographer-title-name';
      h2PhotographerTitle.innerText = `${photographers[i].name}`;
      divPhotographerTitle.appendChild(h2PhotographerTitle);
      const divPhotographerDescription = document.createElement('div');
      divPhotographerDescription.className = 'card__photographer-description';
      article.appendChild(divPhotographerDescription);
      const divTag = document.createElement('div');
      divTag.className = 'card__photographer-tags';
      divPhotographerDescription.appendChild(divTag);
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
