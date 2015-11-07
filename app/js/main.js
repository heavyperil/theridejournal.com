import $ from 'jquery';

import orders from './modules/orders';
import sections from './modules/sections';
import slideshow from './modules/slideshow';
import stockists from './modules/stockists';

$(function() {
  orders.init('.js-order-toggle');
  sections.init('.site-header__nav');
  slideshow.init('.slideshow');
  stockists.init('.js-stockists');
});
