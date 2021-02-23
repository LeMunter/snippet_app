/**
 * Module for redis.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import redis from 'redis'
import connectRedis from 'connect-redis'

/**
 * Create redis object.
 *
 * @param {object} session - Session object.
 * @returns {object} - Redis object.
 */
export const redisStore = async (session) => {
  const RedisStore = connectRedis(session)
  // Configure redis client
  const redisClient = redis.createClient({
    host: process.env.REDIS_CON,
    port: 6379
  })

  redisClient.on('error', err => {
    console.log('Could not establish a connection with redis. ' + err)
  })
  redisClient.on('connect', () => {
    console.log('Connected to redis successfully')
  })

  return new RedisStore({ client: redisClient })
}
