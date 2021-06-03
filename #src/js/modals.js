let modal_gallery = $(".modal-gallery"),
    modal_gallery_close = $(".modal-gallery__click-close"),
    modal_gallery_init = $(".photo-gallery__item");

$(modal_gallery_init).on("click", function() {
  $(modal_gallery).addClass("modal--active");
  $("body").addClass("overflow-hide")
})

$(modal_gallery_close).on("click", function() {
  $(modal_gallery).removeClass("modal--active");
  $("body").removeClass("overflow-hide")
})