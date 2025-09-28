let authForm,
  authFormEmail,
  authFormPassword,
  authFormSubmit,
  emailError,
  passwordError,
  togglePasswordVisibility,
  alertError,
  alertClose,
  registrationLinkInAlert,
  registrationLinkInForm;

const wrapper = document.querySelector("#wrapper");

const users = [
  { id: 1, email: "user1@mail.ru", password: "qwe123QWE" },
  { id: 2, email: "user2@mail.ru", password: "asd123ASD" },
  { id: 3, email: "user3@mail.ru", password: "zxc123ZXC" },
];

const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
};

const formTypes = ["auth", "reg"];

const formValidation = {
  email: false,
  password: false,
};

let isAlertErrorVisible = false;

const passwordIcons = {
  eyeOpen:
    "url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)",
  eyeClose:
    "url(https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999)",
};

const authFormMarkup = `
   <form id="auth-form"
      class="border border-gray-50/50 rounded-xl flex flex-col w-full max-w-md p-10 pt-5 gap-2">
      <h1 class="text-white text-3xl mb-5">Авторизация</h1>
      <div>
        <input data-id="AUTH_FORM" id="auth-form-email" type="text" name="email" placeholder="Введите почту"
          class="border border-gray-50/50  rounded-md text-white px-3 py-2 w-full" autofocus>
        <p id="email-error" class="text-red-600 text-xs mt-1 invisible">Неверно введена почта</p>
      </div>
      <div class="relative">
        <input id="auth-form-password" type="password" name="password" placeholder="Введите пароль"
          class="border border-gray-50/50  rounded-md text-white px-3 py-2 disabled:opacity-45 w-full" disabled>

        <button id="toggle-password-visibility" class="hidden absolute right-3 top-1/3 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer 
              bg-no-repeat"
          style="background-image: url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)"
          data-visibility="false"></button>

        <!-- <input id="hide-password" type="checkbox" class="hidden absolute right-3 top-1/3 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer 
             bg-[url('https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999')] bg-no-repeat"> -->

        <p id="password-error" class="text-red-600 text-xs mt-1 invisible">Неверный пароль</p>
      </div>
      <!-- TODO: добавить глазик -->
      <input id="auth-form-submit" type="submit" value="Войти"
        class="rounded-md bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 cursor-pointer disabled:opacity-45 disabled:bg-blue-700 disabled:cursor-auto"
        disabled>
      <a id="registration-link-in-form"
        class="text-blue-600 underline self-center hover:no-underline hover:text-blue-100" href="">Регистрация</a>
    </form>
`;
const regFormMarkup = `
    <form id="auth-form"
      class="border border-gray-50/50 rounded-xl flex flex-col w-full max-w-md p-10 pt-5 gap-2">
      <h1 class="text-white text-3xl mb-5">Регистрация</h1>
      <div>
        <input data-id="REG_FORM" id="auth-form-email" type="text" name="email" placeholder="Введите почту"
          class="border border-gray-50/50  rounded-md text-white px-3 py-2 w-full" autofocus>
        <p id="email-error" class="text-red-600 text-xs mt-1 invisible">Неверно введена почта</p>
      </div>
      <div class="relative">
        <input id="auth-form-password" type="password" name="password" placeholder="Введите пароль"
          class="border border-gray-50/50  rounded-md text-white px-3 py-2 disabled:opacity-45 w-full" disabled>

        <button id="toggle-password-visibility" class="hidden absolute right-3 top-1/3 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer 
              bg-no-repeat"
          style="background-image: url(https://api.iconify.design/ic:outline-remove-red-eye.svg?color=%23999999)"
          data-visibility="false"></button>

        <!-- <input id="hide-password" type="checkbox" class="hidden absolute right-3 top-1/3 -translate-y-1/3 w-5 h-5 appearance-none cursor-pointer 
             bg-[url('https://api.iconify.design/ion:eye-off-outline.svg?color=%23999999')] bg-no-repeat"> -->

        <p id="password-error" class="text-red-600 text-xs mt-1 invisible">Неверный пароль</p>
      </div>
      <!-- TODO: добавить глазик -->
      <input id="auth-form-submit" type="submit" value="Зарегистрироваться"
        class="rounded-md bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 cursor-pointer disabled:opacity-45 disabled:bg-blue-700 disabled:cursor-auto"
        disabled>
      <a id="registration-link-in-form"
        class="text-blue-600 underline self-center hover:no-underline hover:text-blue-100" href="">Войти</a>
    </form>
`;

