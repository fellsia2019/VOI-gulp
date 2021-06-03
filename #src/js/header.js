// header-mobile

let close_menu = $(".nav-mob__close"),
    wrapper_header = $(".wrapper-header"),
    header_burger = $(".header-burger");

$(close_menu).on("click", function() {
  $(wrapper_header).removeClass("wrapper-header--opened");
  $('body').removeClass("lock");
  
})

$(header_burger).on("click", function() {
  $(wrapper_header).addClass("wrapper-header--opened");
  $('body').addClass("lock");
})

let header = document.querySelector(".header"),
    header_height = header.offsetHeight;


window.addEventListener('scroll', function(e) {
  if (window.pageYOffset > header_height) {
    header.classList.add("header--fixed")
  } else {
    header.classList.remove("header--fixed")
  }


})
