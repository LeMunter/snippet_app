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
   * @param {Function} next - Express next middleware function.
   */
  async createUser (req, res) {
    try {
      const { userName, password, confirmPassword } = req.body
      console.log(password + ' ' + confirmPassword)

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
   * Creates a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    console.log('register')
    try {
      res.render('users/login')
    } catch (error) {
      next(error)
    }
  }
}
