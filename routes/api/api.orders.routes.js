import express from "express"
const router = express.Router();
import { Order } from "../../models/index.js"

// get all Orders
router.get("/", async (req, res) => {
  try {
    const result = await Order.find()

      // do not include __v field in the query results
      .select("-__v")
      .populate("datesInUse");

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// get an Order
router.get("/:orderId", async (req, res) => {
  try {
    const result = await Order.findOne({ _id: req.params.orderId })

      // do not include __v field in the query results
      .select("-__v");

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// create new Order
router.post("/", async (req, res) => {
  try {
    const result = await Order.create(req.body);

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// modify existing Order
// router.put("/:orderId", async (req, res) => {
//   try {

//     // find and update Order
//     const result = await Order.findOneAndUpdate(

//       // find Order with this filter
//       {
//         _id: req.params.orderId
//       },

//       // update found Order with incoming info
//       req.body,

//       // "result" is now the Order after update runs
//       {
//         new: true
//       }
//     );

//     res.json({ status: "success", result });
//   }
//   catch (err) {
//     console.error(err.message);
//     res.status(500).json({ status: "error", result: err.message });
//   }
// });

// delete existing Order
router.delete("/:orderId", async (req, res) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.orderId);

    // delete Order's Thoughts when Order deleted
    for (var i = 0; i < result.thoughts.length; i++)
      await Thought.findByIdAndDelete(result.thoughts[i]);

    res.json({ status: "Order and all thoughts deleted!", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// add friend to Order's friends list
// router.post("/:orderId/friends/:friendId", async (req, res) => {
//   try {
//     const result = await Order.findOneAndUpdate(
//       {
//         // find Order
//         _id: req.params.orderId
//       },
//       {
//         // add new friend to Order's friends array
//         $push: { friends: req.params.friendId }
//       },
//       {
//         new: true
//       }
//     );

//     res.json({ status: "success", result });
//   }
//   catch (err) {
//     console.error(err.message);
//     res.status(500).json({ status: "error", result: err.message });
//   }
// });

// remove friend from Order's friends list
// router.delete("/:orderId/friends/:friendId", async (req, res) => {
//   try {
//     const result = await Order.findOneAndUpdate(
//       {
//         // find Order
//         _id: req.params.orderId
//       },
//       {
//         // remove friend from Order's friends array
//         $pull: { friends: req.params.friendId }
//       },
//       {
//         new: true
//       }
//     );

//     res.json({ status: "delete successful", result });
//   }
//   catch (err) {
//     console.error(err.message);
//     res.status(500).json({ status: "error", result: err.message });
//   }
// });

export default router;
