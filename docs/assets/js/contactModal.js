const contactForm = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000);
}).then(() => {
  // DOM Elements
  const contactButton = document.getElementById('contactButton');
  const contactModal = document.getElementById('contactModal');
  const contactClose = document.getElementById('contactClose');
  // launch modal form
  function launchContactModal() {
    contactModal.style.display = 'block';
  }
  // close modal form
  function closeContactModal() {
    contactModal.style.display = 'none';
  }
  // launch modal event
  contactButton.addEventListener('click', launchContactModal);
  contactButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      launchContactModal;
    }
  });

  // close modal event
  contactClose.addEventListener('click', closeContactModal);
  contactClose.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      closeContactModal;
    }
  });
}).then(() => {
  const name = document.getElementById('photographerName').textContent;
  document.getElementById('contactName').innerHTML = `Contact Me <br> ${name}`;
});
