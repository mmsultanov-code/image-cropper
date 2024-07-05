<template>
    <form class="type-form-container">
        <div class="flex-side list">
            <h1 v-if="state === 'create'">Создание</h1>
            <h1 v-if="state === 'edit'">Редактирование</h1>
            <button class="theme-button" type="button" @click="$router.go(-1)">Назад</button>
        </div>
        <div class="main-flex flex-side w100 list list-md top">
            <div class="left-side">
                <form-box label="основное">
                    <div class="form-group">
                        <label for="your-name">имя</label>
                        <input type="text" v-model="user.name" id="your-name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="your-email">email</label>
                        <input type="email" v-model="user.email" id="your-email" class="form-control" />
                    </div>
                    <div class="form-group" v-if="state === 'create'">
                        <label for="your-password">password</label>
                        <input type="password" v-model="user.password" id="your-password" class="form-control" />
                    </div>
                </form-box>
            </div>
            <div class="right-side">
                <form-box label="Публикация">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quasi suscipit rem accusamus similique sint error sapiente molestiae provident, magni, laboriosam odio. Aliquam, corrupti reiciendis. Quia nemo placeat molestiae facilis?</p>
                    <button class="theme-button w100" type="button" v-if="state === 'edit'" @click="update()">сохранить</button>
                    <button class="theme-button w100" type="button" v-if="state === 'create'" @click="createNew()">опубликовать</button>
                </form-box>
            </div>
        </div>
    </form>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert'
import formBox from '@/components/form-box.vue';
export default {
    name: 'user-form',
    components: {
        formBox
    },
    props: {
        state: {
            type: String,
            required: true,
            validator: function(value) {
                return ['create', 'edit'].indexOf(value) !== -1
            }
        }
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    mounted() {
        if (this.state === 'edit') this.init()
    },
    methods: {
        update: async function() {
            try {
                const response = await axios.put('/users/' + this.$route.params.id, this.user)
                if(!response) return;
                swal({
                    title: "Обновлено",
                    text: "Данная запись успешно обновлена",
                    icon: "success"
                }).then((value) => {
                    if(value) {
                        this.$router.push({name: "Users"})
                    }
                })
            } catch(err) {
                throw err
            }
        },
        createNew: async function() {
            try {
                const response = await axios.post('/users', this.user)
                this.user = response.data.user
                this.$router.push({name: 'UserEdit', params: {id: this.user.id}})
            } catch(err) {
                throw err
            }
        },
        init: async function() {
            try {
                const response = await axios.get('/users/' + this.$route.params.id)
                this.user = response.data
            } catch(err) {
                throw err
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.type-form-container {
    .main-flex {
        & > .left-side {
            max-width: 100%;
            width: 100%;
        }
        & > .right-side {
            max-width: 320px;
            width: 100%;
        }
    }
}
</style>