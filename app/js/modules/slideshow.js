import $ from 'jquery';
import cycle from 'cycle';

let slideshow = {
  init: function(selector) {
    $(selector).cycle({fx: 'fade'});
  }
};

export default slideshow;
