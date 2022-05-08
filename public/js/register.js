function removeErrorClass(element) {
  element.classList.remove("is-invalid");
  document.getElementById("error-div").classList.add("visually-hidden");
}

(function ($) {
  $("#logo").on("click", function (event) {
    $(location).attr("href", "/");
  });
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const userName = document.getElementById("username");
  const password = document.getElementById("password");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phonenumber");
  
  
  const form = document.getElementById("create-user");
  form.addEventListener("submit", function addProduct(event) {
    debugger;
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/users/register",
      contentType: "application/json",
      data: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        username: userName.value,
        password: password.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
      }),
      dataType: "text",
      success: function (responseMessage) {
        console.log("responseMessage",responseMessage);
        window.location.replace("/");
      },
      error: function (responseError) {
        error.innerHTML = JSON.parse(
          responseError.responseText
        ).message.preventXSS();
       
      },
    });
  });   
})(window.jQuery);