import { Schema, model } from 'mongoose';

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
    datesInUse: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dates"
      }
    ]
  },
  {
    // excludes default getter for _id field
    id: false
  }
)

const Item = model('Item', itemSchema);

export default Item;
