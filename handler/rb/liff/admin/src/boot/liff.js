import { boot } from 'quasar/wrappers'

export default boot(async ({ app }) => {

  app.config.globalProperties.$liff = liff

  app.config.globalProperties.$userId = 'U92803b371b5928a891815398ff3a5e5c'
  app.config.globalProperties.$displayName = 'Dejkong Ransomsri'
  app.config.globalProperties.$pictureUrl = 'https://profile.line-scdn.net/0hPUkA6wf0D3pWOCXPCxxwLWp9ARchFgkyLl9AH3dtBEt7Wkgsbg5FH3ZqV0krX0gubwpJT3FvWBh9'

/*
  liff
    .init({ liffId: '1655904590-r5y8V1py' })
    .then(async () => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          app.config.globalProperties.$userId = profile.userId
          app.config.globalProperties.$displayName = profile.displayName
          app.config.globalProperties.$pictureUrl = profile.pictureUrl
          console.log(profile.userId)
          console.log(profile.displayName)
          console.log(profile.pictureUrl)
        })
      }
      else {
        liff.login()
      }
    })
    .catch(err => {
      console.log(err)
    })
  */
})
