const postsWrapper = document.querySelector("#posts-wrapper");
const favouriteList = document.querySelector("#favourite-list");
const logout = document.querySelector("#logout");

// const posts = [
//   {
//     id: 1,
//     title: "Основы JavaScript",
//     description:
//       "Изучение базовых концепций языка программирования JavaScript для начинающих разработчиков.",
//   },
//   {
//     id: 2,
//     title: "Введение в React",
//     description:
//       "Первый шаг в освоении популярного фреймворка для создания пользовательских интерфейсов.",
//   },
//   {
//     id: 3,
//     title: "Советы по CSS",
//     description:
//       "Полезные приемы и лучшие практики для эффективной работы с каскадными таблицами стилей.",
//   },
//   {
//     id: 4,
//     title: "Базы данных для веб-разработки",
//     description:
//       "Обзор различных систем управления базами данных и их применение в веб-проектах.",
//   },
//   {
//     id: 5,
//     title: "Алгоритмы и структуры данных",
//     description:
//       "Важные алгоритмы и структуры данных, которые должен знать каждый программист.",
//   },
//   {
//     id: 6,
//     title: "Версионный контроль с Git",
//     description:
//       "Основы работы с системой контроля версий Git и популярные команды для ежедневного использования.",
//   },
//   {
//     id: 7,
//     title: "Оптимизация производительности веб-сайтов",
//     description:
//       "Техники и инструменты для ускорения загрузки и улучшения производительности веб-приложений.",
//   },
//   {
//     id: 8,
//     title: "Основы безопасности веб-приложений",
//     description:
//       "Ключевые принципы безопасности и распространенные уязвимости, которые следует избегать.",
//   },
//   {
//     id: 9,
//     title: "Работа с API",
//     description:
//       "Как создавать и использовать RESTful API для взаимодействия между различными системами.",
//   },
//   {
//     id: 10,
//     title: "Деплой приложений",
//     description:
//       "Процесс развертывания веб-приложений на различных хостинг-платформах и серверах.",
//   },
// ];

// localStorage.setItem("posts", JSON.stringify(posts));

const getUserId = () => {
  let userId;
  const cookieArr = document.cookie.split(";");
  cookieArr.forEach((el) => {
    const [name, value] = el.split("=");
    if (name === "authUser") {
      userId = Number(value);
    }
  });
  return userId;
};

const userId = getUserId();

const posts = JSON.parse(localStorage.getItem("posts"));
let favourites = JSON.parse(localStorage.getItem("favourites"))?.find(
  (obj) => Number(obj.id) === userId
)?.posts; /// [3,5,6,7]

// favourites = [
//   {
//     id: 1,
//     posts: [2, 4, 5],
//   },
//   {
//     id: 2,
//     posts: [6, 4, 2],
//   },
// ];

// const favourites = [];

