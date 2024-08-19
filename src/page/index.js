import "./index.css";
import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";

// Configurações para validação dos formulários
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

// Imagens iniciais
import broklynGate from "../images/01_broklyn-gate.jpg";
import route66 from "../images/02_route66.jpg";
import yellowstonePark from "../images/03_yellowstone-park.jpg";
import miami from "../images/04_miami.jpg";
import grandCanyon from "../images/05__grand-canyon.jpg";
import yosemiteValley from "../images/06_yosemite-valley.jpg";

const initialCards = [
  { name: "Broklyn Gate", link: broklynGate },
  { name: "Route 66", link: route66 },
  { name: "Yellowstone Park", link: yellowstonePark },
  { name: "Miami Sunset", link: miami },
  { name: "Grand Canyon National Park", link: grandCanyon },
  { name: "Yosemite Valley", link: yosemiteValley },
];

//função para lidar com o clique no card
const handleCardClick = (link, name) => {
  imagePopup.open(link, name);
};

// Função para renderizar os cards de imagens
const renderCard = (cardData) => {
  const card = new Card(
    cardData.name,
    cardData.link,
    "#element-template",
    handleCardClick
  );
  return card.getCard();
};

// Renderiza as imagens iniciais
const imgSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements"
);
imgSection.renderItems();

// Popup para expandir as imagem
const imagePopup = new PopupWithImage(".elements__window");
imagePopup.setEventListeners();

// Popup Novo Local - para add imagens
const newImgPopup = new PopupWithForm(".new-img", (formData) => {
  const newCard = renderCard({ name: formData.title, link: formData.url });
  imgSection.addItem(newCard);
  newImgPopup.close();
});
newImgPopup.setEventListeners();

// Add evento ao btn para abrir o popup de add img
document.querySelector("#profile__add").addEventListener("click", () => {
  newImgPopup.open();
  newImgFormValidator.resetValidation();
});

// Validação do formulário para adicionar imagens
const newImgFormValidator = new FormValidator(
  validationConfigNewImg,
  newImgPopup.getFormElement()
);
newImgFormValidator.enableValidation();

document.querySelector("#profile__add").addEventListener("click", () => {
  newImgFormValidator.resetValidation();
  newImgPopup.open();
});

// Informações do usuário
const userInfo = new UserInfo({
  name: "#popup__name",
  about: "#popup__about",
});

// Popup para edição de perfil - nome e bio
const editProfilePopup = new PopupWithForm("#editPopup", (formData) => {
  userInfo.setUserInfo(formData.name, formData.about);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Abertura do popup para editar perfil - nome e bio
document.querySelector("#popup__container").addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  editProfilePopup.setInputValues(currentUserInfo);
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});

// Validação do formulário de edição de perfil
const editProfileFormValidator = new FormValidator(
  validationConfigProfile,
  editProfilePopup.getFormElement()
);
editProfileFormValidator.enableValidation();
