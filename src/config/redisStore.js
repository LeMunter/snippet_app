import redis from 'redis'
import connectRedis from 'connect-redis'

/**
 * @param session
 */
export const redisStore = async (session) => {
  const RedisStore = connectRedis(session)
  // Configure redis client
  const redisClient = redis.createClient({
    host: 'redis',
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
