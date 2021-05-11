export function contact() {
  const contactPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  }).then(() => {
    // DOM Elements
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const contactClose = document.getElementById('contactClose');
    // launch modal form
    function launchContactModal() {
      contactModal.style.display = 'block';
    }
    // close modal form
    function closeContactModal() {
      contactModal.style.display = 'none';
    }
    // add name to contact modal
    const name = document.getElementById('photographerName').textContent;
    document.getElementById('contactName').innerHTML = `Contact Me <br> ${name}`;
    // log information to console
    function submitToConsole() {
      const x = document.getElementById('contactForm').elements;
      console.log('First Name: ', x.first.value);
      console.log('Last Name: ', x.last.value);
      console.log('Email: ', x.email.value);
      console.log('Message: ', x.message.value);
    }
    // launch modal event
    contactButton.addEventListener('click', launchContactModal);
    contactButton.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        launchContactModal();
      }
    });

    // close modal event
    contactClose.addEventListener('click', closeContactModal);
    contactClose.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        closeContactModal();
      }
    });

    // submit button event
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitToConsole();
      closeContactModal();
      contactForm.reset();
    });
  });
}
