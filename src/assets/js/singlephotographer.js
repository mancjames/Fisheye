import callback from './pageparse.js';
import Banner from './classBanner.js';
import PhotographerContent from './classPhotographerContent.js';
import { contact as contactForm } from './contactModal.js';

fetch('./fisheyedata.json')
  .then((response) => response.json())
  .then((data) => {
    const { photographers } = data;
    const { media } = data;

    // Page parsing
    if (
      document.readyState === 'complete'
   || (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      callback(photographers);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
    // code below grabs ID from url for banner creation
    const params = new URLSearchParams(document.location.search.substring(1));
    const pageId = params.get('dc');
    const singlePhotographer = photographers.find((photographer) => photographer.id == pageId);
    const photographerBanner = new Banner(singlePhotographer.portrait,
      singlePhotographer.name,
      singlePhotographer.city,
      singlePhotographer.country,
      singlePhotographer.tagline);
    photographerBanner.create();
    const l = singlePhotographer.tags.length;
    for (let i = 0; i < l; i++) {
      const tags = singlePhotographer.tags[i];
      const ul = document.getElementById('card__banner-tags-list');
      const li = document.createElement('li');
      li.className = ('tag card__banner-tags-list-item');
      li.innerHTML = `
            <span class="sr-only">${tags}</span>
            ${tags}
            `;
      ul.appendChild(li);
      const tabIndexTag = document.createAttribute('tabindex');
      tabIndexTag.value = '0';
      li.setAttributeNode(tabIndexTag);
    }

    // create Photographer content based on ID
    const photographerMedia = media.filter((x) => x.photographerId == pageId);
    const m = photographerMedia.length;
    const lightboxNext = document.getElementById('mediaNext');
    function createCards(card) {
      for (let i = 0; i < m; i++) {
        const photographerMediaCard = new PhotographerContent(card[i].id,
          singlePhotographer.name,
          card[i].image,
          card[i].video,
          card[i].imgAlt,
          card[i].likes,
          card[i].date,
          card[i].price);
        if (card[i].image) {
          photographerMediaCard.createImageCard()
        } else if (card[i].video) {
          photographerMediaCard.createVideoCard();  
        }
      }
    }
    createCards(photographerMedia);

    const lightbox = document.getElementById('mediaLightbox');
    const lightboxBody = document.getElementById('mediaLightboxBody');
    const lightboxCaption = document.getElementById('mediaLightboxCaption');
    const slides  = document.getElementsByClassName('card__media-media');


    for (let i = 0; i < slides.length; i++){
      slides[i].addEventListener('click', ()=>{
        lightboxNext.dataset.next = i + 1;
      })
    };

    lightboxNext.addEventListener('click', () => {
      let i = parseInt(lightboxNext.dataset.next);
      if (i < slides.length) {
        lightboxBody.innerHTML = "";
        lightboxCaption.innerHTML = "";
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
    } )

    // dropdown filtering

    const photographerMediaCopy1 = JSON.parse(JSON.stringify(photographerMedia));
    const photographerMediaCopy2 = JSON.parse(JSON.stringify(photographerMedia));
    const photographerMediaCopy3 = JSON.parse(JSON.stringify(photographerMedia));

    const sortPopularity = photographerMediaCopy1.sort((a, b) => {
      if (a.likes > b.likes) return -1;
      if (a.likes < b.likes) return 1;
      return 0;
    });

    const sortDate = photographerMediaCopy2.sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
    });

    const sortTitle = photographerMediaCopy3.sort((a, b) => {
      if (a.imgAlt > b.imgAlt) return 1;
      if (a.imgAlt < b.imgAlt) return -1;
      return 0;
    });
    const filterButton = document.querySelectorAll('.singlephotographer__dropdown-option');
    filterButton.forEach((button) => {
      button.addEventListener('click', () => {
        mediaContainer.innerHTML = '';
        if (button.id === 'popularity') {
          createCards(sortPopularity);
        } else if (button.id === 'date') {
          createCards(sortDate);
        } else if (button.id === 'title') {
          createCards(sortTitle);
        } else {
          createCards(photographerMedia);
        }
      });
    });
    // contact form function
    contactForm();
  });

// lightbox

const lightboxClose = document.getElementById('mediaLightboxClose');
const lightbox = document.getElementById('mediaLightbox');
lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// show and hide dropdown list item on button click
document.querySelector('.singlephotographer__dropdown-wrapper').addEventListener('click', function () {
  this.querySelector('.singlephotographer__dropdown').classList.toggle('open');
});

document.querySelector('.singlephotographer__dropdown').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.querySelector('.singlephotographer__dropdown').classList.toggle('open');
  }
});

// dropdown functionality
for (const option of document.querySelectorAll('.singlephotographer__dropdown-option')) {
  option.addEventListener('click', function () {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.singlephotographer__dropdown-option.selected').classList.remove('selected');
      this.classList.add('selected');
      this.closest('.singlephotographer__dropdown').querySelector('.singlephotographer__dropdown-trigger span').textContent = this.textContent;
    }
  });
  option.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      if (!this.classList.contains('selected')) {
        this.parentNode.querySelector('.singlephotographer__dropdown-option.selected').classList.remove('selected');
        this.classList.add('selected');
        this.closest('.singlephotographer__dropdown').querySelector('.singlephotographer__dropdown-trigger span').textContent = this.textContent;
      }
    }
  });
}
