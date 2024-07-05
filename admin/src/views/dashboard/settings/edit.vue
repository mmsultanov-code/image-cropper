<template>
    <type-form state="edit" />
</template>
<script>
import TypeForm from '@/components/type-forms/setting.vue'
export default {
    name: 'setting-edit',
    components: {
        typeForm: TypeForm
    }
}
</script>