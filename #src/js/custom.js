
let btn_show_info = $(".btn-show-info");


$(btn_show_info).on('click', function() {
  $(this).closest(".person-detail__info").toggleClass("show-full");

})