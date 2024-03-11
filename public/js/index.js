import { seed } from "../../seeds/seed.js";

$(function () {
  const minDate = new Date().toISOString().substring(0, 10);

  $('#checkout-date').attr('min', minDate);
  $('#return-date').attr('min', minDate);

  const body = $("body");
  const submitError = $(".submit-error");
  const hiddenTable = $("#hide-if-no-date");
  const checkoutTable = $(".checkout-table")
  const headingRow = $(".heading-row")
  const modalBody = $(".modal-body");

  let checkoutDate;
  let returnDate;
  const items = [];
  let name;
  let email;

  function checkAvailability(e) {
    e.preventDefault();
    submitError.text("");

    checkoutDate = $("#checkout-date").val();
    returnDate = $("#return-date").val();

    // if (!checkoutDate || !returnDate) {
    //   submitError.text("Select a checkout and return date.");
    //   return;
    // }

    // if (new Date(checkoutDate) > new Date(returnDate)) {
    //   submitError.text("Checkout date cannot be after the return date.");
    //   return;
    // }

    if (hiddenTable.attr("class") === "d-none")
      hiddenTable.attr("class", "");

    populateTable();
  }

  function populateTable() {

    // rename this to availableItems
    const aggregateItems = [];

    for (let item of items) {
      const result = aggregateItems.findIndex((aggregateItem) => {
        aggregateItem.name === item.name && aggregateItem.location === item.location
      });

      if (result !== -1) {
        aggregateItems[i].count++;
      }
      else {
        aggregateItems.push(
          {
            name: item.name,
            location: item.location,
            count: 1
          }
        )
      }
    }

    // for (let cityName of cityNames) {
    //   headingRow.append($(`
    //   <th class="table-header">${cityName}</th>
    //   `))
    // }

    // for (let itemName of itemNames) {
    //   const tableRow = $(`
    //   <tr>
    //     <th class="ps-2">${itemName}</th>
    //   </tr>
    //   `).appendTo(checkoutTable);


    // }

  }

  function handleCheckout(e) {
    e.preventDefault();

    if (!items.length) {
      modalBody.text("No items selected.")
    }
  }

  function handleResetDB(e) {
    e.preventDefault();

    // do Order/Item DELETE routes here...

    seed();

    // reload page...
  }

  function handleConfirm(e) {
    e.preventDefault();

    // do Order POST route here...

    console.log("confirm button clicked")
  }

  body.on("input", "#name", function () { name = $(this).val(); });
  body.on("input", "#email", function () { email = $(this).val(); });
  body.on("submit", "#date-select", checkAvailability);
  body.on("click", "#checkout-btn", handleCheckout);
  body.on("click", "#reset-db", handleResetDB);
  body.on("click", "#confirm-btn", handleConfirm);
});
