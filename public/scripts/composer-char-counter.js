$(document).ready(function () {
  $("#tweet-text").keyup(function() {
    $(this)
      .closest(".new-tweet")
      .find(".counter")
      .text(140 - $(this).val().length);

    const max = 140;
    const length = $(this).val().length;

    if (max - length < 0) {
      $(".counter").css('color', 'red');
    } else {
      $(".counter").css('color', 'grey');
    }

  });

});

  
