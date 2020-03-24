

/**
 * @description Document DOM ready.
 */
$(document).ready((ev) => {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  const _document = $(document),
    _window = $(window);

  let isDown = false;


	/*
	* =============================================
	* CALLBACK :: start
	* ============================================= */
  const initModalJobDetail = () => {
    const _countToOption = (fromVal, toVal) => {
      return {
        from: fromVal,
        to: toVal,
        speed: 750,
        formatter: function (value, options) {
          value = value.toFixed(options.decimals);
          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
        }
      }
    };

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    $('#jobDetail .c-modal__radio').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _elID = _el.attr('data-id');

      $('.c-modal__radio').removeClass('is-active');
      _el.addClass('is-active');

      if(_elID === '1') {
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

    $('.c-modal__optional-head').on('click', (ev) => {
      const _parentNode = $('.c-modal__optional');

      if(_parentNode.hasClass('is-open')) {
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

    $('[inputfile-js]').on('change', (ev) => {
      let _valNode = $(ev.currentTarget).prev('p');

      _valNode.find('span').text(ev.currentTarget.value.split('\\').pop());
    });

    $('input[type=range]').on('input', function (e) {
      let min = e.target.min,
        max = e.target.max,
        val = e.target.value;

      if($(e.currentTarget).closest('.c-modal__range').find('.c-modal__range-sum').length) {
        $(e.currentTarget).closest('.c-modal__range').find('.c-modal__range-sum').val(numberWithCommas(val));
      } else {
        $(e.currentTarget).closest('.c-modal__range').find('.c-modal__range-result').val(val);
      }

      $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
      });
    }).trigger('input');

    $('.c-modal__range-result').on('keyup', (ev) => {
      const _val = $(ev.currentTarget).val();

      if(_val <= 0) {
        $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]').val(1).trigger('input');
      } else if (_val > 30) {
        $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]').val(30).trigger('input');
      } else {
        $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]').val($(ev.currentTarget).val()).trigger('input');
      }

    });

    $('.c-modal__range-sum').on('blur keyup', (ev) => {
      const _val = $(ev.currentTarget).val().replace(/,/g, ''),
        _newVal = Math.round(parseInt(_val).toFixed(0) / 500) * 500,
        _range = $(ev.currentTarget).closest('.c-modal__range').find('input[type=range]');

      const _helperInputVal = (_v) => {
        if(_v <= 0) {
          _range.val(1).trigger('input');
        } else if (_v > 100000) {
          _range.val(numberWithCommas(100000)).trigger('input');
        } else {
          _range.val(_v).trigger('input');
        }
      };

      if(ev.keyCode === 13 || ev.type === 'blur') {
        _helperInputVal(_newVal);
      }
    });
  };

  function _changeKanbanBoxesHeight(self)  {
    const _kanbanBoxes = $(self).find('.kanban__box'),
      _kanbanBoxesCover = $(self).find('.kanban__box-overlay');

    let _kanbanBoxesSum = 0;

    for(let i = 0; i < _kanbanBoxes.length; i++) {
      _kanbanBoxesSum += $(_kanbanBoxes[i]).outerHeight(true);
    }

    _kanbanBoxesCover.css({
      'height' : _kanbanBoxesSum
    });

    // change title indication
    if(_kanbanBoxes.length === 0) {
      $(self).closest('.kanban__box-wrapper').find('.kanban__title-indication').fadeOut(300);
    } else {
      $(self).closest('.kanban__box-wrapper').find('.kanban__title-indication').fadeIn(300).text(_kanbanBoxes.length);
    }
  }
  function _changeKanbanDateInDraggableBoxes(self) {
    const _boxesDateNode = $(self).find('[kanban-date-js]');

    const _boxContainer = $(self).closest('.kanban__box-row'),
      _boxContainerName = _boxContainer.attr('data-name');

    const _date = new Date(),
      _currentDate = _date.getDate() + '/' +  _date.getMonth() + '/' +  _date.getFullYear();

    let _tmpl = '';

    _boxesDateNode.removeClass('kanban__box-date--shortlisted kanban__box-date--hired kanban__box-date--offered kanban__box-date--assessment')

    if(_boxContainerName === 'received') {
      $('[kanban-received-js] [kanban-date-js]').hide();
    } else if(_boxContainerName === 'shortlisted') {
      $('[kanban-shortlisted-js] [kanban-date-js]').show().css({'display':'flex'});
      _tmpl = `
        <i class="icon-font icon-date"></i>
        <p>Shortlisted on <u>${_currentDate}</u></p>
      `;
      _boxesDateNode.addClass('kanban__box-date--shortlisted').html(_tmpl);
    } else if(_boxContainerName === 'assessment') {
      $('[kanban-assessment-js] [kanban-date-js]').show().css({'display':'flex'});
      _tmpl = `
        <i class="icon-font icon-date"></i>
        <p>In assessment since <u>${_currentDate}</u></p>
      `;
      _boxesDateNode.addClass('kanban__box-date--assessment').html(_tmpl);
    } else if(_boxContainerName === 'offer') {
      $('[kanban-offer-js] [kanban-date-js]').show().css({'display':'flex'});
      _tmpl = `
        <i class="icon-font icon-date"></i>
        <p>Job offered on <u>${_currentDate}</u></p>
      `;
      _boxesDateNode.addClass('kanban__box-date--offered').html(_tmpl);
    } else if(_boxContainerName === 'hired') {
      $('[kanban-hired-js] [kanban-date-js]').show().css({'display':'flex'});
      _tmpl = `
        <i class="icon-font icon-calendar-check"></i>
        <p>Hired on <u>${_currentDate}</u></p>
      `;
      _boxesDateNode.addClass('kanban__box-date--hired').html(_tmpl);
    }
  }

  const initSortable = () => {
    let _sortableAnswer = 0,
      _sortableItem = null,
      _sortableTo = null,
      _sortableFrom = null;

    let _sortableGuaranteeAnswer = 0,
      _sortableGuaranteeItem = null,
      _sortableGuaranteeToPositive = $('[kanban-hired-js]'),
      _sortableGuaranteeToNegative = $('[kanban-rejected-js]');

    $('[modal-btn-guarantee-js]').on('click', (ev) => {
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
        beforeOpen: function() {
          this.st.mainClass = this.st.el.attr('data-effect');
        },
        beforeClose: function(ev) {
          if(_sortableAnswer === 0) {
            $(_sortableTo).find(_sortableItem).remove();
            $(_sortableItem).removeClass('kanban__box--guarantee').addClass('kanban__box--draggable');
            $(_sortableFrom).prepend(_sortableItem);

            _changeKanbanBoxesHeight(_sortableTo);
            _changeKanbanBoxesHeight(_sortableFrom);
          }
        },
        close: function () {
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
        beforeOpen: function() {
          this.st.mainClass = this.st.el.attr('data-effect');

          _sortableGuaranteeItem = $(this.st.el).closest('.kanban__box');
        }
      }
    });

    $('[popup-release-js]').on('click', (ev) => {
      $('[kanban-body-js]').find(_sortableGuaranteeItem).remove();

      _sortableGuaranteeToPositive.prepend(_sortableGuaranteeItem);

      _sortableGuaranteeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _sortableGuaranteeItem.find('.kanban__box-like').addClass('is-hide');

      _changeKanbanDateInDraggableBoxes(_sortableGuaranteeItem);

      _changeKanbanBoxesHeight($('.kanban--guarantee'));
      _changeKanbanBoxesHeight(_sortableGuaranteeToPositive);
    });

    $('[popup-terminate-js]').on('click', (ev) => {
      $('[kanban-body-js]').find(_sortableGuaranteeItem).remove();

      _sortableGuaranteeToNegative.prepend(_sortableGuaranteeItem);

      _sortableGuaranteeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _sortableGuaranteeItem.find('.kanban__box-like').removeClass('is-hide');

      const _itemDateNode = _sortableGuaranteeItem.find('.kanban__box-prefooter > div:nth-of-type(1)');

      const _date = new Date(),
        _currentDate = _date.getDate() + '/' +  _date.getMonth() + '/' +  _date.getFullYear();

      const _rejectedTmpl = `
        <div class="kanban__box-date kanban__box-date--rejected">
          <i class="icon-font icon-calendar-check"></i>
          <p>Rejected on ${_currentDate}</p>
        </div>
      `;
      const _reasonsTmpl = `
        <div class="kanban__box-date kanban__box-date--relevant">
          <i class="icon-font icon-comment-delete"></i>
          <p>Reason Not relevant</p>
        </div>
      `;

      _itemDateNode.find('.kanban__box-date:nth-of-type(2)').remove();
      _itemDateNode.append(_rejectedTmpl);
      _itemDateNode.append(_reasonsTmpl);

      _changeKanbanBoxesHeight($('.kanban--guarantee'));

      if($('[kanban-rejected-js] .kanban__box').length === 0) {
        $('.kanban__action-rejected-head p').fadeOut(250);
      } else {
        $('.kanban__action-rejected-head p').fadeIn(250).text($('[kanban-rejected-js] .kanban__box').length);
      }

      initRejectedThumbs();
    });

    var el = document.querySelectorAll('[sortable-box-js]');

    for(let i = 0; i < el.length; i++) {
      var sortable = Sortable.create(el[i], {
        group: 'shared',
        animation: 250,
        easing: "cubic-bezier(1, 0, 0, 1)",
        dragoverBubble: true,
        handle: ".kanban__box--draggable",
        onEnd: function (evt) {
          isDown = false;

          const itemEl = evt.item;

          _sortableItem = itemEl;
          _sortableTo = evt.to;
          _sortableFrom = evt.from;

          if(itemEl.closest('.kanban--guarantee')) {
            $('#btnStartPlacementGuarantee').click();

            $(itemEl)
              .removeClass('kanban__box--draggable')
              .addClass('kanban__box--guarantee')
          }

          _changeKanbanDateInDraggableBoxes(itemEl);

          _changeKanbanBoxesHeight(evt.to);
          _changeKanbanBoxesHeight(evt.from);
        }
      });
    }

    $(window).on('load resize', () => {
      const _kanbanBoxWrapper = $('.kanban__box-wrapper');

      for(let idx = 0; idx < _kanbanBoxWrapper.length; idx++) {
        const _kanbanBoxes = $('.kanban__box-wrapper-' + idx + ' .kanban__box'),
          _kanbanBoxesCover = $('.kanban__box-wrapper-' + idx + ' .kanban__box-overlay');

        let _kanbanBoxesSum = 0;

        for(let i = 0; i < _kanbanBoxes.length; i++) {
          _kanbanBoxesSum += $(_kanbanBoxes[i]).outerHeight(true);
        }

        _kanbanBoxesCover.css({
          'height' : _kanbanBoxesSum
        });
      }
    });
  };

  const initKanbanDrop = () => {
    $('[dropdown-btn-js]').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _parentNode = _el.closest('[dropdown-js]'),
        _dropNode = _parentNode.find('[dropdown-contnet-js]');

      const _overlay = $('[overlay-js]');

      _dropNode.toggleClass('is-open');
      _overlay.toggleClass('is-show');
    });

    _document.on('keyup', (ev) => {
      if (ev.keyCode === 27) {
        $('[dropdown-contnet-js], .kanban__more').removeClass('is-open');
        $('[overlay-js]').removeClass('is-show');
      }
    });

    $('[overlay-js]').on('click', (ev) => {
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

  const initKanbanHeight = () => {
    $(window).on('resize load', (ev) => {
      if($(window).width() > 767) {
        $('[kanban-body-js]').attr('style', 'height:calc(100vh - ' + ($('[kanban-head-js]').outerHeight(true) + $('header').outerHeight(true)) + 'px)');
      } else {
        $('[kanban-body-js]').attr('style', 'height:calc(100vh - 95px);');
      }
    });
  };

  const initModalMoreQuestion = () => {
    $('.c-modal__question-head').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _parent = _el.closest('.c-modal__question-wrapper');

      _parent.toggleClass('is-open');
      _parent.find('.c-modal__question-body').slideToggle(250);
    });
  };

  const initThumbs = () => {
    $('.kanban__box-like').on('click', (ev) => {
      $('#kanbanThumbs .c-modal__radio').prop('checked', false).change();
      $('.c-modal__textarea-wrapper').hide();
      $('.c-modal__textarea-wrapper textarea').val('');
    });
  };

  const initThumbsOtherTextarea = () => {
    $('.c-modal__radio').on('change', (ev) => {
      $('.c-modal__textarea-wrapper').slideUp(250);
      $('.c-modal__textarea-wrapper textarea').val('');
    });

    $('.c-modal__radio-textarea').on('change', (ev) => {
      if($(ev.currentTarget).is(':checked')) {
        $('.c-modal__textarea-wrapper').slideDown(250).css({
          'display': 'flex'
        });
      }
    })
  };

  const initRejectedThumbs = () => {
    $('[kanban-rejected-js] .kanban__box-like').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _parentNode = _el.closest('.kanban__box');

      _parentNode.removeClass('kanban__box--guarantee').addClass('kanban__box--draggable');

      _parentNode.find('.kanban__box-like')
        .attr('popup-js', '')
        .attr('data-effect', 'mfp-zoom-in')
        .attr('data-mfp-src', '#kanbanThumbs');

      $('[kanban-shortlisted-js]').prepend(_parentNode);

      _changeKanbanBoxesHeight($('[kanban-shortlisted-js]'));

      if($('[kanban-rejected-js] .kanban__box').length === 0) {
        $('.kanban__action-rejected-head p').fadeOut(250);
      } else {
        $('.kanban__action-rejected-head p').fadeIn(250).text($('[kanban-rejected-js] .kanban__box').length);
      }

      _parentNode.find('.kanban__box-date--rejected, .kanban__box-date--relevant').remove();

      const _itemDateNode = _parentNode.find('.kanban__box-prefooter > div:nth-of-type(1)');

      const _date = new Date(),
        _currentDate = _date.getDate() + '/' +  _date.getMonth() + '/' +  _date.getFullYear();

      const _tmpl = `
        <div class="kanban__box-date kanban__box-date--shortlisted" kanban-date-js>
          <i class="icon-font icon-date"></i>
          <p>Shortlisted on <u>${_currentDate}</u></p>
        </div>
      `;

      _itemDateNode.find('.kanban__box-date:nth-of-type(2)').remove();
      _itemDateNode.prepend(_tmpl);

      initPopups();
    });
  };

  const initThumbsSend = () => {
    let _dislikeItem = null,
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
        beforeOpen: function() {
          this.st.mainClass = this.st.el.attr('data-effect');
        }
      }
    });

    $('.kanban__box-like').on('click', (ev) => {
      _dislikeItem = $(ev.currentTarget).closest('.kanban__box');
      _dislikeFrom = $(ev.currentTarget).closest('.kanban__box-row');
    });

    $('.c-modal__radio').on('change', (ev) => {
      if($(ev.currentTarget).is(':checked')) {

        _dislikeAnswer = $(ev.currentTarget).val();
      }
    });

    $('[kanban-thumbs-js]').on('click', (ev) => {
      if(_dislikeAnswer === 'Other') {
        _dislikeAnswer = $('.c-modal__textarea-wrapper textarea').val();
      }

      $('[kanban-body-js]').find(_dislikeItem).remove();

      _dislikeTo.prepend(_dislikeItem);

      _dislikeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _dislikeItem.find('.kanban__box-like').removeClass('is-hide');

      const _itemDateNode = _dislikeItem.find('.kanban__box-prefooter > div:nth-of-type(1)');

      const _date = new Date(),
        _currentDate = _date.getDate() + '/' +  _date.getMonth() + '/' +  _date.getFullYear();

      const _rejectedTmpl = `
        <div class="kanban__box-date kanban__box-date--rejected">
          <i class="icon-font icon-calendar-check"></i>
          <p>Rejected on ${_currentDate}</p>
        </div>
      `;
      const _reasonsTmpl = `
        <div class="kanban__box-date kanban__box-date--relevant">
          <i class="icon-font icon-comment-delete"></i>
          <p>${_dislikeAnswer}</p>
        </div>
      `;

      _itemDateNode.find('.kanban__box-date:nth-of-type(2)').remove();
      _itemDateNode.append(_rejectedTmpl);
      _itemDateNode.append(_reasonsTmpl);

      _changeKanbanBoxesHeight(_dislikeFrom);

      if($('[kanban-rejected-js] .kanban__box').length === 0) {
        $('.kanban__action-rejected-head p').fadeOut(250);
      } else {
        $('.kanban__action-rejected-head p').fadeIn(250).text($('[kanban-rejected-js] .kanban__box').length);
      }

      initRejectedThumbs();
      $('[ popup-js]').magnificPopup('close');
    });
  };

  const initKanbanLeaveComment = () => {
    $('[kanban-comment-js]').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _parentNode = _el.closest('.kanban__box-row');

      _el.hide();
      _el.siblings('[kanban-commentForm-js]').slideDown(250);

      setTimeout(() => {
        _changeKanbanBoxesHeight(_parentNode);
      }, 250);
    });

    $('[kanban-commentForm-js] button').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _parentNode = _el.closest('.kanban__box-row');

      _el.closest('[kanban-commentForm-js]').hide();
      _el.closest('.kanban__box-comment').find('[kanban-comment-js]').text(_el.prev('textarea').val()).fadeIn();

      setTimeout(() => {
        _changeKanbanBoxesHeight(_parentNode);
      }, 250);
    });
  };

  const initKanbanDragScroll = () => {
    const slider = document.querySelector('[kanban-body-js]');
    let startX;
    let scrollLeft;

    if(!slider) {
      return;
    }

    $('.kanban__box').hover(
      (ev) => { isDown = false; }, (ev) => {}
    );
    slider.addEventListener('mousedown', (e) => {
      if($(ev.target).closest('.kanban__box').length === 0) {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      }
    });
    slider.addEventListener('mouseleave', () => {
      if($(ev.target).closest('.kanban__box').length === 0) {
        isDown = false;
      }
    });
    slider.addEventListener('mouseup', () => {
      if($(ev.target).closest('.kanban__box').length === 0) {
        isDown = false;
      }
    });
    slider.addEventListener('mousemove', (e) => {
      if($(ev.target).closest('.kanban__box').length === 0) {
        if(!isDown) return;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
      }
    });
  };

  const initInnerPageLogic = () => {
    $('[inner-action-js]').on('click', (ev) => {
      $('[inner-info-js]').fadeIn(400).addClass('is-show').css({'display':'flex'});

      _document.on('keyup', (ev) => {
        if (ev.keyCode === 27) {
          $('[inner-info-js]').fadeOut(350).removeClass('is-show');
        }
      });
      $('[inner-info-js]').on('click', (ev) => {
        if($(ev.target).closest('.innerSection__info-block').length) {
          return;
        }

        $('[inner-info-js]').fadeOut(350).removeClass('is-show');
      });
    });
  };

  const initBoardCard = () => {
    function isAnyPartOfElementInViewport(el) {
      const rect = el.getBoundingClientRect();

      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
      const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
      const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
      const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

      return (vertInView && horInView);
    }
    function scrollToTop(){
      document.querySelector('[board-scroll-parent-js]').scrollTop = 0;
    }
    function stickyDetailsBlock() {
      let _bottomElem = null;

      if(_pagination.length) {
        _bottomElem = _pagination;
      } else {
        _bottomElem = $('.board-card__block-wrapper > div:last-of-type');
      }

      const _boardDetailsHeight = $('[board-details-js]').height(),
        _boardCardParentHeight = $('[board-card-parent-js]').height();

      let spaceBelowTop = window.innerHeight - $('.board-details--hidden')[0].getBoundingClientRect().top,
        spaceBelowBottom = window.innerHeight - (window.innerHeight - _bottomElem[0].getBoundingClientRect().top);

      if(_boardDetailsHeight > _boardCardParentHeight) {
        if($('.board-details--hidden')[0].getBoundingClientRect().top > 0) {
          $('.board-details').css({
            height: spaceBelowTop
          });
        }
      } else {
        if($('.board-details--hidden')[0].getBoundingClientRect().top === 0 && !isAnyPartOfElementInViewport(_bottomElem[0])) {
          $('.board-details').css({
            height: window.innerHeight
          });
        } else if($('.board-details--hidden')[0].getBoundingClientRect().top > 0) {
          $('.board-details').css({
            height: spaceBelowTop
          });
        } else if (isAnyPartOfElementInViewport(_bottomElem[0])) {
          $('.board-details').css({
            height: spaceBelowBottom + _bottomElem.outerHeight(true)
          });
        }
      }
    }

    const _pagination = $('#board-pagination');

    $('.board-card__block').on('click', () => {
      if($('.board-details--hidden').length) {
        $('.board-details--hidden').fadeOut(450).fadeIn(450);
        $('#board-how').hide();

        scrollToTop();
        stickyDetailsBlock();

        if($(window).width() < 1024) {
          let _elIDOffsetTop = $('#board-details').offset().top + 2;

          $('body, html').animate({
            scrollTop: _elIDOffsetTop
          }, 750);
        }
      }
    });

    $(window).on('scroll resize', () => {
      if($('.p-board').length && $(window).width() > 1023) {

        stickyDetailsBlock();

      } else {
        $('.board__wrapper-right, .board-details').css({
          height: 'auto'
        });
      }
    });
  };

  const initRetouchPricing = () => {
    const obj = {
      1: {
        'input': '2,000',
        'recommended': '1,000',
        'agencyLow': '2,000',
        'agencyHigh': '4,800',
        'costFrom': '1,000',
        'costTo': '3,800',
      },
      2: {
        'input': '3,000',
        'recommended': '1,000',
        'agencyLow': '3,000',
        'agencyHigh': '7,200',
        'costFrom': '2,000',
        'costTo': '6,200',
      },
      3: {
        'input': '4,000',
        'recommended': '1,000',
        'agencyLow': '4,000',
        'agencyHigh': '9,600',
        'costFrom': '3,000',
        'costTo': '8,600',
      },
      4: {
        'input': '5,000',
        'recommended': '2,000',
        'agencyLow': '5,000',
        'agencyHigh': '12,000',
        'costFrom': '3,000',
        'costTo': '10,000',
      },
      5: {
        'input': '6,000',
        'recommended': '2,000',
        'agencyLow': '6,000',
        'agencyHigh': '14,400',
        'costFrom': '4,000',
        'costTo': '12,400',
      },
      6: {
        'input': '7,000',
        'recommended': '2,000',
        'agencyLow': '7,000',
        'agencyHigh': '16,800',
        'costFrom': '5,000',
        'costTo': '14,800',
      },
      7: {
        'input': '8,000',
        'recommended': '2,000',
        'agencyLow': '8,000',
        'agencyHigh': '19,200',
        'costFrom': '6,000',
        'costTo': '17,200',
      },
      8: {
        'input': '9,000',
        'recommended': '4,000',
        'agencyLow': '9,000',
        'agencyHigh': '21,600',
        'costFrom': '5,000',
        'costTo': '17,600',
      },
      9: {
        'input': '10,000',
        'recommended': '4,000',
        'agencyLow': '10,000',
        'agencyHigh': '24,000',
        'costFrom': '6,000',
        'costTo': '20,000',
      },
      10: {
        'input': '11,000',
        'recommended': '4,000',
        'agencyLow': '11,000',
        'agencyHigh': '26,400',
        'costFrom': '7,000',
        'costTo': '22,400',
      },
      11: {
        'input': '12,000',
        'recommended': '4,000',
        'agencyLow': '12,000',
        'agencyHigh': '28,800',
        'costFrom': '8,000',
        'costTo': '24,800',
      },
      12: {
        'input': '13,000',
        'recommended': '4,000',
        'agencyLow': '12,900',
        'agencyHigh': '31,200',
        'costFrom': '8,900',
        'costTo': '27,200',
      },
      13: {
        'input': '14,000',
        'recommended': '6,000',
        'agencyLow': '13,900',
        'agencyHigh': '33,600',
        'costFrom': '7,900',
        'costTo': '27,600',
      },
      14: {
        'input': '15,000',
        'recommended': '6,000',
        'agencyLow': '14,900',
        'agencyHigh': '36,000',
        'costFrom': '8,900',
        'costTo': '30,000',
      },
      15: {
        'input': '16,000',
        'recommended': '6,000',
        'agencyLow': '15,900',
        'agencyHigh': '38,400',
        'costFrom': '9,900',
        'costTo': '32,400',
      },
      16: {
        'input': '17,000',
        'recommended': '6,000',
        'agencyLow': '16,900',
        'agencyHigh': '40,800',
        'costFrom': '10,900',
        'costTo': '34,800',
      },
      17: {
        'input': '18,000',
        'recommended': '6,000',
        'agencyLow': '17,900',
        'agencyHigh': '43,200',
        'costFrom': '11,900',
        'costTo': '37,200',
      },
      18: {
        'input': '19,000',
        'recommended': '6,000',
        'agencyLow': '18,900',
        'agencyHigh': '45,600',
        'costFrom': '12,900',
        'costTo': '39,600',
      },
      19: {
        'input': '20,000',
        'recommended': '6,000',
        'agencyLow': '19,900',
        'agencyHigh': '48,000',
        'costFrom': '13,900',
        'costTo': '42,000',
      },
    },
      minCountNum = 1,
      maxCountNum = 19;

    let _count = 1;

    const _elInput = $('[pricing-input-js]'),
      _elRecommended = $('[pricing-ref-js]'),
      _elAgencyLow = $('[pricing-agen-from-js]'),
      _elAgencyHigh = $('[pricing-agen-to-js]'),
      _elCostFrom = $('[pricing-from-js]'),
      _elCostTo = $('[pricing-to-js]');

    const _helperPrintText = (_num) => {
      _elInput.html(obj[_num].input);
      _elRecommended.html(obj[_num].recommended);
      _elAgencyLow.html(obj[_num].agencyLow);
      _elAgencyHigh.html(obj[_num].agencyHigh);
      _elCostFrom.html(obj[_num].costFrom);
      _elCostTo.html(obj[_num].costTo);
    };

    $('[pricing-btn-down-js]').on('click', (ev) => {
      _count--;

      if(_count <= minCountNum) {
        $(ev.currentTarget).attr('disabled', 'true');

        _helperPrintText(_count);

        return;
      } else {
        $('[pricing-btn-up-js]').removeAttr('disabled');

        _helperPrintText(_count);
      }
    });
    $('[pricing-btn-up-js]').on('click', (ev) => {
      _count++;

      if(_count >= maxCountNum) {
        $(ev.currentTarget).attr('disabled', 'true');

        _helperPrintText(_count);

        return;
      } else {
        $('[pricing-btn-down-js]').removeAttr('disabled');

        _helperPrintText(_count);
      }
    });
  };

  const initTags = () => {
    $(".selectTags").select2({
      width: 'resolve',
      tags: true
    });
  };

  const initRangeSlider = () => {
    (function($) {
      $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
            this.value = "";
          }
        });
      };
    }(jQuery));
    $("[intIntegerOnlyBox-js]").inputFilter(function(value) { return /^\d*[,]?\d*$/.test(value);});

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    function _helperSalaryValid (val) {
      if(val < 500) {
        val = 500;
      } else if (val > 100000) {
        val = 100000;
      } else {
        val = Math.round(val / 500) * 500;
      }

      return val;
    }
    function _helperExperienceValid (val) {
      if(val < 1) {
        val = 1;
      } else if (val > 30) {
        val = 30;
      }

      return val;
    }
    function _helperRangeMethod (inputMin, inputMax, data) {
      $(inputMin).prop('value', numberWithCommas(data.from));
      $(inputMax).prop('value', numberWithCommas(data.to));
    }

    function _helperCallbackChange (inputName, helperCallback, rangeData, directionRange) {
      $(inputName).on('change', (ev) => {
        const _val = helperCallback($(ev.currentTarget).val());

        rangeData.update({
          [directionRange]: _val
        });

        $(ev.currentTarget).prop("value", numberWithCommas(_val));
      });
    }

    const _rangeSalary = $("[range-salary-js]");

    _rangeSalary.ionRangeSlider({
      type: 'double',
      skin: "big",
      min: 500,
      max: 100000,
      step: 500,
      from: 500,
      to: 100000,
      hide_min_max: true,
      hide_from_to: true,
      onChange: function(data) {
        _helperRangeMethod('[salary-min-input-js]', '[salary-max-input-js]', data);

        $('[review-currency-from-js]').text(numberWithCommas(data.from));
        $('[review-currency-to-js]').text(numberWithCommas(data.to));

        $('[review-currency-js]').parent().attr('data-name', $('[review-currency-js]').parent().text());
      },
      onFinish: function(data) {
        _helperRangeMethod('[salary-min-input-js]', '[salary-max-input-js]', data);

        $('[review-currency-from-js]').text(numberWithCommas(data.from));
        $('[review-currency-to-js]').text(numberWithCommas(data.to));

        $('[review-currency-js]').parent().attr('data-name', $('[review-currency-js]').parent().text());
      }
    });
    const _rangeSalaryData = _rangeSalary.data("ionRangeSlider");

    _helperCallbackChange('[salary-min-input-js]', _helperSalaryValid, _rangeSalaryData, 'from');
    _helperCallbackChange('[salary-max-input-js]', _helperSalaryValid, _rangeSalaryData, 'to');

    const _rangeExperience = $("[range-experience-js]");
    _rangeExperience.ionRangeSlider({
      type: 'double',
      skin: "big",
      min: 1,
      max: 30,
      from: 1,
      to: 30,
      step: 1,
      hide_min_max: true,
      hide_from_to: true,
      onChange: function(data) {
        _helperRangeMethod('[experience-min-input-js]', '[experience-max-input-js]', data);

        $('[posting-review-experience-from-js]').text(data.from);
        $('[posting-review-experience-to-js]').text(data.to);
      },
      onFinish: function(data) {
        _helperRangeMethod('[experience-min-input-js]', '[experience-max-input-js]', data);

        $('[posting-review-experience-from-js]').text(data.from);
        $('[posting-review-experience-to-js]').text(data.to);
      }
    });
    const _rangeExperienceData = _rangeExperience.data("ionRangeSlider");

    _helperCallbackChange('[experience-min-input-js]', _helperExperienceValid, _rangeExperienceData, 'from');
    _helperCallbackChange('[experience-max-input-js]', _helperExperienceValid, _rangeExperienceData, 'to');
  };

  const initAddMoreSkills = (val) => {
    const _skillsForm = $('#skillsForm'),
      _input = $('[skills-input-js]');

    const _helperSelectSkillsTMPL = (val) => {
      return `
        <option value="${val}">${val}</option>
      `;
    };
    const _helperAddNewValidationField = (selectName) => {
      _skillsForm.validate({
        errorPlacement: function (error, element) {
          error.appendTo(element.closest('.posting__form-field'));
        },
        highlight: function (element) {
          $(element).closest('.posting__form-field').addClass('is-error');
        },
        unhighlight: function (element) {
          $(element).closest('.posting__form-field').removeClass('is-error');
        },
        onkeyup: function(element) {
          $(element).valid();
        },
        rules: {
          add_skills: {
            required: true,
          }
        },
        messages: {
          add_skills:  {
            required: "Please specify the Skills",
          }
        }
      });

      if(_skillsForm.valid()) {
        $(selectName).append(_helperSelectSkillsTMPL(_input.val()));
        _input.val('');
      }
    };

    $('[posting-popup-js]').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _dataID = _el.data('id');

      $('#skillsForm .c-btn').hide();
      $('[' + _dataID + '-add-js]').show().css({'display':'flex'});
    });

    $('[skills-add-js]').on('click', (ev) => {
      _helperAddNewValidationField('[skills-select-js]');
    });

    $('[designations-add-js]').on('click', (ev) => {
      _helperAddNewValidationField('[designations-select-js]');
    });
  };

  let _rewardBook = false;
  const initPostingAddQuestion = () => {
    const _questionTMPL = () => {
      return `
        <div class="posting__form-field" posting-parent-question-js>
          <div class="posting__form-remove">
            <a href="#"><i class="icon-font icon-trash"></i></a>
          </div>
          <div class="posting__form-input">
            <input type="text" name="posting_question" placeholder="Add question" posting-input-question-js required>
          </div>
        </div>
      `;
    };

    $('[posting-content-question-js]').on('click', 'a', (ev) => {
      $(ev.currentTarget).closest('[posting-parent-question-js]').remove();
    });

    $('[posting-add-question-js]').on('click', (ev) => {
      $('[posting-content-question-js]').append(_questionTMPL);
    });

    $('[posting-question-js]').on('click', (ev) => {
      const _questionName = $('#formQuestion'),
        _questionInputFields = $('[posting-input-question-js]'),
        _questionWarning = $('[posting-warning-question-js]');

      if($(ev.currentTarget).data('init') === 'range') {
        _rewardBook = true;
      }

      const _ID = $(ev.currentTarget).data('id');

      let _formInputBool = true;

      $.each(_questionInputFields, (idx, el) => {
        if($(el).val().length === 0) {
          _formInputBool = false;
          _questionWarning.show();
          return;
        } else {
          _questionWarning.hide();
        }
      }, false);

      if(_formInputBool) {
        $('.posting__btn-wrapper').hide();
        $('.posting__btn-wrapper[data-wrapper-id="' + _ID + '"]').show().css({display:'flex'});

        $('.posting__step[posting-step-' + _ID + '-js]').addClass('is-active');
        $('.posting__step[posting-step-' + (_ID - 1) + '-js]').removeClass('is-active').addClass('is-done');

        $('.posting__form[posting-form-' + (_ID - 1) + '-js]').removeClass('is-active');
        $('.posting__form[posting-form-' + _ID + '-js]').addClass('is-active');

        if($(ev.currentTarget).data('init') === 'range') {
          setTimeout(() => {
            $('[posting-indicator-js]').css({
              width: $('.irs-bar-hidden .irs-bar').width() - 15
            });
          }, 300);
        }
      }
    });
  };

  const initWillingRange = () => {
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const _rangeWilling = $("[range-willing-js]"),
      _rangeWillingHidden = $('[range-willing-hidden-js]'),
      _willingInput = $('[willing-data-input-js]');

    let _min = 1000,
      _max = 4000,
      _rec = 2000;

    let _from = _rec;

    function _helperSalaryValid (val) {
      if(val < _min) {
        val = _min;
      } else if (val > _max) {
        val = _max;
      } else {
        val = Math.round(val / 100) * 100;
      }

      return val;
    }
    function _helperPostingReview(data) {
      let _perc25 = (data.from * 25) / 100,
        _perc75 = (data.from * 75) / 100;

      $('[posting-regular-js]').text('$' + numberWithCommas(data.from));
      $('[posting-regular-sum-js]').text('$' + numberWithCommas(data.from + 100));

      $('[posting-premium-25-js]').text('$' + numberWithCommas(_perc25));
      $('[posting-premium-75-js]').text('$' + numberWithCommas(_perc75));
      $('[posting-premium-sum-js]').text('$' + numberWithCommas(_perc25 + _perc75 + 200));
    }

    _rangeWilling.ionRangeSlider({
      type: 'single',
      skin: "big",
      min: _min,
      max: _max,
      from: _from,
      step: 100,
      hide_min_max: true,
      hide_from_to: true,
      onStart: function(data) {
        _helperPostingReview(data);
        _willingInput.prop('value', '$' + numberWithCommas(data.from));
      },
      onChange: function(data) {
        _willingInput.prop('value', '$' + numberWithCommas(data.from));
      },
      onFinish: function(data) {
        _helperPostingReview(data);
        _willingInput.prop('value', '$' + numberWithCommas(data.from));
      }
    });
    _rangeWillingHidden.ionRangeSlider({
      type: 'single',
      skin: "big",
      min: _min,
      max: _max,
      from: _rec,
      step: 100,
      hide_min_max: true,
      hide_from_to: true,
      extra_classes: 'irs-bar-hidden'
    });
    const _rangeWillingData = _rangeWilling.data("ionRangeSlider"),
      _rangeWillingHiddenData = _rangeWillingHidden.data("ionRangeSlider");

    setTimeout(() => {
      $('[posting-indicator-js]').css({
        width: $('.irs-bar-hidden .irs-bar').width() - 15
      });
    }, 100);

    $('#posting_1_career_level').on('change', (ev) => {
      const _el = $(ev.currentTarget),
        _elVal = $(_el).find('option:selected').val();

      const _postingRecNode = $('[posting-rec-js]'),
        _postingSimMin = $('[posting-sim-min-js]'),
        _postingSimMax = $('[posting-sim-max-js]');

      const _obj = {
        'junior' : {
          min: '1000',
          max: '4000',
          rec: '2000',
          sim_rec: '2,000',
          sim_min: '2,000',
          sim_max: '3,000',
        },
        'executive' : {
          min: '2000',
          max: '5500',
          rec: '3000',
          sim_rec: '3,000',
          sim_min: '3,000',
          sim_max: '4,500',
        },
        'managerial' : {
          min: '4000',
          max: '8000',
          rec: '5000',
          sim_rec: '5,000',
          sim_min: '4,000',
          sim_max: '7,000',
        },
        'c-level' : {
          min: '6000',
          max: '11000',
          rec: '8000',
          sim_rec: '8,000',
          sim_min: '8,000',
          sim_max: '10,000',
        },
      };

      if(_obj[_elVal]) {
        _postingRecNode.text('$' + _obj[_elVal].sim_rec);
        _postingSimMin.text(_obj[_elVal].sim_min);
        _postingSimMax.text(_obj[_elVal].sim_max);

        _rangeWillingData.update({
          min: _obj[_elVal].min,
          max: _obj[_elVal].max,
          from: _obj[_elVal].rec
        });
        _rangeWillingHiddenData.update({
          min: _obj[_elVal].min,
          max: _obj[_elVal].max,
          from: _obj[_elVal].rec
        });

        setTimeout(() => {
          $('[posting-indicator-js]').css({
            width: $('.irs-bar-hidden .irs-bar').width() - 15
          });
        }, 100);

        _willingInput.prop("value", '$' + numberWithCommas(_obj[_elVal].rec));

        let _perc25 = (_obj[_elVal].rec * 25) / 100,
          _perc75 = (_obj[_elVal].rec * 75) / 100;

        $('[posting-regular-js]').text('$' + numberWithCommas(_obj[_elVal].rec));
        $('[posting-regular-sum-js]').text('$' + numberWithCommas(parseInt(_obj[_elVal].rec) + 100));

        $('[posting-premium-25-js]').text('$' + numberWithCommas(_perc25));
        $('[posting-premium-75-js]').text('$' + numberWithCommas(_perc75));
        $('[posting-premium-sum-js]').text('$' + numberWithCommas(_perc25 + _perc75 + 200));
      }
    });

    _willingInput.on('change', (ev) => {
      const _val = _helperSalaryValid($(ev.currentTarget).val());

      _rangeWillingData.update({
        from: _val
      });

      $(ev.currentTarget).prop("value", '$' + numberWithCommas(_val));
    });
  };

  const initChoosePlan = () => {
    $('.c-modal__box-btn a').on('click', (ev) => {
      const _elID = $(ev.currentTarget).data('id');

      $('.c-modal__box').removeClass('is-active');
      $(ev.currentTarget).closest('.c-modal__box').addClass('is-active');

      $('[posting-review-js]').magnificPopup('close');

      if(_elID === 'regular-plan') {
        $('[review-badge-js]').hide();
      } else {
        $('[review-badge-js]').show();
      }

      ev.preventDefault();
      return false;
    });

    $('.postingReview .c-modal__box').on('click', (ev) => {
      if($(window).width() < 768) {
        if($(ev.currentTarget).hasClass('is-show')) {
          $(ev.currentTarget).removeClass('is-show');
        } else {
          $('.c-modal__box').removeClass('is-show');
          $(ev.currentTarget).addClass('is-show');
        }
      }
    });
  };

  const initPostingAction = () => {
    const _btnNext = $('[posting-next-js]'),
      _btnBack = $('[posting-back-js]');

    function _helperNext(id) {
      $('.posting__btn-wrapper').hide();
      $('.posting__btn-wrapper[data-wrapper-id="' + id + '"]').show().css({display:'flex'});

      $('.posting__step[posting-step-' + id + '-js]').addClass('is-active');
      $('.posting__step[posting-step-' + (id - 1) + '-js]').removeClass('is-active').addClass('is-done');

      $('.posting__form[posting-form-' + (id - 1) + '-js]').removeClass('is-active');
      $('.posting__form[posting-form-' + id + '-js]').addClass('is-active');
    }

    $('[posting-review-js]').on('click', (ev) => {
      $(".posting__btn-wrapper[data-wrapper-id='4']").addClass('is-three');

      $(".posting__btn-wrapper [posting-review-js]")
        .removeClass('c-btn--bg-gradient')
        .addClass('c-btn--bg-green')
        .find('span').text($(".posting__btn-wrapper [posting-review-js]").data('name'));

      $(".posting__btn-wrapper[data-wrapper-id='4'] a").show().css({'display': 'flex'});
    });

    $('.posting__form select').on('change', (ev) => {
      const _el = $(ev.currentTarget);

      if(_el.find('option:selected')) {
        _el.closest('.posting__form-field').removeClass('is-error');
      }
    });

    $('[plan-checkbox-js]').on('change', (ev) => {
      const _el = $(ev.currentTarget),
        _parentNode = _el.closest('[plan-parent-js]'),
        _btn = _parentNode.find('[plan-choose-js]');

      if($(_el).is(':checked')) {
        _btn.removeAttr('disabled');
      } else {
        _btn.attr('disabled', 'true');
      }
    });

    _btnBack.on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _elID = _el.data('id');

      $('.posting__btn-wrapper').hide();
      $('.posting__btn-wrapper[data-wrapper-id="' + _elID + '"]').show().css({display:'flex'});

      // $('.posting__step[posting-step-' + (_elID + 1) + '-js]').removeClass('is-active');

      $('.posting__form[posting-form-' + (_elID + 1) + '-js]').removeClass('is-active');
      $('.posting__form[posting-form-' + _elID + '-js]').addClass('is-active');
    });

    _btnNext.on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _elID = _el.data('id');

      if(_el.closest('[data-wrapper-id="' + (_elID - 1) + '"]')) {
        const _formName = $('.posting__form-' + (_elID - 1));

        _formName.validate({
          errorPlacement: function (error, element) {
            error.appendTo(element.closest('.posting__form-field'));
          },
          highlight: function (element) {
            $(element).closest('.posting__form-field').addClass('is-error');
          },
          unhighlight: function (element) {
            $(element).closest('.posting__form-field').removeClass('is-error');
          },
          onkeyup: function(element) {
            $(element).valid();
          },
          rules: {
            job_title: {
              required: true,
            },
            job_description: {
              required: true,
            },
            job_function: {
              required: true
            },
            career_level: {
              required: true
            },
            employment_type: {
              required: true
            },
            select_currency: {
              required: true
            },
            country_select: {
              required: true
            },
            industry_experience: {
              required: true
            },
            skills: {
              required: true
            },
            highest_degree: {
              required: true
            },
            languages: {
              required: true
            },
            designations: {
              required: true
            },
            additional_requirements: {
              required: true,
            },
            city: {
              required: true,
            },
          },
          messages: {
            job_title:  {
              required: "Please specify the Job Title",
            },
            job_description:  {
              required: "Please specify the Job Description",
            },
            job_function: {
              required: 'Please select the Job Function'
            },
            career_level: {
              required: 'Please select the Career Level'
            },
            employment_type: {
              required: 'Please select the Employment Type'
            },
            select_currency: {
              required: 'Please select the Currency'
            },
            country_select: {
              required: 'Please select the Country'
            },
            industry_experience: {
              required: 'Please select the Industry Experience'
            },
            skills: {
              required: 'Please select the Skills'
            },
            highest_degree: {
              required: 'Please select the Highest Degree'
            },
            languages: {
              required: 'Please select the Languages'
            },
            designations: {
              required: 'Please select the Designations'
            },
            additional_requirements: {
              required: "Please specify the additional requirements",
            },
            city: {
              required: "Please specify the City",
            },
          }
        });

        if (_formName.valid() === true) {
          _helperNext(_elID);

          $('body, html').animate({
            scrollTop: 0
          }, 800);
        }
      }
    });

    $('[posting-step-js]').on('click', (ev) => {
      const _el = $(ev.currentTarget),
        _elID = _el.data('id');

      if(_rewardBook) {
      // if(1) {
        $('.posting__btn-wrapper').hide();
        $('.posting__btn-wrapper[data-wrapper-id="' + _elID + '"]').show().css({display:'flex'});

        $('.posting__form').removeClass('is-active');
        $('.posting__form[posting-form-' + _elID + '-js]').addClass('is-active');
      }
    });
  };

  const initPostingBlockInfoToggle = () => {
    $('[posting-checkbox-info-js]').on('change', (ev) => {
      let _count = 0;

      $.each($('[posting-checkbox-info-js]'), (idx, val) => {
        if($(val).is(':checked')) {
          _count++;
        }
      });

      if(_count > 0) {
        $('[posting-info-js]').slideDown(400);
      } else {
        $('[posting-info-js]').slideUp(400);
      }
    });

    $('[posting-checkbox-salary-js]').on('change', (ev) => {
      const _el = $(ev.currentTarget);

      if(_el.is(':checked')) {
        $('[posting-negotiable-wallet-js]').text($('[posting-negotiable-wallet-js]').data('negotiable'));
      } else {
        $('[posting-negotiable-wallet-js]').text($('[posting-negotiable-wallet-js]').data('name'));
      }
    });
    $('[posting-checkbox-confidential-js]').on('change', (ev) => {
      const _el = $(ev.currentTarget);

      if(_el.is(':checked')) {
        $('[posting-confidential-logo-js]').attr('src', $('[posting-confidential-logo-js]').data('logo'));
        $('[posting-confidential-company-js]').text($('[posting-confidential-company-js]').data('confidential'));
      } else {
        $('[posting-confidential-logo-js]').attr('src', $('[posting-confidential-logo-js]').data('name'));
        $('[posting-confidential-company-js]').text($('[posting-confidential-company-js]').data('name'));
      }
    });
  };


  const initPostingReviewFill = () => {
    $('[posting-job-title-js]').on('blur', (ev) => {
      $('[review-job-title-js]').text($(ev.currentTarget).val());
    });

    $('[posting-job-description-js]').on('blur', (ev) => {
      $('[review-job-description-js]').html(
        $(ev.currentTarget).val().replace(/\n\r?/g, '<br />')
      );
    });

    $('[posting-career-level-js]').on('change', (ev) => {
      $('[review-career-level-js]')
        .text($(ev.currentTarget).find('option:selected').val())
        .css({
          'text-transform': 'capitalize'
        });
    });

    $('[posting-job-type-js]').on('change', (ev) => {
      $('[review-job-type-js]')
        .text($(ev.currentTarget).find('option:selected').val())
        .css({
          'text-transform': 'capitalize'
        });
    });

    $('[posting-country-js]').on('change', (ev) => {
      $('[review-country-js]').text($(ev.currentTarget).find('option:selected').val());
    });

    $('[posting-city-js]').on('blur', (ev) => {
      $('[review-city-js]')
        .text($(ev.currentTarget).val())
        .css({
        'text-transform': 'capitalize'
      });
    });

    $('[posting-industry-experience-js]').on('change', (ev) => {
      function _tmplIndustry(txt) {
        return `
          <i>${txt}</i>
        `;
      }

      let _selectedVal = $(ev.currentTarget).find('option:selected');

      $('[review-industry-js]').empty();
      $.each(_selectedVal, (idx, val) => {
        $('[review-industry-js]').append(_tmplIndustry($(val).val()));
      });
    });

    $('[posting-highest-degree-js]').on('change', (ev) => {
      $('[review-degree-js]')
        .text($(ev.currentTarget).find('option:selected').val())
        .css({
          'text-transform': 'capitalize'
        });
    });

    $('[posting-skills-js]').on('change', (ev) => {
      function _tmplIndustry(txt) {
        return `
          <i>${txt}</i>
        `;
      }

      let _selectedVal = $(ev.currentTarget).find('option:selected');

      $('[review-skills-js]').empty();
      $.each(_selectedVal, (idx, val) => {
        $('[review-skills-js]').append(_tmplIndustry($(val).val()));
      });
    });

    $('[posting-languages-js]').on('change', (ev) => {
      $('[review-languages-js]')
        .text($(ev.currentTarget).find('option:selected').val())
        .css({
          'text-transform': 'capitalize'
        });
    });

    $('[posting-additional-requirements-js]').on('blur', (ev) => {
      if($(ev.currentTarget).val().length === 0) {
        $('[review-additional-requirements-wrap-js]').hide();
      } else {
        $('[review-additional-requirements-wrap-js]').show();
      }

      $('[review-additional-requirements-js]').html(
        $(ev.currentTarget).val().replace(/\n\r?/g, '<br />')
      );
    });

    $('[posting-currency-js]').on('change', (ev) => {
      $('[review-currency-js]')
        .text($(ev.currentTarget).find('option:selected').val().toUpperCase());

      $('[review-currency-js]').parent().attr('data-name', $('[review-currency-js]').parent().text());
    });
  };
	/*
	* CALLBACK :: end
	* ============================================= */


  /**
   * @description Init all method
   */
  const initJquery = () => {
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
    initRetouchPricing();

    initRangeSlider();
    initPostingAction();
    initTags();
    initAddMoreSkills();
    initPostingAddQuestion();
    initWillingRange();
    initChoosePlan();
    initPostingBlockInfoToggle();
    initPostingReviewFill();
		// ==========================================

    $(window).on('load', () => {
      if($('.p-retouch').length) {
        $('.header').animate({
          'opacity': '1'
        }, 0);

        return;
      }

      setTimeout(() => {
        $('.header').animate({
          'opacity': '1'
        }, 300);
      }, 150);
    });
  };
  initJquery();
});

