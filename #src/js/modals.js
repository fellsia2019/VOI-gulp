const modal_gallery = document.querySelectorAll('[data-js="modal-gallery"]'),
    modal_gallery_close = document.querySelectorAll('[data-js="modal-gallery-close"]'),
    modal_gallery_init = document.querySelectorAll('[data-js="modal-gallery-init"]');

const modal_toggle = {
  open (e) {
    modal_gallery.forEach(el => el.classList.add("modal--active"))
    body.classList.add("overflow-hide");
  },

  close (e) {
    modal_gallery.forEach(el => el.classList.remove("modal--active"))
    body.classList.remove("overflow-hide");
  }
}


modal_gallery_init.forEach(item => {
  item.addEventListener("click", modal_toggle.open)
});
modal_gallery_close.forEach(item => {
  item.addEventListener("click", modal_toggle.close)
});

