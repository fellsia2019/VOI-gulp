// header-mobile

const header = document.querySelector('[data-js="header"]'),
    header_height = header.offsetHeight;

window.addEventListener('scroll', function(e) {
  if (window.pageYOffset > header_height) {
    header.classList.add("header--fixed")
  } else {
    header.classList.remove("header--fixed")
  }
})


const close_menu = document.querySelectorAll('[data-js="nav-mob__close"]'),
    wrapper_header = document.querySelectorAll('[data-js="wrapper-header"]'),
    header_burger = document.querySelectorAll('[data-js="header-burger"]'),
    body = document.querySelector("body");

const mob_menu = {
  open(e) {
    body.classList.add("lock");
    wrapper_header.forEach(el => el.classList.add("wrapper-header--opened"))
  },
  close(e) {
    body.classList.remove("lock");
    wrapper_header.forEach(el => el.classList.remove("wrapper-header--opened"))
  }
};


close_menu.forEach(item => {
  item.addEventListener("click", mob_menu.close)
});
header_burger.forEach(item => {
  item.addEventListener("click", mob_menu.open)
})