const checkSubmitDisabled = () => {
  if (formValidation.email && formValidation.password) {
    authFormSubmit.disabled = false;
  } else {
    authFormSubmit.disabled = true;
  }
};

const render = (markup) => {
  wrapper.innerHTML = ""; // Очищаем контейнер
  wrapper.insertAdjacentHTML("afterbegin", markup);
};

// render(authFormMarkup);

const init = (formType) => {
  // const isAuthForm = document.querySelector("#auth-form");
  // const isRegForm = document.querySelector("#registration-form");
  // нужно сделать проверку на то какая сейчас форма
  // if (isAuthForm) {} else if (isRegForm) {} //и в зависимости от этого регать переменные и события с правильными сеоекторами. И в верстке для каждой из форм нужно свои уникальные селекторы поставить чтобы id не повторялись
  authForm = document.querySelector("#auth-form");
  authFormEmail = document.querySelector("#auth-form-email");
  authFormPassword = document.querySelector("#auth-form-password");
  authFormSubmit = document.querySelector("#auth-form-submit");
  emailError = document.querySelector("#email-error");
  passwordError = document.querySelector("#password-error");
  togglePasswordVisibility = document.querySelector(
    "#toggle-password-visibility"
  );
  alertError = document.querySelector("#alert-error");
  alertClose = document.querySelector("#alert-close");
  registrationLinkInAlert = document.querySelector(
    "#registration-link-in-alert"
  );
  registrationLinkInForm = document.querySelector("#registration-link-in-form");

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formObj = new FormData(e.target);
    const formData = Object.fromEntries(formObj);

    if (
      formData.email.match(validationRules.emailRegex) &&
      formData.password.match(validationRules.passwordRegex)
    ) {
      if (formType === formTypes[0]) {
        const isUser = users.find(
          (user) =>
            formData.email === user.email && formData.password === user.password
        );

        if (!isUser) {
          // alertError.classList.remove("hidden");
          alertError.classList.remove("opacity-0");
          isAlertErrorVisible = true;
          if (isAlertErrorVisible) {
            setTimeout(() => {
              alertError.classList.add("opacity-0");
            }, 7000);
          }
        } else {
          document.cookie = `authUser=${isUser.id}; path=/; max-age=3600`;
          location.href = "posts.html";
        }
      } else if (formType === formTypes[1]) {
        users.push(formData);
        authForm.remove();
        render(authFormMarkup);
        init(formTypes[0]);
      }

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

  togglePasswordVisibility.addEventListener("mousedown", (e) => {
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

  alertClose.addEventListener("click", () => {
    if (isAlertErrorVisible) {
      alertError.classList.add("opacity-0");
    }
  });

  registrationLinkInAlert.addEventListener("click", (e) => {
    e.preventDefault();
    authForm.remove();
    render(regFormMarkup);
    init(formTypes[1]);
    // init();   // нужно вызывать чтобы для новой формы перерегистрировать все переменные и сгобытия
  });
  registrationLinkInForm.addEventListener("click", (e) => {
    e.preventDefault();
    authForm.remove();
    render(regFormMarkup);
    init(formTypes[1]);
    // init();   // нужно вызывать чтобы для новой формы перерегистрировать все переменные и сгобытия
  });
};

document.addEventListener("DOMContentLoaded", () => {
  render(authFormMarkup);
  init(formTypes[0]);
});

// const cookieArr = document.cookie.split(";");

// cookieArr.forEach((el) => {
//   "_ym_uid=1719807991381788226";
//   const cookieName = el.split("=")[0];
//   document.cookie = cookieName + "=; max-age=0";
// });

// console.log(document.cookie);
