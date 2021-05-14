const mediaModal = document.getElementById('mediaModal');

export class ModalContent {
  constructor(name, image, video) {
    this.name = name;
    this.image = image;
    this.video = video;
  }

  image() {
    const modalContent = document.createElement('div');
    modalContent.classname = 'modal__media-content slide'
    modalContent.innerHTML = `
          <img  id="modalContent" class="modal__media-content-media slide" src="./assets/img/${this.name}/${this.image}">
          <a class="modal__media-prev" onclick="changeSlide(-1)">&#10094;</a>
          <a class="modal__media-next" onclick="changeSlide(1)">&#10095;</a>
          <div class="modal__media-caption-container">
            <p id="modalMediaCaption"></p>
          </div>
      `;
    mediaModal.appendChild(image);
  }

  video() {
    const modalContent = document.createElement('div');
    modalContent.classname = 'modal__media-content slide'
    modalContent.innerHTML = `
    <video id ="modalVideoContent" class="modal__media-content-media slide" src="./assets/img/${this.name}/${this.video}" type="video/mp4" autoplay>
    </video>
    <a class="modal__media-prev" onclick="changeSlide(-1)">&#10094;</a>
          <a class="modal__media-next" onclick="changeSlide(1)">&#10095;</a>
          <div class="modal__media-caption-container">
            <p id="modalMediaCaption"></p>
          </div>
      `;
    mediaModal.appendChild(video);
  }
}


export function lightbox() {
  const lightboxPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  }).then(() => {
  let slideIndex = 1;
  showSlide(slideIndex);

  // You are providing the functionality for your clickable content, which is
  // your previews, dots, controls and the close button.

  // Note that you are assigning new values here to our slidIndex.

 function changeSlide(n) {
    showSlide(slideIndex += n);
  }

function toSlide(n) {
    showSlide(slideIndex = n);
  }

  // This is your logic for the light box. It will decide which slide to show
  // and which dot is active.

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'block';
  }

});
}
export function openLightbox() {
  const open = document.getElementById('mediaModal');
  // Event Listeners
  open.addEventListener('click', () => {
    document.getElementById('mediaModal').style.display = 'block';
  });

  open.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('mediaModal').style.display = 'block';
    }
  });
}
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
