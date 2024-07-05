<template>
    <div class="dashboard-form-container">
        <button v-if="label" type="button" :class="`form-label-button ${hide ? 'hide-state' : ''}`" @click="openToggleBox">{{ label }}</button>
        <div :class="`dashboard-form ${hide ? 'hide' : ''}`">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: false,
            default: ''
        },
        hide: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        openToggleBox(e) {
            const nextSibling = e.target.nextSibling;
            nextSibling.classList.toggle('hide');
            e.target.classList.toggle('hide-state');
        },
    }
}
</script>
<style lang="scss">
.dashboard-form-container {
    border: 1px solid $dividers;
    border-radius: 10px;
    &:not(:last-child) {
        margin-bottom: 24px;
    }
    .form-label-button {
        border: none;
        border-bottom: 1px solid $dividers;
        border-radius: 10px 10px 0px 0px;
        background-color: #fff;
        padding: 24px;
        font-weight: bold;
        text-align: left;
        width: 100%;
        &:hover {
            background-color: darken(#fff, 1%);
            cursor: pointer;
            color: $black;
        }
        &.hide-state {
            border-radius: 10px;
            border: none;
        }
        & + .dashboard-form {
            border-radius: 0 0 10px 10px;
        }
    }
    &.repeat-container {
        .dashboard-form {
            padding: 40px 24px 0;
        }
    }
    .dashboard-form {
        background-color: #fff;
        border-radius: 10px;
        padding: 24px;
        width: 100%;
        p {
            margin-top: 0;
            line-height: 1.4;
            &:not(:last-child) {
                margin-bottom: 24px;
            }
        }
        &.hide {
            display: none;
        }
        .formkit-wrapper {
            max-width: 100%;
            width: 100%;
        }
    }
}
</style>