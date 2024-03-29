import Banner from './classBanner.js';
import { MediaFactory } from './MediaFactory.js';
import { contact as contactForm } from './contactModal.js';
import Lightbox from './lightbox.js';

fetch('./fisheyedata.json')
  .then((response) => response.json())
  .then((data) => {
    const { photographers, media } = data;
    // code below grabs ID from url to create banner
    const params = new URLSearchParams(document.location.search.substring(1));
    const pageId = params.get('dc');
    const singlePhotographer = photographers.find((photographer) => photographer.id == pageId);
    const photographerBanner = new Banner(singlePhotographer);
    photographerBanner.create();

    // filter media in JSON based on ID of artist
    const photographerMedia = media.filter((x) => x.photographerId == pageId);
    const m = photographerMedia.length;
    function createCards() {
      for (let i = 0; i < m; i++) {
        const photographerMediaCard = new MediaFactory(
          singlePhotographer.name, photographerMedia[i],
        );
        photographerMediaCard.create();
        // likes
        const likeBtn = document.getElementsByClassName('btn-likes')[i];
        const likeNumber = document.getElementsByClassName('likeNumber')[i];
        likeBtn.addEventListener('click', () => {
          const likesIncrease = ++photographerMedia[i].likes;
          photographerMedia[i].likes = likesIncrease;
          likeNumber.innerHTML = `${photographerMedia[i].likes} `;
          document.getElementById('counterLikes').innerHTML = `${++likesTotal} `;
        });
        likeBtn.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            likeBtn.click();
          }
        });
      }
      Lightbox.init(photographerMedia);
    }
    createCards();

    // Counter Information
    const likeValues = [];
    for (let i = 0; i < photographerMedia.length; i++) {
      const { likes } = photographerMedia[i];
      likeValues.push(likes);
    }
    let likesTotal = likeValues.reduce((a, b) => a + b, 0);
    document.getElementById('counterLikes').innerHTML = `${likesTotal} `;
    document.getElementById('counterPrice').innerHTML = `${singlePhotographer.price}$ / day`;

    // dropdown filtering
    const mediaContainer = document.getElementById('mediaContainer');
    const filterButton = document.querySelectorAll('.singlephotographer__dropdown-option');
    filterButton.forEach((button) => {
      button.addEventListener('click', () => {
        mediaContainer.innerHTML = '';
        if (button.id === 'popularity') {
          photographerMedia.sort((a, b) => {
            if (a.likes > b.likes) return -1;
            if (a.likes < b.likes) return 1;
            return 0;
          });
        } else if (button.id === 'date') {
          photographerMedia.sort((a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
            return 0;
          });
        } else if (button.id === 'title') {
          photographerMedia.sort((a, b) => {
            if (a.imgAlt > b.imgAlt) return 1;
            if (a.imgAlt < b.imgAlt) return -1;
            return 0;
          });
        }
        createCards();
      });
    });

    // contact form function
    contactForm();
  });

// show and hide dropdown list item on button click
document.querySelector('.singlephotographer__dropdown-wrapper').addEventListener('click', function () {
  this.querySelector('.singlephotographer__dropdown').classList.toggle('open');
});

document.querySelector('.singlephotographer__dropdown-wrapper').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.querySelector('.singlephotographer__dropdown').click();
  }
});

// dropdown functionality
for (const option of document.querySelectorAll('.singlephotographer__dropdown-option')) {
  option.addEventListener('click', function (e) {
    e.preventDefault();
    this.parentNode.querySelector('.singlephotographer__dropdown-option.selected').ariaSelected = false;
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.singlephotographer__dropdown-option.selected').classList.remove('selected');
      this.classList.add('selected');
      this.ariaSelected = true;
      this.closest('.singlephotographer__dropdown').querySelector('.singlephotographer__dropdown-trigger span').textContent = this.textContent;
      this.closest('.singlephotographer__dropdown').querySelector('.singlephotographer__dropdown-trigger span').focus();
    }
  });
  option.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      option.click();
      document.querySelector('.singlephotographer__dropdown').classList.toggle('open');
    }
  });
}
