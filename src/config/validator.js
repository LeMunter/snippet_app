import createError from 'http-errors'
import mongoose from 'mongoose'

/**
 *
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

/**
 *
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
