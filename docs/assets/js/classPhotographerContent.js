const mediaContainer = document.getElementById('mediaContainer');

export default class PhotographerContent {
  constructor(id, name, image, video, imgAlt, likes, date, price, toSlide) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.video = video;
    this.imgAlt = imgAlt;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.toSlide = toSlide
  }

  createImageCard() {
    const imageCard = document.createElement('article');
    imageCard.className = 'card card__media';
    imageCard.innerHTML = `
          <div class="card__media-media">
              <img class="card__media-img" tabindex=0 id=${this.id} src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}" onclick="toSlide(${this.toSlide})">
          </div>
          <div class="card__media-description">
              <p class="card__media-description-name">${this.imgAlt}</p>
              <p class="card__media-description-price">${this.price} $</p>
              <p class="card__media-description-likes">${this.likes} <i class="fas fa-heart"></i></p>
          </div>
      `;
    mediaContainer.appendChild(imageCard);
  }

  createVideoCard() {
    const videoCard = document.createElement('article');
    videoCard.className = 'card card__media';
    videoCard.innerHTML = `
    <div class="card__media-media">
          <video class="card__media-video" tabindex=0 id=${this.id} src="./assets/img/${this.name}/${this.video}" type="video/mp4" onclick="toSlide(${this.toSlide})">
              ${this.imgAlt}
          </video>
          </div>
          <div class="card__media-description">
              <p class="card__media-description-name">${this.imgAlt}</p>
              <p class="card__media-description-price">${this.price} $</p>
              <p class="card__media-description-likes">${this.likes} <i class="fas fa-heart"></i></p>
          </div>
      `;
    mediaContainer.appendChild(videoCard);
  }
}
