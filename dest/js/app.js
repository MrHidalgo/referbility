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
      beforeClose: function beforeClose(ev) {}
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
 * @name initSmoothScroll
 *
 * @description Smooth transition to anchors to the block.
 */
var initSmoothScroll = function initSmoothScroll() {
  var btnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[anchor-js]";
  var animateSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 750;


  $(btnName).on("click", function (e) {

    var linkHref = $(e.currentTarget).attr('href'),
        headerHeight = $(".header").outerHeight() || 0,
        topHeightOffset = $(linkHref).offset().top - headerHeight;

    $('body, html').animate({
      scrollTop: topHeightOffset
    }, animateSpeed);
  });
};

/**
 * @name initStellar
 * @description Stellar.js is a jQuery plugin that provides parallax scrolling effects to any scrolling element.
 *
 * Parallax Elements
 * - data-stellar-ratio="1"
 *
 * Parallax Backgrounds
 * - data-stellar-background-ratio="1"
 */
var initStellar = function initStellar() {
  if ($("[parallax-js]").length) {
    $(function () {
      $.stellar({
        // Set scrolling to be in either one or both directions
        horizontalScrolling: false,
        verticalScrolling: true,

        // Set the global alignment offsets
        horizontalOffset: 0,
        verticalOffset: 0,

        // Refreshes parallax content on window load and resize
        responsive: false,

        // Select which property is used to calculate scroll.
        // Choose 'scroll', 'position', 'margin' or 'transform',
        // or write your own 'scrollProperty' plugin.
        scrollProperty: 'scroll',

        // Select which property is used to position elements.
        // Choose between 'position' or 'transform',
        // or write your own 'positionProperty' plugin.
        positionProperty: 'transform',

        // Enable or disable the two types of parallax
        parallaxBackgrounds: true,
        parallaxElements: true,

        // Hide parallax elements that move outside the viewport
        hideDistantElements: false,

        // Customise how elements are shown and hidden
        hideElement: function hideElement($elem) {
          $elem.hide();
        },
        showElement: function showElement($elem) {
          $elem.show();
        }
      });
    });
  }
};

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
var initSwiper = function initSwiper() {

  var mySwiperDashboard = new Swiper('.dashboardJob', {
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
      prevEl: '.ref-jobs__slider-btn--prev'
    }
  });

  var mySwiperRetouch = new Swiper('.retouchWithSlider', {
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
      prevEl: '.retouch-with__slider-btn--prev'
    }
  });
};

/**
 * @name scrollAnimation
 *
 * @param elem
 * @param el
 *
 * @description
 */
var scrollAnimation = function scrollAnimation(elem, el) {

  $(elem).css({
    'animation-name': $(el).data('animation-name') ? $(el).data('animation-name') + ", c-fadeIn" : 'c-slideInUp, c-fadeIn',
    'animation-delay': $(el).data('animation-delay') || '0s',
    'animation-duration': $(el).data('animation-duration') || '1s'
  });
};

/**
 * @name initViewPortChecker
 *
 * @param className {String}              - default is `viewport-hide-js`
 * @param classNameToAdd {String}         - default is `viewport-show-js animated`
 * @param offsetVal {Number}              - default is 100
 * @param callbackFunctionName {Object}   - default is `scrollAnimation()`
 *
 * @description Detects if an element is in the viewport and adds a class to it
 *
 * You can to add some attribute:
 * - <div data-vp-add-class="random"></div>                       > classToAdd
 * - <div data-vp-remove-class="random"></div>                    > classToRemove
 * - <div data-vp-remove-after-animation="true|false"></div>      > Removes added classes after CSS3 animation has completed
 * - <div data-vp-offset="[100 OR 10%]"></div>                    > offset
 * - <div data-vp-repeat="true"></div>                            > repeat
 * - <div data-vp-scrollHorizontal="false"></div>                 > scrollHorizontal
 */
