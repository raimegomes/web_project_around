document.addEventListener("DOMContentLoaded", function () {
  //editar perfil - nome e bio
  const editProfileBtn = document.querySelector("#popup__container");
  const popup = document.querySelector("#editPopup");
  const closeBtn = document.querySelector("#popup__close");
  const form = document.querySelector("#popup__form");
  const displayName = document.querySelector("#popup__name");
  const displayAbout = document.querySelector("#popup__about");
  const nameInput = document.querySelector("#popup__input-name");
  const aboutInput = document.querySelector("#popup__input-about");

  //Popup para mudar nome do perfil e bio
  editProfileBtn.addEventListener("click", function () {
    nameInput.value = displayName.textContent;
    aboutInput.value = displayAbout.textContent;

    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  //Fecha o popup de nome e bio ao clicar fora
  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    displayName.textContent = nameInput.value;
    displayAbout.textContent = aboutInput.value;

    popup.style.display = "none";
  });

  //Add imagens - like - delete
  const profileAddBtn = document.querySelector("#profile__add");
  const newPlacePopup = document.querySelector(".new-img");
  const closePopupBtn = newPlacePopup.querySelector(".new-img__close-btn");
  const newPlaceForm = document.querySelector("#newImgForm");
  const imgSection = document.querySelector(".elements");
  const template = document.querySelector("#element-template").content;

  const imagePopup = document.querySelector("#image-popup");
  const imagePopupImage = imagePopup.querySelector(".elements__window-image");
  const imagePopupCaption = imagePopup.querySelector(".elements__window-name");
  const closeButton = document.querySelector("#window-close-button");

  const initialCards = [
    { name: "Broklyn Gate", link: "./images/01_broklyn-gate.jpg" },
    {
      name: "Route 66",
      link: "./images/02_route66.jpg",
    },
    {
      name: "Yellowstone Park",
      link: "./images/03_yellowstone-park.jpg",
    },
    { name: "Miami Sunset", link: "./images/04_miami.jpg" },
    {
      name: "Grand Canyon National Park",
      link: "./images/05__grand-canyon.jpg",
    },
    { name: "Yosemite Valley", link: "./images/06_yosemite-valley.jpg" },
  ];

  function createCard(name, link) {
    const cardElement = template.cloneNode(true);
    const element = cardElement.querySelector(".element");
    const elementImage = element.querySelector(".element__image");
    const elementName = element.querySelector(".element__name");
    const likeBtn = element.querySelector(".element__like");
    const trashBtn = element.querySelector(".element__trash-icon");

    elementImage.src = link;
    elementImage.alt = name;
    elementName.textContent = name;

    likeBtn.addEventListener("click", function () {
      if (this.src.includes("like.svg")) {
        this.src = "./images/like-activated.svg";
      } else {
        this.src = "./images/like.svg";
      }
    });

    trashBtn.addEventListener("click", function () {
      this.closest(".element").remove();
    });

    elementImage.addEventListener("click", function () {
      openImagePopup(elementImage);
    });

    return cardElement;
  }

  //popup para expandir as imagens
  function openImagePopup(imageElement) {
    imagePopupImage.src = imageElement.src;
    imagePopupCaption.textContent = imageElement.alt;
    imagePopup.classList.add("image-popup_opened");
  }

  function closeImagePopup() {
    imagePopup.classList.remove("image-popup_opened");
  }

  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    imgSection.appendChild(cardElement);
  });

  profileAddBtn.addEventListener("click", function () {
    newPlacePopup.style.display = "flex";
  });

  closePopupBtn.addEventListener("click", function () {
    newPlacePopup.style.display = "none";
  });

  newPlaceForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const titleInput = newPlaceForm.querySelector('input[name="title"]');
    const urlInput = newPlaceForm.querySelector('input[name="link"]');

    const title = titleInput.value;
    const link = urlInput.value;

    if (title && link) {
      const cardElement = createCard(title, link);
      imgSection.prepend(cardElement);
      newPlaceForm.reset();
      newPlacePopup.style.display = "none";
    }
  });

  closeButton.addEventListener("click", closeImagePopup);

  //Validação de formulários
});
