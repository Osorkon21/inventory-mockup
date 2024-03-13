import db from '../config/connection.js';
import { Item } from "../models/index.js"

const seedData = [
  {
    name: "Easel",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Easel",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    datesInUse: []
  },
  {
    name: "Table",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Table",
    location: "Minneapolis",
    datesInUse: []
  },
  {
    name: "Table",
    location: "Mankato",
    datesInUse: []
  }
];

db.once('open', async () => {
  await Item.insertMany(seedData)
  console.log("seeding complete")
  process.exit(0)
});

/*
  To seed data:

  1. Import your model
  2. Create an array of data with the variable name seedData
  3. Uncomment the code above and replace MODEL with your imported model

*/
