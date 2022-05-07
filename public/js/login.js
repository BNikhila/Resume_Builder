function removeErrorClass(element) {
  element.classList.remove("is-invalid");
  document.getElementById("error-div").classList.add("visually-hidden");
  document.getElementById("usernameHelp").classList.remove("visually-hidden");
}
(function ($) {
  $("#logo").on("click", function (event) {
    $(location).attr("href", "/");
  });
  function removeErrorClass(element) {
    element.classList.remove("is-invalid");
    document.getElementById("error-div").classList.add("visually-hidden");
  }
  
  (function ($) {
   
    const username = document.getElementById("lusername");
    const password = document.getElementById("lpassword");
    
    const form = document.getElementById("main_login_form");
    form.addEventListener("submit", function addProduct(event) {
      debugger;
      event.preventDefault();
      $.ajax({
        type: "POST",
        url: "/login",
        contentType: "application/json",
        data: JSON.stringify({
          username: username.value,
          password: password.value,
          
        }),
        dataType: "text",
        success: function (responseMessage) {
          console.log("responseMessage",responseMessage);
          window.location.replace("/");
        },
        error: function (responseError) {
         
        },
      });
    });   
  })(window.jQuery);
  
})(window.jQuery);
