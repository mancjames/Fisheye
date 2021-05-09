import callback from './pageparse.js';
import tagNavigation from './tagNavigation.js';

fetch('./fisheyedata.json')
  .then((response) => response.json())
  .then((data) => {
    const { photographers } = data;
    // Page parsing
    if (
      document.readyState === 'complete'
     || (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      callback(photographers);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }

    // Creating Card Elements
    class CardElement {
      constructor(imgSrc, name, city, country, tagline, price, id) {
        this.imgSrc = imgSrc;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.id = id;
      }

      create() {
        const cardContainer = document.getElementById('cardContainer');
        const article = document.createElement('article');
        article.className = 'card card__photographer';
        article.innerHTML = `
          <a href="./photographerdetail.html?dc=${this.id}"><div class="card__photographer-portrait">
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
    }
    // loop created below so objects created dependent on length of photographer array in JSON
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < photographers.length; i++) {
      const photographerCards = new CardElement(photographers[i].portrait,
        photographers[i].name,
        photographers[i].city,
        photographers[i].country,
        photographers[i].tagline,
        photographers[i].price,
        photographers[i].id);
      photographerCards.create();
      // Loop to create tags based on JSON data
      // eslint-disable-next-line no-plusplus
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
    tagNavigation();
  });
