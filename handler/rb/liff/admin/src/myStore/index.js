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
      to: '/keyword',
      icon: 'las la-search',
      label: 'Keyword'
    },
    {
      to: '/trend',
      icon: 'las la-sort-amount-up',
      label: 'Trend'
    },
    {
      to: '/logging',
      icon: 'las la-info-circle',
      label: 'Logging'
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
