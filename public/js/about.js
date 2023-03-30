const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const errorText = document.querySelector('#form-error');

form.addEventListener('submit', () => {

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  
  if (!name || !email || !message) {
    errorText.textContent = 'Please fill in all fields.';
  } else if (!isValidEmail(email)) {
    errorText.textContent = 'Please enter a valid email address.';
  } else {
    errorText.textContent = '';

  }
});

function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}
