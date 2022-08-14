import throttle from 'lodash.throttle';




const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {};

populatedTextarea();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
    event.preventDefault();
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(event) {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populatedTextarea() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedMessage) {
        form.message.value = savedMessage.message || '';
        form.email.value = savedMessage.email || '';
    }
    // console.log(savedMessage);
}

