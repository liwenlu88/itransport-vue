<template>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="h-16 p-2">
            <img class="h-full w-auto" src="" alt="LOGO">
        </div>

        <!-- Menu Bar -->
        <MenuBar />
    </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuBar from './menus/MenuBar.vue';
const collapsed = ref<boolean>(false);
</script>