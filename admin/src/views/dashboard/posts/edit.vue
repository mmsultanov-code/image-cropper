<template>
    <type-form state="edit" />
</template>
<script>
import TypeForm from '@/components/type-forms/post.vue'
export default {
    name: 'post-edit',
    components: {
        typeForm: TypeForm
    }
}
</script>