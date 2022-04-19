<template>
<div class="container">
    <el-row>
        <el-col :span="4">
            <div class="grid-content">
                <img src="../assets/logo.png" alt="" />
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content">
                <router-link to="/home">
                    <a class="header-link" @click="showHot()">首页</a>
                </router-link>
                <a class="header-link" @click="showHot(3)">精选</a>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content">
                <el-input placeholder="请输入内容" v-model="keyword" class="header-input" suffix-icon="el-icon-search">
                </el-input>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content">
                <el-button type="primary" @click="openDialog" round>提问</el-button>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content">

                <p v-if="username">
                    <el-badge :value="12" class="item">
                        <el-popover placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                            <svg t="1649419113110" slot="reference" class="icon" style="width: 30px; float: right" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2241" width="48" height="48">
                                <path d="M799.9 681.3c7-0.2 14 1.2 20.7 5.6-24.3-15.6-40.3-42.8-40.3-73.9V439.5c0-127.1-91.9-233.2-214.7-259.3V174c0-32.4-26.2-58.5-58.5-58.5s-58.5 26.2-58.5 58.5v6.2c-122.8 26.1-214.7 132.1-214.7 259.3V613c0 31.1-16.1 58.3-40.3 73.9 6.8-4.4 13.7-5.9 20.7-5.6-21.5 0.1-38.9 17.4-38.9 39s17.4 39 39 39h585.3c21.6 0 39-17.4 39-39 0.1-21.4-17.3-38.9-38.8-39zM507.2 896c53.9 0 97.6-43.7 97.6-97.6H409.6c0 53.9 43.6 97.6 97.6 97.6z" p-id="2242" fill="#8590a6"></path>
                            </svg>
                        </el-popover>
                    </el-badge>
                </p>

            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content">
                <p v-if="!username">
                    <router-link to="/login">
                        <a class="header-link">登录</a>
                    </router-link>
                </p>
                <div v-else="username">
                    <el-popover placement="bottom" width="60" trigger="click">
                        <div class="pop-box">
                            <p>个人中心</p>
                            <p @click="loginOut">退出登录</p>
                        </div>

                        <div slot="reference">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                    </el-popover>

                    <!-- <a class="header-link">{{username}}</a> -->
                    <!-- <a class="header-link" >退出登陆</a> -->
                </div>
            </div>
        </el-col>
    </el-row>
    <div>
        <el-dialog title="提问" :modal-append-to-body='false' :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="问题">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-select v-model="form.type" placeholder="请选择问题类别">
                        <el-option label="初试" value="0"></el-option>
                        <el-option label="复试" value="1"></el-option>
                        <el-option label="调剂" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitQuestion">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</div>
</template>

<script>
import {
    getToken
} from '../utils/token'
import {
    reqAddQuestion
} from '../api'
import {
    mapState
} from "vuex";
export default {
    name: "Header",
    data() {
        return {
            keyword: "",
            dialogFormVisible: false,
            form: {
                title: "",
                type: '0',
            },
        };
    },
    computed: {
        ...mapState({
            username: (state) => state.user.userinfo.username,
            uid: (state) => state.user.userinfo.id
        }),
    },
    methods: {
        showHot(num) {
            this.$store.dispatch('getAllQuestion', {
                num: num
            })
        },
        openDialog() {
            if (getToken()) {
                this.dialogFormVisible = true
            } else {
                this.$message.info("请先登录")
            }

        },
        async submitQuestion() {

            this.form.uid = this.uid
            this.form.created_at = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
            let res = await reqAddQuestion(this.form)
            if (res.code == 200) {
                this.dialogFormVisible = false
                this.$store.dispatch("getAllQuestion", {})
                this.$message.success("提问成功，等待回答")
            } else {
                this.$message.error("提问失败，请重试")
            }
            // console.log(res);
        },
        //退出登录
        loginOut() {
            this.$store.dispatch("userLoginOut");
            setTimeout(() => {
                this.$router.push("/home");
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    z-index: 100;
    position: fixed;
    background-color: #fff;
}

.item {
    margin-top: 14px;
}

.pop-box {
    text-align: center;

    p {
        padding: 5px 0px;
        cursor: pointer;
    }

    p:hover {
        background-color: #e1e1e1;
    }
}

.el-row {
    // margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {}

.grid-content {
    height: 52px;
    line-height: 52px;
    text-align: center;

    .header-link {
        padding: 0 15px;
        font-size: 15px;
        color: #121212;
        cursor: pointer;
    }

    img {
        width: 64px;
        height: 30px;
        vertical-align: middle;
    }
}

/deep/ .header-input input {
    border-radius: 99px;
}
</style>
