import { Schema, model } from 'mongoose';

const dateSchema = new Schema(
  {
    checkoutDate: {
      type: Date,
      required: true,
      default: null
    },
    returnDate: {
      type: Date,
      required: true,
      default: null
    }
  }
)

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    datesInUse: [dateSchema]
  },
  {
    // excludes default getter for _id field
    id: false
  }
)

const Item = model('Item', itemSchema);

export default Item;
