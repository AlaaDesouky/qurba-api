import { model, Schema, Types } from 'mongoose';
import { Restaurant } from 'types';

const RestaurantSchema = new Schema<Restaurant>({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  slug: String,
  cuisine: {
    type: [String],
    required: [true, 'Please provide at least one cuisine']
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
      min: 2,
      max: 2
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user']
  }
})

export default model("Restaurant", RestaurantSchema)