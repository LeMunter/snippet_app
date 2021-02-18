/**
 * Snippet routes.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import { authorize, checkOwnerView } from '../config/authorizer.js'
import express from 'express'
import { SnippetController } from '../controllers/snippet-controller.js'

export const router = express.Router()

const controller = new SnippetController()

router.get('/', (req, res, next) => controller.index(req, res, next))
router.get('/new', (req, res, next) => controller.new(req, res, next))
router.post('/create', (req, res, next) => controller.create(req, res, next))
router.get('/:id',
  (req, res, next) => checkOwnerView(req, res, next),
  (req, res, next) => controller.show(req, res, next))
router.get('/:id/edit', (req, res, next) => controller.edit(req, res, next))
router.post('/:id/update', (req, res, next) => controller.update(req, res, next))
router.get('/:id/remove', (req, res, next) => controller.remove(req, res, next))
router.post('/:id/delete', (req, res, next) => controller.delete(req, res, next))
