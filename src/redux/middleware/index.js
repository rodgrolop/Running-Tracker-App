import coreMiddleware from './core'
import userMiddleware from './user'
import trackingMiddleware from './tracking'

export default [
    ...coreMiddleware,
    ...userMiddleware,
    ...trackingMiddleware,
]
