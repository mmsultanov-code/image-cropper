<template>
    <type-form state="create" />
</template>
<script>
import TypeForm from '@/components/type-forms/setting.vue'
export default {
    name: 'setting-create',
    components: {
        typeForm: TypeForm
    }
}
</script>