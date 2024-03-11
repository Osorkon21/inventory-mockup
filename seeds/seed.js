import db from '../config/connection.js';
import { Item } from "../models/index.js"

const seedData = [
  {
    name: "Easel",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 19),
    returnDate: new Date(2024, 2, 25)
  },
  {
    name: "Easel",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 19),
    returnDate: new Date(2024, 2, 25)
  },
  {
    name: "Easel",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 19),
    returnDate: new Date(2024, 2, 25)
  },
  {
    name: "Easel",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 19),
    returnDate: new Date(2024, 2, 25)
  },
  {
    name: "Easel",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 20)
  },
  {
    name: "Easel",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 20)
  },
  {
    name: "Easel",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 20)
  },
  {
    name: "Easel",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 20)
  },
  {
    name: "Easel",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 16)
  },
  {
    name: "Easel",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 16)
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 16)
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 16)
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 14),
    returnDate: new Date(2024, 2, 17)
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 14),
    returnDate: new Date(2024, 2, 17)
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 14),
    returnDate: new Date(2024, 2, 17)
  },
  {
    name: "Whiteboard",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 14),
    returnDate: new Date(2024, 2, 17)
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 18)
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 18)
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 18)
  },
  {
    name: "Whiteboard",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 15),
    returnDate: new Date(2024, 2, 18)
  },
  {
    name: "Table",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 20),
    returnDate: new Date(2024, 2, 23)
  },
  {
    name: "Table",
    location: "Minneapolis",
    checkoutDate: new Date(2024, 2, 20),
    returnDate: new Date(2024, 2, 23)
  },
  {
    name: "Table",
    location: "Mankato",
    checkoutDate: new Date(2024, 2, 20),
    returnDate: new Date(2024, 2, 23)
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
