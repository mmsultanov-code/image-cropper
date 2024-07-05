import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/scss/theme-style.scss'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000/api';
import CKEditor from '@ckeditor/ckeditor5-vue';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

if(getCookie('access_token')) {
    axios.defaults.headers['Authorization'] = `Bearer ${getCookie('access_token')}`;
}

createApp(App).use(createPinia()).use(router).use( CKEditor ).mount('#app')
