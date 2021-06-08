// lighbox variables

const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');
const lightboxNext = document.getElementById('mediaNext');
const lightboxPrevious = document.getElementById('mediaPrevious');
const lightbox = document.getElementById('mediaLightbox');

export class Lightbox {
  static init() {
    const slides = Array.from(document.getElementsByClassName('slide'));
    const pos = slides.map((slide) => slide.getAttribute('src'));
    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute('src'), pos);
      });
    });
  }

  constructor(src, pos) {
    this.pos = pos;
    this.open(src);
    this.next();
    this.previous();
  }

  open(src) {
    this.src = src;
    lightbox.style.display = 'block';
    if (src.endsWith('.jpg')) {
      lightboxBody.innerHTML = `<img class="modal__media-content-media" src="${src}" alt="${this.getName(src)}">`;
    } else if (src.endsWith('.mp4')) {
      lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 src="${src}" type="video/mp4" autoplay>
          ${this.getName(src)}
          </video>`;
    }
    lightboxCaption.innerHTML = `<p>${this.getName(src)}</p>`;
  }

  getName(source) {
    const splitFileName = source.split('/');
    const string = splitFileName[splitFileName.length - 1].split('.')[0];
    const string2 = string.split('_').slice(1).join(' ')
    const Title = string2.replaceAll('_', ' ');
    return Title;
  }

  next() {
    lightboxNext.addEventListener('click', () => {
		let i = this.pos.findIndex((content) => content === this.src);
    if (i < this.pos.length) {
			this.open(this.pos[i + 1]);
		}
    })
	}

  previous() {
    lightboxPrevious.addEventListener('click', () => {
      let i = this.pos.findIndex((content) => content === this.src);
      if (i < this.pos.length) {
        this.open(this.pos[i - 1]);
      }
      })
  }
  // slideNext() {
  //   this.nextPos = 1 + this.nextPos;
  //   if (this.nextPost < slides.length) {
  //     lightboxNext.enabled = true;
  //     lightboxBody.innerHTML = '';
  //     lightboxCaption.innerHTML = '';
  //     // if (slides.image) {
  //     lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${this.name}/${this.media.image}" alt="${this.media.imgAlt}">`;
  //     lightboxCaption.innerHTML = `<p>${this.media.imgAlt}</p>`;
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
