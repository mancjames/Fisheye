    // lightbox
    // let slides = document.querySelectorAll('.slide');
    // const modalMedia = document.getElementById('mediaModal');
    // const modalImg = document.getElementById('modalContent');
    // const modalVideo = document.getElementById('modalVideoContent');
    // const modalMediaCaption = document.getElementById('modalMediaCaption');

    // slides.forEach((slide) => {
    //   // Modal Selectors
    //   const img = document.getElementById(slide.id);
    //   // const modalPrev document.getElementById('modalPrev');
    //   // function for picking media type for modal content
    //   function chooseMediaModal() {
    //     if (img.src.match('.mp4')) {
    //       modalMedia.style.display = 'block';
    //       modalVideo.style.display = 'block';
    //       modalImg.style.display = 'none';
    //       modalVideo.src = slide.src;
    //       modalMediaCaption.innerHTML = slide.innerHTML;
    //     } else {
    //       modalMedia.style.display = 'block';
    //       modalImg.style.display = 'block';
    //       modalVideo.style.display = 'none';
    //       modalImg.src = slide.src;
    //       modalMediaCaption.innerHTML = slide.alt;
    //     }
    //   }
    //   // Event Listeners
    //   img.addEventListener('click', () => {
    //     chooseMediaModal();
    //   });

    //   img.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') {
    //       chooseMediaModal();
    //     }
    //   });
    // });
    /*
  n = slides.length;
  for (let i = 0; i < n; i++) {
    slides[i].setAttribute('onclick', `toSlide(${i + 1})`);
  }

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

    for (let i = 0; i < n; i++) {
      slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'block';
  }
*/
// // Close the Modal
// function closeModal() {
//   document.getElementById('mediaModal').style.display = 'none';
// }
