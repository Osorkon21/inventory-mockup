$(function () {

  console.log("HI")

  const body = $("body");
  const submitError = $(".submit-error");
  const dateSelect = $("#date-select");

  body.on("submit", "#date-select", (e) => {
    e.preventDefault();
    submitError.text("no date selected")
  })


  // const body = $("body");

  // const dynamicEl = $("<div>").attr("class", "text-danger").text("HELLO");

  // // append element w/jQuery variable
  // body.append(dynamicEl);

  // append raw HTML
  // body.append($(`
  //     <div class="border border-dark border-2 p-2">
  //       <p class="border border-primary border-2">you suck</p>
  //       <p>good</p>
  //       <p>grief</p>
  //       <p>sigh</p>
  //     </div>
  //   `));
})
