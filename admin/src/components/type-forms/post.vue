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
                        <label for="your-name">name</label>
                        <input type="text" v-model="post.name" id="your-name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="your-slug">slug</label>
                        <input type="text" v-model="post.slug" id="your-slug" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="your-content">content</label>
                        <ckeditor :editor="editor" v-model="post.content" :config="editorConfig"></ckeditor>
                    </div>

                    <h1>Загрузить и обработать изображение</h1>
                    <nav class="tabs-navigation">
                        <ul>
                            <li><button type="button" :class="{'active': active_tab === 'tab-1'}" @click="active_tab = 'tab-1'">Обрезка фотографии</button></li>
                            <li><button type="button" :class="{'active': active_tab === 'tab-2'}" @click="active_tab = 'tab-2'">Уменьшение фотографии</button></li>
                        </ul>
                    </nav>
                    <div class="tab-content mt-4" id="imageTabsContent">
                        <div class="tab-pane" v-if="active_tab === 'tab-1'">
                            <div class="preview-container">
                                <!-- <img v-if="post.thumbnail" width="800" :src="get_image('thumbnail')" alt="Preview Image" class="img-fluid"> -->
                                <vue-cropper
                                    v-if="post.thumbnail"
                                    ref="cropper"
                                    :zoomable="false"
                                    :src="get_image('thumbnail')"
                                    alt="Source Image"
                                    @crop="onCropped"
                                >
                                </vue-cropper>
                            </div>
                            <div class="form-group">
                                <input type="file" @change="upload_file($event, 'thumbnail')" class="form-control-file" ref="uploadInput" accept="image/*">
                            </div>
                            <button type="button" class="theme-button" @click="crop_save">Вырезать и скачать</button>
                        </div>
                        <div class="tab-pane" v-if="active_tab === 'tab-2'">
                            <div class="form-group">
                                <input type="file" class="form-control-file" id="resizeInput" accept="image/*">
                            </div>
                            <div id="resizeDimensionsContainer" class="form-group">
                                <label for="resizeWidth">Ширина:</label>
                                <input type="number" class="form-control" id="resizeWidth" name="resizeWidth">
                                <label for="resizeHeight" class="mt-2">Высота:</label>
                                <input type="number" class="form-control" id="resizeHeight" name="resizeHeight">
                            </div>
                            <button id="resizeButton" class="theme-button" @click="resize_image()">Уменьшить и скачать</button>
                        </div>
                    </div>
                </form-box>
            </div>
            <div class="right-side">
                <form-box label="Публикация">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quasi suscipit rem accusamus similique sint error sapiente molestiae provident, magni, laboriosam odio. Aliquam, corrupti reiciendis. Quia nemo placeat molestiae facilis?</p>
                    <button class="theme-button w100" type="button" v-if="state === 'edit'" @click="update()">сохранить</button>
                    <button class="theme-button w100" type="button" v-if="state === 'create'" @click="createNew()">опубликовать</button>
                </form-box>
                <form-box label="Превью изображения">
                    <input type="file" @change="upload_file($event, 'thumbnail')" ref="thumbnail" name="thumbnail" id="thumbnail" class="file-control form-control" />
                    <img class="thumbnail-img" :src="get_image('thumbnail')" v-if="post.thumbnail" alt="">
                </form-box>
                <form-box label="Внутреннее изображение">
                    <input type="file" @change="upload_file($event, 'background_image')" ref="background_image" name="background_image" id="background_image" class="file-control form-control" />
                    <img class="thumbnail-img" :src="get_image('background_image')" v-if="post.background_image" alt="">
                </form-box>
            </div>
        </div>
    </form>
