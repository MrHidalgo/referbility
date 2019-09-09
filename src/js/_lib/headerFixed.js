

/**
 * @name initHeaderFixed
 *
 * @description Fixing the site header in the scrolling page.
 */
const initHeaderFixed = () => {

  let countScroll = $(window).scrollTop(),
    headerElement = $('.header');

  if (countScroll > 10) {
    $('body').addClass("is-header-fixed");
    headerElement.addClass("header--fixed");
  } else {
    $('body').removeClass("is-header-fixed");
    headerElement.removeClass("header--fixed");
  }

};