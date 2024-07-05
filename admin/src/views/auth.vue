<template>
	<div class="auth-page">
		<div class="main-auth-form">
			<h2>Авторизнуться</h2>
			<form @submit.prevent="auth_method()" class="auth-form-box">
				<div class="form-group">
					<label for="your-email">E-mail</label>
					<input id="your-email" type="email" v-model="auth.email" class="form-control" placeholder="..." />
				</div>
				<div class="form-group">
					<label for="your-password">Password</label>
					<input id="your-password" type="password" v-model="auth.password" class="form-control" placeholder="..." />
				</div>
				<div class="alert danger" v-for="(item, index) in errors" :key="'error-' + index">{{ item }}</div>
				<button class="theme-button w100" type="submit">Войти</button>
			</form>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import { useAuthStore } from '@/store/auth';
export default {
	name: 'authView',
	data() {
		return {
			auth: {
				email: 'admin@admin.com',
				password: 'demo123'
			},
			errors: []
		}
	},
	computed: {
		token: function() {
			return useAuthStore().get_access_token
		}
	},
	mounted() {
		if(this.token || this.getCookie('access_token')) this.$router.push({name: 'Home'})
		axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000/api';
	},
	methods: {
		getCookie: function(name) {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(';').shift();
		},
		getError: function() {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			this.errors = []
			if(!this.auth.email) this.errors.push('Заполните Email')
			if(!this.auth.password) this.errors.push('Заполните пароль')
			if(this.auth.password?.length < 4) this.errors.push('Ваш пароль слишком короткий')
			if(this.auth.email && !this.auth.email?.match(emailRegex)) this.errors.push('Не похоже на Email')
			return;
		},
		auth_method: async function() {
			this.getError()
			if(!this.errors.length) {
				useAuthStore().login(this.auth)
				.then(() => {
					this.auth = {
						email: '',
						passowrd: ''
					}
					if(this.token) this.$router.push({name: 'Home'})
				})
				.catch(err => {
					this.errors.push(err.response.data.error)
				})
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.auth-page {
	background-image: url("https://vsegda-pomnim.com/uploads/posts/2022-04/1649337782_41-vsegda-pomnim-com-p-plyazh-nochyu-foto-53.jpg");
	background-position: center;
	background-size: cover;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	display: flex;
	.main-auth-form {
		transform: scale(1);
		& > h2 {
			color: #fff;
		}
	}
	.auth-form-box {
		background-color: rgba(255,255,255,0.2);
		backdrop-filter: blur(5px);
		border-radius: 10px;
		padding: 36px;
		.form-group {
			label {
				color: #fff;
			}
		}
	}
}
</style>