const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("error");
if (myParam) {
  Swal.fire({
    title: "Error!",
    text: myParam,
    icon: "error",
    confirmButtonText: "Got it!",
  });
}

(function ($) {
  $("input[type=radio][name=sort_by]").change(function () {
    window.location.href = "/?sort_by=" + this.value.preventXSS();
  });
  $("#logo").on("click", function (event) {
    $(location).attr("href", "/");
  });
})(window.jQuery);
