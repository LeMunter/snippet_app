/**
 * Main router.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()

router.get('/register', (req, res, next) => controller.register(req, res, next))
router.post('/register', (req, res, next) => controller.createUser(req, res, next))
router.get('/login', (req, res, next) => controller.login(req, res, next))
router.post('/login', (req, res, next) => controller.auth(req, res, next))
