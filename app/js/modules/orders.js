import $ from 'jquery';

let orders = {
  init: function(orderToggleSelector) {
    this.$_toggle  = $(orderToggleSelector);
    this.$_order10 = $('.order__form-10');
    this.$_order9  = $('.order__form-9');
    this._bindUI();
  },

  _bindUI: function() {
    this.$_toggle.on('click', event => {
      event.preventDefault();

      this.$_order10.toggle();
      this.$_order9.toggle();

      if (this.$_toggle.text().indexOf('10') >= 0) {
        this.$_toggle.text('Order issue 9');
      } else {
        this.$_toggle.text('Pre-order issue 10');
      }
    });
  }
};

export default orders;
