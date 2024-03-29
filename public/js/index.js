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

  async function getOrders() {
    try {
      const query = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();

      if (response.status === "success") {
        const allOrders = response.result;

        if (allOrders.length)
          orderLink.attr("class", "btn btn-primary");
        else
          orderLink.attr("class", "btn btn-primary d-none")
      }
      else
        throw new Error("Get all Orders failed")
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
  const nameError = $("#name-error");
  const emailError = $("#email-error");
  const orderLink = $("#order-link");
  const checkoutError = $("#checkout-error");
  const modal = $(".modal")
  const modalBody = $(".modal-body");
  const confirmBtn = $("#confirm-btn");

  let allItems = [];
  let availableItems = [];

  let checkoutDate;
  let returnDate;
  const items = {};
  let name;
  let email;

  getItems();
  getOrders();

  function checkAvailability(e) {
    if (e)
      e.preventDefault();

    submitError.text("");

    checkoutDate = new Date($("#checkout-date").val());
    returnDate = new Date($("#return-date").val());

    const cdOffset = checkoutDate.getTimezoneOffset();

    checkoutDate.setMinutes(checkoutDate.getMinutes() + cdOffset);
    returnDate.setMinutes(returnDate.getMinutes() + cdOffset);

    if (checkoutDate.toString() === "Invalid Date" || returnDate.toString() === "Invalid Date") {
      submitError.text("Select a checkout and return date.");
      return;
    }

    if (checkoutDate > returnDate) {
      submitError.text("Checkout date cannot be after the return date.");
      return;
    }

    if (!allItems.length) {
      submitError.text("Slow response from item database. Please wait a few seconds and try again.");
      return;
    }

    if (hiddenTable.attr("class") === "d-none")
      hiddenTable.attr("class", "");

    availableItems = allItems.map(locationArray =>
      locationArray.map(obj =>
      ({
        ...obj,
        data: obj.data.filter(dataObj =>
          isAvailable(dataObj.datesInUse)
        )
      })
      )
    );

    populateTable();
  }

  function isAvailable(datesInUse) {
    for (let dates of datesInUse) {
      const dataCheckoutDate = new Date(dates.checkoutDate);
      const dataReturnDate = new Date(dates.returnDate);

      if (checkoutDate <= dataReturnDate && returnDate >= dataCheckoutDate)
        return false;
    }

    return true;
  }

  function populateTable() {
    checkoutTable.empty();

    const headingRow = $(`
      <tr class="heading-row">
        <th class="table-header">Item</th>
      </tr>
    `).appendTo(checkoutTable);

    for (let itemArr of availableItems) {
      const cityName = itemArr[0]._id.location;

      headingRow.append($(`
      <th class="table-header" id="${cityName}">${cityName}</th>
      `));

      for (let item of itemArr) {
        const itemName = item._id.name;
        let tableRow = $(`#${itemName}`);

        if (!tableRow.length) {
          tableRow = $(`
          <tr id="${itemName}">
            <th class="ps-2">${itemName}</th>
          </tr>
          `).appendTo(checkoutTable);
        }

        tableRow.append($(`
          <td>
            <div class="d-flex flex-column gap-1">
              <span>Available: ${item.data.length}</span>
              <div>
                <span>Needed: </span>
                <input id="${item._id.location}-${item._id.name}" class="quantity-select" type="number" min="0" max="${item.data.length}" placeholder="0">
              </div>
            </div>
          </td>
          `));
      }
    }

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

    modalBody.empty();
    nameError.text("");
    emailError.text("");
    checkoutError.text("");
    confirmBtn.attr("class", "btn btn-primary");
    const locList = Object.keys(items).sort(uppercaseSort);

    if (!name || !email || locList.length === 0) {
      if (!name)
        nameError.text("Please enter your name.");

      if (!email)
        emailError.text("Please enter your email.");

      if (locList.length === 0)
        checkoutError.text("No items selected!")

      return;
    }
    else {
      modal.modal("show");

      modalBody.append($(`
      <div class="mb-2">
        <div>Name: <strong>${name}</strong></div>
        <div>Email: <strong>${email}</strong></div>
        <div>Checkout: <strong>${checkoutDate.toLocaleString().slice(0, 9)}</strong></div>
        <div>Return: <strong>${returnDate.toLocaleString().slice(0, 9)}</strong></div>
      </div>
      `))

      for (let location of locList) {
        const itemList = Object.keys(items[location]).sort(uppercaseSort);

        const locationEl = $(`
        <div class="ms-2">
          <p><strong>${location}</strong></p>
        </div>
        `).appendTo(modalBody);

        for (let item of itemList) {
          locationEl.append($(`
          <p class="ms-2">${items[location][item].id.length} ${item}(s)</p>
          `))
        }
      }
    }
  }

  async function handleConfirm(e) {
    e.preventDefault();

    if (confirmBtn.attr("class") === "btn btn-primary") {
      const allItemIds = []
      let newDatesId;

      try {
        const newDates = {
          checkoutDate: checkoutDate,
          returnDate: returnDate
        }

        const query = await fetch('/api/dates', {
          method: 'POST',
          body: JSON.stringify(newDates),
          headers: { 'Content-Type': 'application/json' },
        });

        const response = await query.json();

        if (response.status === "success") {
          newDatesId = response.result._id;
        }
        else
          throw new Error("Create Dates failed");
      }
      catch (err) {
        console.log(err.message)
      }

      for (let location of Object.keys(items)) {
        for (let item of Object.keys(items[location])) {
          const idArr = items[location][item].id;

          for (let id of idArr) {
            allItemIds.push(id);

            try {
              const query = await fetch(`/api/items/${id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                }
              });

              const response = await query.json();

              if (response.status === "success") {
                const result = response.result;

                result.datesInUse.push(newDatesId);

                try {
                  const query1 = await fetch(`/api/items/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(result),
                    headers: { 'Content-Type': 'application/json' },
                  });

                  const response1 = await query1.json();

                  if (response1.status !== "success")
                    throw new Error("Update Item failed")
                }
                catch (err) {
                  console.log(err.message)
                }
              }
              else
                throw new Error("Get Item failed")
            }
            catch (err) {
              console.log(err.message);
            }
          }
        }
      }

      try {
        const newOrder = {
          items: allItemIds,
          datesInUse: [newDatesId],
          whoOrdered: name,
          email: email
        }

        const query = await fetch('/api/orders', {
          method: 'POST',
          body: JSON.stringify(newOrder),
          headers: { 'Content-Type': 'application/json' },
        });

        const response = await query.json();

        if (response.status !== "success")
          throw new Error("Create Order failed");
      }
      catch (err) {
        console.log(err.message);
      }

      await getItems();
      await getOrders();
      checkAvailability();

      modalBody.empty();
      modalBody.text("Order confirmed!");

      for (let key in items)
        delete items[key];

      confirmBtn.attr("class", "btn btn-primary d-none");
    }
  }

  function uppercaseSort(a, b) {
    const stringA = a.toUpperCase();
    const stringB = b.toUpperCase();

    if (stringA < stringB)
      return -1;

    if (stringA > stringB)
      return 1;

    return 0;
  }

  body.on("input", "#name", function () { name = $(this).val(); });
  body.on("input", "#email", function () { email = $(this).val(); });
  body.on("submit", "#date-select", checkAvailability);
  body.on("click", "#checkout-btn", handleCheckout);
  body.on("click", "#confirm-btn", handleConfirm);

  body.on("input", "[type=number]", function () {
    const id = $(this).attr("id");
    const [location, itemName] = id.split("-")
    const maxVal = Number($(this).attr("max"));
    let val = Number($(this).val());
    let itemGroup;

    if (val > maxVal) {
      val = maxVal;
      $(this).val(maxVal);
    }
    else if (val < 0) {
      val = 0;
      $(this).val(0);
    }

    for (let itemArr of availableItems) {
      const foundItem = itemArr.find((item) => item._id.name === itemName && item._id.location === location);

      if (foundItem) {
        itemGroup = foundItem;
        break;
      }
    }

    if (val > 0) {
      if (!items[location])
        items[location] = {};

      items[location] = { ...items[location], [itemName]: { id: [] } };

      for (let i = 0; i < val; i++) {
        items[location][itemName].id.push(itemGroup.data[i].id);
      }
    }
    else {
      if (items[location]) {
        if (items[location][itemName])
          delete items[location][itemName];

        if (Object.keys(items[location]).length === 0)
          delete items[location];
      }
    }
  })
});
