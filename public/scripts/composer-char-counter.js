$(document).ready(function() {
  console.log("jQuery Loaded");
  $('.edit textarea').on('input', function() {
    let textLength = $(this).val().length;
    let remaining = 140 - textLength;
    //let counter = $(this).closest('form').find('.counter');
    $('.counter').text(remaining);

    if (remaining < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});