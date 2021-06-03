// lighbox variables
const lightbox = document.getElementById('mediaLightbox');
const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');
const lightboxNext = document.getElementById('mediaNext');
const lightboxPrevious = document.getElementById('mediaPrevious');
const slides = document.getElementsByClassName('card__media-media');

export class Lightbox {
  constructor(name, image, video, imgAlt, dataset) {
    this.name = name;
    this.image = image;
    this.video = video;
    this.imgAlt = imgAlt;
    this.dataset = dataset;
  }

  openImage() {
    lightbox.style.display = 'block';
    lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}">`;
    lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
    lightbox.dataset.slide = this.dataset;
  }
  // lightbox event listener

  openVideo() {
    lightbox.style.display = 'block';
    lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 src="./assets/img/${this.name}/${this.video}" type="video/mp4" autoplay>
          ${this.imgAlt}
          </video>`;
    lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
    lightbox.dataset.slide = this.dataset;
  }

    // function slideNext() {
    //   let i = parseInt(lightbox.dataset.slide);
    //   if (i < slides.length) {
    //     lightboxNext.enabled = true;
    //     lightboxBody.innerHTML = '';
    //     lightboxCaption.innerHTML = '';
    //     // if (slides.image) {
    //     console.log('test');
    //     lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.image}" alt="${this.imgAlt}">`;
    //     lightboxCaption.innerHTML = `<p>${this.imgAlt}</p>`;
        // }
        //   else if (item.video) {
        //     lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${item.id} src="./assets/img/${singlePhotographer.name}/${item.video}" type="video/mp4" autoplay>
        // ${item.imgAlt}
        // </video>`;
        //     lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
        //   }
        // lightbox.dataset.slide = ++i;
    //   } else {
    //     lightboxNext.disabled = true;
    //   }
    

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
  }
  // for (let i = 0; i < slides.length; i++) {
  //   slides[i].addEventListener('click', () => {
  //     lightbox.dataset.slide = 1 + i;
  //   });
  // }


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