var initViewPortChecker = function initViewPortChecker() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "viewport-hide-js";
  var classNameToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "viewport-show-js animated";
  var offsetVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var callbackFunctionName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : scrollAnimation;


  $("." + className).not(".full-visible").each(function (idx, el) {

    $(el).viewportChecker({
      classToAdd: classNameToAdd,
      classToAddForFullView: 'full-visible',
      classToRemove: className,
      removeClassAfterAnimation: true,
      offset: offsetVal,
      repeat: false,
      callbackFunction: function callbackFunction(elem, action) {

        callbackFunctionName(elem, el);
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

  var isDown = false;

  /*
  * =============================================
  * CALLBACK :: start
  * ============================================= */
  var initModalJobDetail = function initModalJobDetail() {
    var _countToOption = function _countToOption(fromVal, toVal) {
      return {
        from: fromVal,
        to: toVal,
        speed: 750,
        formatter: function formatter(value, options) {
          value = value.toFixed(options.decimals);
          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
        }
      };
    };

    var numberWithCommas = function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    $('#jobDetail .c-modal__radio').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _elID = _el.attr('data-id');

      $('.c-modal__radio').removeClass('is-active');
      _el.addClass('is-active');

      if (_elID === '1') {
        $('.c-modal__desc-1').show();
        $('.c-modal__desc-2').hide();
        $('.c-modal__body-content-2, .c-modal__body-content-3').slideUp(300);

        $('.c-modal__price span').countTo(_countToOption(3000, 2000));
      } else {
        $('.c-modal__desc-2').show();
        $('.c-modal__desc-1').hide();
        $('.c-modal__body-content-2, .c-modal__body-content-3').slideDown(300);

        $('.c-modal__price span').countTo(_countToOption(2000, 3000));
      }
    });

    $('.c-modal__optional-head').on('click', function (ev) {
      var _parentNode = $('.c-modal__optional');

      if (_parentNode.hasClass('is-open')) {
        $('.c-modal__optional').removeClass('is-open');
        $('.c-modal__body-col-1').slideDown(300);
        $(ev.currentTarget).find('p').text($(ev.currentTarget).find('p').attr('data-hide-val'));
      } else {
        $('.c-modal__optional').addClass('is-open');
        $('.c-modal__body-col-1').slideUp(300);
        $(ev.currentTarget).find('p').text($(ev.currentTarget).find('p').attr('data-show-val'));
      }

      $('.c-modal__optional-body').slideToggle(300);
    });

    $('.multipleSelect').fastselect();

    $('[inputfile-js]').on('change', function (ev) {
      var _valNode = $(ev.currentTarget).prev('p');

      _valNode.find('span').text(ev.currentTarget.value.split('\\').pop());
    });

    $('input[type=range]').on('input', function (e) {
      var min = e.target.min,
          max = e.target.max,
          val = e.target.value;

      if ($(e.currentTarget).closest('.c-modal__range').find('.c-modal__range-sum').length) {
        $(e.currentTarget).closest('.c-modal__range').find('.c-modal__range-sum').val(numberWithCommas(val));
      } else {
        $(e.currentTarget).closest('.c-modal__range').find('.c-modal__range-result').val(val);
      }

      $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
      });
    }).trigger('input');

    $('.c-modal__range-result').on('keyup', function (ev) {
      var _val = $(ev.currentTarget).val();

      if (_val <= 0) {
        $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]').val(1).trigger('input');
      } else if (_val > 30) {
        $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]').val(30).trigger('input');
      } else {
        $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]').val($(ev.currentTarget).val()).trigger('input');
      }
    });

    $('.c-modal__range-sum').on('blur keyup', function (ev) {
      var _val = $(ev.currentTarget).val().replace(/,/g, ''),
          _newVal = Math.round(parseInt(_val).toFixed(0) / 500) * 500,
          _range = $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]');

      var _helperInputVal = function _helperInputVal(_v) {
        if (_v <= 0) {
          _range.val(1).trigger('input');
        } else if (_v > 100000) {
          _range.val(numberWithCommas(100000)).trigger('input');
        } else {
          _range.val(_v).trigger('input');
        }
      };

      if (ev.keyCode === 13 || ev.type === 'blur') {
        _helperInputVal(_newVal);
      }
    });
  };

  function _changeKanbanBoxesHeight(self) {
    var _kanbanBoxes = $(self).find('.kanban__box'),
        _kanbanBoxesCover = $(self).find('.kanban__box-overlay');

    var _kanbanBoxesSum = 0;

    for (var i = 0; i < _kanbanBoxes.length; i++) {
      _kanbanBoxesSum += $(_kanbanBoxes[i]).outerHeight(true);
    }

    _kanbanBoxesCover.css({
      'height': _kanbanBoxesSum
    });

    // change title indication
    if (_kanbanBoxes.length === 0) {
      $(self).closest('.kanban__box-wrapper').find('.kanban__title-indication').fadeOut(300);
    } else {
      $(self).closest('.kanban__box-wrapper').find('.kanban__title-indication').fadeIn(300).text(_kanbanBoxes.length);
    }
  }
  function _changeKanbanDateInDraggableBoxes(self) {
    var _boxesDateNode = $(self).find('[kanban-date-js]');

    var _boxContainer = $(self).closest('.kanban__box-row'),
        _boxContainerName = _boxContainer.attr('data-name');

    var _date = new Date(),
        _currentDate = _date.getDate() + '/' + _date.getMonth() + '/' + _date.getFullYear();

    var _tmpl = '';

    _boxesDateNode.removeClass('kanban__box-date--shortlisted kanban__box-date--hired kanban__box-date--offered kanban__box-date--assessment');

    if (_boxContainerName === 'received') {
      $('[kanban-received-js] [kanban-date-js]').hide();
    } else if (_boxContainerName === 'shortlisted') {
      $('[kanban-shortlisted-js] [kanban-date-js]').show().css({ 'display': 'flex' });
      _tmpl = "\n        <i class=\"icon-font icon-date\"></i>\n        <p>Shortlisted on <u>" + _currentDate + "</u></p>\n      ";
      _boxesDateNode.addClass('kanban__box-date--shortlisted').html(_tmpl);
    } else if (_boxContainerName === 'assessment') {
      $('[kanban-assessment-js] [kanban-date-js]').show().css({ 'display': 'flex' });
      _tmpl = "\n        <i class=\"icon-font icon-date\"></i>\n        <p>In assessment since <u>" + _currentDate + "</u></p>\n      ";
      _boxesDateNode.addClass('kanban__box-date--assessment').html(_tmpl);
    } else if (_boxContainerName === 'offer') {
      $('[kanban-offer-js] [kanban-date-js]').show().css({ 'display': 'flex' });
      _tmpl = "\n        <i class=\"icon-font icon-date\"></i>\n        <p>Job offered on <u>" + _currentDate + "</u></p>\n      ";
      _boxesDateNode.addClass('kanban__box-date--offered').html(_tmpl);
    } else if (_boxContainerName === 'hired') {
      $('[kanban-hired-js] [kanban-date-js]').show().css({ 'display': 'flex' });
      _tmpl = "\n        <i class=\"icon-font icon-calendar-check\"></i>\n        <p>Hired on <u>" + _currentDate + "</u></p>\n      ";
      _boxesDateNode.addClass('kanban__box-date--hired').html(_tmpl);
    }
  }

  var initSortable = function initSortable() {
    var _sortableAnswer = 0,
        _sortableItem = null,
        _sortableTo = null,
        _sortableFrom = null;

    var _sortableGuaranteeAnswer = 0,
        _sortableGuaranteeItem = null,
        _sortableGuaranteeToPositive = $('[kanban-hired-js]'),
        _sortableGuaranteeToNegative = $('[kanban-rejected-js]');

    $('[modal-btn-guarantee-js]').on('click', function (ev) {
      _sortableAnswer = 1;

      $('[popup-guarantee-js]').magnificPopup('close');
      $(_sortableItem).find('.kanban__box-guarantee').addClass('is-active');
    });

    $('[popup-guarantee-js]').magnificPopup({
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
        beforeClose: function beforeClose(ev) {
          if (_sortableAnswer === 0) {
            $(_sortableTo).find(_sortableItem).remove();
            $(_sortableItem).removeClass('kanban__box--guarantee').addClass('kanban__box--draggable');
            $(_sortableFrom).prepend(_sortableItem);

            _changeKanbanBoxesHeight(_sortableTo);
            _changeKanbanBoxesHeight(_sortableFrom);
          }
        },
        close: function close() {
          _changeKanbanBoxesHeight(_sortableTo);
          _changeKanbanBoxesHeight(_sortableFrom);

          _sortableAnswer = 0;
          _sortableItem = null;
          _sortableTo = null;
          _sortableFrom = null;
        }
      }
    });

    $('[popup-placementGuarantee-js]').magnificPopup({
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

          _sortableGuaranteeItem = $(this.st.el).closest('.kanban__box');
        }
      }
    });

    $('[popup-release-js]').on('click', function (ev) {
      $('[kanban-body-js]').find(_sortableGuaranteeItem).remove();

      _sortableGuaranteeToPositive.prepend(_sortableGuaranteeItem);

      _sortableGuaranteeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _sortableGuaranteeItem.find('.kanban__box-like').addClass('is-hide');

      _changeKanbanDateInDraggableBoxes(_sortableGuaranteeItem);

      _changeKanbanBoxesHeight($('.kanban--guarantee'));
      _changeKanbanBoxesHeight(_sortableGuaranteeToPositive);
    });

    $('[popup-terminate-js]').on('click', function (ev) {
      $('[kanban-body-js]').find(_sortableGuaranteeItem).remove();

      _sortableGuaranteeToNegative.prepend(_sortableGuaranteeItem);

      _sortableGuaranteeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _sortableGuaranteeItem.find('.kanban__box-like').removeClass('is-hide');

      var _itemDateNode = _sortableGuaranteeItem.find('.kanban__box-prefooter > div:nth-of-type(1)');

      var _date = new Date(),
          _currentDate = _date.getDate() + '/' + _date.getMonth() + '/' + _date.getFullYear();

      var _rejectedTmpl = "\n        <div class=\"kanban__box-date kanban__box-date--rejected\">\n          <i class=\"icon-font icon-calendar-check\"></i>\n          <p>Rejected on " + _currentDate + "</p>\n        </div>\n      ";
      var _reasonsTmpl = "\n        <div class=\"kanban__box-date kanban__box-date--relevant\">\n          <i class=\"icon-font icon-comment-delete\"></i>\n          <p>Reason Not relevant</p>\n        </div>\n      ";

      _itemDateNode.find('.kanban__box-date:nth-of-type(2)').remove();
      _itemDateNode.append(_rejectedTmpl);
      _itemDateNode.append(_reasonsTmpl);

      _changeKanbanBoxesHeight($('.kanban--guarantee'));

      if ($('[kanban-rejected-js] .kanban__box').length === 0) {
        $('.kanban__action-rejected-head p').fadeOut(250);
      } else {
        $('.kanban__action-rejected-head p').fadeIn(250).text($('[kanban-rejected-js] .kanban__box').length);
      }

      initRejectedThumbs();
    });

    var el = document.querySelectorAll('[sortable-box-js]');

    for (var i = 0; i < el.length; i++) {
      var sortable = Sortable.create(el[i], {
        group: 'shared',
        animation: 250,
        easing: "cubic-bezier(1, 0, 0, 1)",
        dragoverBubble: true,
        handle: ".kanban__box--draggable",
        onEnd: function onEnd(evt) {
          isDown = false;

          var itemEl = evt.item;

          _sortableItem = itemEl;
          _sortableTo = evt.to;
          _sortableFrom = evt.from;

          if (itemEl.closest('.kanban--guarantee')) {
            $('#btnStartPlacementGuarantee').click();

            $(itemEl).removeClass('kanban__box--draggable').addClass('kanban__box--guarantee');
          }

          _changeKanbanDateInDraggableBoxes(itemEl);

          _changeKanbanBoxesHeight(evt.to);
          _changeKanbanBoxesHeight(evt.from);
        }
      });
    }

    $(window).on('load resize', function () {
      var _kanbanBoxWrapper = $('.kanban__box-wrapper');

      for (var idx = 0; idx < _kanbanBoxWrapper.length; idx++) {
        var _kanbanBoxes = $('.kanban__box-wrapper-' + idx + ' .kanban__box'),
            _kanbanBoxesCover = $('.kanban__box-wrapper-' + idx + ' .kanban__box-overlay');

        var _kanbanBoxesSum = 0;

        for (var _i = 0; _i < _kanbanBoxes.length; _i++) {
          _kanbanBoxesSum += $(_kanbanBoxes[_i]).outerHeight(true);
        }

        _kanbanBoxesCover.css({
          'height': _kanbanBoxesSum
        });
      }
    });
  };

  var initKanbanDrop = function initKanbanDrop() {
    $('[dropdown-btn-js]').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _parentNode = _el.closest('[dropdown-js]'),
          _dropNode = _parentNode.find('[dropdown-contnet-js]');

      var _overlay = $('[overlay-js]');

      _dropNode.toggleClass('is-open');
      _overlay.toggleClass('is-show');
    });

    _document.on('keyup', function (ev) {
      if (ev.keyCode === 27) {
        $('[dropdown-contnet-js], .kanban__more').removeClass('is-open');
        $('[overlay-js]').removeClass('is-show');
      }
    });

    $('[overlay-js]').on('click', function (ev) {
      $('[dropdown-contnet-js], .kanban__more').removeClass('is-open');
      $('[overlay-js]').removeClass('is-show');
    });

    $('body').on('click', function (e) {
      if (!$(e.target).closest('[dropdown-btn-js], [dropdown-contnet-js], [dropdown-more-js], .kanban__more').length) {
        $('[dropdown-contnet-js], .kanban__more').removeClass('is-open');
        $('[overlay-js]').removeClass('is-show');
      }
    });
  };

  var initKanbanHeight = function initKanbanHeight() {
    $(window).on('resize load', function (ev) {
      if ($(window).width() > 767) {
        $('[kanban-body-js]').attr('style', 'height:calc(100vh - ' + ($('[kanban-head-js]').outerHeight(true) + $('header').outerHeight(true)) + 'px)');
      } else {
        $('[kanban-body-js]').attr('style', 'height:calc(100vh - 95px);');
      }
    });
  };

  var initModalMoreQuestion = function initModalMoreQuestion() {
    $('.c-modal__question-head').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _parent = _el.closest('.c-modal__question-wrapper');

      _parent.toggleClass('is-open');
      _parent.find('.c-modal__question-body').slideToggle(250);
    });
  };

  var initThumbs = function initThumbs() {
    $('.kanban__box-like').on('click', function (ev) {
      $('#kanbanThumbs .c-modal__radio').prop('checked', false).change();
      $('.c-modal__textarea-wrapper').hide();
      $('.c-modal__textarea-wrapper textarea').val('');
    });
  };

  var initThumbsOtherTextarea = function initThumbsOtherTextarea() {
    $('.c-modal__radio').on('change', function (ev) {
      $('.c-modal__textarea-wrapper').slideUp(250);
      $('.c-modal__textarea-wrapper textarea').val('');
    });

    $('.c-modal__radio-textarea').on('change', function (ev) {
      if ($(ev.currentTarget).is(':checked')) {
        $('.c-modal__textarea-wrapper').slideDown(250).css({
          'display': 'flex'
        });
      }
    });
  };

  var initRejectedThumbs = function initRejectedThumbs() {
    $('[kanban-rejected-js] .kanban__box-like').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _parentNode = _el.closest('.kanban__box');

      _parentNode.removeClass('kanban__box--guarantee').addClass('kanban__box--draggable');

      _parentNode.find('.kanban__box-like').attr('popup-js', '').attr('data-effect', 'mfp-zoom-in').attr('data-mfp-src', '#kanbanThumbs');

      $('[kanban-shortlisted-js]').prepend(_parentNode);

      _changeKanbanBoxesHeight($('[kanban-shortlisted-js]'));

      if ($('[kanban-rejected-js] .kanban__box').length === 0) {
        $('.kanban__action-rejected-head p').fadeOut(250);
      } else {
        $('.kanban__action-rejected-head p').fadeIn(250).text($('[kanban-rejected-js] .kanban__box').length);
      }

      _parentNode.find('.kanban__box-date--rejected, .kanban__box-date--relevant').remove();

      var _itemDateNode = _parentNode.find('.kanban__box-prefooter > div:nth-of-type(1)');

      var _date = new Date(),
          _currentDate = _date.getDate() + '/' + _date.getMonth() + '/' + _date.getFullYear();

      var _tmpl = "\n        <div class=\"kanban__box-date kanban__box-date--shortlisted\" kanban-date-js>\n          <i class=\"icon-font icon-date\"></i>\n          <p>Shortlisted on <u>" + _currentDate + "</u></p>\n        </div>\n      ";

      _itemDateNode.find('.kanban__box-date:nth-of-type(2)').remove();
      _itemDateNode.prepend(_tmpl);

      initPopups();
    });
  };

  var initThumbsSend = function initThumbsSend() {
    var _dislikeItem = null,
        _dislikeTo = $('[kanban-rejected-js]'),
        _dislikeFrom = null,
        _dislikeAnswer = null;

    $('[popup-dislike-js]').magnificPopup({
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
        }
      }
    });

    $('.kanban__box-like').on('click', function (ev) {
      _dislikeItem = $(ev.currentTarget).closest('.kanban__box');
      _dislikeFrom = $(ev.currentTarget).closest('.kanban__box-row');
    });

    $('.c-modal__radio').on('change', function (ev) {
      if ($(ev.currentTarget).is(':checked')) {

        _dislikeAnswer = $(ev.currentTarget).val();
      }
    });

    $('[kanban-thumbs-js]').on('click', function (ev) {
      if (_dislikeAnswer === 'Other') {
        _dislikeAnswer = $('.c-modal__textarea-wrapper textarea').val();
      }

      $('[kanban-body-js]').find(_dislikeItem).remove();

      _dislikeTo.prepend(_dislikeItem);

      _dislikeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _dislikeItem.find('.kanban__box-like').removeClass('is-hide');

      var _itemDateNode = _dislikeItem.find('.kanban__box-prefooter > div:nth-of-type(1)');

      var _date = new Date(),
          _currentDate = _date.getDate() + '/' + _date.getMonth() + '/' + _date.getFullYear();

      var _rejectedTmpl = "\n        <div class=\"kanban__box-date kanban__box-date--rejected\">\n          <i class=\"icon-font icon-calendar-check\"></i>\n          <p>Rejected on " + _currentDate + "</p>\n        </div>\n      ";
      var _reasonsTmpl = "\n        <div class=\"kanban__box-date kanban__box-date--relevant\">\n          <i class=\"icon-font icon-comment-delete\"></i>\n          <p>" + _dislikeAnswer + "</p>\n        </div>\n      ";

      _itemDateNode.find('.kanban__box-date:nth-of-type(2)').remove();
      _itemDateNode.append(_rejectedTmpl);
      _itemDateNode.append(_reasonsTmpl);

      _changeKanbanBoxesHeight(_dislikeFrom);

      if ($('[kanban-rejected-js] .kanban__box').length === 0) {
        $('.kanban__action-rejected-head p').fadeOut(250);
      } else {
        $('.kanban__action-rejected-head p').fadeIn(250).text($('[kanban-rejected-js] .kanban__box').length);
      }

      initRejectedThumbs();
      $('[ popup-js]').magnificPopup('close');
    });
  };

  var initKanbanLeaveComment = function initKanbanLeaveComment() {
    $('[kanban-comment-js]').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _parentNode = _el.closest('.kanban__box-row');

      _el.hide();
      _el.siblings('[kanban-commentForm-js]').slideDown(250);

      setTimeout(function () {
        _changeKanbanBoxesHeight(_parentNode);
      }, 250);
    });

    $('[kanban-commentForm-js] button').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _parentNode = _el.closest('.kanban__box-row');

      _el.closest('[kanban-commentForm-js]').hide();
      _el.closest('.kanban__box-comment').find('[kanban-comment-js]').text(_el.prev('textarea').val()).fadeIn();

      setTimeout(function () {
        _changeKanbanBoxesHeight(_parentNode);
      }, 250);
    });
  };

  var initKanbanDragScroll = function initKanbanDragScroll() {
    var slider = document.querySelector('[kanban-body-js]');
    var startX = void 0;
    var scrollLeft = void 0;

    if (!slider) {
      return;
    }

    $('.kanban__box').hover(function (ev) {
      isDown = false;
    }, function (ev) {});
    slider.addEventListener('mousedown', function (e) {
      if ($(ev.target).closest('.kanban__box').length === 0) {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      }
    });
    slider.addEventListener('mouseleave', function () {
      if ($(ev.target).closest('.kanban__box').length === 0) {
        isDown = false;
      }
    });
    slider.addEventListener('mouseup', function () {
      if ($(ev.target).closest('.kanban__box').length === 0) {
        isDown = false;
      }
    });
    slider.addEventListener('mousemove', function (e) {
      if ($(ev.target).closest('.kanban__box').length === 0) {
        if (!isDown) return;
        var x = e.pageX - slider.offsetLeft;
        var walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
      }
    });
  };

  var initInnerPageLogic = function initInnerPageLogic() {
    $('[inner-action-js]').on('click', function (ev) {
      $('[inner-info-js]').fadeIn(400).addClass('is-show').css({ 'display': 'flex' });

      _document.on('keyup', function (ev) {
        if (ev.keyCode === 27) {
          $('[inner-info-js]').fadeOut(350).removeClass('is-show');
        }
      });
      $('[inner-info-js]').on('click', function (ev) {
        if ($(ev.target).closest('.innerSection__info-block').length) {
          return;
        }

        $('[inner-info-js]').fadeOut(350).removeClass('is-show');
      });
    });
  };

  var initBoardCard = function initBoardCard() {
    function isAnyPartOfElementInViewport(el) {
      var rect = el.getBoundingClientRect();

      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth;
      var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
      var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

      return vertInView && horInView;
    }

    var _pagination = $('#board-pagination');

    $('.board-card__block').on('click', function () {
      if ($('.board-details--hidden').length) {
        $('.board-details--hidden').fadeOut(450).fadeIn(450);
        $('#board-how').hide();

        if ($(window).width() < 1024) {
          var _elIDOffsetTop = $('#board-details').offset().top + 2;

          $('body, html').animate({
            scrollTop: _elIDOffsetTop
          }, 750);
        }
      }
    });

    $(window).on('load resize scroll', function () {
      if ($('.p-board').length && $(window).width() > 1023) {
        var spaceBelow = $(window).height() - $('#board-pagination')[0].getBoundingClientRect().bottom;

        $('.board__wrapper-right').css({
          height: $('.board__wrapper-left').outerHeight(true)
        });

        $('.board-details').css({
          height: $(window).outerHeight(true)
        });

        if (_pagination.length > 0 && isAnyPartOfElementInViewport(_pagination[0])) {
          if (spaceBelow > 0) {
            $('.board-details').css({
              height: $(window).outerHeight(true) - spaceBelow
            });
          }
        }
      } else {
        $('.board__wrapper-right, .board-details').css({
          height: 'auto'
        });
      }
    });
  };
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
    initSmoothScroll();
    initPopups();
    initStellar();
    initViewPortChecker();
    initSwiper();
    // ==========================================

    // callback
    initModalJobDetail();
    initSortable();
    initKanbanDrop();
    initKanbanHeight();
    initModalMoreQuestion();
    initThumbsOtherTextarea();
    initThumbs();
    initThumbsSend();
    initRejectedThumbs();
    initKanbanLeaveComment();
    initKanbanDragScroll();
    initInnerPageLogic();
    initBoardCard();
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