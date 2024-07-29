import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { openPopup, closePopup } from "./utils.js";

// Configurações para validação do formulário
const validationConfigNewImg = {
  formSelector: "#newImgForm",
  inputSelector: ".new-img__input",
  submitButtonSelector: ".new-img__save-btn",
  inactiveButtonClass: "new-img__save-btn_disabled",
  inputErrorClass: "new-img__input_invalid",
  errorClass: "new-img__error_visible",
};

const validationConfigProfile = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Função para criar e renderizar imagens iniciais
const initialCards = [
  { name: "Broklyn Gate", link: "./images/01_broklyn-gate.jpg" },
  { name: "Route 66", link: "./images/02_route66.jpg" },
  { name: "Yellowstone Park", link: "./images/03_yellowstone-park.jpg" },
  { name: "Miami Sunset", link: "./images/04_miami.jpg" },
  { name: "Grand Canyon National Park", link: "./images/05__grand-canyon.jpg" },
  { name: "Yosemite Valley", link: "./images/06_yosemite-valley.jpg" },
];

const imgSection = document.querySelector(".elements");
initialCards.forEach((cardData) => {
  const card = new Card(cardData.name, cardData.link, "#element-template");
  const cardElement = card.getCard();
  imgSection.append(cardElement);
});

// Abertura do popup para ADD IMG
document.querySelector("#profile__add").addEventListener("click", () => {
  openPopup(document.querySelector(".new-img"));
});

// Fechamento do popup para ADD IMG
document.querySelector(".new-img__close-btn").addEventListener("click", () => {
  closePopup(document.querySelector(".new-img"));
});

// Validação do formulário para add imagens
const newImgForm = document.querySelector("#newImgForm");
const newImgFormValidator = new FormValidator(
  validationConfigNewImg,
  newImgForm
);
newImgFormValidator.enableValidation();

newImgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = newImgForm.querySelector("#new-img__input-name");
  const urlInput = newImgForm.querySelector("#new-img__input-url");

  const card = new Card(titleInput.value, urlInput.value, "#element-template");
  const cardElement = card.getCard();
  imgSection.prepend(cardElement);

  closePopup(document.querySelector(".new-img"));
  newImgForm.reset();
  newImgFormValidator.toggleButtonState();
  newImgFormValidator.resetValidation();
});

// Validação do formulário de edição de perfil - Nome e Bio
const editProfileForm = document.querySelector("#popup__form");
const editProfileFormValidator = new FormValidator(
  validationConfigProfile,
  editProfileForm
);
editProfileFormValidator.enableValidation();

document.querySelector("#popup__container").addEventListener("click", () => {
  const nameInput = document.querySelector("#popup__input-name");
  const aboutInput = document.querySelector("#popup__input-about");
  const displayName = document.querySelector("#popup__name");
  const displayAbout = document.querySelector("#popup__about");

  nameInput.value = displayName.textContent;
  aboutInput.value = displayAbout.textContent;
  openPopup(document.querySelector("#editPopup"));
});

//carregar as modificações de nome e bio
editProfileForm.addEventListener("submit", (event) => {
  const nameInput = document.querySelector("#popup__input-name");
  const aboutInput = document.querySelector("#popup__input-about");
  const displayName = document.querySelector("#popup__name");
  const displayAbout = document.querySelector("#popup__about");
  event.preventDefault();
  displayName.textContent = nameInput.value;
  displayAbout.textContent = aboutInput.value;

  closePopup(document.querySelector("#editPopup"));
});

//FECHAR POPUP EDITAR PERFIL
document.querySelector(".popup__close-btn").addEventListener("click", () => {
  closePopup(document.querySelector(".popup__box"));
});

// Função de Like
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("element__like")) {
    const likeBtn = event.target;
    if (likeBtn.src.includes("like.svg")) {
      likeBtn.src = "./images/like-activated.svg";
    } else {
      likeBtn.src = "./images/like.svg";
    }
  }
});

//Popup para expandir imagens
function openImagePopup(imageSrc, imageAlt, imageTitle) {
  const imagePopup = document.querySelector("#image-popup");
  const popupImage = imagePopup.querySelector(".elements__window-image");
  const popupTitle = imagePopup.querySelector(".elements__window-name");

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupTitle.textContent = imageTitle;

  openPopup(document.querySelector("#image-popup"));
}

// Adicionar evento de clique às imgs para abrir o popup
document.querySelectorAll(".element__image").forEach((image) => {
  image.addEventListener("click", (event) => {
    const imageSrc = event.target.src;
    const imageAlt = event.target.alt;
    const imageTitle = event.target
      .closest(".element")
      .querySelector(".element__name").textContent;
    openImagePopup(imageSrc, imageAlt, imageTitle);
  });
});

//fechar popup
const windowCloseButton = document.querySelector("#window-close-button");
windowCloseButton.addEventListener("click", () => {
  const imagePopup = document.querySelector("#image-popup");
  closePopup(imagePopup);
});
