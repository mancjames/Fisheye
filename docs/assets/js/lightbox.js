fetch('./fisheyedata.json')
  .then((response) => response.json())
  .then((data) => {
    const { media } = data;
    const params = new URLSearchParams(document.location.search.substring(1));
    const pageId = params.get('dc');
    const photographerMedia = media.filter((x) => x.photographerId == pageId);
  })

// lightbox open
export function lightbox() {
  const slides = document.querySelectorAll('.slide');
  const modalMedia = document.getElementById('mediaModal');
  const modalImg = document.getElementById('modalContent');
  const modalVideo = document.getElementById('modalVideoContent');
  const modalMediaCaption = document.getElementById('modalMediaCaption');

  slides.forEach((slide) => {
  // Modal Selectors
    const img = document.getElementById(slide.id);
    // function for picking media type for modal content
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
    // Event Listeners
    img.addEventListener('click', () => {
      chooseMediaModal();
    });

    img.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        chooseMediaModal();
      }
    });
  });
}

// export function lightboxNavigation(data) {
//   const n = data.length;
//   for (let i = 0; i < n; i++) {
//     data[i].setAttribute('onclick', `toSlide(${i + 1})`);
//   }

//   function changeSlide(n) {
//     showSlide(slideIndex += n);
//   }

//   function toSlide(n) {
//     showSlide(slideIndex = n);
//   }

//   function showSlide(n) {

//     if (n > data.length) {
//       slideIndex = 1;
//     }

//     if (n < 1) {
//       slideIndex = data.length;
//     }

//     for (let i = 0; i < n; i++) {
//       data[i].style.display = 'none';
//     }

//     data[slideIndex - 1].style.display = 'block';
//   }

// }

// Close the Modal
export function closeLightbox() {
  const close = document.getElementById('lightboxClose');
  // Event Listeners
  close.addEventListener('click', () => {
    document.getElementById('mediaModal').style.display = 'none';
  });

  close.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('mediaModal').style.display = 'none';
    }
  });
}
