  
import galleryImgs from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
}

const cardsMarkup = createGalleryMarkup(galleryImgs);
refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);


refs.gallery.addEventListener('click', toOpenModal);
refs.modal.addEventListener('click', closeModal);


function createGalleryMarkup(galleryImgs) {
  return galleryImgs
  .map(({preview, original, description}) => {
    return `
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </li>`
  })
  .join('');
}

// Модальное окно , открытие и закрытие!
function toOpenModal(event) {
  if(!event.target.classList.contains('gallery__image')) {
    return;
  };
  event.preventDefault()
  refs.modal.classList.add('is-open');
  refs.modalImg.setAttribute('src', event.target.getAttribute('data-source'));
  window.addEventListener('keydown', onButtonKey);
}

function toCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.removeAttribute('src');
  window.removeEventListener('keydown', onButtonKey);
}

function closeModal(event) {
  if(event.target.classList.contains('lightbox__overlay') ||
     event.target.classList.contains('lightbox__button')) {
    toCloseModal();
  };
}

function onButtonKey(event) {
  if(event.code === 'Escape') {
    toCloseModal();
  };
}