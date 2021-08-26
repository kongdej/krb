
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home'},
      { path: '/home',
        component: () => import('pages/Home/Home.vue') ,
        children: [
          {
            path: '/home/edit/:id',
            component: () => import('pages/Home/Edit.vue'),
          }
        ]
      },
      { path: '/questions',
        component: () => import('pages/Questions/Questions.vue'),
        children: [
          {
            path : '/questions/answer/:id',
            component: () => import('pages/Questions/Answer.vue'),
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    //component: () => import('pages/Error404.vue')
    component: () => import('pages/Home/Home.vue') ,
  }
]

export default routes
