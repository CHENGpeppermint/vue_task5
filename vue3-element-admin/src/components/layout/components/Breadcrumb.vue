<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in list" :key="index">
            {{ item }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { treeFindPath } from "@/utils";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
const store = useStore();
const route = useRoute();
const menuList = computed(() => store.getters.menuList).value;
const list = computed(() => {
    let name = route.name;
    let i = route.name.indexOf("/");
    if (i > -1) {
        name = route.name.slice(0, i);
    }
    let j = name.lastIndexOf("-");
    return treeFindPath(
        menuList,
        (data) => data.id === name.slice(j + 1) * 1,
        "name"
    );
});
</script>

<style lang="scss" scoped></style>
