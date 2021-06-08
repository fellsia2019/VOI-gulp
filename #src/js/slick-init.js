const slick_partner = document.querySelectorAll('[data-js="btn-show-info"]'),
    slider_photo_vertical = document.querySelectorAll('[data-js="slider-photo-vertical"]'),
    slider_photo_main = document.querySelectorAll('[data-js="slider-photo-main"]');

if (slick_partner != null) {
  $(slick_partner).slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll:6,
  });
}

if (slider_photo_vertical != null) {
$(slider_photo_vertical).slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: ".slider-photo__main",
  dots: false,
  focusOnSelect: true,
  vertical: true,
});
}
if (slider_photo_main != null) {
$(slider_photo_main).slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-photo__vertical",
  responsive: [
    {
      breakpoint: 1079,
      settings: {
        arrows: true
      }
    }
  ]
})

}


