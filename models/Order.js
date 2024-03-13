import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item"
      }
    ],
    datesInUse: [
      {
        type: Schema.Types.ObjectId,
        ref: "Date"
      }
    ],
    whoOrdered: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    // don't include a default getter for the _id property
    id: false
  }
)

const Order = model('Order', orderSchema);

export default Order;
