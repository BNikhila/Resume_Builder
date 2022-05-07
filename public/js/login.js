function removeErrorClass(element) {
  element.classList.remove("is-invalid");
  document.getElementById("error-div").classList.add("visually-hidden");
  document.getElementById("usernameHelp").classList.remove("visually-hidden");
}
(function ($) {
  $("#logo").on("click", function (event) {
    $(location).attr("href", "/");
  });
  if ($("#loginAlert")[0].innerHTML == "") $("#loginAlert").hide();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const error = document.getElementById("error-div");
  error.classList.add("visually-hidden");
  document.getElementById("usernameHelp").classList.remove("visually-hidden");

  const form = document.getElementById("login-form");
  
})(window.jQuery);
