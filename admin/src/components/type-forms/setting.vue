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
                        <label for="your-option_name">name</label>
                        <input type="text" v-model="options.option_name" id="your-option_name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="your-option_value">value</label>
                        <input type="text" v-model="options.option_value" id="your-option_value" class="form-control" />
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
import formBox from '@/components/form-box.vue';
import swal from 'sweetalert'
export default {
    name: 'setting-form',
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
            options: {
                option_name: '',
                option_value: ''
            }
        }
    },
    mounted() {
        if (this.state === 'edit') this.init()
    },
    methods: {
        update: async function() {
            try {
                const response = await axios.put('/settings/' + this.$route.params.id, this.options)
                swal({
                    title: "Обновлено",
                    text: "Данная запись успешно обновлена",
                    icon: "success"
                }).then((value) => {
                    if(value) {
                        this.$router.push({name: "Setting"})
                    }
                })
            } catch(err) {
                throw err
            }
        },
        createNew: async function() {
            try {
                const response = await axios.post('/settings', this.options)
                this.options = response.data
                this.$router.push({name: 'SettingEdit', params: {id: this.options.id}})
            } catch(err) {
                throw err
            }
        },
        init: async function() {
            try {
                const response = await axios.get('/settings/edit/' + this.$route.params.id)
                this.options = response.data
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