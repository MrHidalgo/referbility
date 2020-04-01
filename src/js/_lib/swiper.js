

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

  const _revampTestimonialsOpt = {
    effect: 'cube',
    cubeEffect: {
      slideShadows: true,
      shadow: false,
      shadowOffset: 10,
      shadowScale: 1
    },
    speed: 750,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.revamp-testimonials__btn-next',
      prevEl: '.revamp-testimonials__btn-prev',
    }
  };
  let _revampTestimonialsSwiper = undefined;

  const _revampBlogOpt = {
    effect: 'cube',
    cubeEffect: {
      slideShadows: true,
      shadow: false,
      shadowOffset: 10,
      shadowScale: 1
    },
    speed: 750,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.revamp-blog__btn-next',
      prevEl: '.revamp-blog__btn-prev',
    }
  };
  let _revampBlogSwiper = undefined;

  $(window).on('load resize orientationchange', () => {
    if ($('.revampTestimonials').length > 0) {
      if ($(window).width() < 768) {
        _revampTestimonialsSwiper = new Swiper('.revampTestimonials', _revampTestimonialsOpt)
      } else {
        if (_revampTestimonialsSwiper !== undefined) {
          _revampTestimonialsSwiper.destroy(true, true);
          _revampTestimonialsSwiper = undefined;
        }

        $('.revampTestimonials').find('.swiper-wrapper').attr('style', '');
      }
    }

    if ($('.revampBlog').length > 0) {
      if ($(window).width() < 768) {
        _revampBlogSwiper = new Swiper('.revampBlog', _revampBlogOpt)
      } else {
        if (_revampBlogSwiper !== undefined) {
          _revampBlogSwiper.destroy(true, true);
          _revampBlogSwiper = undefined;
        }

        $('.revampBlog').find('.swiper-wrapper').attr('style', '');
      }
    }
  });
};
