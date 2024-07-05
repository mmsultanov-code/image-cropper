import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'authView',
		component: () => import('../views/auth.vue')
	},
	{
		path: '/dashboard',
		component: () => import('../views/dashboard/index.vue'),
		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('../views/dashboard/home.vue')
			},
			{
				path: 'users',
				component: () => import('../views/dashboard/users/index.vue'),
				children: [
					{
						path: '',
						name: 'Users',
						component: () => import('../views/dashboard/users/list.vue')
					},
					{
						path: 'create',
						name: 'UserCreate',
						component: () => import('../views/dashboard/users/create.vue')
					},
					{
						path: 'edit/:id',
						name: 'UserEdit',
						component: () => import('../views/dashboard/users/edit.vue')
					},
				]
			},
			{
				path: 'posts',
				component: () => import('../views/dashboard/posts/index.vue'),
				children: [
					{
						path: '',
						name: 'Post',
						component: () => import('../views/dashboard/posts/list.vue')
					},
					{
						path: 'create',
						name: 'PostCreate',
						component: () => import('../views/dashboard/posts/create.vue')
					},
					{
						path: 'edit/:id',
						name: 'PostEdit',
						component: () => import('../views/dashboard/posts/edit.vue')
					},
				]
			},
			{
				path: 'settings',
				component: () => import('../views/dashboard/settings/index.vue'),
				children: [
					{
						path: '',
						name: 'Setting',
						component: () => import('../views/dashboard/settings/list.vue')
					},
					{
						path: 'create',
						name: 'SettingCreate',
						component: () => import('../views/dashboard/settings/create.vue')
					},
					{
						path: 'edit/:id',
						name: 'SettingEdit',
						component: () => import('../views/dashboard/settings/edit.vue')
					},
				]
			},
		]
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
