const authForm = document.querySelector("#auth-form");
const authFormEmail = document.querySelector("#auth-form-email");
const authFormPassword = document.querySelector("#auth-form-password");
const authFormSubmit = document.querySelector("#auth-form-submit");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const togglePasswordVisibility = document.querySelector(
  "#toggle-password-visibility"
);
// const hidePassword = document.querySelector("#hide-password");

const users = [
  { email: "user1@mail.ru", password: "qwe123QWE" },
  { email: "user2@mail.ru", password: "asd123ASD" },
  { email: "user3@mail.ru", password: "zxc123ZXC" },
];

const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};

const formValidation = {
  email: false,
  password: false,
};

const passwordIcons = {
  eyeOpen:
    "url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)",
  eyeClose:
    "url(https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999)",
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
    // try {
    //   users.forEach((user) => {
    //     if (
    //       formData.email === user.email &&
    //       formData.password === user.password
    //     ) {
    //       console.log("User found");
    //       throw new Error("");
    //     }
    //   });
    // } catch (error) {}

    const isUser = users.find(
      (user) =>
        formData.email === user.email && formData.password === user.password
    );

    console.log(isUser);

    //  { email: "user1@mail.ru", password: "qwe123QWE" },
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
  if (e.target.value) {
    togglePasswordVisibility.classList.remove("hidden");
  } else {
    togglePasswordVisibility.classList.add("hidden");
  }

  if (e.target.value.match(validationRules.passwordRegex)) {
    formValidation.password = true;
    passwordError.classList.add("invisible");
  } else {
    formValidation.password = false;
    passwordError.classList.remove("invisible");
  }

  checkSubmitDisabled();
});

togglePasswordVisibility.addEventListener("click", (e) => {
  if (e.target.dataset.visibility === "true") {
    //hide
    authFormPassword.type = "password";
    e.target.style.backgroundImage = passwordIcons.eyeOpen;
    e.target.dataset.visibility = "false";
  } else {
    //show
    authFormPassword.type = "text";
    e.target.style.backgroundImage = passwordIcons.eyeClose;
    e.target.dataset.visibility = "true";
  }

  authFormPassword.focus();
});
