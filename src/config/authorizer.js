import createError from 'http-errors'

/**
 *
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authorize = async (req, res, next) => {
  // if (true) {
  //   return next(createError(404))
  // }
  // console.log('auth')

  next()
}
