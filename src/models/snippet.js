/**
 * Snippet schema.
 *
 * @author Anton Munter
 * @version 1.0.0
 */
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'The name must contain at least 3 characters.'],
    maxlength: [40, 'The name must not contain more than least 25 characters.']
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  code: {
    type: String,
    required: true,
    trim: false,
    maxlength: [500, 'The snippet must not contain more than least 1000 characters.']
  }
}, {
  timestamps: true
})

export const Snippet = mongoose.model('Snippet', schema)
