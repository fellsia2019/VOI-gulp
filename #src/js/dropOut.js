function toggle__dropMenu(btnCategories, ui_selectmenu, categories, categories_scnd, categories_thrd) {
  this.btnCategories = btnCategories,
  this.categories = categories,
  this.categories_scnd = categories_scnd,
  this.categories_thrd = categories_thrd,
  this.ui_selectmenu = ui_selectmenu;

     var btnCategories = $(btnCategories),
         categories = $(categories),
         categories_scnd = $(categories_scnd),
         categories_thrd = $(categories_thrd),
         ui_selectmenu = $(ui_selectmenu);

     $(document).click(function (e) { // событие клика по веб-документу
       if ( ! $(btnCategories).is(e.target) && $(btnCategories).has(e.target).length === 0 &&
            // если клик был не по нашему блоку
            ! $(categories).is(e.target) && $(categories).has(e.target).length === 0 &&
            ! $(categories_scnd).is(e.target) && $(categories_scnd).has(e.target).length === 0 &&
            ! $(categories_thrd).is(e.target) && $(categories_thrd).has(e.target).length === 0 &&
            // и не по его дочерним элементам
            ! $(ui_selectmenu).is(e.target) && $(ui_selectmenu).has(e.target).length === 0 
            // если клик был не по нашему блоку
            ) {
              if (categories.hasClass("header-nav")) {
                $(".wrapper-header").removeClass("wrapper-header--opened");
                $("body").removeClass("lock")
             }
         }
      });
}
toggle__dropMenu('.header-burger', '.ui-selectmenu-menu', '.header-nav', '.header-social', '.header-action');