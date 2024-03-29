// Creating Banner Elements
export default class Banner {
  constructor(media) {
    this.media = media;
  }

  create() {
    const banner = document.getElementById('singlePhotographerBanner');
    banner.innerHTML = `
      <div class="card__banner-information">
        <div class="card__banner-description">
          <div class="card__banner-title">
            <h2 class="card__banner-title-name" id="photographerName" tabindex="0">${this.media.name}</h2>
          </div>
            <p class="card__banner-description-location" tabindex="0">${this.media.city}, ${this.media.country}</p>
            <p class="card__banner-description-tagline" tabindex="0">${this.media.tagline}</p>
          <div class="card__banner-tags">
            <ul class="card__banner-tags-list" id="card__banner-tags-list">
              ${this.media.tags.map(tag => `
              <li class="tag card__banner-tags-list-item" tabindex="0"><span class="sr-only">tag
              </span>
                      ${tag}
              </li>
              `).join('')}
            </ul>
          </div>
        </div>
        <div class="card__banner-contact">
            <button class="btn btn-contact" id="contactButton">Contact Me</button>
        </div>
        <div class="card__banner-portrait">
          <img class="card__banner-portrait-img" src="./assets/img/Photographers ID Photos/${this.media.portrait}" alt="${this.media.name}">
        </div>
      </div>
        
    `;
  }
}
