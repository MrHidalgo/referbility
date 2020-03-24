

/**
 * @name initPopups
 *
 * @description
 */
const initPopups = () => {

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
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
      beforeClose: function(ev) {}
    }
  });

  $('[posting-review-js]').magnificPopup({
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
        if($('[plan-checkbox-js]').is(':checked')) {
          const id = 5;

          $('.posting__btn-wrapper').hide();
          $('.posting__btn-wrapper[data-wrapper-id="' + id + '"]').show().css({display:'flex'});

          $('.posting__step[posting-step-' + id + '-js]').addClass('is-active');
          $('.posting__step[posting-step-' + (id - 1) + '-js]').removeClass('is-active').addClass('is-done');

          $('.posting__form[posting-form-' + (id - 1) + '-js]').removeClass('is-active');
          $('.posting__form[posting-form-' + id + '-js]').addClass('is-active');
        }
      }
    }
  });
};
