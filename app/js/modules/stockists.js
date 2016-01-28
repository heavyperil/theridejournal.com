import $ from 'jquery';
import showStockistList from './stockists/show-stockist-list';
import showStockistDetail from './stockists/show-stockist-detail';

let stockists = {
  init: function(selector) {
    this.$_el                  = $(selector);
    this.$_stockistRegionLinks = this.$_el.find('.js-stockist-regions li');
    this.$_stockistLists       = this.$_el.find('.js-stockist-lists');
    this.$_stockistLinks       = this.$_el.find('.stockists__list li');
    this.$_stockistDetail      = this.$_el.find('.stockists__detail');
    this._bindUI();

    this.$_stockistLinks.filter('[data-address]').first().trigger('click');
  },

  _bindUI: function() {
    this.$_stockistRegionLinks.on('click', event => {
      let region = $(event.target).attr('data-region');

      showStockistList(region, this.$_stockistLists);
      if (region === 'online') {
        this.$_stockistDetail.find('.js-stockists-location').fadeOut();
      } else {
        this.$_stockistLists.find(`.js-stockists-${region} li`).first().trigger('click');
      }
    });

    this.$_el.on('click', 'li[data-address]', event => {
      this.$_stockistLinks.removeClass('selected');
      this.$_stockistDetail.find('.js-stockists-location').fadeOut(() => {
        showStockistDetail($(event.target), this.$_stockistDetail);
      });
    });
  }
};

export default stockists;
