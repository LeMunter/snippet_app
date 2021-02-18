import createError from 'http-errors'
import { Snippet } from '../models/snippet.js'
import { User } from '../models/user.js'

/**
 *
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authorize = async (req, res, next) => {
  console.log(req.session.loggedIn)
  if (!req.session) {
    return next(createError(404))
  }
  console.log('auth')

  next()
}

/**
 *
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const checkOwnerView = async (req, res, next) => {
  if (req.session.loggedIn) {
    const user = await User.findOne({ _id: req.session.auth }).lean()
    res.locals.isOwner = user.snippets.includes(req.params.id)
  }
  next()
}
