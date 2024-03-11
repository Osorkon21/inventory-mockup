import { Schema, model } from 'mongoose';

function formatTimeStamp(val) {
  return val.toLocaleString();
}

const orderSchema = new Schema(
  {
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item"
      }
    ],
    checkoutDate: {
      type: Date,

      // all checkoutDate get query results will be formatted by this function first
      get: formatTimeStamp
    },
    returnDate: {
      type: Date,
      get: formatTimeStamp
    },
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
    // when sending anything as JSON, include the getters
    toJSON: {
      getters: true,
    },

    // don't include a default getter for the _id property
    id: false
  }
)

const Order = model('Order', orderSchema);

export default Order;
