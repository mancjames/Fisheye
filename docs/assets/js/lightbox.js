// lighbox variables
const lightbox = document.getElementById('mediaLightbox');
const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');
const lightboxNext = document.getElementById('mediaNext');
const lightboxPrevious = document.getElementById('mediaPrevious');
const slides = document.getElementsByClassName('card__media-media');

export class Lightbox {
  constructor(name, media, click) {
    document.getElementById(click).addEventListener('click', this.openImage);
    this.name = name;
    this.media = media;
    this.nextPos = 0;
    this.prevPos = 0;
  }

  openImage(pos) {
    lightbox.dataset.slide = pos;
    lightbox.style.display = 'block';
    lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.media.image}" alt="${this.media.imgAlt}">`;
    lightboxCaption.innerHTML = `<p>${this.media.imgAlt}</p>`;
  }

  openVideo(pos) {
    lightbox.style.display = 'block';
    lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 src="./assets/img/${this.name}/${this.media.video}" type="video/mp4" autoplay>
          ${this.media.imgAlt}
          </video>`;
    lightboxCaption.innerHTML = `<p>${this.media.imgAlt}</p>`;
    lightbox.dataset.slide = pos;
  }

  slideNext() {
    this.nextPos = 1 + this.nextPos;
    if (this.nextPost < slides.length) {
      lightboxNext.enabled = true;
      lightboxBody.innerHTML = '';
      lightboxCaption.innerHTML = '';
      // if (slides.image) {
      lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.media.image}" alt="${this.media.imgAlt}">`;
      lightboxCaption.innerHTML = `<p>${this.media.imgAlt}</p>`;
      // }
      //   else if (item.video) {
      //     lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${item.id} src="./assets/img/${singlePhotographer.name}/${item.video}" type="video/mp4" autoplay>
      // ${item.imgAlt}
      // </video>`;
      //     lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
      //   }
    //     lightbox.dataset.slide = ++i;
    //   } else {
    //     lightboxNext.disabled = true;
    //   }
    }
    // let i = parseInt(lightbox.dataset.slide);
    // if (i < slides.length) {
    //   lightboxNext.enabled = true;
    //   lightboxBody.innerHTML = '';
    //   lightboxCaption.innerHTML = '';
    // if (slides.image) {
    // lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}">`;
    // lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
    // }
    //   else if (item.video) {
    //     lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${item.id} src="./assets/img/${singlePhotographer.name}/${item.video}" type="video/mp4" autoplay>
    // ${item.imgAlt}
    // </video>`;
    //     lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
    //   }
    //   lightbox.dataset.slide = ++i;
    // } else {
    //   lightboxNext.disabled = true;
    // }
  }

  // function slidePrevious() {
  //   let i = parseInt(lightboxNext.dataset.slide);
  //   if (i < data.length) {
  //     lightboxBody.innerHTML = '';
  //     lightboxCaption.innerHTML = '';
  //     const item = data[i];
  //     if (item.image) {
  //       lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${singlePhotographer.name}/${item.image}" alt="${item.imgAlt}">`;
  //       lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
  //     } else if (item.video) {
  //       lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${item.id} src="./assets/img/${singlePhotographer.name}/${item.video}" type="video/mp4" autoplay>
  //     ${item.imgAlt}
  //     </video>`;
  //       lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
  //     }
  //     lightboxNext.dataset.slide = --i;
  //   } else {
  //     lightboxPrevious.disabled = true;
  //   }
  // }

  // lightboxNext.addEventListener('click', (event) => {
  //   slideNext();
  //   event.stopImmediatePropagation();
  // });

  // lightboxPrevious.addEventListener('click', (event) => {
  //   slidePrevious();
  //   event.stopImmediatePropagation();
  // });
// for (let i = 0; i < slides.length; i++) {
//   slides[i].addEventListener('click', () => {
//     lightbox.dataset.slide = 1 + i;
//   });
}

export function closeLightbox() {
  const lightboxClose = document.getElementById('mediaLightboxClose');
  const lightbox = document.getElementById('mediaLightbox');
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  lightboxClose.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      lightboxClose.click();
    }
  });
}
