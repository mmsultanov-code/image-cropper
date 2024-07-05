<template>
    <type-form state="create" />
</template>
<script>
import TypeForm from '@/components/type-forms/post.vue'
export default {
    name: 'post-create',
    components: {
        typeForm: TypeForm
    }
}
</script>