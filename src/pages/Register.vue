<template>
<div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
        <div class="login">
            <div class="loginform">
                <div class="content">
                    <form>
                        <div class="input-text clearFix">
                            <el-input placeholder="请输入用户名" v-model="username" clearable>
                            </el-input>
                        </div>
                        <div class="input-text clearFix">
                            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                        </div>
                        <el-button @click.prevent="userRegister" size="large" type="primary">注&nbsp;册</el-button>
                    </form>

                </div>
            </div>
        </div>
    </div>
    <!-- 底部 -->
</div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        userRegister() {
            try {
                const {
                    username,
                    password
                } = this; //注意这里写法一定要加分号
                username &&
                    password &&
                    this.$store.dispatch("userRegister", {
                        username,
                        password,
                    });
                setTimeout(() => {
                   this.$message.success("注册成功！")
                    this.$router.push("/login");
                }, 500);
            } catch (error) {
                  this.$message.error("注册失败！")
                console.log("login", error);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.login-container {
    background: url("../assets/bg.png") no-repeat;
    background-size: contain;

    .el-button--primary {
        width: 100%;
    }

    .login-wrap {
        height: 487px;

        .login {
            width: 1200px;
            height: 487px;
            margin: 0 auto;
        }

        .loginform {
            height: 300px;
            box-sizing: border-box;
            top: 140px;
            position: relative;
            float: right;
            right: 50px;
            border-radius: 10px;

            .content {
                width: 380px;
                height: 316px;
                box-sizing: border-box;
                padding: 18px;

                form {
                    margin: 15px 0 18px 0;
                    font-size: 12px;
                    line-height: 18px;

                    .input-text {
                        margin-bottom: 16px;

                        span {
                            float: left;
                            width: 37px;
                            height: 32px;
                            border: 1px solid #ccc;
                            // background: url(../../assets/images/icons.png) no-repeat -10px -201px;
                            box-sizing: border-box;
                            border-radius: 2px 0 0 2px;
                        }

                        .pwd {
                            background-position: -72px -201px;
                        }

                        input {
                            width: 302px;
                            height: 32px;
                            box-sizing: border-box;
                            border: 1px solid #ccc;
                            border-left: none;
                            float: left;
                            padding-top: 6px;
                            padding-bottom: 6px;
                            font-size: 14px;
                            line-height: 22px;
                            padding-right: 8px;
                            padding-left: 8px;
                            border-radius: 0 2px 2px 0;
                            outline: none;
                        }
                    }

                    .setting {
                        label {
                            float: left;
                        }

                        .forget {
                            float: right;
                        }
                    }

                }

                .call {
                    // margin-top: 30px;

                    ul {
                        float: left;

                        li {
                            float: left;
                            margin-right: 5px;
                        }
                    }

                    .register {
                        // float: right;
                        font-size: 15px;
                        line-height: 38px;
                    }

                    .register:hover {
                        color: #4cb9fc;
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;

        ul {
            li {
                display: inline-block;
                border-right: 1px solid #e4e4e4;
                padding: 0 20px;
                margin: 15px 0;
            }
        }
    }
}
</style>
