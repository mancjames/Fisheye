const mediaContainer = document.getElementById('mediaContainer');

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

  createImageCard(callback) {
    const imageCard = document.createElement('article');
    imageCard.className = 'card card__media';
    imageCard.innerHTML = `
          <div class="card__media-media">
              <img class="card__media-img" tabindex=0 id=${this.id} src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}">
          </div>
          <div class="card__media-description">
              <p class="card__media-description-name">${this.imgAlt}</p>
              <p class="card__media-description-price">${this.price} $</p>
              <p class="card__media-description-likes"><span class="likeNumber">${this.likes} </span><button class="btn-likes fas fa-heart"></button></p>
          </div>
      `;
    const image = imageCard.getElementsByTagName('img')[0];
    image.addEventListener('click', () => {
      callback();
    });
    mediaContainer.appendChild(imageCard);
  }

  createVideoCard(callback) {
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
              <p class="card__media-description-likes"><span class="likeNumber">${this.likes} </span><button class="btn-likes fas fa-heart"></button></p>
          </div>
      `;
    const video = videoCard.getElementsByTagName('video')[0];
    video.addEventListener('click', () => {
      callback();
    });
    mediaContainer.appendChild(videoCard);
  }
}
