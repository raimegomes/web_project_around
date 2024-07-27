export function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.style.display = "flex";
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.style.display = "none";
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.target);
  }
});
