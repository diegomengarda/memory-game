import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import beforeEach from './routes/beforeEach'

Vue.use(Router)

/**
 * Create VueRouter instance
 * @type {VueRouter}
 */
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes
  ]
})

// Setup a before each for routes.
router.beforeEach(beforeEach)

export default router
