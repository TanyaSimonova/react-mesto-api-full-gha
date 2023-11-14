const validationConfig = {
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'submit-button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__error_visible',
  errorSpan: '.popup-form__error_'
};

const editButtonElement = document.querySelector('.edit-button');
const addButtonElement = document.querySelector('.add-button');
const editProfileAvatar = document.querySelector('.profile__button');
const formValidateCard = document.forms.popupFormCard;
const formValidateProfile = document.forms.popupFormProfile;
const formValidateAvatar = document.forms.popupFormAvatar;
const imagePopupSelector = '.image-popup';
const elementListSelector = '.element-list';
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__speciality';
const profilePopupSelector = '.profile-popup';
const avatarProfileSelector = '.avatar-popup';
const cardPopupSelector = '.card-popup';
const deletePopupSelector = '.delete-popup';
const templateSelector = '.element-list__template';
const imageProfileAvatarSelector = '.profile__avatar';


export {
  validationConfig,
  editButtonElement,
  addButtonElement,
  formValidateCard,
  formValidateProfile,
  imagePopupSelector,
  elementListSelector,
  profileNameSelector,
  profileJobSelector,
  profilePopupSelector,
  cardPopupSelector,
  templateSelector,
  formValidateAvatar,
  avatarProfileSelector,
  editProfileAvatar,
  imageProfileAvatarSelector,
  deletePopupSelector,
 };
