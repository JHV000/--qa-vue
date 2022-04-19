<template>
<div class="card" v-if="question">
    <h2><span v-show="question.is_hot"><svg t="1649765810738" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3959" width="16" height="16"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#d81e06" p-id="3960" data-spm-anchor-id="a313x.7781069.0.i0" class="selected"></path><path d="M685.056 767.317333H344.746667a27.648 27.648 0 0 1-26.965334-19.114666 26.282667 26.282667 0 0 1 9.898667-31.402667 34.133333 34.133333 0 0 1 18.432-5.802667h332.8a27.648 27.648 0 0 1 6.144 54.954667zM809.984 413.354667a38.570667 38.570667 0 0 1-39.594667 30.72 47.445333 47.445333 0 0 0-2.048 6.485333q-31.402667 106.496-62.122666 212.992c-2.730667 9.216-6.144 11.605333-15.36 11.605333H333.482667c-9.898667 0-12.970667-2.389333-15.701334-11.605333l-50.176-172.714667c-4.778667-15.701333-9.216-31.402667-13.994666-47.104a37.205333 37.205333 0 0 1-34.133334-19.797333c-1.706667-3.413333-2.730667-7.168-4.437333-10.581333v-12.970667l2.048-5.461333a37.205333 37.205333 0 0 1 34.133333-25.6 38.229333 38.229333 0 0 1 34.133334 20.48 36.864 36.864 0 0 1-5.12 40.96 21.504 21.504 0 0 0-3.413334 4.096l82.261334 50.517333 31.402666 18.773333c5.802667 3.413333 10.581333 2.730667 13.653334-3.072l94.549333-172.714666a38.570667 38.570667 0 0 1-23.210667-34.133334 34.133333 34.133333 0 0 1 10.922667-28.330666 37.546667 37.546667 0 0 1 54.954667 3.072c15.701333 19.114667 9.898667 41.642667-15.018667 58.709333l24.576 44.714667 68.266667 124.586666c5.12 9.898667 8.533333 10.581333 18.090666 5.12l105.813334-64.853333 5.12-3.413333a37.205333 37.205333 0 1 1 60.416-38.229334s0 2.730667 1.706666 4.437334v12.629333z" fill="#ffffff" p-id="3961" data-spm-anchor-id="a313x.7781069.0.i1" class=""></path></svg></span>{{question.title}}</h2>
    <p>
         {{question.content}}
    </p>
    <el-collapse>
        <el-collapse-item>
            <template slot="title">
                <div class="comment-card">
                    <i class="el-icon-chat-round"></i>
                    <button @click.once="getComment(question.id)">{{question.c_count}}条评论</button>
                    <el-tag type="" v-show="question.type == 0" effect="dark">初试</el-tag>
                    <el-tag type="warning" v-show="question.type == 1" effect="dark">复试</el-tag>
                    <el-tag type="danger" v-show="question.type == 2" effect="dark">调剂</el-tag>
                </div>
                <!-- <i class="el-icon-star-off"></i><button type="">收藏</button> -->
            </template>

            <el-card class="box-card">
                <div v-for="(item,index) in commentList" :key="index" class="text item">
                    <div class="avatar">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <span class="span">{{item.username}}</span>
                        <span class="span" style="color: #8590a6">{{item.created_at}}</span>
                    </div>
                    <div class="word">
                        <p>
                            {{item.content}}
                        </p>
                    </div>
                </div>
                <div class="input-comment">
                    <el-row>
                        <el-col :span="1">
                            <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-input v-model="form.content" placeholder="发表你的看法"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple-light">
                                <el-button type="primary" @click="submitComment(question.id)">评论</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    reqGetAllComment,
    reqAddComment
} from '../api'
import {
    getToken
} from '../utils/token';
export default {
    name: "questionCard",
    props: ['question'],
    data() {
        return {
            form: {
                content: "",
            },
            commentList: []
        };
    },
    computed: {
        ...mapState({
            uid: (state) => state.user.userinfo.id
        })

    },
    methods: {
        async getComment(id) {
            let res = await reqGetAllComment(id)
            this.commentList = res.data
        },
        async submitComment(qid) {
            if (getToken()) {
                this.form.uid = this.uid
                this.form.qid = qid
                this.form.created_at = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
                let res = await reqAddComment(this.form)
                if (res.code == 200) {
                    this.getComment(qid)
                    this.question.c_count++
                    this.form.content = ''
                    this.$message.success("评论成功")
                } else {
                    this.$message.error("评论失败，请重试")
                }
            }else {
                this.$message.info("请先登录")
            }

        }
    },
};
</script>

<style lang="less" scoped>
.input-comment {
    margin-top: 10px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.card {
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
        Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
        sans-serif;
    font-size: 15px;
    color: #121212;
    position: relative;
    border-bottom: 1px #e1e1e1 solid;

    p {
        margin-top: 9px;
    }

    .comment-card {
        padding-top: 10px;

        button {
            cursor: pointer;
            border: 0px;
            color: #8590a6;
            background-color: white;
            padding-right: 30px;
        }
    }
}

.avatar {
    .span {
        // display:block;
        padding: 5px;
    }
}

.word {
    margin-left: 40px;
}

/deep/.el-card {
    margin-top: 10px;
}

.el-collapse {
    border: 0px;
}

/deep/.el-collapse-item__header {
    border: 0px;
}
</style>
