$(document).ready(function () {
  $("#Email").on("keyup", function (e) {
    e.preventDefault();
    var data = $("#Email").val();
    console.log(data);
    $.ajax({
      url: "/index/checkEmail",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ Email: data }),
      success: function (res) {
        $("#emailError").html("email is " + res);

        if (res == "taken") {
          $("#emailError").css("color", "red");
        } else {
          $("#emailError").css("color", "green");
        }
      },
      error: function (err) {},
    });
  });
});
