"use strict";

/*
*
* ============================
* ============================
*
* Include lib:
*
* - webFontLoader.js;
* - preventBehavior.js;
* - svg4everybody.js;
*
* ============================
* ============================
* */

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

  var btn = document.querySelector("[hamburger-js]"),
      hideScrollContainer = document.querySelectorAll("html, body"),
      mobileContainer = document.querySelector("[mobile-block-js]");

  /**
    * @description
   */
  if (btn) {
    btn.addEventListener("click", function (ev) {
      var elem = ev.currentTarget;

      elem.classList.toggle("is-active");
      $(mobileContainer).toggleClass("is-open slideInRight");

      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      });
    });
  }
};

/**
 * @name initHeaderFixed
 *
 * @description Fixing the site header in the scrolling page.
 */
var initHeaderFixed = function initHeaderFixed() {

  var countScroll = $(window).scrollTop(),
      headerElement = $('.header');

  if (countScroll > 10) {
    $('body').addClass("is-header-fixed");
    headerElement.addClass("header--fixed");
  } else {
    $('body').removeClass("is-header-fixed");
    headerElement.removeClass("header--fixed");
  }
};

/**
 * @name initPopups
 *
 * @description
 */
var initPopups = function initPopups() {

  $('[popup-js]').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'is-show',
    callbacks: {
      beforeOpen: function beforeOpen() {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
      close: function close() {}
    }
  });
};

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

  var link = document.querySelectorAll("a");

  link.forEach(function (val, idx) {

    val.addEventListener("click", function (e) {
      if (val.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });
};

/**
 * @description Window on load.
 */
window.addEventListener('load', function (ev) {
  initHeaderFixed();
});

/**
 * @description Window on resize.
 */
window.addEventListener('resize', function (ev) {});

/**
 * @description Window on scroll.
 */
window.addEventListener('scroll', function (ev) {
  initHeaderFixed();
});

/**
 * @description Document DOM ready.
 */
$(document).ready(function (ev) {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  var _document = $(document),
      _window = $(window);

  /*
  * =============================================
  * CALLBACK :: start
  * ============================================= */

  /*
  * CALLBACK :: end
  * ============================================= */

  /**
   * @description Init all method
   */
  var initJquery = function initJquery() {
    // default
    initPreventBehavior();
    // ==========================================

    // lib
    initHamburger();
    initPopups();
    // ==========================================

    // callback
    // ==========================================

    $(window).on('load', function () {
      setTimeout(function () {
        $('.header').animate({
          'opacity': '1'
        }, 300);
      }, 150);
    });
  };
  initJquery();
});