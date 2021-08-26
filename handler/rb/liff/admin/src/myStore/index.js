import { reactive } from 'vue'

const state = reactive({
  usePageTransition: true,
  grandChildVisit: 0,
  navItems: [
    {
      to: '/',
      icon: 'las la-home',
      label: 'Home'
    },
    {
      to: '/questions',
      icon: 'las la-question',
      label: 'Question'
    }

  ]
})

const methods = {
  increateCount() {
    state.grandChildVisit++
  }
}

export default {
  state,
  methods
}
