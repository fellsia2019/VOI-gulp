
// let btn_show_info = $(".btn-show-info");

let btn_show_info = document.querySelectorAll('[data-js="btn-show-info"]');



btn_show_info.forEach((item) => {
  item.addEventListener("click", toggle)
})



function toggle() {
  this.closest(".person-detail__info").classList.toggle("show-full")
}
