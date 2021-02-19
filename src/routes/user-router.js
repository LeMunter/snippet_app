/**
 * Main router.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import { authorize } from '../config/authorizer.js'
import express from 'express'
import { UserController } from '../controllers/user-controller.js'
import { csrfCheck } from '../config/validator.js'

export const router = express.Router()

const controller = new UserController()

router.get('/register', (req, res, next) => controller.register(req, res, next))
router.post('/register', (req, res, next) => controller.createUser(req, res, next))
router.get('/login', (req, res, next) => controller.login(req, res, next))
router.post('/login', (req, res, next) => controller.loginPost(req, res, next))
router.post('/logout',
  (req, res, next) => csrfCheck(req, res, next),
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => controller.logoutPost(req, res, next)
)
