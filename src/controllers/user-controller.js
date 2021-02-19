import { User } from '../models/user.js'
import { Snippet } from '../models/snippet.js'
import bcrypt from 'bcrypt'
import moment from 'moment'

/**
 * User controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */
export class UserController {
  /**
   * Display all register form.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
  //   const user = new User({
  //     username: 'anton12',
  //     password: 'abcdefghijk',
  //     snippets: []
  //   })
  //   await user.save()

    //   console.log(user)

    // const result = await User.updateOne({ username: 'anton12' }, {
    //   $push: { snippets: '602e939d912f257020979851' }
    // })

    // const user = await User.findOne({ username: 'anton12' })
    // console.log(result.nModified === 1)
    // console.log(user)

    try {
      res.render('users/registration')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createUser (req, res) {
    try {
      const { userName, password, confirmPassword } = req.body

      await User.matchingPasswords(password, confirmPassword)
      await User.checkDuplicate(userName)

      const user = new User({
        username: userName,
        password: password
      })

      await user.save()

      req.session.flash = { type: 'success', text: 'The snippet was saved successfully.' }
      res.redirect('./login')
    } catch (error) {
      // If an error, or validation error, occurred, view the form and an error message.
      res.render('users/registration', {
        validationErrors: [error.message] || [error.errors.value.message],
        value: req.body.value
      })
    }
  }

  /**
   * Displays login form.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      res.render('users/login')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async loginPost (req, res) {
    try {
      const user = await User.authenticate(req.body.userName, req.body.password)
      const csrfToken = await bcrypt.hash(user._id.toString(), 8)
      req.session.regenerate(() => {
        req.session.auth = user._id
        req.session.loggedIn = true
        req.session._csrf = csrfToken
        req.session.flash = { type: 'success', text: 'Login was successful.' }
        res.redirect('/')
      })
    } catch (error) {
      // If an error, or validation error, occurred, view the form and an error message.
      res.render('users/login', {
        validationErrors: [error.message] || [error.errors.value.message],
        value: req.body.value
      })
    }
  }

  /**
   * Logout.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logoutPost (req, res) {
    try {
      req.session.destroy(() => {
        res.redirect('/')
      })
    } catch (error) {
      // If an error, or validation error, occurred, view the form and an error message.
      res.render('/', {
        validationErrors: [error.message] || [error.errors.value.message],
        value: req.body.value
      })
    }
  }

  /**
   * Display all snippets for a single user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async mySnippets (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find({ author: req.session.auth }))
          .map(snippet => ({
            id: snippet._id,
            createdAt: moment(snippet.createdAt).fromNow(),
            name: snippet.name
          }))
          .sort((a, b) => a.value - b.value)
      }

      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
