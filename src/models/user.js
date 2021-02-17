import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'The password must contain at least 10 characters.']
  }
}, {
  timestamps: true,
  versionKey: false
})

export const Snippet = mongoose.model('User', schema)
