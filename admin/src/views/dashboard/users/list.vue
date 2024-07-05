<template>
    <div class="list-container w100">
        <div class="flex-side list">
            <h2>{{ title }}</h2>
            <router-link class="theme-button" :to="{name: 'UserCreate'}">добавить еще</router-link>
        </div>
        <div class="list-table" v-if="data">
            <table>
                <thead>
                    <tr>
                        <th width="30">id</th>
                        <th>имя</th>
                        <th>электронный адрес</th>
                        <th width="100">создан</th>
                        <th width="100">опции</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in data" :key="`user-list-of-${index}`">
                        <td width="30" class="text-center">{{ user.id }}</td>
                        <td><router-link :to="{name: 'UserEdit', params: {id: user.id}}">{{ user.name }}</router-link></td>
                        <td><a :href="'mailto:' + user.email">{{ user.email }}</a></td>
                        <td width="100">{{ formatDate(user.createdAt) }}</td>
                        <td width="100">
                            <div class="flex-side list right">
                                <button @click="$router.push({name: 'UserEdit', params: {id: user.id}})" class="theme-button xs" type="button">редактировать</button>
                                <!-- <button class="theme-button xs danger" type="button">удалить</button> -->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'user-list',
    data() {
        return {
            title: 'Пользователи',
            data: null
        }
    },
    mounted() {
        this.init_list()
    },
    methods: {
        formatDate(val) {
            const date = new Date(val);

            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            };

            return date.toLocaleString('ru-RU', options);
        },
        init_list: async function() {
            try {
                const response = await axios.get('/users')
                this.data = response.data
            } catch(err) {
                throw err
            }
        }
    }
}
</script>