$(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    let character = $(this).find("input[type=text]").val();

    $(document)
      .off("keypress")
      .on("keypress", function (event) {
        if (event.key !== character) {
          return;
        }
        $("a").trigger("click");
      });
  });

  $("a").click(function (event) {
    event.preventDefault();
    $("#accordion").slideToggle();
  });
});
