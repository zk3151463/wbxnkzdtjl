<template>
    <div @contextmenu.prevent>
        <div style="height: 40px;display: flex;align-items: center;justify-content: flex-end;" class="head_right">
            <div></div>
            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="small" style="margin: 10px;"
                @click="$store.state.logintype = true" />
            <div :style="{ marginRight: systemOS == 'win' ? '200px' : '60px' }" @click="$store.state.logintype = true">
                {{ !$store.state.user.name ? '未登录' : $store.state.user.name }}
            </div>
            
        </div>
        <Modal v-model="$store.state.logintype" width="360" :mask-closable="false" :footer-hide="true"
            class-name="vertical-center-modal" @contextmenu.prevent>
            <template #header>
                <div style="text-align: center;">{{ logintypelist[logintype] }}</div>
            </template>
            <div style="text-align:center">
                <div class="login-content">
                    <Login ref="form" @on-submit="handleSubmit">
                        <UserName name="username" />
                        <Password name="password" v-if="logintype == 'login'" />
                        <Poptip trigger="focus" placement="right" width="240" v-if="logintype == 'register'">
                            <Password name="password" :rules="passwordRule" placeholder="至少6位密码，区分大小写"
                                @on-change="handleChangePassword" />
                            <template #content>
                                <div class="login-content-tip">
                                    <div class="login-content-tip-title" :class="passwordTip.class">
                                        强度：{{ passwordTip.strong }}
                                    </div>
                                    <Progress :percent="passwordTip.percent" hide-info :stroke-width="6"
                                        :stroke-color="passwordTip.color" />
                                    <div class="login-content-tip-desc">
                                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                                    </div>
                                </div>
                            </template>
                        </Poptip>
                        <Password name="passwordConfirm" :rules="passwordConfirmRule" placeholder="确认密码"
                            v-if="logintype == 'register'" />
                        <div class="login-content-login">
                            <Checkbox v-model="autoLogin" size="large" v-if="logintype == 'login'">自动登录</Checkbox>
                            <a style="margin-left: 10px;" @click="logintype = 'password'"
                                v-if="logintype == 'login'">忘记密码</a>
                            <a @click="logintype = 'register'" v-if="logintype == 'login'">注册</a>
                            <a @click="logintype = 'login'" v-if="logintype != 'login'">登录</a>
                        </div>
                        <Submit>{{ logintypelist[logintype] }}</Submit>
                    </Login>
                </div>
            </div>
        </Modal>

    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        const validatePassCheck = (rule, value, callback) => {
            if (value !== this.$refs.form.formValidate.password) {
                callback(new Error('两次输入的密码不匹配！'));
            } else {
                callback();
            }
        };

        return {
            modal1: true,
            logintype: 'login',
            logintypelist: { 'login': '登录', 'password': '忘记密码', 'register': '注册' },
            autoLogin: true,
            passwordRule: [
                {
                    required: true, message: '密码不能为空！', trigger: 'change'
                },
                {
                    min: 6, message: '密码不能少于6位！', trigger: 'change'
                }
            ],
            passwordConfirmRule: [
                {
                    required: true, message: '确认密码不能为空！', trigger: 'change'
                },
                { validator: validatePassCheck, trigger: 'change' }
            ],
            // 密码长度，在密码强度提示时作为判断依据
            passwordLen: 0,
            systemOS: ''
        }
    },
    created() {
        var system = navigator.userAgent.toLowerCase();
        // var windows = system.indexOf("windows");
        if (system.indexOf("windows") !== -1) {
            this.systemOS = 'win'

        } else if (system.indexOf("mac") !== -1) {
            this.systemOS = 'mac'
            // this.systemOS = 'win'
        }
    },
    computed: {
        // 密码强度提示文案等
        passwordTip() {
            let strong = '强';
            let className = 'strong';
            let percent = this.passwordLen > 10 ? 10 : this.passwordLen;
            let color = '#19be6b';

            if (this.passwordLen < 6) {
                strong = '太短';
                className = 'low';
                color = '#ed4014';
            } else if (this.passwordLen < 10) {
                strong = '中';
                className = 'medium';
                color = '#ff9900';
            }

            return {
                strong,
                class: 'login-content-tip-' + this.passwordLen < 6 ? 'low' : (this.passwordLen < 10 ? 'medium' : 'strong'),
                percent: percent * 10,
                color
            }
        }
    },
    methods: {
        handleChangePassword(val) {
            this.passwordLen = val.length;
        },
        handleSubmit(valid, e) {
            if (valid) {
                console.log(e)
                this.$store.state.user.name = e.username
                this.$store.state.logintype = false
                this.$Modal.success({
                    title: '登录成功',
                });
            }
        }
    }
}
</script>
<style>
.login-content-login {
    margin-bottom: 24px;
    text-align: left;
}

.login-content-login a {
    float: right;
    margin-bottom: 24px;
}

.login-content {
    width: 300px;
    margin: 0 auto !important;
}

.login-content .ivu-poptip,
.login-content .ivu-poptip-rel {
    display: block;
}

.login-content-tip {
    text-align: left;
}

.login-content-tip-low {
    color: #ed4014;
}

.login-content-tip-medium {
    color: #ff9900;
}

.login-content-tip-strong {
    color: #19be6b;
}

.login-content-tip-title {
    font-size: 14px;
}

.login-content-tip-desc {
    white-space: initial;
    font-size: 14px;
    margin-top: 6px;
}
</style>
