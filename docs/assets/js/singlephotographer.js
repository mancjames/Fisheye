/* eslint-disable max-classes-per-file */
const requestURL = './fisheyedata.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

function processData() {
  const data = request.response;
  const { photographers } = data;
  const { media } = data;

  function callback() {
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
    const dynamicContent = getParameterByName('dc');
    if (photographersId.indexOf(dynamicContent) !== -1) {
      document.getElementById('photographer-page').style.display = 'block';
    } else {
      document.getElementById('default-content').style.display = 'block';
    }
  }

  if (
    document.readyState === 'complete'
     || (document.readyState !== 'loading' && !document.documentElement.doScroll)
  ) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }

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

  const params = new URLSearchParams(document.location.search.substring(1));
  const pageId = params.get('dc');

  const singlePhotographer = photographers.find((photographer) => photographer.id == pageId);
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
document.querySelector('.singlephotographer__dropdown-wrapper').addEventListener('click', function () {
  this.querySelector('.singlephotographer__dropdown').classList.toggle('open');
});

document.querySelector('.singlephotographer__dropdown').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.querySelector('.singlephotographer__dropdown').classList.toggle('open');
  }
});

for (const option of document.querySelectorAll('.singlephotographer__dropdown-option')) {
  option.addEventListener('click', function () {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.singlephotographer__dropdown-option.selected').classList.remove('selected');
      this.classList.add('selected');
      this.closest('.singlephotographer__dropdown').querySelector('.singlephotographer__dropdown-trigger span').textContent = this.textContent;
    }
  });
  option.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      if (!this.classList.contains('selected')) {
        this.parentNode.querySelector('.singlephotographer__dropdown-option.selected').classList.remove('selected');
        this.classList.add('selected');
        this.closest('.singlephotographer__dropdown').querySelector('.singlephotographer__dropdown-trigger span').textContent = this.textContent;
      }
    }
  });
}

request.onload = processData;
