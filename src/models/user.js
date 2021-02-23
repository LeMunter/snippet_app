/**
 * User schema.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

/**
 * Check if passwords are matching.
 *
 * @param {string} password - Password.
 * @param {string} confirmPassword - The confirmed password.
 */
schema.statics.matchingPasswords = async function (password, confirmPassword) {
  if (password !== confirmPassword) {
    throw new Error('Passwords not matching.')
  }
}

/**
 * Check for duplicate user.
 *
 * @param {string} username - The username.
 */
schema.statics.checkDuplicate = async function (username) {
  const users = await this.find({ username })

  if (users.length !== 0) {
    throw new Error('Username taken.')
  }
}

/**
 * Authenticate password for a user.
 *
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {object} User.
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

export const User = mongoose.model('User', schema)
