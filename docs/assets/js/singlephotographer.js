import callback from './pageparse.js';
import Banner from './classBanner.js';
import PhotographerContent from './classPhotographerContent.js';
import { contact as contactForm } from './contactModal.js';
import { createLightbox, closeLightbox } from './lightbox.js';

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
          photographerMediaCard.createImageCard();
        } else if (card[i].video) {
          photographerMediaCard.createVideoCard();
        }
      }
    }
    createCards(photographerMedia);

    // lightbox

    createLightbox(singlePhotographer, photographerMedia);

    //likes

    function likes() {
      // Likes event listener
      const mediaLikeBtns = document.querySelectorAll('.btn-likes');
      mediaLikeBtns.forEach((mediaLikeBtn) => {
        function likeIncrease() {
          let like = parseInt(mediaLikeBtn.previousSibling.innerHTML);
          const likesIncrease = ++like;
          mediaLikeBtn.previousSibling.innerHTML = `${likesIncrease} `;
        }
        mediaLikeBtn.addEventListener('click', () => {
          likeIncrease();
          document.getElementById('counterLikes').innerHTML = `${++likesTotal} `;
        });
        mediaLikeBtn.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            mediaLikeBtn.click();
          }
        });
      });
      // Counter Information
      const likeValues = [];
      mediaLikeBtns.forEach((mediaLikeBtn) => {
        const likes = parseInt(mediaLikeBtn.previousSibling.innerHTML);
        likeValues.push(likes);
      });
      let likesTotal = likeValues.reduce((a, b) => a + b, 0);
      document.getElementById('counterLikes').innerHTML = `${likesTotal} `;
      document.getElementById('counterPrice').innerHTML = `${singlePhotographer.price}$ / day`;
    }


    likes();

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
          createLightbox(singlePhotographer, sortPopularity);
          likes();
        } else if (button.id === 'date') {
          createCards(sortDate);
          createLightbox(singlePhotographer, sortDate);
          likes();
        } else if (button.id === 'title') {
          createCards(sortTitle);
          createLightbox(singlePhotographer, sortTitle);
          likes();
        } else {
          createCards(photographerMedia);
        }
      });
    });

    // contact form function
    contactForm();

  });

closeLightbox();

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
