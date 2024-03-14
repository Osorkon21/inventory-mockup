import express from "express"
const router = express.Router();
import { Item } from "../../models/index.js"

// get all Items
router.get("/", async (_, res) => {
  try {
    const result = await Item.aggregate([
      {
        $group: {
          _id: { name: "$name", location: "$location" },
          count: { $sum: 1 },
          data: {
            $push: { id: "$_id", datesInUse: "$datesInUse" }
          }
        }
      },
      {
        $match: {
          count: { $gt: 0 }
        }
      },
      {
        $unwind: "$data"
      },
      {
        $lookup: {
          from: "dates",
          localField: "data.datesInUse",
          foreignField: "_id",
          as: "data.datesInUse"
        }
      },
      {
        $group: {
          _id: "$_id",
          count: { $first: "$count" },
          data: { $push: "$data" }
        }
      }
    ]);

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// get an Item
router.get("/:itemId", async (req, res) => {
  try {
    const result = await Item.findOne({ _id: req.params.itemId })

      // do not include __v field in the query results
      .select("-__v");

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// create new Item
// router.post("/", async (req, res) => {
//   try {
//     const result = await Item.create(req.body);

//     res.json({ status: "success", result });
//   }
//   catch (err) {
//     console.error(err.message);
//     res.status(500).json({ status: "error", result: err.message });
//   }
// });

// modify existing Item
router.put("/:itemId", async (req, res) => {
  try {

    // find and update Item
    const result = await Item.findOneAndUpdate(

      // find Item with this filter
      {
        _id: req.params.itemId
      },

      // update found Item with incoming info
      req.body,

      // "result" is now the Item after update runs
      {
        new: true
      }
    );

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// delete existing Item
// router.delete("/:itemId", async (req, res) => {
//   try {
//     const result = await Item.findByIdAndDelete(req.params.itemId);

//     // delete Item's Thoughts when Item deleted
//     for (var i = 0; i < result.thoughts.length; i++)
//       await Thought.findByIdAndDelete(result.thoughts[i]);

//     res.json({ status: "Item and all thoughts deleted!", result });
//   }
//   catch (err) {
//     console.error(err.message);
//     res.status(500).json({ status: "error", result: err.message });
//   }
// });

// add friend to Item's friends list
// router.post("/:itemId/friends/:friendId", async (req, res) => {
//   try {
//     const result = await Item.findOneAndUpdate(
//       {
//         // find Item
//         _id: req.params.itemId
//       },
//       {
//         // add new friend to Item's friends array
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

// remove friend from Item's friends list
// router.delete("/:itemId/friends/:friendId", async (req, res) => {
//   try {
//     const result = await Item.findOneAndUpdate(
//       {
//         // find Item
//         _id: req.params.itemId
//       },
//       {
//         // remove friend from Item's friends array
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
