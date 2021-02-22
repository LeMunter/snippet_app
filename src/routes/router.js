/**
 * The routes.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as mainRouter } from './main-router.js'
import { router as userRouter } from './user-router.js'
import { router as snippetRouter } from './snippet-router.js'

export const router = express.Router()

router.use('/', mainRouter)
router.use('/user', userRouter)
router.use('/snippets', snippetRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
