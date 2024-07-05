<template>
    <main-layout>
        <router-view></router-view>
    </main-layout>
</template>
<script>
import mainLayout from '@/components/main-layout.vue'
import { useAuthStore } from '@/store/auth';
export default {
    name: 'home-dashboard',
    components: {
        mainLayout
    },
    computed: {
        token: function() {
            return useAuthStore().get_access_token || this.getCookie('access_token')
        }
    },
    mounted() {
        if(!this.token) {
            return this.$router.push('/')
        }
    },
    methods: {
		getCookie: function(name) {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(';').shift();
		},
    }
}
</script>