$(document).ready(function(){
  handleChangeWidth();
  $(window).on('resize', handleChangeWidth);
});

function setRowspan (rowsAmount, selector) {
  $(selector).attr('rowspan', rowsAmount);
};

function checkWidth(width, selector) {
  if (width < 769) {
    setRowspan('2', selector);
  } else {
    setRowspan('1', selector);
  }
};

function handleChangeWidth () {
  const width = window.innerWidth;
  checkWidth(width, 'th.first');
  checkWidth(width, 'td.first');
};
