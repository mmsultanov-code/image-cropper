<template>
    <main class="main-admin-container">
        <main-sidebar />
        <div class="content-view-side">
            <div class="content-view">
                <slot></slot>
            </div>
        </div>
    </main>
</template>
<script>
import mainSidebar from '@/components/main-sidebar.vue'
export default {
    name: 'main-layout',
    components: {
        mainSidebar
    }
}
</script>
<style lang="scss" scoped>
.main-admin-container {
    align-items: stretch;
    display: flex;
    .content-view-side {
        background-color: #f7f7f7;
        width: 100%;
    }
    .content-view {
        padding: 36px;
    }
}
</style>