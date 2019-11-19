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
      _tmpl = "\n        <i class=\"icon-font icon-date\"></i>  \n        <p>Job offered on <u>" + _currentDate + "</u></p>             \n      ";
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

      _sortableGuaranteeToPositive.append(_sortableGuaranteeItem);

      _sortableGuaranteeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _sortableGuaranteeItem.find('.kanban__box-like').addClass('is-hide');

      _changeKanbanDateInDraggableBoxes(_sortableGuaranteeItem);

      _changeKanbanBoxesHeight($('.kanban--guarantee'));
      _changeKanbanBoxesHeight(_sortableGuaranteeToPositive);
    });

    $('[popup-terminate-js]').on('click', function (ev) {
      $('[kanban-body-js]').find(_sortableGuaranteeItem).remove();

      _sortableGuaranteeToNegative.append(_sortableGuaranteeItem);

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

  var initCustomScrollbar = function initCustomScrollbar() {
    $('.kanban__wrapper-body, .kanban__box-cover').overlayScrollbars({});
  };

  var initKanbanHeight = function initKanbanHeight() {
    $(window).on('resize load', function (ev) {
      if ($(window).width() > 767) {
        $('[kanban-body-js]').attr('style', 'height:calc(100vh - ' + ($('[kanban-head-js]').outerHeight(true) + $('header').outerHeight(true)) + 'px)');
      } else {
        $('[kanban-body-js]').attr('style', 'height:auto;');
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
    });
  };

  var initThumbsOtherTextarea = function initThumbsOtherTextarea() {
    $('.c-modal__radio').on('change', function (ev) {
      $('.c-modal__textarea-wrapper').slideUp(250);
    });
    $('.c-modal__radio-textarea').on('change', function (ev) {
      if ($(ev.currentTarget).is(':checked')) {
        $('.c-modal__textarea-wrapper').slideDown(250);
      }
    });
  };

  var initRejectedThumbs = function initRejectedThumbs() {
    $('[kanban-rejected-js] .kanban__box-like').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _parentNode = _el.closest('.kanban__box');

      _parentNode.removeClass('kanban__box--guarantee').addClass('kanban__box--draggable');

      _parentNode.find('.kanban__box-like').attr('popup-js', '').attr('data-effect', 'mfp-zoom-in').attr('data-mfp-src', '#kanbanThumbs');

      $('[kanban-shortlisted-js]').append(_parentNode);

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
      _itemDateNode.append(_tmpl);

      initPopups();
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
    // ==========================================

    // callback
    initModalJobDetail();
    initSortable();
    initKanbanDrop();
    initCustomScrollbar();
    initKanbanHeight();
    initModalMoreQuestion();
    initThumbsOtherTextarea();
    initThumbs();
    initRejectedThumbs();
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