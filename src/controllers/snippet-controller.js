import { Snippet } from '../models/snippet.js'
import moment from 'moment'

/**
 * Snippet controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */
export class SnippetController {
  /**
   * Display all snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    // const snippet = new Snippet({
    //   name: 'antons12',
    //   author: '602e93421ef41c55b8587a95',
    //   code: 'massakod'
    // })
    // await snippet.save()

    try {
      const viewData = {
        snippets: (await Snippet.find({}))
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

  /**
   * Display specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async show (req, res, next) {
    try {
      const viewData = await Snippet.findOne({ _id: req.params.id }).lean()
      res.render('snippets/show', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Display form for creating snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async new (req, res, next) {
    console.log('new')
    try {
      const viewData = {
        nameValue: undefined,
        codeValue: undefined
      }
      res.render('snippets/new', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res) {
    try {
      const snippet = new Snippet({
        name: req.body.nameValue,
        author: req.session.auth,
        code: req.body.codeValue
      })
      await snippet.save()

      // ...and redirect and show a message.
      req.session.flash = { type: 'success', text: 'The snippet was saved successfully.' }
      res.redirect('.')
    } catch (error) {
      // If an error, or validation error, occurred, view the form and an error message.
      res.render('snippets/new', {
        validationErrors: [error.message] || [error.errors.value.message],
        value: req.body.value
      })
    }
  }

  /**
   * Display form for editing snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async edit (req, res, next) {
    console.log('edit')
  }

  /**
   * Update a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    console.log('update')
  }

  /**
   * Display page for removing a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async remove (req, res, next) {
    console.log('remove')
  }

  /**
   * Display a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    console.log('delete')
  }
}
