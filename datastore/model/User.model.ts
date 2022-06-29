import { model, Schema } from 'mongoose'
import { User } from 'types'
import validator from 'validator'


const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    },
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  fullName: {
    type: String,
    maxlength: 20,
    trim: true
  },
  favCuisine: {
    type: [String]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      min: 2,
      max: 2,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default model("User", UserSchema)
