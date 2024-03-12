$(function () {
  async function getItems() {
    try {
      const query = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();

      if (response.status === "success") {
        allItems = response.result;
        sortAllItems();
      }
      else
        throw new Error("Get all Items failed")
    }
    catch (err) {
      console.log(err.message);
    }
  }

  function sortAllItems() {
    const groupedByLocation = allItems.reduce((acc, obj) => {
      const location = obj._id.location;
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(obj);
      return acc;
    }, {});

    allItems = Object.values(groupedByLocation);

    allItems.sort((a, b) => {
      const locA = a[0]._id.location.toUpperCase();
      const locB = b[0]._id.location.toUpperCase();

      if (locA < locB)
        return -1;

      if (locA > locB)
        return 1;

      return 0;
    });

    for (let item of allItems) {
      item.sort((a, b) => {
        const nameA = a._id.name.toUpperCase();
        const nameB = b._id.name.toUpperCase();

        if (nameA < nameB)
          return -1;

        if (nameA > nameB)
          return 1;

        return 0;
      })
    }
  }

  const minDate = new Date().toISOString().substring(0, 10);

  $('#checkout-date').attr('min', minDate);
  $('#return-date').attr('min', minDate);

  const body = $("body");
  const submitError = $(".submit-error");
  const hiddenTable = $("#hide-if-no-date");
  const checkoutTable = $(".checkout-table")
  const headingRow = $(".heading-row")
  const modalBody = $(".modal-body");

  let allItems = [];
  let availableItems = [];

  let checkoutDate;
  let returnDate;
  const items = [];
  let name;
  let email;

  getItems();

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

    if (!allItems.length) {
      submitError.text("Slow response from item database. Please wait a few seconds and try again.");
      return;
    }

    if (hiddenTable.attr("class") === "d-none")
      hiddenTable.attr("class", "");

    const groupedByAvailability = allItems.reduce((acc, obj) => {
      const location = obj._id.location;

      if (!acc[location]) {
        acc[location] = [];
      }

      acc[location].push(obj);

      return acc;
    }, {});

    populateTable();
  }

  function populateTable() {
    console.log(allItems)

    for (let itemArr of allItems) {
      const cityName = itemArr[0]._id.location;

      headingRow.append($(`
      <th class="table-header" id="${cityName}">${cityName}</th>
      `));

      for (let item of itemArr) {
        const itemName = item._id.name;
        const tableRow = $(`#${itemName}`);

        if (!tableRow.length) {
          const newTableRow = $(`
          <tr id="${itemName}">
            <th class="ps-2">${itemName}</th>
          </tr>
          `).appendTo(checkoutTable);

          newTableRow.append($(`
          <td>
            <div class="d-flex flex-column gap-1">
              <span>Available: ${item.count}</span>
              <div>
                <span>Needed: </span>
                <input id="${item._id.location}-${item._id.name}" class="quantity-select" type="number" placeholder="0">
              </div>
            </div>
          </td>
          `))
        }
        else {
          tableRow.append($(`
          <td>
            <div class="d-flex flex-column gap-1">
              <span>Available: ${item.count}</span>
              <div>
                <span>Needed: </span>
                <input id="${item._id.location}-${item._id.name}" class="quantity-select" type="number" placeholder="0">
              </div>
            </div>
          </td>
          `));
        }
      }
    }

    // rename this to availableItems
    // const aggregateItems = [];

    // for (let item of items) {
    //   const result = aggregateItems.findIndex((aggregateItem) => {
    //     aggregateItem.name === item.name && aggregateItem.location === item.location
    //   });

    //   if (result !== -1) {
    //     aggregateItems[i].count++;
    //   }
    //   else {
    //     aggregateItems.push(
    //       {
    //         name: item.name,
    //         location: item.location,
    //         count: 1
    //       }
    //     )
    //   }
    // }

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
