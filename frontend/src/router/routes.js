const routes = [
  {
    path: '/',
    meta: {
      guest: true
    },
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('pages/auth/SigIn.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('pages/auth/Register.vue')
      }
    ]
  },
  {
    path: '',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('pages/user/Profile.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
