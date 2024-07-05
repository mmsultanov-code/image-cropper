import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router/index'

export const useAuthStore = defineStore({
    id: 'authStore',
    state: () => ({
        access_token: '',
    }),
    getters: {
        get_access_token: (state) => {
			return state.access_token
		},
    },
    actions: {
        async login(payload) {
			return new Promise(async(resolve, reject) => {
				try {
					const auth_response = await axios.post('/users/login', payload);
					if (!auth_response) {
						throw new Error('Ошибка авторизации');
					}
					this.$patch(state => {
						state.access_token = auth_response.data.access_token;
					});
					// Сохранение токена в куки
					const domain = process.env.VUE_APP_DOMAIN || 'localhost';
					const expires = new Date(Date.now() + 3600000); // 1 час
					document.cookie = `access_token=${auth_response.data.access_token}; domain=${domain}; expires=${expires.toUTCString()}`;
                    axios.defaults.headers['Authorization'] = `Bearer ${auth_response.data.access_token}`;
					resolve(auth_response.data)
					return auth_response.data;
				} catch (error) {
					reject(error)
					throw error;
				}
			})
        },
        async auth_refresh() {
            try {
                const refresh_response = await axios.post('/auth/refresh');
                if (!refresh_response) {
                    throw new Error('Ошибка обновления токена');
                }
                this.$patch(state => {
                    state.permissions = refresh_response.data.permissions;
                    state.access_token = refresh_response.data.access_token;
                    state.refresh_token = refresh_response.data.refresh_token;
                });
                // Обновление токена в куки
                const domain = process.env.VUE_APP_DOMAIN || 'localhost';
                const expires = new Date(Date.now() + 3600000); // 1 час
                document.cookie = `access_token=${refresh_response.data.access_token}; domain=${domain}; expires=${expires.toUTCString()}`;
                return refresh_response.data;
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            try {
                const domain = process.env.VUE_APP_DOMAIN || 'localhost';
                document.cookie = 'access_token=""; path=/; domain=' + domain + '; expires=' + new Date(0).toUTCString();
                this.access_token = ''
                console.log(document.cookie)
                router.push('/')
                return true;
            } catch (error) {
                throw error;
            }
        },
    },
});