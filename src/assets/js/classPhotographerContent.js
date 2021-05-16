const mediaContainer = document.getElementById('mediaContainer');
// lighbox variables
const lightbox = document.getElementById('mediaLightbox');
const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');
const lightboxNext = document.getElementById('mediaNext');
let i = 0;

export default class PhotographerContent {
  constructor(id, name, image, video, imgAlt, likes, date, price) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.video = video;
    this.imgAlt = imgAlt;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  createImageCard() {
    const imageCard = document.createElement('article');
    imageCard.className = 'card card__media';
    imageCard.innerHTML = `
          <div class="card__media-media">
              <img class="card__media-img" tabindex=0 id=${this.id} src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}">
          </div>
          <div class="card__media-description">
              <p class="card__media-description-name">${this.imgAlt}</p>
              <p class="card__media-description-price">${this.price} $</p>
              <p class="card__media-description-likes">${this.likes} <i class="fas fa-heart"></i></p>
          </div>
      `;
    imageCard.addEventListener('click', () => {
      lightbox.style.display = 'block';
      lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}">`;
      lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
    });
    mediaContainer.appendChild(imageCard);
  }

  createVideoCard() {
    const videoCard = document.createElement('article');
    videoCard.className = 'card card__media';
    videoCard.innerHTML = `
    <div class="card__media-media">
          <video class="card__media-video" tabindex=0 id=${this.id} src="./assets/img/${this.name}/${this.video}" type="video/mp4">
              ${this.imgAlt}
          </video>
          </div>
          <div class="card__media-description">
              <p class="card__media-description-name">${this.imgAlt}</p>
              <p class="card__media-description-price">${this.price} $</p>
              <p class="card__media-description-likes">${this.likes} <i class="fas fa-heart"></i></p>
          </div>
      `;
    videoCard.addEventListener('click', () => {
      lightbox.style.display = 'block';
      lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${this.id} src="./assets/img/${this.name}/${this.video}" type="video/mp4" autoplay>
        ${this.imgAlt}
        </video>`;
      lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
    });
    mediaContainer.appendChild(videoCard);
  }
}
