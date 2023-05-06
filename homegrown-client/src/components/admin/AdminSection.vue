<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import RegisterStoreItem from './RegisterStoreItem.vue'

export default defineComponent({
	components: { RegisterStoreItem },
    setup() {
    },
})
</script>

<template>
    <div class="admin-section">
        <RegisterStoreItem></RegisterStoreItem>
    </div>
</template>

<style lang="scss" scoped>
</style>