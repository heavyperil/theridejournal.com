import $ from 'jquery';

let MAP_URI = 'http://maps.googleapis.com/maps/api/staticmap?size=260x260&sensor=false&zoom=14';

let mapURL = function(address) {
  let encodedAddress = encodeURIComponent(address);
  return `${MAP_URI}&center=${encodedAddress}&markers=${encodedAddress}`;
};

let updateMap = function(stockist, $detailContainer) {
  let $map  = $detailContainer.find('.stockists__map img'),
      title = `${stockist.name}, ${stockist.address}`;

  $map.attr({
    src:   mapURL(stockist.address),
    alt:   title,
    title: title
  });
};

let updateInfo = function(stockist, $detailContainer) {
  let addressLines = stockist.address.split(',').map(part => `${part}<br>`).join(''),
      fragment     = `<em>${stockist.name}</em><br>${addressLines}`;

  $detailContainer.find('.stockists__address p').html(fragment);
};

let showStockistDetail = function($stockist, $detailContainer) {
  let stockist = {
    name:    $stockist.text().split(',')[0],
    address: $stockist.attr('data-address')
  };

  $stockist.addClass('selected');
  updateMap(stockist, $detailContainer);
  updateInfo(stockist, $detailContainer);
  $detailContainer.find('.js-stockists-location').fadeIn();
};

export default showStockistDetail;
