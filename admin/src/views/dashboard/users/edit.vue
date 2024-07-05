<template>
    <type-form state="edit" />
</template>
<script>
import TypeForm from '@/components/type-forms/users.vue'
export default {
    name: 'user-edit',
    components: {
        typeForm: TypeForm
    }
}
</script>