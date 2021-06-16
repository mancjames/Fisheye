// lighbox variables

const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');
const lightboxNext = document.getElementById('mediaNext');
const lightboxPrevious = document.getElementById('mediaPrevious');
const lightbox = document.getElementById('mediaLightbox');
const lightboxClose = document.getElementById('mediaLightboxClose');
const main = document.getElementById('main');

export default class Lightbox {
  static init(data) {
    const slides = Array.from(document.getElementsByClassName('slide'));
    const name = Array.from(data.map((name) => name.imgAlt));
    const pos = slides.map((slide) => slide.getAttribute('src'));
    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute('src'), name, pos, slides);
      });
      slide.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          slide.click();
        }
      });
    });
  }

  constructor(src, names, pos, slides) {
    this.slides = slides;
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
    lightbox.focus();
    lightbox.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    if (src.endsWith('.jpg')) {
      lightboxBody.innerHTML = `<img class="modal__media-content-media" src="${src}" alt="${names[i]}">`;
    } else if (src.endsWith('.mp4')) {
      lightboxBody.innerHTML = `<video class="modal__media-content-media" src="${src}" type="video/mp4" autoplay>
          ${names[i]}
          </video>`;
    }
    lightboxCaption.innerHTML = `<p tabindex="0">${names[i]}</p>`;
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
      lightbox.setAttribute('aria-hidden', 'true');
      main.setAttribute('aria-hidden', 'false');
      this.slides[this.pos.findIndex((content) => content === this.src)].focus();
    });
  }

  keyboard() {
    lightbox.addEventListener('keydown', (e) => {
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
