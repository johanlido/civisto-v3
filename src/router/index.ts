import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { supabase } from '@/services/supabase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/chat-report'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'chat-report',
        component: () => import('@/views/ChatReportPage.vue')
      },
      {
        path: 'achievements',
        component: () => import('@/views/AchievementsPage.vue')
      },
      {
        path: 'reports',
        component: () => import('@/views/ReportsPage.vue') 
      },
      {
        path: 'profile',
        component: () => import('@/views/ProfilePage.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },        
      {
        path: '',
        redirect: '/tabs/chat-report' 
      }
    ],
    meta: { requiresAuth: false }
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (requiresAuth && !user) {
    next('/auth/signin');
    return;
  }
  if (!requiresAuth && user && (to.path === '/auth/signin' || to.path === '/auth/signup')) {
    next('/tabs/home');
    return;
  }
  next();
  return;
});
export default router
