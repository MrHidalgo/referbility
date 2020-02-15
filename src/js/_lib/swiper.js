

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
const initSwiper = () => {

  const mySwiperDashboard = new Swiper('.dashboardJob', {
    loop: false,
    effect: 'slide',
    speed: 750,
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },
    navigation: {
      nextEl: '.ref-jobs__slider-btn--next',
      prevEl: '.ref-jobs__slider-btn--prev',
    }
  });

  const mySwiperRetouch = new Swiper('.retouchWithSlider', {
    loop: true,
    effect: 'slide',
    speed: 750,
    slidesPerView: 4,
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: true
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: false
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1366: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    },
    navigation: {
      nextEl: '.retouch-with__slider-btn--next',
      prevEl: '.retouch-with__slider-btn--prev',
    }
  });
};
