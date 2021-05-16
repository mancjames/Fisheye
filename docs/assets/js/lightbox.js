export default function createLightbox(singlePhotographer, photographerMedia) {
  const lightboxBody = document.getElementById('mediaLightboxBody');
  const lightboxCaption = document.getElementById('mediaLightboxCaption');
  const lightboxNext = document.getElementById('mediaNext')
  const slides = document.getElementsByClassName('card__media-media');

  for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener('click', () => {
      lightboxNext.dataset.next = i + 1;
    });
  }
  lightboxNext.addEventListener('click', () => {
    let i = parseInt(lightboxNext.dataset.next);
    if (i < slides.length) {
      lightboxBody.innerHTML = '';
      lightboxCaption.innerHTML = '';
      const item = photographerMedia[i];
      if (item.image) {
        lightboxBody.innerHTML = `<img class="modal__media-content-media" src="./assets/img/${singlePhotographer.name}/${item.image}" alt="${item.imgAlt}">`;
        lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
      } else if (item.video) {
        lightboxBody.innerHTML = `<video class="modal__media-content-media" tabindex=0 id=${item.id} src="./assets/img/${singlePhotographer.name}/${item.video}" type="video/mp4" autoplay>
      ${item.imgAlt}
      </video>`;
        lightboxCaption.innerHTML = `<p>${item.imgAlt}</p>`;
      }
      lightboxNext.dataset.next = ++i;
    } else {
      lightboxNext.disabled = true;
    }
  });
}
