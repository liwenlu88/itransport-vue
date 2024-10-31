<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" @openChange="onOpenChange" theme="dark"
        mode="inline">
        <template v-for="(item, index) in MenuList">
            <!-- 一级菜单 -->
            <a-menu-item v-if="!item.children" :key="index" @click="onSelect">
                <router-link :to="item.url">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                </router-link>
            </a-menu-item>

            <a-sub-menu v-else :key="item.id">
                <!-- 一级菜单标题 -->
                <template #title>
                    <span>
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                    </span>
                </template>
                <!-- 二级菜单 -->
                <a-menu-item v-for="child in item.children" :key="index">
                    <router-link :to="child.url">
                        <component :is="child.icon" />
                        <span>{{ child.title }}</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// 初始化 selectedKeys 和 openKeys，从 localStorage 中获取值或设置默认值
const selectedKeys = ref<number[]>(JSON.parse(localStorage.getItem('selectedKeys') || '[0]'));
const openKeys = ref<number[]>(JSON.parse(localStorage.getItem('openKeys') || '[]'));

// 当选择项发生变化时，清空 openKeys
const onSelect = () => openKeys.value = [];

// 当展开项发生变化时，只保留最后一个展开项
const onOpenChange = (keys: number[]) => openKeys.value = keys.length ? [keys[keys.length - 1]] : [];

// 监听 selectedKeys 的变化，并将其持久化到 localStorage
watch(selectedKeys, (newVal) => localStorage.setItem('selectedKeys', JSON.stringify(newVal)), { deep: true });

// 监听 openKeys 的变化，并将其持久化到 localStorage
watch(openKeys, (newVal) => localStorage.setItem('openKeys', JSON.stringify(newVal)), { deep: true });

// 组件挂载时，从 localStorage 加载初始值
onMounted(() => {
    selectedKeys.value = JSON.parse(localStorage.getItem('selectedKeys') || '[0]');
    openKeys.value = JSON.parse(localStorage.getItem('openKeys') || '[]');
});

interface MenuItem {
    id: number;
    title: string;
    icon: string;
    url: string;
    children?: MenuItem[];
}

const MenuList: MenuItem[] = [
    {
        id: 1,
        title: 'Dashboard',
        icon: 'DashboardOutlined',
        url: '/admin/dashboard',
    },
    {
        id: 2,
        title: '用户管理',
        icon: 'UserOutlined',
        url: '',
        children: [
            {
                id: 3,
                title: '用户列表',
                icon: 'UserOutlined',
                url: '/admin/users',
            },
        ]
    },
    {
        id: 4,
        title: '管理员',
        icon: 'TeamOutlined',
        url: '',
        children: [
            {
                id: 5,
                title: '管理员列表',
                icon: 'UserOutlined',
                url: '/admin/admin',
            },
        ]
    },
    {
        id: 6,
        title: '网站配置',
        icon: 'FileOutlined',
        url: '/admin/config',
    }
];
</script>