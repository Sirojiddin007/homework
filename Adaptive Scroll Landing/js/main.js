let wrapper = document.querySelector('.wrapper');



let pageSlider = new Swiper('.page',{

   // Свои классы
   wrapperClass: "page__wrapper",
   slideClass:"page__screen",

   // Вертикальный слайдер

   direction: 'vertical',

   // Количество слайдов для показа
   slidesPerView: 'auto',
   
   // Включаем паралакс
   parallax: true,

   // Управление клавиатурой
   keyboard: {
      // вкл\выкл
      enabled: true,
      // вкл\выкл
      // только в пределах вьюпорта
      // только когда слайдер
      onlyInViewport: true,
      // вкл\выкл
      // Управление клавишами
      // Page up, Page down
      pageUpDown: true,
   },

   // Управление колесом мыши
   mousewheel: {
      sensetivity: 1,
   },

   // Отключение функционала
   // Если слайдер меньше чем нужно
   watchOverflow: true,

   // Скорость
   speed: 800,

   // Обновить свайпер при изменениии элементов слайдера
   observer: true,

   // Обновить свайпер при изменениии элементов родителя
   observeParents: true,

   // Обновить свайпер при изменениии дочерних элементов 
   observeSlideChildren: true,







   // Навигация
   // Булеты, текущее положение, прогрессбар
//    pagination: {
//       el: '.page__pagination',
//       type: 'bullets',
//       clickable: true,
//       bulletClass: "page__bullet",
//       bulletActiveClass: "page__bullet_active",
//    },

   // Скролл
   scrollbar: {
      el: '.page__scroll',
      dragClass: "page__drag-scroll",
      // Возможность перетаскивать скролл
      draggable: true
   },

   // Отключение автоинициализации
   init: false,

   // События
   on: {
      // Событие инициализации
      init: function () {
         menuSlider();
         setScrollType();
         wrapper.classList.add('_loaded');
      },
      // Событие смены слайдов
      slideChange: function () {
         menuSliderRemove();
         menuLinks[pageSlider.realIndex].classList.add('_active');
      },
      resize: function () {
         setScrollType();
      }
   },
})

   



let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
   if (menuLinks.length > 0){
      menuLinks[pageSlider.realIndex].classList.add('_active');
      for (let index = 0; index < menuLinks.length; index++) {
         const menuLink = menuLinks[index];
         menuLink.addEventListener("click", function(e){
            menuSliderRemove();
            pageSlider.slideTo(index, 800);
            menuLink.classList.add('_active');
            e.preventDafault();
         });
      }
   }
}

function menuSliderRemove() {
   let menuLinkActive = document.querySelector('.menu__link._active');
   if (menuLinkActive) {
      menuLinkActive.classList.remove('_active');
   }
}


// Обработчик контента
function setScrollType() {
   if (wrapper.classList.contains('_free')){
      wrapper.classList.remove('_free');
      pageSlider.params.freeMode = false;
   }

   for (let index = 0; index < pageSlider.slides.length; index++) {
      const pageSlide = pageSlider.slides[index];
      const pageSlideContent = pageSlide.querySelector('.screen__content');
      if(pageSlideContent) {
         const pageSlideContentHeight = pageSlideContent.offsetHeight;
         if(pageSlideContentHeight > window.innerHeight){
            wrapper.classList.add('_free');
            pageSlider.params.freeMode = true;
            break;
         }
      }
   }
}


pageSlider.init();