/* eslint-disable max-classes-per-file */
const requestURL = './fisheyedata.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

function processData() {
  const data = request.response;
  const { photographers } = data;
  const { media } = data;

  function callback() {
    // creating array to help with URL parsing
    const photographersId = [];
    for (let i = 0; i < photographers.length; i++) {
      const photographersString = JSON.stringify(photographers[i].id);
      photographersId.push(photographersString);
    }
    // Parse the URL parameter
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    const dynamicContent = getParameterByName('dc');
    if (photographersId.indexOf(dynamicContent) !== -1) {
      document.getElementById('photographer-page').style.display = 'block';
    } else {
      document.getElementById('default-content').style.display = 'block';
    }
  }

  if (
    document.readyState === 'complete'
     || (document.readyState !== 'loading' && !document.documentElement.doScroll)
  ) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }

  // Creating Banner Elements
  class CreateBannerElement {
    constructor(imgSrc, name, city, country, tagline, price, id) {
      this.imgSrc = imgSrc;
      this.name = name;
      this.city = city;
      this.country = country;
      this.tagline = tagline;
      this.price = price;
      this.id = id;
    }

    createBanner() {
      const banner = document.getElementById('singlePhotographerBanner');
      banner.innerHTML = `
        <div class="card__banner-information">
          <div class="card__banner-description">
            <div class="card__banner-title">
              <h2 class="card__banner-title-name">${this.name}</h2>
              </div>
              <p class="card__banner-description-location">${this.city}, ${this.country}</p>
              <p class="card__banner-description-tagline">${this.tagline}</p>
            <div class="card__banner-tags">
              <ul class="card__banner-tags-list" id="card__banner-tags-list">
              </ul>
            </div>
          </div>
          <div class="card__banner-contact">
              <button class="btn btn-contact">Contact Me</button>
          </div>
        </div>
          <div class="card__banner-portrait">
            <img class="card__banner-portrait-img" src="./assets/img/Photographers ID Photos/${this.imgSrc}" alt="${this.name}">
          </div>
      `;
    }
  }

  class CreatePhotographerMedia {
    constructor(id, image, video, imgAlt, likes, date, price) {
      this.id = id;
      this.image = image;
      this.video = video;
      this.imgAlt = imgAlt;
      this.likes = likes;
      this.date = date;
      this.price = price;
    }

    createImageCard() {
      const mediaContainer = document.getElementById('mediaContainer');
      const imageCard = document.createElement('article');
      imageCard.className = 'card card__media';
      imageCard.innerHTML = `
            <div class="card__media-media">
                <img class="card__media-img slide" tabindex=0 id=${this.id} src="./assets/img/${singlePhotographer.name}/${this.image}" alt="${this.imgAlt}">
            </div>
            <div class="card__media-description">
                <p class="card__media-description-name">${this.imgAlt}</p>
                <p class="card__media-description-price">${this.price} $</p>
                <p class="card__media-description-likes">${this.likes} <i class="fas fa-heart"></i></p>
            </div>
        `;
      mediaContainer.appendChild(imageCard);
    }

    createVideoCard() {
      const mediaContainer = document.getElementById('mediaContainer');
      const videoCard = document.createElement('article');
      videoCard.className = 'card card__media';
      videoCard.innerHTML = `
      <div class="card__media-media">
            <video class="card__media-video slide" tabindex=0 id=${this.id} src="./assets/img/${singlePhotographer.name}/${this.video}" type="video/mp4">
                ${this.imgAlt}
            </video>
            </div>
            <div class="card__media-description">
                <p class="card__media-description-name">${this.imgAlt}</p>
                <p class="card__media-description-price">${this.price} $</p>
                <p class="card__media-description-likes">${this.likes} <i class="fas fa-heart"></i></p>
            </div>
        `;
      mediaContainer.appendChild(videoCard);
    }
  }

  const params = new URLSearchParams(document.location.search.substring(1));
  const pageId = params.get('dc');

  const singlePhotographer = photographers.find((photographer) => photographer.id == pageId);
  const photographerBanner = new CreateBannerElement(singlePhotographer.portrait,
    singlePhotographer.name,
    singlePhotographer.city,
    singlePhotographer.country,
    singlePhotographer.tagline);
  photographerBanner.createBanner();

  for (let i = 0; i < singlePhotographer.tags.length; i++) {
    const tags = singlePhotographer.tags[i];
    const ul = document.getElementById('card__banner-tags-list');
    const li = document.createElement('li');
    li.className = ('tag card__banner-tags-list-item');
    li.innerHTML = `
            <span class="sr-only">${tags}</span>
            ${tags}
            `;
    ul.appendChild(li);
    const dataTag = document.createAttribute('data-filter-tag');
    dataTag.value = tags;
    li.setAttributeNode(dataTag);
    const tabIndexTag = document.createAttribute('tabindex');
    tabIndexTag.value = '0';
    li.setAttributeNode(tabIndexTag);
  }

  const photographerMedia = media.filter((x) => x.photographerId == pageId);
  for (let i = 0; i < photographerMedia.length; i++) {
    const photographerMediaCard = new CreatePhotographerMedia(photographerMedia[i].id,
      photographerMedia[i].image,
      photographerMedia[i].video,
      photographerMedia[i].imgAlt,
      photographerMedia[i].likes,
      photographerMedia[i].date,
      photographerMedia[i].price);
    if (photographerMedia[i].image === undefined) {
      photographerMediaCard.createVideoCard();
    } else if (photographerMedia[i].video === undefined) {
      photographerMediaCard.createImageCard();
    }
  }

  const slides = document.querySelectorAll('.slide');

  slides.forEach((slide) => {
    // Get the modal
    const modalMedia = document.getElementById('mediaModal');
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    const img = document.getElementById(slide.id);
    const modalImg = document.getElementById('modalContent');
    const modalVideo = document.getElementById('modalVideoContent');
    const modalMediaCaption = document.getElementById('modalMediaCaption');

    function chooseMediaModal() {
      if (img.src.match('.mp4')) {
        modalMedia.style.display = 'block';
        modalVideo.style.display = 'block';
        modalImg.style.display = 'none';
        modalVideo.src = slide.src;
        modalMediaCaption.innerHTML = slide.innerHTML;
      } else {
        modalMedia.style.display = 'block';
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
        modalImg.src = slide.src;
        modalMediaCaption.innerHTML = slide.alt;
      }
    }

    img.addEventListener('click', () => {
      chooseMediaModal();
    });

    img.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        chooseMediaModal();
      }
    });

    /*
 $('.next').click(function() {
    var curr = $(modalImg).attr('src');
    var next = $('img[src="' + curr + '"]').parent('li').next().find('img').attr('src');
    modalImg.attr('src', next);
  });

  $('.prev').click(function() {
    var curr = $('modalImg').attr('src');
    var prev = $('img[src="' + curr + '"]').parent('li').prev().find('img').attr('src');
    modalImg.attr('src', prev);
  });
*/
  });
}

// Close the Modal
function closeModal() {
  document.getElementById('mediaModal').style.display = 'none';
}

// show and hide dropdown list item on button click
document.querySelector('.singlephotographer__dropdown-wrapper').addEventListener('click', function () {
  this.querySelector('.singlephotographer__dropdown').classList.toggle('open');
});

document.querySelector('.singlephotographer__dropdown').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.querySelector('.singlephotographer__dropdown').classList.toggle('open');
  }
});

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

request.onload = processData;

/*
  function changeSlide(n) {
	showSlide(slideIndex += n);
}

function toSlide(n) {
	showSlide(slideIndex = n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName('slide');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
  	slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = 'block';
}
*/
