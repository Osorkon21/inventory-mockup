$(function () {
  async function getItems() {
    try {
      // get all items
      const query = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();

      if (response.status === "success") {
        console.log(response)

        // const dbCategories = response.payload.map(function (category) { return { id: category._id, name: category.name } });

        // dbCategories.unshift(showAll);

        // setCategories(dbCategories);
        // setCurrentCategory("Show All");
      }
      else
        throw new Error("Get all Items failed")
    }
    catch (err) {
      console.log(err.message);
    }
  }

  getItems();

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

    //   if (content && articleId) {
    //     const response = await fetch('/api/comment', {
    //       method: 'POST',
    //       body: JSON.stringify({ content, articleId }),
    //       headers: { 'Content-Type': 'application/json' },
    //     });

    //     if (response.ok) {
    //       document.location.replace(`/article/${articleId}/comment`);
    //     } else {
    //       alert('Failed to save comment.');
    //     }
    //   }
    //   else
    //     alert("Your comment cannot be empty.");
    // };

    //   if (title && content) {
    //     const response = await fetch(`/api/article/${articleId}`, {
    //       method: 'PUT',
    //       body: JSON.stringify({ title, content }),
    //       headers: { 'Content-Type': 'application/json' },
    //     });

    //     if (response.ok) {
    //       document.location.href = '/dashboard';
    //     }
    //     else {
    //       alert('Failed to update post.');
    //     }
    //   }
    //   else
    //     alert("Title and Content are required fields.");
    // }

    // // "delete-btn" was clicked
    // else {
    //   const response = await fetch(`/api/article/${articleId}`, {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' },
    //   });

    //   if (response.ok) {
    //     document.location.replace('/dashboard');
    //   }
    //   else {
    //     alert('Failed to delete post.');
    //   }
    // }

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

  function handleConfirm(e) {
    e.preventDefault();

    // do Order POST route here...

    console.log("confirm button clicked")
  }

  body.on("input", "#name", function () { name = $(this).val(); });
  body.on("input", "#email", function () { email = $(this).val(); });
  body.on("submit", "#date-select", checkAvailability);
  body.on("click", "#checkout-btn", handleCheckout);
  body.on("click", "#confirm-btn", handleConfirm);
});
