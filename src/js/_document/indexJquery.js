

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
      // ...
    } else if(_boxContainerName === 'shortlisted') {
      _tmpl = `
        <i class="icon-font icon-date"></i>
        <p>Shortlisted on <u>${_currentDate}</u></p>
      `;
      _boxesDateNode.addClass('kanban__box-date--shortlisted').html(_tmpl);
    } else if(_boxContainerName === 'assessment') {
      _tmpl = `
        <i class="icon-font icon-date"></i>
        <p>In assessment since <u>${_currentDate}</u></p>
      `;
      _boxesDateNode.addClass('kanban__box-date--assessment').html(_tmpl);
    } else if(_boxContainerName === 'offer') {
      _tmpl = `
        <i class="icon-font icon-date"></i>  
        <p>Job offered on <u>${_currentDate}</u></p>             
      `;
      _boxesDateNode.addClass('kanban__box-date--offered').html(_tmpl);
    } else if(_boxContainerName === 'hired') {
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

      _sortableGuaranteeToPositive.append(_sortableGuaranteeItem);

      _sortableGuaranteeItem.find('.kanban__box-guarantee').removeClass('is-active');
      _sortableGuaranteeItem.find('.kanban__box-like').addClass('is-hide');

      _changeKanbanDateInDraggableBoxes(_sortableGuaranteeItem);

      _changeKanbanBoxesHeight($('.kanban--guarantee'));
      _changeKanbanBoxesHeight(_sortableGuaranteeToPositive);
    });

    $('[popup-terminate-js]').on('click', (ev) => {
      $('[kanban-body-js]').find(_sortableGuaranteeItem).remove();

      _sortableGuaranteeToNegative.append(_sortableGuaranteeItem);

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

  const initCustomScrollbar = () => {
    $('.kanban__wrapper-body, .kanban__box-cover').overlayScrollbars({ });
  };

  const initKanbanHeight = () => {
    $(window).on('resize load', (ev) => {
      if($(window).width() > 767) {
        $('[kanban-body-js]').attr('style', 'height:calc(100vh - ' + ($('[kanban-head-js]').outerHeight(true) + $('header').outerHeight(true)) + 'px)');
      } else {
        $('[kanban-body-js]').attr('style', 'height:auto;');
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
    });
  };

  const initThumbsOtherTextarea = () => {
    $('.c-modal__radio').on('change', (ev) => {
      $('.c-modal__textarea-wrapper').slideUp(250);
    });
    $('.c-modal__radio-textarea').on('change', (ev) => {
      if($(ev.currentTarget).is(':checked')) {
        $('.c-modal__textarea-wrapper').slideDown(250);
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

      $('[kanban-shortlisted-js]').append(_parentNode);

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

    $(window).on('load', () => {
      setTimeout(() => {
        $('.header').animate({
          'opacity': '1'
        }, 300);
      }, 150);
    });
  };
  initJquery();
});

