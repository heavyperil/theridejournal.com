import $ from 'jquery';

import sections from './modules/sections';
import slideshow from './modules/slideshow';
import stockists from './modules/stockists';

$(function() {
  sections.init('.site-header__nav');
  slideshow.init('.slideshow');
  stockists.init('.js-stockists');
});
