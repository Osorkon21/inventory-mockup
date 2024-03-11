import express from "express"
const router = express.Router();
import { Item } from "../../models/index.js"

// get all Items
router.get("/", async (req, res) => {
  try {
    const result = await Item.find()

      // do not include __v field in the query results
      .select("-__v");

    res.json({ status: "success", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// get a Item
// router.get("/:ItemId", async (req, res) => {
//   try {
//     const result = await Item.findOne({ _id: req.params.ItemId })

//       // do not include __v field in the query results
//       .select("-__v")

//       // add thoughts and friends associated with this Item to query results, without their __v fields
//       .populate([
//         { path: "thoughts", select: "-__v" },
//         { path: "friends", select: "-__v" }
//       ]);

//     res.json({ status: "success", result });
//   }
//   catch (err) {
//     console.error(err.message);
//     res.status(500).json({ status: "error", result: err.message });
//   }
// });

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
router.put("/:ItemId", async (req, res) => {
  try {

    // find and update Item
    const result = await Item.findOneAndUpdate(

      // find Item with this filter
      {
        _id: req.params.ItemId
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
router.delete("/:ItemId", async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.ItemId);

    // delete Item's Thoughts when Item deleted
    for (var i = 0; i < result.thoughts.length; i++)
      await Thought.findByIdAndDelete(result.thoughts[i]);

    res.json({ status: "Item and all thoughts deleted!", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// add friend to Item's friends list
router.post("/:ItemId/friends/:friendId", async (req, res) => {
  try {
    const result = await Item.findOneAndUpdate(
      {
        // find Item
        _id: req.params.ItemId
      },
      {
        // add new friend to Item's friends array
        $push: { friends: req.params.friendId }
      },
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

// remove friend from Item's friends list
router.delete("/:ItemId/friends/:friendId", async (req, res) => {
  try {
    const result = await Item.findOneAndUpdate(
      {
        // find Item
        _id: req.params.ItemId
      },
      {
        // remove friend from Item's friends array
        $pull: { friends: req.params.friendId }
      },
      {
        new: true
      }
    );

    res.json({ status: "delete successful", result });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", result: err.message });
  }
});

export default router;
