// Creating Banner Elements
export default class Banner {
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
    const banner = document.getElementById('singlePhotographerBanner');
    banner.innerHTML = `
      <div class="card__banner-information">
        <div class="card__banner-description">
          <div class="card__banner-title">
            <h2 class="card__banner-title-name" id="photographerName">${this.name}</h2>
          </div>
            <p class="card__banner-description-location">${this.city}, ${this.country}</p>
            <p class="card__banner-description-tagline">${this.tagline}</p>
          <div class="card__banner-tags">
            <ul class="card__banner-tags-list" id="card__banner-tags-list">
            </ul>
          </div>
        </div>
        <div class="card__banner-contact">
            <button class="btn btn-contact" id="contactButton">Contact Me</button>
        </div>
        <div class="card__banner-portrait">
          <img class="card__banner-portrait-img" src="./assets/img/Photographers ID Photos/${this.imgSrc}" alt="${this.name}">
        </div>
      </div>
        
    `;
  }
}
