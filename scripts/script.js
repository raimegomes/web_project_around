document.addEventListener("DOMContentLoaded", function () {
  //editar perfil - nome e bio
  const editProfileBtn = document.querySelector("#popup__container"); //foi ----
  const popup = document.querySelector("#editPopup"); //foi como editpopup -------
  const closeBtn = document.querySelector("#popup__close"); //foi
  const form = document.querySelector("#popup__form"); //foi
  const displayName = document.querySelector("#popup__name"); //----------
  const displayAbout = document.querySelector("#popup__about"); //foi.-----------
  const nameInput = document.querySelector("#popup__input-name"); //foi ---------
  const aboutInput = document.querySelector("#popup__input-about"); //--------

  editProfileBtn.addEventListener("click", function () {
    nameInput.value = displayName.textContent;
    aboutInput.value = displayAbout.textContent;

    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

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

  //validação do popup editar perfil - nome e bio
  const nameError = document.querySelector("#popup__input-name-error");
  const aboutError = document.querySelector("#popup__input-about-error");
  const saveBtn = document.querySelector(".popup__save-btn");

  function validateInput(input, errorElement) {
    if (input.validity.valueMissing) {
      errorElement.textContent = "Preencha esse campo.";
    } else if (input.validity.tooShort || input.validity.tooLong) {
      errorElement.textContent = `Este campo deve conter entre ${input.minLength} e ${input.maxLength} caracteres.`;
    } else {
      errorElement.textContent = "";
    }
    input.classList.toggle("popup__input_invalid", !input.validity.valid);
  }

  function checkFormValidity() {
    if (nameInput.validity.valid && aboutInput.validity.valid) {
      saveBtn.disabled = false;
    } else {
      saveBtn.disabled = true;
    }
  }

  nameInput.addEventListener("input", function () {
    validateInput(nameInput, nameError);
    checkFormValidity();
  });

  aboutInput.addEventListener("input", function () {
    validateInput(aboutInput, aboutError);
    checkFormValidity();
  });

  editProfileBtn.addEventListener("click", function () {
    nameInput.value = displayName.textContent;
    aboutInput.value = displayAbout.textContent;

    validateInput(nameInput, nameError);
    validateInput(aboutInput, aboutError);
    checkFormValidity();

    popup.style.display = "flex";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    displayName.textContent = nameInput.value;
    displayAbout.textContent = aboutInput.value;

    popup.style.display = "none";
  });

  function checkFormValidity() {
    if (nameInput.validity.valid && aboutInput.validity.valid) {
      saveBtn.disabled = false;
    } else {
      saveBtn.disabled = true;
    }
  }

  //Validacão do formulário para add imagens
  const newImgForm = document.querySelector("#newImgForm");
  const titleInput = newImgForm.querySelector("#new-img__input-name");
  const urlInput = newImgForm.querySelector("#new-img__input-url");
  const newImgSaveBtn = newImgForm.querySelector(".new-img__save-btn");
  const titleError = document.createElement("span");
  titleError.classList.add("popup__error");
  titleInput.parentNode.insertBefore(titleError, titleInput.nextSibling);

  const urlError = document.createElement("span");
  urlError.classList.add("popup__error");
  urlInput.parentNode.insertBefore(urlError, urlInput.nextSibling);

  function validateInput(input, errorElement) {
    if (input.validity.valueMissing) {
      errorElement.textContent = "Preencha esse campo.";
    } else if (input.validity.typeMismatch) {
      errorElement.textContent = "Por favor, insira um endereço web.";
    } else {
      errorElement.textContent = "";
    }
    input.classList.toggle("popup__input_invalid", !input.validity.valid);
  }

  function validateNewImgForm() {
    validateInput(titleInput, titleError);
    validateInput(urlInput, urlError);

    if (titleInput.validity.valid && urlInput.validity.valid) {
      newImgSaveBtn.disabled = false;
    } else {
      newImgSaveBtn.disabled = true;
    }
  }

  titleInput.addEventListener("input", function () {
    validateInput(titleInput, titleError);
    validateNewImgForm();
  });

  urlInput.addEventListener("input", function () {
    validateInput(urlInput, urlError);
    validateNewImgForm();
  });

  newImgForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (titleInput.validity.valid && urlInput.validity.valid) {
      const title = titleInput.value;
      const link = urlInput.value;

      const cardElement = createCard(title, link);
      imgSection.prepend(cardElement);
      newImgForm.reset();
      newPlacePopup.style.display = "none";
      newImgSaveBtn.disabled = true;
    }
  });

  //Popup para add imagens - like - delete
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

  window.addEventListener("click", function (event) {
    if (event.target === newPlacePopup) {
      newPlacePopup.style.display = "none";
    }
  });

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
});
