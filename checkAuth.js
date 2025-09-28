const url = location.pathname.replace(/\//g, "");
const cookieArr = document.cookie.split(";");
cookieArr.forEach((el) => {
  const [name, value] = el.split("=");
  if ((name !== "authUser" || isNaN(value)) && url === "posts.html") {
    location.href = "index.html";
  } else if (name === "authUser" && !isNaN(value) && url === "index.html") {
    location.href = "posts.html";
  }
});
