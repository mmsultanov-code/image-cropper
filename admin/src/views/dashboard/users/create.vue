<template>
    <type-form state="create" />
</template>
<script>
import TypeForm from '@/components/type-forms/users.vue'
export default {
    name: 'user-create',
    components: {
        typeForm: TypeForm
    }
}
</script>