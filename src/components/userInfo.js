export default class UserInfo {
  constructor({ name, about }) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
