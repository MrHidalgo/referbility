

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

    const _pagination = $('#board-pagination');

    $('.board-card__block').on('click', () => {
      if($('.board-details--hidden').length) {
        $('.board-details--hidden').fadeOut(450).fadeIn(450);
        $('#board-how').hide();

        if($(window).width() < 1024) {
          let _elIDOffsetTop = $('#board-details').offset().top + 2;

          $('body, html').animate({
            scrollTop: _elIDOffsetTop
          }, 750);
        }
      }
    });

    $(window).on('load resize scroll', () => {
      if($('.p-board').length && $(window).width() > 1023) {
        let spaceBelow = $(window).height() - $('#board-pagination')[0].getBoundingClientRect().bottom;

        $('.board__wrapper-right').css({
          height: $('.board__wrapper-left').outerHeight(true)
        });

        $('.board-details').css({
          height: $(window).outerHeight(true)
        });

        if (_pagination.length > 0 && isAnyPartOfElementInViewport(_pagination[0])) {
          if(spaceBelow > 0) {
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

