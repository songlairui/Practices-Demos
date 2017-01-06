import VueRouter from 'vue-router'

const Foo = { template: '<div>foo</div>' }
const Home = { template: '<div>bar</div>' }

import Launcher from './components/content/launcher'
import Game1 from './components/play/game1'

const routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo },
  { path: '/content/android/launcher', component: Launcher },
  { path: '/play/game1', component: Game1 }
]

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
