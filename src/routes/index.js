import Home from '../components/Home.vue'
import Play from '../components/Play.vue'
import Ranking from '../components/Ranking.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/play',
    name: 'play',
    component: Play
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking
  }
]
