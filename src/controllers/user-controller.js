import { User } from '../models/user.js'
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
    console.log('register')
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
      req.session.regenerate(() => {
        req.session.auth = user.username
        req.session.loggedIn = true
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
}
