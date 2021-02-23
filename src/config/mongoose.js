/**
 * Module for mongoose.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Connect to mongodb database.
 *
 * @returns {object} - Mongodb object
 */
export const connectDB = async () => {
  mongoose.connection.on('connected', () =>
    console.log('Mongoose connection is open')
  )

  mongoose.connection.on('error', err =>
    console.log(`error ${err}`)
  )

  mongoose.connection.on('disconnected', () =>
    console.log('Disconnected')
  )

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connections is closed due to application termination.')
      process.exit(0)
    })
  })

  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
