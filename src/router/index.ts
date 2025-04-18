import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { supabase } from '@/services/supabase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Tab0Page.vue')
      },
      {
        path: 'reports',
        component: () => import('@/views/ReportsPage.vue')
      },
      {
        path: 'achievements',
        component: () => import('@/views/AchievementsPage.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/ProfilePage.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/new-report',
    component: () => import('@/views/NewReportPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chat-report',
    component: () => import('@/views/ChatReportPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/signin',
    component: () => import('@/views/auth/SignInPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/signup',
    component: () => import('@/views/auth/SignUpPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/tabs/home' // Redirect undefined paths to the home page
  }
]

const baseUrl = import.meta.env.BASE_URL || '/';
console.log('Router Base URL:', baseUrl);

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // Check if user is authenticated
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  
  if (requiresAuth && !user) {
    // Redirect to login if authentication is required but user is not logged in
    next('/auth/signin');
  } else if (!requiresAuth && user && (to.path === '/auth/signin' || to.path === '/auth/signup')) {
    // Redirect to home if user is already logged in and trying to access auth pages
    next('/');
  } else {
    // Proceed as normal
    next();
  }
});

export default router
