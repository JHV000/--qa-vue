<template>
<div>
    <div class="chat-box">
        <div class="chat-header">
            <span>招生单位人工座席——</span>
            <span>{{roomname}}</span>
        </div>

        <div class="msg">
            <qipao :msgList="msgList" direction="left"></qipao>
        </div>
        <div class="input-box">
            <el-input v-model="msg" @keydown.enter.native="send" class="header-input" placeholder=""></el-input>
            <el-button type="primary" @click="send" round>发送</el-button>
        </div>

    </div>

</div>
</template>

<script>
import {
    io
} from "socket.io-client";
import qipao from '../../components/qipao.vue';
const socket = io('http://127.0.0.1:8888');
export default {
    components: {
        qipao
    },
    name: 'Communicating',
    data() {
        return {
            msgList: [],
            roomname: '',
            msg: ''
        }
    },
    created() {
        socket.removeAllListeners("communicating");
    },
    mounted() {
        socket.emit('createRoom', {
            username: 'jhv'
        })
        socket.on("joinInfo", (res) => {
            this.$message.success(res.username + res.msg)
            this.roomname = res.roomname
            console.log(res);
        })
        socket.on("sendAll", (res) => {
            res.id = 1
            this.msgList.push(res)
            console.log(res);
        })
    },
    updated() {
        let chatBox = document.getElementsByClassName('msg')[0]
        chatBox.scrollTop = chatBox.scrollHeight
    },
    methods: {
        online() {
            socket.connect()
            console.log("online", socket);
        },
        offline() {
            console.log("offline", socket);
            socket.disconnect()
            console.log("已断开连接");
        },
        send() {
            let content = {
                roomname: this.roomname
            }
            content.time = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
            content.msg = this.msg
            content.role = 0
            if (socket.connected) {
                socket.emit("communicating", content)
                content.id = 0
                this.msgList.push(content)
                console.log(content);
                this.msg = ''
            } else {
                this.$message.info("已断开连接！")
            }
        },

    },
}
</script>

<style lang="less" scoped>
.chat-box {
    width: 780px;
    margin: 20px auto;
    background-color: #f6f6f6;
    // border: 1px solid #e1e1e1;
    border-radius: 20px;

    .chat-header {
        padding: 20px;
        background-color: #e1e1e1;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-size: 18px;
    }

}

.input-box {
    display: flex;
    background-color: #e1e1e1e1;
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    /deep/ .header-input input {
        width: 100%;
        border-radius: 99px;
    }
}

.msg {
    padding: 15px;
    overflow: auto;
    height: 300px;
}

.msg-box {
    // width: 400px;
    width: 50%;
    padding: 10px;
    height: 300px;
    // border: 1px solid #000;
}
</style><style>
.el-container[style] {
    height: 560px !important;
}

.el-main {
    padding: 0px;
}
</style>
