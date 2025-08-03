const authForm = document.querySelector("#auth-form");
const authFormEmail = document.querySelector("#auth-form-email");
const authFormPassword = document.querySelector("#auth-form-password");
const authFormSubmit = document.querySelector("#auth-form-submit");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");

const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};

const formValidation = {
  email: false,
  password: false,
};

const checkSubmitDisabled = () => {
  if (formValidation.email && formValidation.password) {
    authFormSubmit.disabled = false;
  } else {
    authFormSubmit.disabled = true;
  }
};

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formObj = new FormData(e.target);
  const formData = Object.fromEntries(formObj);

  if (
    formData.email.match(validationRules.emailRegex) &&
    formData.password.match(validationRules.passwordRegex)
  ) {
    console.log("yes");
  }
});

authFormEmail.addEventListener("input", (e) => {
  if (e.target.value.match(validationRules.emailRegex)) {
    formValidation.email = true;
    emailError.classList.add("invisible");
    authFormPassword.disabled = false;
  } else {
    formValidation.email = false;
    emailError.classList.remove("invisible");
    authFormPassword.disabled = true;
  }

  checkSubmitDisabled();
});

authFormPassword.addEventListener("input", (e) => {
  if (e.target.value.match(validationRules.passwordRegex)) {
    formValidation.password = true;
    passwordError.classList.add("invisible");
  } else {
    formValidation.password = false;
    passwordError.classList.remove("invisible");
  }

  checkSubmitDisabled();
});
