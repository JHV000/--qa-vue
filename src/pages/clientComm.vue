<template>
<div class="container">
    <div class="top"></div>
    <div class="room-box" v-show="inRoom&&roomList">
        <p>选择一个房间进入：</p>
        <el-button type="primary" v-for="item in roomList" key="index" @click="joinRoom(item)">{{item}}</el-button>
    </div>
    <div v-show="!inRoom" class="chat-box">
        <div class="chat-header">
            <span>招生单位人工座席——</span>
            <span>{{roomname}}</span>
        </div>

        <div class="msg">
            <qipao :msgList="msgList"></qipao>
        </div>
        <div class="input-box">
            <el-input v-model="msg" class="header-input" @keydown.enter.native="send" placeholder=""></el-input>
            <el-button type="primary" @click="send" round>发送</el-button>
        </div>
    </div>
</div>
<!-- <el-button type="primary" @click="online">上线</el-button>
    <el-button type="primary" @click="offline">下线</el-button> -->
</template>

<script>
import {
    io
} from "socket.io-client";
import qipao from '@/components/qipao'
const socket = io('http://127.0.0.1:8888');
export default {
    name: 'clientComm',
    components: {
        qipao
    },
    data() {
        return {
            msgList: [],
            roomList: [],
            msg: '',
            inRoom: true,
            roomname: ''
        }
    },
    created() {
        // socket.removeAllListeners("communicating");
    },
    updated() {
        let chatBox = document.getElementsByClassName('msg')[0]
        chatBox.scrollTop = chatBox.scrollHeight
    },
    mounted() {
        socket.on("returnRoom", (res) => {
            this.roomList = res.roomList
            console.log(res);
        })
        socket.on("sendAll", (res) => {
            res.id = 1
            this.msgList.push(res)
            console.log(res);
        })
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
        joinRoom(roomname) {
            socket.emit('joinRoom', {
                roomName: roomname,
                username: '景汉伟'
            })
            socket.on("joinInfo", (res) => {
                let chatBox = document.getElementsByClassName('msg')[0]
                // chatBox.innerHTML ='<p>'+res.username + res.msg+'</p>'
                // this.$message.success(res.username + res.msg)
                this.roomname = res.roomname
                if (res.code == 200) {
                    this.inRoom = false
                }

            })
        },
        send() {
            let content = {}
            content.time = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
            content.msg = this.msg
            content.roomname = this.roomname
            content.role = 1
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
.container {
    background-color: #f6f6f6;
}

.room-box {
    width: 780px;
    height: 400px;
    margin: 40px auto;

    p {
        font-size: 20px;
        padding: 20px 0px;
    }
}

.chat-box {
    width: 780px;
    margin: 20px auto;
    background-color: #fff;
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
    overflow: auto;
    padding: 15px;
    height: 300px;
}

.msg-box {
    // width: 400px;
    width: 50%;
    padding: 10px;
    height: 300px;
    // border: 1px solid #000;
}

.top {
    height: 52px;
}
</style>
