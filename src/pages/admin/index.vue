<template>
<div>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']">
                <!-- <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>问答管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">问题</el-menu-item>
                    </el-menu-item-group>   
                    </el-menu-item-group>
                </el-submenu> -->
                <keep-alive>
                    <router-link to="/admin/qaTable">
                        <el-menu-item index="1-2">问答管理</el-menu-item>
                    </router-link>
                </keep-alive>
                <keep-alive>
                    <router-link to="/admin/communicating">
                        <el-menu-item index="1-3">在线解答</el-menu-item>
                    </router-link>
                </keep-alive>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main>
                <router-view :key="key" />
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    computed: {
        key() {
            return this.$route.path;
        },
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
