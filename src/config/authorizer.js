/**
 * Module for authorizing functions.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import createError from 'http-errors'
import { Snippet } from '../models/snippet.js'

// eslint-disable-next-line jsdoc/require-returns
/**
 * Authorizes a user.
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

// eslint-disable-next-line jsdoc/require-returns
/**
 * Authorizes a user as the owner of a snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authorizeOwner = async (req, res, next) => {
  const snippet = await Snippet.findOne({ _id: req.params.id }).lean()
  if (snippet.author !== req.session.auth) {
    return next(createError(403))
  }

  next()
}

/**
 * Set owner view if user is the owner of a snippet.
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
