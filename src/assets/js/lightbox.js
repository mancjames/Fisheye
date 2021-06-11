// lighbox variables

const lightboxBody = document.getElementById('mediaLightboxBody');
const lightboxCaption = document.getElementById('mediaLightboxCaption');
const lightboxNext = document.getElementById('mediaNext');
const lightboxPrevious = document.getElementById('mediaPrevious');
const lightbox = document.getElementById('mediaLightbox');
const lightboxClose = document.getElementById('mediaLightboxClose');

export default class Lightbox {
  static init() {
    const slides = Array.from(document.getElementsByClassName('slide'));
    const pos = slides.map((slide) => slide.getAttribute('src'));
    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute('src'), pos);
      });
      slide.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          slide.click();
        }
      });
    });
  }

  constructor(src, pos) {
    this.pos = pos;
    this.open(src);
    this.next();
    this.previous();
    this.close();
    this.keyboard();
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

  getName(filepath) {
    const splitFileName = filepath.split('/');
    const string = splitFileName[splitFileName.length - 1].split('.')[0];
    const string2 = string.split('_').slice(1).join(' ');
    const Title = string2.replaceAll('_', ' ');
    return Title;
  }

  next() {
    lightboxNext.addEventListener('click', (e) => {
      e.preventDefault();
      let i = this.pos.findIndex((content) => content === this.src);
      if (i === this.pos.length - 1) {
        i = -1;
      }
      this.open(this.pos[i + 1]);
    });
  }

  previous() {
    lightboxPrevious.addEventListener('click', (e) => {
      e.preventDefault();
      let i = this.pos.findIndex((content) => content === this.src);
      if (i === 0) {
        i = this.pos.length;
      }
      this.open(this.pos[i - 1]);
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
