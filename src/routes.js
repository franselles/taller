export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/login/Login.vue'),
    meta: { requiresAuth: false, level: 0 }
  },
  {
    path: '/principal',
    component: () => import('./views/dashboard/Principal.vue'),
    name: 'principal',
    meta: { requiresAuth: true, level: 0 },
    children: [
      {
        path: 'partes',
        name: 'partes',
        component: () => import('./views/dashboard/Partes.vue')
      },
      {
        path: 'parte',
        name: 'parte',
        component: () => import('./views/dashboard/Parte.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('./views/dashboard/Orders.vue')
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('./views/dashboard/Detail.vue')
      }
    ]
  }
];
