$(document).ready(function(){
  handleChangeWidth();
  $(window).on('resize', handleChangeWidth);
});

function setRowspan (rowsAmount, selector) {
  $(selector).attr('rowspan', rowsAmount);
};

function checkWidth(width) {
  if (width < 769) {
    setRowspan('2', 'td.first');
  } else {
    setRowspan('1', 'td.first');
  }
};

function handleChangeWidth () {
  const width = window.innerWidth;
  checkWidth(width);
};

import './styles.css';
