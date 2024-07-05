<template>
    <aside class="main-sidebar">
        <div class="flex-side column space top w100" style="height: 100%;">
            <div class="top-side w100">
                <div class="sidebar-head">
                    <strong>My Test Task</strong>
                </div>
                <nav class="main-navigation">
                    <ul>
                        <li><router-link :to="{name: 'Home'}">Главная</router-link></li>
                        <li><router-link :to="{name: 'Users'}">Пользователи</router-link></li>
                        <li><router-link :to="{name: 'Post'}">Публикации</router-link></li>
                        <li><router-link :to="{name: 'Setting'}">Настройки</router-link></li>
                    </ul>
                </nav>
            </div>
            <div class="down-side w100">
                <button type="button" @click="logout()" class="theme-button w100 square">Выйти</button>
            </div>
        </div>
    </aside>
</template>
<script>
import { useAuthStore } from '@/store/auth';
export default {
    name: '',
    methods: {
        logout: function() {
            useAuthStore().logout()
        }
    }
}
</script>
<style lang="scss" scoped>
.main-sidebar {
    border-right: 1px solid #efefef;
    background-color: $white;
    min-height: 100vh;
    max-width: 300px;
    width: 100%;
    .sidebar-head {
        background-color: $green;
        padding: 24px;
        color: #fff;
    }
    .main-navigation {
        ul {
            @include ul;
            li {
                display: block;
                a {
                    border-bottom: 1px solid #efefef;
                    text-decoration: none;
                    padding: 24px 24px;
                    display: block;
                    color: $gray;
                    &.router-link-exact-active {
                        background-color: $black;
                        color: #fff;
                    }
                }
                &:last-child {
                    a {
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
</style>