</template>
<script>
import axios from 'axios'
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import formBox from '@/components/form-box.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert'
import newsBox from '@/components/news-box.vue'
export default {
    name: 'post-form',
    components: {
        VueCropper,
        newsBox,
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
            active_tab: 'tab-1',
            crop: {
                data: null,
                width: 0,
                height: 0
            },
            post: {
                name: '',
                slug: '',
                content: '',
                thumbnail: '',
                background_image: '',
            },
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
            }
        }
    },
    computed: {
        baseUrl: function() {
            return process.env.VUE_APP_PUBLIC
        },
        frontUrl: function() {
            return process.env.VUE_APP_FRONT_URL
        }
    },
    mounted() {
        if (this.state === 'edit') this.init()
    },
    methods: {
        resize_image: function() {
            
        },
        crop_save: function() {
            const formData = new FormData();

            // Если находимся в режиме редактирования и есть URL файла, получаем его
            if (this.state === 'edit' && this.get_image) {
                const imageUrl = this.get_image('thumbnail'); // Предполагается, что это функция, возвращающая URL файла
                fetch(imageUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        // Создаем файл из полученного Blob
                        const file = new File([blob], 'thumbnail.jpg', { type: blob.type });

                        // Добавляем файл в FormData
                        formData.append('image', file);
                        formData.append('cropperData', JSON.stringify(this.crop.data));

                        // Отправляем FormData на сервер
                        axios.post('/file/upload', formData)
                            .then(response => {
                                if (response.data && response.data.blob && response.data.file) {
                                    const blob = response.data.blob;
                                    const fileUrl = response.data.file;

                                    const blobData = atob(blob);
                                    const arrayBuffer = new ArrayBuffer(blobData.length);
                                    const uint8Array = new Uint8Array(arrayBuffer);
                                    for (let i = 0; i < blobData.length; i++) {
                                        uint8Array[i] = blobData.charCodeAt(i);
                                    }
                                    const blobObject = new Blob([uint8Array]);

                                    this.post.thumbnail = fileUrl;
                                } else {
                                    throw new Error('Ошибка при обработке изображения');
                                }
                            })
                            .catch(error => {
                                console.error('Ошибка:', error);
                                alert('Произошла ошибка при обработке изображения');
                            });
                    })
                    .catch(error => {
                        console.error('Ошибка при получении файла:', error);
                        alert('Произошла ошибка при получении изображения для обработки');
                    });
            } else {
                // Если не в режиме редактирования или нет функции this.get_image, используем обычный способ
                formData.append('image', this.$refs.uploadInput.files[0]);
                formData.append('cropperData', JSON.stringify(this.crop.data));

                axios.post('/file/upload', formData)
                    .then(response => {
                        if (response.data && response.data.blob && response.data.file) {
                            const blob = response.data.blob;
                            const fileUrl = response.data.file;

                            const blobData = atob(blob);
                            const arrayBuffer = new ArrayBuffer(blobData.length);
                            const uint8Array = new Uint8Array(arrayBuffer);
                            for (let i = 0; i < blobData.length; i++) {
                                uint8Array[i] = blobData.charCodeAt(i);
                            }
                            const blobObject = new Blob([uint8Array]);

                            this.post.thumbnail = fileUrl;
                        } else {
                            throw new Error('Ошибка при обработке изображения');
                        }
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                        alert('Произошла ошибка при обработке изображения');
                    });
            }
        },
        onCropped: function(e) {
            this.crop.data = e.detail
            this.crop.width = e.detail.width
            this.crop.height = e.detail.height
        },
        get_image: function(fieldName) {
            if(this.post[fieldName][0] === '/') return this.baseUrl + this.post[fieldName]
            else return this.baseUrl + '/' + this.post[fieldName]
        },
        upload_file: async function(event, fieldName) {
            const files = event.target.files
            let formData = new FormData()

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            try {
                const response = await axios.post('/file/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.post[fieldName] = response.data.files[0].path
            } catch(err) {
                throw err;
            }
        },
        update: async function() {
            try {
                const response = await axios.put('/posts/' + this.$route.params.id, this.post)
                swal({
                    title: "Обновлено",
                    text: "Данная запись успешно обновлена",
                    icon: "success"
                }).then((value) => {
                    if(value) {
                        this.$router.push({name: "Post"})
                    }
                })
            } catch(err) {
                throw err
            }
        },
        createNew: async function() {
            try {
                const response = await axios.post('/posts', this.post)
                this.post = response.data
                this.$router.push({name: 'PostEdit', params: {id: this.post.id}})
            } catch(err) {
                throw err
            }
        },
        init: async function() {
            try {
                const response = await axios.get('/posts/' + this.$route.params.id)
                this.post = response.data
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
        .file-control {
            margin-bottom: 18px;
        }
    }
</style>