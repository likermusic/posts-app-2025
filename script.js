const authForm = document.querySelector("#auth-form");
const authFormEmail = document.querySelector("#auth-form-email");
const authFormPassword = document.querySelector("#auth-form-password");
const authFormSubmit = document.querySelector("#auth-form-submit");
const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formObj = new FormData(e.target);
  const formData = Object.fromEntries(formObj);
  // formData.email.match(/dsd/);

  if (
    formData.email.match(validationRules.emailRegex) &&
    formData.password.match(validationRules.passwordRegex)
  ) {
    console.log("yes");
  }
});

authFormEmail.addEventListener("input", (e) => {
  if (authFormEmail.value.match(validationRules.emailRegex)) {
    authFormPassword.disabled = false;
  } else {
    authFormPassword.disabled = true;
  }
});
