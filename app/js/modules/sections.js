import $ from 'jquery';

let sections = {
  init: function(selector) {
    this.$_navLinks = $(selector).find('a');
    this._bindUI();
  },

  _bindUI: function() {
    this.$_navLinks.on('click', event => {
      let el = $(event.target).attr('href');

      event.preventDefault();

      $('html, body').animate({
        scrollTop: $(el).offset().top + 'px'
      }, 900);
    });
  }
};

export default sections;
