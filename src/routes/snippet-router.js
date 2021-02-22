/**
 * Snippet routes.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import { authorize, checkOwnerView, authorizeOwner } from '../config/authorizer.js'
import express from 'express'
import { SnippetController } from '../controllers/snippet-controller.js'
import { csrfCheck, validateId } from '../config/validator.js'

export const router = express.Router()

const controller = new SnippetController()

// Free for all.
router.get('/', (req, res, next) => controller.index(req, res, next))

// Requests for authorized users only.
router.get('/new',
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => controller.new(req, res, next))
router.post('/create',
  (req, res, next) => csrfCheck(req, res, next),
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => controller.create(req, res, next))

//   Requests where all users can see, but with added functionality for snippet owner.
router.get('/:id',
  (req, res, next) => validateId(req, res, next),
  (req, res, next) => checkOwnerView(req, res, next),
  (req, res, next) => controller.show(req, res, next))

//   Requests private to the owner of the snippet.
router.get('/:id/edit',
  (req, res, next) => validateId(req, res, next),
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => authorizeOwner(req, res, next),
  (req, res, next) => controller.edit(req, res, next))
router.post('/:id/edit/update',
  (req, res, next) => csrfCheck(req, res, next),
  (req, res, next) => validateId(req, res, next),
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => authorizeOwner(req, res, next),
  (req, res, next) => controller.update(req, res, next))
router.get('/:id/confirm',
  (req, res, next) => validateId(req, res, next),
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => authorizeOwner(req, res, next),
  (req, res, next) => controller.confirm(req, res, next))
router.post('/:id/confirm/delete',
  (req, res, next) => csrfCheck(req, res, next),
  (req, res, next) => validateId(req, res, next),
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => authorizeOwner(req, res, next),
  (req, res, next) => controller.delete(req, res, next))
