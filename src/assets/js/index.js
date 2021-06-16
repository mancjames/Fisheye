import tagNavigation from './tagNavigation.js';

fetch('./fisheyedata.json')
  .then((response) => response.json())
  .then((data) => {
    const { photographers } = data;

    // Creating Card Elements
    class CardElement {
      constructor(photographer) {
        this.photographer = photographer;
      }

      create() {
        const cardContainer = document.getElementById('cardContainer');
        const article = document.createElement('article');
        article.className = `card card__photographer ${this.photographer.tags.map((tag) => `${tag}`).join(' ')}`;
        article.innerHTML = `
          <a href="./photographerdetail.html?dc=${this.photographer.id}"><div class="card__photographer-portrait">
            <img class="card__photographer-portrait-img" src="./assets/img/Photographers ID Photos/${this.photographer.portrait}" alt="${this.photographer.name}">
          </div>
          <div class="card__photographer-description">
          <div class="card__photographer-title">
            <h2 class="card__photographer-title-name">${this.photographer.name}</h2>
            </div></a>
            <p class="card__photographer-description-location" tabindex="0">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="card__photographer-description-tagline" tabindex="0">${this.photographer.tagline}</p>
            <p class="card__photographer-description-price" tabindex="0">$${this.photographer.price}/day</p>
          <div class="card__photographer-tags">
            <ul class="card__photographer-tags-list" role="navigation" aria-label="Links to tagged photographers">
            ${this.photographer.tags.map((tag) => `
            <li class="tag card__photographer-tags-list-item" tabindex="0" data-filter-tag = "${tag}"><span class="sr-only">${tag}
            </span>
                    ${tag}
            </li>
            `).join('')}
            </ul>
          </div>
          </div>
      `;
        cardContainer.appendChild(article);
      }
    }
    // loop created below so objects created dependent on length of photographer object in JSON
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < photographers.length; i++) {
      const photographerCards = new CardElement(photographers[i]);
      photographerCards.create();
    }
    tagNavigation();
  });
