import { Schema, model } from 'mongoose';

const dateSchema = new Schema(
  {
    checkoutDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date,
      required: true
    }
  },
  {
    // don't include a default getter for the _id property
    id: false
  }
)

const Date = model('Date', dateSchema);

export default Date;
