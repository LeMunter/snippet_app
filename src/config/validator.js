/**
 * Module for validator.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import createError from 'http-errors'
import mongoose from 'mongoose'

// eslint-disable-next-line jsdoc/require-returns
/**
 * Validate id for moongose.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const validateId = async (req, res, next) => {
  console.log('-------------------------------')

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(createError(404))
  }

  next()
}
// eslint-disable-next-line jsdoc/require-returns
/**
 * Check csrf token.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const csrfCheck = async (req, res, next) => {
  if (!req.session._csrf === req.body._csrf) {
    return next(createError(403))
  }

  next()
}
