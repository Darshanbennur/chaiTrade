const db = require('./Database/config');

const profilePic = document.querySelector('.profile-pic');
const cameraIcon = document.querySelector('.camera-icon');
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';

cameraIcon.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    profilePic.src = reader.result;
  };
});

const educationSelect = document.getElementById("education");
const optionalField = document.getElementById("optional-field");

educationSelect.addEventListener("change", (event) => {
  if (event.target.value === "Other") {
    optionalField.style.display = "block";
  } else {
    optionalField.style.display = "none";
  }
});

const currencySelect = document.getElementById("currency");
const incomeInput = document.getElementById("income");

currencySelect.addEventListener("change", () => {
  const currency = currencySelect.value;
  const currentIncome = incomeInput.value;
  const newIncome = currentIncome.replace(/^\D+/, "");
  incomeInput.value = `${currency} ${newIncome}`;
});