const renderFavouritesPosts = () => {
  const postsUi = postsWrapper.querySelectorAll(".post");

  let markup = "";
  favourites.forEach((postId) => {
    const post = posts.find((el) => el.id === postId);
    markup += `<li data-id="${post.id}" class="rounded-xl p-3 px-5 bg-gray-950 flex justify-between">
               <span>${post.title}</span>
                <button class="cursor-pointer delete-favourite">✕</button>
            </li>`;

    for (const el of postsUi) {
      if (Number(el.dataset.id) === postId) {
        const btn = el.querySelector("button");
        btn.disabled = true;
        btn.textContent = "Уже в избранном";
      }
    }
  });

  favouriteList.insertAdjacentHTML("beforeend", markup);
};

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

  if (favourites && favourites.length > 0) {
    renderFavouritesPosts();
  }
  // document.querySelectorAll(".post").addEventListener("click", (e) => {
  //   console.log(e.target);
  // });

  postsWrapper.addEventListener("click", (e) => {
    if (e.target.matches(".post button")) {
      const id = Number(e.target.parentElement.dataset.id);

      let favourites = JSON.parse(localStorage.getItem("favourites"))?.find(
        (obj) => Number(obj.id) === userId
      )?.posts; // [1,4,5,6],    [],   undefined

      if (favourites && favourites.includes(id)) {
        return;
      }

      // if (!favourites.includes(id)) {
      const post = posts.find((post) => id === post.id);
      if (post?.id) {
        if (!favourites) {
          favourites = [];
        }

        favourites.push(post.id);

        let jsonFavouritesLS = localStorage.getItem("favourites"); // [{},{}]
        let allUsersFavourites;
        if (!jsonFavouritesLS) {
          allUsersFavourites = [];
        } else {
          allUsersFavourites = JSON.parse(jsonFavouritesLS);
        }

        if (allUsersFavourites.length === 0) {
          localStorage.setItem(
            "favourites",
            JSON.stringify([
              {
                id: userId,
                posts: [post.id],
              },
            ])
          );
        } else {
          let isUser = false;
          allUsersFavourites.forEach((el) => {
            if (el.id === userId) {
              el.posts = favourites;
              isUser = true;

              localStorage.setItem(
                "favourites",
                JSON.stringify(allUsersFavourites)
              );
            }
          });
          if (isUser === false) {
            allUsersFavourites.push({
              id: userId,
              posts: [post.id],
            });
            localStorage.setItem(
              "favourites",
              JSON.stringify(allUsersFavourites)
            );
          }
        }

        const favouritePostMarkup = `<li data-id="${post.id}" class="rounded-xl p-3 px-5 bg-gray-950 flex justify-between">
                     <span>${post.title}</span>
                      <button class="cursor-pointer delete-favourite">✕</button>
                  </li>`;
        favouriteList.insertAdjacentHTML("beforeend", favouritePostMarkup);
        e.target.disabled = true;
        e.target.textContent = "Уже в избранном";
      }
    }
  });

  favouriteList.addEventListener("click", (e) => {
    if (e.target.matches(".delete-favourite")) {
      const postId = Number(e.target.parentElement.dataset.id);
      const jsonFavouritesLS = localStorage.getItem("favourites");
      if (!jsonFavouritesLS) {
        alert("Can not get favourites");
        favouriteList.textContent = "";
      } else {
        const allUsersFavourites = JSON.parse(jsonFavouritesLS); // [], [{},{}]
        if (allUsersFavourites.length === 0) {
          alert("Can not get favourites");
          favouriteList.textContent = "";
        } else {
          allUsersFavourites.forEach((el) => {
            if (el.id === userId) {
              if (!el.posts || el.posts.length === 0) {
                alert("Can not get favourites");
                favouriteList.textContent = "";
              } else {
                const postInd = el.posts.indexOf(postId);
                if (postInd === -1) {
                  alert("Can not delete post. Try later");
                } else {
                  el.posts.splice(postInd, 1);

                  localStorage.setItem(
                    "favourites",
                    JSON.stringify(allUsersFavourites)
                  );

                  e.target.parentElement.remove();

                  const posts = postsWrapper.querySelectorAll(".post");
                  // const unfavouritePost = posts.find((el) => el.dataset.id === id);
                  for (const el of posts) {
                    if (Number(el.dataset.id) === postId) {
                      const btn = el.querySelector("button");
                      btn.disabled = false;
                      btn.textContent = "Добавить в избранное";
                    }
                  }
                }
              }
            } else {
              alert("Can not get favourites");
              favouriteList.textContent = "";
            }
          });
        }
      }
    }

    // if (e.target.matches(".delete-favourite")) {
    //   const id = e.target.parentElement.dataset.id;
    //   // const post = favourites.find((el) => Number(id) === el);
    //   // const ind = favourites.indexOf(Number(id));
    //   // console.log(ind);
    //   let favourites = JSON.parse(localStorage.getItem("favourites"));

    //   if (!favourites) {
    //     alert("Can not get favourites");
    //     favouriteList.textContent = "";
    //   } else {
    //     console.log(favourites);
    //     const ind = favourites.findIndex((el) => el.posts.includes(Number(id)));
    //     console.log(ind);

    //     // [{
    //     //    id: 2,
    //     //  posts: [2,4,6,7,8],
    //     // },{},{}]

    //     if (ind !== -1) {
    //       favourites.splice(ind, 1);
    //       localStorage.setItem("favourites", JSON.stringify(favourites));

    //       e.target.parentElement.remove();
    //       const posts = postsWrapper.querySelectorAll(".post");
    //       // const unfavouritePost = posts.find((el) => el.dataset.id === id);
    //       for (const el of posts) {
    //         if (el.dataset.id === id) {
    //           const btn = el.querySelector("button");
    //           btn.disabled = false;
    //           btn.textContent = "Добавить в избранное";
    //         }
    //       }
    //     } else {
    //       alert("Try again later");
    //     }
    //   }
    // }
  });

  logout.addEventListener("click", () => {
    document.cookie = "authUser" + "=; max-age=0";
    location.href = "index.html";
  });
});
