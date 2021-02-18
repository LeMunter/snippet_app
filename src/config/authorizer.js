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
  if (!req.session.loggedIn) {
    return next(createError(404))
  }

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
    const snippet = await Snippet.findOne({ _id: req.params.id }).lean()
    res.locals.isOwner = snippet.author === req.session.auth
  }
  next()
}
