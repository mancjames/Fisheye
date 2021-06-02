const lightbox = document.getElementById('mediaLightbox');
const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');

export class Lightbox {
  // lighbox variables
  // const lightboxNext = document.getElementById('mediaNext');
  // const lightboxPrevious = document.getElementById('mediaPrevious');
  // const slides = document.getElementsByClassName('card__media-media');

  constructor(name, image, video, imgAlt) {
    this.name = name;
    this.image = image;
    this.video = video;
    this.imgAlt = imgAlt;
  }

  openImage() {
    lightbox.style.display = 'block';
    lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}">`;
    lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
  }
  // lightbox event listener

  openVideo() {
    lightbox.style.display = 'block';
    lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 src="./assets/img/${this.name}/${this.video}" type="video/mp4" autoplay>
          ${this.imgAlt}
          </video>`;
    lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
  }

  // for (let i = 0; i < data.length; i++) {
  //   slides[i].addEventListener('click', () => {
  //     lightboxNext.dataset.slide = 1 + i;
  //   });
  // }

  // function slideNext() {
  //   let i = parseInt(lightboxNext.dataset.slide);
  //   if (i < data.length) {
  //     lightboxNext.enabled = true;
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
  //     lightboxNext.dataset.slide = ++i;
  //   } else {
  //     lightboxNext.disabled = true;
  //   }
  // }

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
  //       ${item.imgAlt}
  //       </video>`;
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
