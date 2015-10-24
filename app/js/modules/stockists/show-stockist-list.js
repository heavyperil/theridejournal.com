import $ from 'jquery';

let showStockistList = function(region, $lists) {
  $lists.find('.stockists__list--visible').removeClass('stockists__list--visible');
  $lists.find(`.js-stockists-${region}`).addClass('stockists__list--visible');
};

export default showStockistList;
