const postsWrapper = document.querySelector("#posts-wrapper");
const favouriteList = document.querySelector("#favourite-list");

const posts = [
  {
    id: 1,
    title: "Основы JavaScript",
    description:
      "Изучение базовых концепций языка программирования JavaScript для начинающих разработчиков.",
  },
  {
    id: 2,
    title: "Введение в React",
    description:
      "Первый шаг в освоении популярного фреймворка для создания пользовательских интерфейсов.",
  },
  {
    id: 3,
    title: "Советы по CSS",
    description:
      "Полезные приемы и лучшие практики для эффективной работы с каскадными таблицами стилей.",
  },
  {
    id: 4,
    title: "Базы данных для веб-разработки",
    description:
      "Обзор различных систем управления базами данных и их применение в веб-проектах.",
  },
  {
    id: 5,
    title: "Алгоритмы и структуры данных",
    description:
      "Важные алгоритмы и структуры данных, которые должен знать каждый программист.",
  },
  {
    id: 6,
    title: "Версионный контроль с Git",
    description:
      "Основы работы с системой контроля версий Git и популярные команды для ежедневного использования.",
  },
  {
    id: 7,
    title: "Оптимизация производительности веб-сайтов",
    description:
      "Техники и инструменты для ускорения загрузки и улучшения производительности веб-приложений.",
  },
  {
    id: 8,
    title: "Основы безопасности веб-приложений",
    description:
      "Ключевые принципы безопасности и распространенные уязвимости, которые следует избегать.",
  },
  {
    id: 9,
    title: "Работа с API",
    description:
      "Как создавать и использовать RESTful API для взаимодействия между различными системами.",
  },
  {
    id: 10,
    title: "Деплой приложений",
    description:
      "Процесс развертывания веб-приложений на различных хостинг-платформах и серверах.",
  },
];

const favourites = [];

const renderPosts = () => {
  let markup = "";
  posts.forEach((post) => {
    markup += `<div data-id="${post.id}" class="border rounded-3xl p-3 border-white w-100 min-h-50 flex  gap-4 flex-col post">
  
      <h3 class="text-white text-xl font-bold">
      ${post.title}
      </h3>
      <p class="text-white">${post.description}
      </p>
      <button
        class="rounded-md bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 cursor-pointer disabled:opacity-45 disabled:bg-blue-700 disabled:cursor-auto">Добавиить
        в избранное</button>
    </div>`;
  });
  postsWrapper.insertAdjacentHTML("afterbegin", markup);
};

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
  // document.querySelectorAll(".post").addEventListener("click", (e) => {
  //   console.log(e.target);
  // });

  postsWrapper.addEventListener("click", (e) => {
    if (e.target.matches(".post button")) {
      const id = Number(e.target.parentElement.dataset.id);

      if (!favourites.includes(id)) {
        // posts.forEach((post) => {
        //   if (Number(id) === post.id) {
        //     const favouritePostMarkup = `<li data-id="${post.id}" class="rounded-xl p-3 px-5 bg-gray-950 flex justify-between">
        //        <span>${post.title}</span>
        //         <button class="cursor-pointer">✕</button>
        //     </li>`;
        //     favouriteList.insertAdjacentHTML("beforeend", favouritePostMarkup);
        //   }
        // });

        // const post = posts.find((post) => {
        //   if (Number(id) === post.id) {
        //     return post;
        //   }
        // });
        const post = posts.find((post) => id === post.id);
        if (post?.id) {
          favourites.push(post.id);
          const favouritePostMarkup = `<li data-id="${post.id}" class="rounded-xl p-3 px-5 bg-gray-950 flex justify-between">
               <span>${post.title}</span>
                <button class="cursor-pointer delete-favourite">✕</button>
            </li>`;
          favouriteList.insertAdjacentHTML("beforeend", favouritePostMarkup);
        } else {
          alert("Попробуйте позже");
        }
      }
    }
  });

  favouriteList.addEventListener("click", (e) => {
    if (e.target.matches(".delete-favourite")) {
      const id = e.target.parentElement.dataset.id;
      // const post = favourites.find((el) => Number(id) === el);
      // const ind = favourites.indexOf(Number(id));
      // console.log(ind);

      const ind = favourites.indexOf(Number(id));
      if (ind !== -1) {
        favourites.splice(ind, 1);
        e.target.parentElement.remove();
      } else {
        alert("Try again later");
      }
    }
  });
});
