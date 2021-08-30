import { boot } from 'quasar/wrappers'

const globalComponents = {
  'page': require('components/Page/Page').default,
  'pageHeader': require('components/Page/PageHeader').default,
  'PageHeaderBtnBack': require('components/Page/PageHeaderBtnBack').default,
  'pageBody': require('components/Page/PageBody').default,
  'pageFooter': require('components/Page/PageFooter').default
}
export default boot(async ({ app}) => {
  for (const key in globalComponents) {
    app.component(key, globalComponents[key])
    console.log('load components',key)
  }
})
