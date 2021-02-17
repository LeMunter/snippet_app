import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  code: {
    type: String,
    required: true,
    trim: false,
    minlength: 1
  }
}, {
  timestamps: true
})

export const Snippet = mongoose.model('Snippet', schema)
