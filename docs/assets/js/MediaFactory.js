const mediaContainer = document.getElementById('mediaContainer');

export class MediaFactory {
  constructor(name, media) {
    if (media.image) {
      return new Image(name, media);
    } else if (media.video) {
      return new Video(name, media);
    } else {
      throw "Unknown Media Type";
    }
  }
}
  export class Image {
    constructor(name, media){
      this.name = name;
      this.media = media;
    }
    create() {
      const imageCard = document.createElement('article');
      imageCard.className = 'card card__media';
      imageCard.innerHTML = `
            <div class="card__media-media">
                <img class="card__media-img slide" tabindex=0 id=${this.media.id} src="./assets/img/${this.name}/${this.media.image}" alt="${this.media.imgAlt}">
            </div>
            <div class="card__media-description">
                <p class="card__media-description-name" tabindex="0">${this.media.imgAlt}</p>
                <p class="card__media-description-price" tabindex="0">${this.media.price} $</p>
                <p class="card__media-description-likes"><span class="likeNumber" tabindex="0" aria-label="Number of likes ${this.media.likes}">${this.media.likes} </span><button class="btn-likes fas fa-heart" aria-label="add a like" title="add a like" aria-role="button"></button></p>
            </div>
        `;
      mediaContainer.appendChild(imageCard);
    }
  }

  export class Video {
    constructor(name, media){
      this.name = name;
      this.media = media;
    }
    create() {const videoCard = document.createElement('article');
    videoCard.className = 'card card__media';
    videoCard.innerHTML = `
        <div class="card__media-media">
          <video class="card__media-video slide" tabindex=0 id=${this.media.id} src="./assets/img/${this.name}/${this.media.video}" type="video/mp4">
              ${this.media.imgAlt}
          </video>
        </div>
          <div class="card__media-description">
              <p class="card__media-description-name" tabindex="0">${this.media.imgAlt}</p>
              <p class="card__media-description-price" tabindex="0">${this.media.price} $</p>
              <p class="card__media-description-likes"><span class="likeNumber" tabindex="0" aria-label="Number of likes ${this.media.likes}">${this.media.likes} </span><button class="btn-likes fas fa-heart" aria-label="add a like" title="add a like" aria-role="button"></button></p>
          </div>
      `;
    mediaContainer.appendChild(videoCard);
  }
}
