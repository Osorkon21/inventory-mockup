$(function () {
  async function getOrders() {
    // loading.text("Loading orders...")

    try {
      const query = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();

      if (response.status === "success") {
        allOrders = response.result;

        orderContainer.empty();

        if (allOrders.length)
          populatePage();

      }
      else
        throw new Error("Get all Orders failed")
    }
    catch (err) {
      console.log(err.message);
    }

    // loading.text("")
  }



  function populatePage() {
    for (let order of allOrders) {
      orderContainer.append($(`
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column me-5">
          <span>Ordered by: <strong>${order.whoOrdered}</strong></span>
          <span>Item Count: <strong>${order.items.length}</strong></span>
          <span>Checkout: <strong>${new Date(order.datesInUse[0].checkoutDate).toLocaleString().substring(0, 9)}</strong></span>
          <span>Return: <strong>${new Date(order.datesInUse[0].returnDate).toLocaleString().substring(0, 9)}</strong></span>
        </div>
        <div>
          <button type="button" class="btn btn-success return-btn" id="${order._id}">Return to Inventory</button>
        </div>
      </div>
      `))
    }
  }

  const body = $("body");
  const orderContainer = $("#order-container")
  // const loading = $("#loading")

  let allOrders = [];

  getOrders();

  body.on("click", ".return-btn", async function () {
    try {
      const query = await fetch(`/api/orders/${$(this).attr("id")}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();

      if (response.status === "success") {
        await getOrders();
      }
      else
        throw new Error("Delete Order failed")
    }
    catch (err) {
      console.log(err.message);
    }
  });
});
