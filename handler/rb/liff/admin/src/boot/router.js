import { boot } from 'quasar/wrappers'
import store from 'src/myStore'

export default boot(({ router }) => {
  router.afterEach((to, from) => {
    let fromRootPath = from.path.split('/')[1],
        toRootPath = to.path.split('/')[1]

    if (fromRootPath !== toRootPath) {
      store.state.usePageTransition = false
    }
    else {
      store.state.usePageTransition = true
    }
  })
})
