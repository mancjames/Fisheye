export function createLightbox(singlePhotographer, data) {
  const lightboxBody = document.getElementById('mediaLightboxBody');
  const lightboxCaption = document.getElementById('mediaLightboxCaption');
  const lightboxNext = document.getElementById('mediaNext');
  const lightboxPrevious = document.getElementById('mediaPrevious');
  const slides = document.getElementsByClassName('card__media-media');

  for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener('click', () => {
      lightboxNext.dataset.slide = i++;
    });
  }

  function slideNext() {
    let i = parseInt(lightboxNext.dataset.slide);
    if (i < slides.length) {
      console.log(i);
      lightboxBody.innerHTML = '';
      lightboxCaption.innerHTML = '';
      const item = data[i];
      if (item.image) {
        lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${singlePhotographer.name}/${item.image}" alt="${item.imgAlt}">`;
        lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
      } else if (item.video) {
        lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${item.id} src="./assets/img/${singlePhotographer.name}/${item.video}" type="video/mp4" autoplay>
      ${item.imgAlt}
      </video>`;
        lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
      }
      lightboxNext.dataset.slide = ++i;
    } else {
      lightboxNext.disabled = true;
    }
  }

  function slidePrevious() {
    let i = parseInt(lightboxNext.dataset.slide);
    console.log(i);
    if (i < slides.length) {
      lightboxBody.innerHTML = '';
      lightboxCaption.innerHTML = '';
      const item = data[i];
      if (item.image) {
        lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${singlePhotographer.name}/${item.image}" alt="${item.imgAlt}">`;
        lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
      } else if (item.video) {
        lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${item.id} src="./assets/img/${singlePhotographer.name}/${item.video}" type="video/mp4" autoplay>
        ${item.imgAlt}
        </video>`;
        lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
      }
      lightboxNext.dataset.slide = --i;
    } else {
      lightboxPrevious.disabled = true;
    }
  }

  lightboxNext.addEventListener('click', () => {
    slideNext();
  });

  lightboxPrevious.addEventListener('click', () => {
    slidePrevious();
  });
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
