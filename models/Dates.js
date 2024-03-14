import { Schema, model } from 'mongoose';

const datesSchema = new Schema(
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

const Dates = model('Dates', datesSchema);

export default Dates;
