<template>
    <component :is="cname" class="one-post-box">
        <span class="post-thumbnail" v-if="thumbnail && type !== 'single'">
            <img :src="thumbnail" alt="" />
        </span>
        <span class="post-thumbnail single" v-if="(post_thumbnail || post?.background_image) && type === 'single'">
            <img :src="post_thumbnail || post.background_image" alt="" />
        </span>
        <span class="post-content">
            <span class="top-side">
                <strong class="title" v-html="name || post?.name"></strong>
                <p v-if="excerpt && type !== 'single'" v-html="excerpt_text_by_words(excerpt || post?.excerpt, 10)"></p>
                <div v-if="type === 'single' && (content || post?.content)" v-html="content || post?.content" class="post-content-inside"></div>
            </span>
            <span v-if="type !== 'single'" class="theme-button bordered">Подробнее</span>
        </span>
    </component>
</template>
<script>
import axios from 'axios'

export default {
    name: 'event-box',
    props: {
        cname: {
            type: String,
            required: false,
            default: 'router-link'
        },
        post_thumbnail: {
            type: String,
            required: false
        },
        thumbnail: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        excerpt: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            post: null
        }
    },
    computed: {
		baseUrl: function() {
			return process.env.VUE_APP_BACK_URL
		}
    },
    mounted() {
        if(this.type === 'single' && this.$route.params.slug)
            this.init()
    },
    methods: {
        init: async function() {
            try {
                const response = await axios.get('/posts/' + this.$route.params.slug)
                this.post = {...response.data, background_image: this.baseUrl + response.data.background_image}
            } catch(err) {
                throw err
            }
        },
        excerpt_text_by_words: function (string, length) {
            if (string.split(' ').length > length) {
                return string?.replace(/<[^>]*>/g, '').split(' ').slice(0, length).join(' ') + '...'
            } else {
                return string?.replace(/<[^>]*>/g, '')
            }
        },
    }
}
</script>
<style lang="scss">
$dark_color: #161617;
.one-post-box {
    box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.03);
    border: 1px solid #efefef;
    background-color: #fff;
    flex-direction: column;
    border-radius: 20px;
    text-decoration: none;
    font-family: $mainfont;
    font-size: 0.9rem;
    line-height: 1;
    color: $gray;
    display: flex;
    color: #333;
    .single-news-section & {
        .post-thumbnail {
            img {
                max-height: none;
            }
        }
    }
    &.is-swipe {
        height: 100%;
    }
    .post-content-inside {
        a {
            text-decoration: none;
            color: $gray;
        }
        p {
            line-height: 1.5;
        }
    }
    .post-thumbnail {
        border-radius: 20px 20px 0 0;
        padding: 20px 20px 0;
        text-align: center;
        line-height: 0;
        display: block;
        img {
            border-radius: 10px;
            max-height: 190px;
        }
        &.single {
            img {
                max-height: none;
            }
        }
    }
    &:hover {
        .theme-button {
            background-color: #333;
            color: #fff;
        }
    }
    .post-content {
        justify-content: space-between;
        border-radius: 0 0 10px 10px;
        align-items: flex-start;
        flex-direction: column;
        display: flex;
        padding: 24px;
        height: 100%;
        strong {
            margin: 0 0 12px;
            font-size: 18px;
            display: block;
        }
        p {
            margin: 0 0 12px;
            font-size: 14px;
        }
        .theme-button {
            display: inline-block;
            width: 100%;
        }
    }
}
.dark {
    .one-post-box {
        background-color: lighten($dark_color, 5%);
        border-color: lighten($dark_color, 10%);
        color: #999;
    }
    .theme-button {
        color: #fff;
    }
}
.theme-button {
    @include defaultButton;
    background-color: $green;
    border: 1px solid transparent;
    text-align: center;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    position: relative;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    &.disabled,
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }

    & > * {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
    &:hover {
        background-color: lighten($green, 10%);
    }
    &.bordered {
        background-color: transparent;
        border-color: #333;

        &:hover {
            background-color: #333;
            color: #fff;

            svg {
                circle,
                path {
                    stroke: #fff;
                }

                path {
                    fill: #fff;
                }
            }
        }
    }
}
</style>