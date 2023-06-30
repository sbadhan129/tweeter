$(document).ready(function() {
  console.log("jQuery Loaded");
  //User input in textarea
  $('.edit textarea').on('input', function() {
    let textLength = $(this).val().length;
    let remaining = 140 - textLength;
    $('.counter').text(remaining);
// Add red class to counter if character exceedts its limit.
    if (remaining < 0) {
      $('.counter').addClass('red');
    } else {
      $('.counter').removeClass('red');
    }
  });
});