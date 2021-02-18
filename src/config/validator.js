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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(createError(404))
  }

  next()
}
