// lighbox variables

const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');
const lightboxNext = document.getElementById('mediaNext');
const lightboxPrevious = document.getElementById('mediaPrevious');
const lightbox = document.getElementById('mediaLightbox');
const lightboxClose = document.getElementById('mediaLightboxClose');

export default class Lightbox {
  static init(data) {
    const slides = Array.from(document.getElementsByClassName('slide'));
    const name = Array.from(data.map((name) => name.imgAlt));
    const pos = slides.map((slide) => slide.getAttribute('src'));
    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute('src'), name, pos);
      });
      slide.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          slide.click();
        }
      });
    });
  }

  constructor(src, names, pos) {
    this.pos = pos;
    this.names = names;
    this.open(src, names);
    this.next();
    this.previous();
    this.close();
    this.keyboard();
  }

  open(src, names) {
    this.src = src;
    let i = this.pos.findIndex((content) => content === this.src);
    lightbox.style.display = 'block';
    if (src.endsWith('.jpg')) {
      lightboxBody.innerHTML = `<img class="modal__media-content-media" tab-index=0 src="${src}" alt="${names[i]}">`;
    } else if (src.endsWith('.mp4')) {
      lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 src="${src}" type="video/mp4" autoplay>
          ${names[i]}
          </video>`;
    }
    lightboxCaption.innerHTML = `<p>${names[i + 1]}</p>`;
  }

  next() {
    lightboxNext.addEventListener('click', (e) => {
      e.preventDefault();
      let i = this.pos.findIndex((content) => content === this.src);
      if (i === this.pos.length - 1) {
        i = -1;
      }
      this.open(this.pos[i + 1], this.names);
    });
  }

  previous() {
    lightboxPrevious.addEventListener('click', (e) => {
      e.preventDefault();
      let i = this.pos.findIndex((content) => content === this.src);
      if (i === 0) {
        i = this.pos.length;
      }
      this.open(this.pos[i - 1], this.names);
    });
  }

  close() {
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  keyboard() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.key === 'ArrowRight') {
        lightboxNext.click();
      } else if (e.key === 'ArrowLeft') {
        lightboxPrevious.click();
      } else if (e.key === 'Escape') {
        lightboxClose.click();
      }
    });
  }
}
