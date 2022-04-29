(function ($) {
  $("#logo").on("click", function (event) {
    $(location).attr("href", "/");
  });

  $("#error-div").hide();

})(window.jQuery);
