<template>
    <div style="margin:0 20px;border-radius: 10px;">
        <!-- <Tabs type="card" closable @on-tab-remove="handleTabRemove">
            <TabPane label="标签一" v-if="tab0">标签一的内容</TabPane>
            <TabPane label="标签二" v-if="tab1">标签二的内容</TabPane>
            <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
        </Tabs> -->
        <Tabs value="name1">
            <TabPane label="单项计算" name="name1">
                <div class="">
                    <div class="">
                        <Space wrap :size="[12, 12]">
                            <template v-for="(item, index) in list" :key="index">
                                <Button :type="selectIndex == index ? 'primary' : 'default'" @click="selectIndex = index">{{
                                    item }}</Button>
                            </template>
                        </Space>
                    </div>
                    <div class="" style="padding-top: 50px;">
                        <Row justify="space-around" align="middle" class="code-row-bg">
                            <Col span="8">{{ list[selectIndex] }}
                            <Input v-model="startNumber" type="textarea" :autosize="{ minRows: 5, maxRows: 5 }"
                                placeholder="输入数值，即刻还原" />
                            </Col>
                            <Col span="4"><Button type="primary" class="ml30 mr30" @click="singleConvert">点击换算</Button>
                            </Col>
                            <Col span="8">{{ endTitleList[selectIndex] }}
                            <Input v-model="endNumber" type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" />
                            </Col>
                        </Row>
                    </div>
                </div>
            </TabPane>
            <TabPane label="组合计算" name="name2">
                <div class="">
                    <Row justify="space-around" class="code-row-bg">
                        <Col span="4">
                        <Space direction="vertical">实际数据
                            <Input clearable :placeholder="item" v-for="(item, index) in inputListPlaceholder" :key="index"
                                v-model="inputList[index]" />
                        </Space>
                        </Col>
                        <Col span="4">
                        <Space direction="vertical">
                            <Button type="primary" class="ml30 mr30" @click="multipleConvert">点击换算</Button>
                        </Space>
                        </Col>
                        <Col span="4">
                        <Space direction="vertical">
                            实际数据
                            <Input clearable :placeholder="item" v-for="(item, index) in inputRealListPlaceholder"
                                :key="index" v-model="inputRealList[index]" />
                        </Space>
                        </Col>
                        <Col span="4">
                        <Space direction="vertical">高阶数据
                            <Input clearable :placeholder="item" v-for="(item, index) in inputHeightListPlaceholder"
                                :key="index" v-model="inputHeightList[index]" />
                        </Space>
                        </Col>
                    </Row>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

export default {
    name: 'doubleSpeed',
    components: {
        // Head
    },
    data() {
        return {
            tab0: true,
            tab1: true,
            tab2: true,
            endNumber: null,
            startNumber: null,
            selectIndex: 0,
            inputList: [],
            inputListPlaceholder: [
                '请输入流量指数',
                '请输入交易指数',
                '请输入搜索人气',
                '请输入收藏人气',
                '请输入加购人气',
                '请输入转化指数',
            ],
            inputRealList: [],
            inputRealListPlaceholder: [
                '访客数',
                '交易金额',
                '搜索人数',
                '收藏人数',
                '加购人数',
                '转化率',
            ],
            inputHeightList: [],
            inputHeightListPlaceholder: [
                'uv价值',
                '客单价',
                '搜索占比',
                '收藏率',
                '加购率',
            ],
            endTitleList: [
                '访客数',
                '支付金额',
                '搜索人数',
                '加购人数',
                '收藏人数',
                '支付买家数',
                '支付转化率',
                '流失人数',
                '搜索次数',
                '点击人数',
                '点击次数',
                '咨询客服次数',
                '客服支付金额',
                '客服客单价',
                '人工平均响应时长',
            ],
            list: [
                '流量指数',
                '交易指数',
                '搜索人气',
                '加购人气',
                '收藏人气',
                '客群指数',
                '支付转化指数',
                '流失人气',
                '搜索热度',
                '点击人气',
                '点击热度',
                '咨询次数指数',
                '客服支付指数',
                '客服客单价指数',
                '人工平均响应时长指数',
            ],

        };
    },
    computed: {},
    mounted() {

        // this.$ipc.invoke('controller.example.createWindow', {
        //     type: 'web',
        //     content: 'https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&redirectURL=https://myseller.taobao.com/home.htm/QnworkbenchHome/'
        // }).then(r => {
        //     console.log(r);
        // })

    },
    methods: {
        multipleConvert() {

            //   if (!this.$helper.checkIsLogin()) {
            //     return;
            //   }
            this.inputListPlaceholder.forEach((item, index) => {
                if (!this.inputList[index]) {
                    //   message.warning('指数数据不能为空');
                    return;
                }
                let value = this.inputList[index];
                if (index != 5) {
                    value = this.getP().findType(value);
                    if (value == '超出范围') {
                        message.warning('参数超出范围');
                        return;
                    }
                    value = value.toFixed(0);
                } else {
                    value = this.getP().findRateType(value);
                    if (value == '超出范围') {
                        message.warning('参数超出范围');
                        return;
                    }
                    value = value.toFixed(4);
                    value = value * 100;
                    value = value + '%';
                }
                if (value == '超出范围') {
                    message.warning('参数超出范围');
                    return;
                }
                this.inputRealList[index] = value;
            });
            if (this.inputRealList[0] > 0) {
                this.inputHeightListPlaceholder.forEach((item, index) => {
                    if (index == 0) {
                        let value = this.inputRealList[1] / this.inputRealList[0];
                        value = value.toFixed(2);
                        this.inputHeightList[index] = value;
                    } else {
                        if (index == 1) {
                            let zhl = this.inputRealList[5];
                            zhl = zhl.replace('%', '');
                            zhl = zhl * 1;
                            zhl = zhl / 100;
                            let value = this.inputRealList[1] / (zhl * this.inputRealList[0]);
                            value = value.toFixed(2);
                            this.inputHeightList[index] = value;
                        } else {
                            let value = this.inputRealList[index] / this.inputRealList[0];
                            value = value.toFixed(4);
                            value = value * 100;
                            value = value + '%';
                            this.inputHeightList[index] = value;
                        }
                    }
                });
            } else {
                this.inputHeightList = [0, 0, 0, 0, 0];
                this.inputRealList = [0, 0, 0, 0, 0, 0];
            }
            this.$forceUpdate();
        },
        //单项换算
        singleConvert() {

            if (!this.startNumber) {
                message.warning('指数不能为空');
                return;
            }
            let dealList = [];
            Array.from(new Set(this.startNumber.split('\n'))).forEach(
                (item, index) => {
                    console.log(item);
                    if (!item) {
                        message.warning('请输入正确的指数');
                        return;
                    }
                    if (isNaN(item)) {
                        message.warning('只能输入数字');
                        return;
                    }
                    let value;
                    if (this.endTitleList[this.selectIndex] == '支付转化率') {
                        value = this.getP().findRateType(item);
                    } else {
                        value = this.getP().findType(item);
                    }
                    if (value == '超出范围') {
                        message.warning('您输入的数据超出范围');
                        return;
                    }
                    value = value.toFixed(2);
                    dealList.push(value);
                }
            );
            //   this.$helper.addUseNumber(this,'ZSHY')
            let newrow = [
                '流量指数',
                '搜索人气',
                '加购人气',
                '收藏人气',
                '客群指数',
                '流失人气',
                '点击人气',
                '点击热度',
                '咨询次数指数',
                '搜索热度',
            ];
            dealList.forEach((item, index) => {
                if (newrow.indexOf(this.list[this.selectIndex]) != -1) {
                    dealList[index] = Math.round(item);
                }
            });
            this.endNumber = dealList.join('\n');
        },
        getP() {
            let p = {
                findType: function (e) {
                    //除支付转化指数外通用还原
                    return void 0 == e
                        ? 0
                        : e >= 0 && e < 3e3
                            ? p.rang1(e)
                            : e >= 3e3 && e < 2e4
                                ? p.rang2(e)
                                : e >= 2e4 && e < 5e4
                                    ? p.rang3(e)
                                    : e >= 5e4 && e < 1e5
                                        ? p.rang4(e)
                                        : e >= 1e5 && e < 2e5
                                            ? p.rang5(e)
                                            : e >= 2e5 && e < 3e5
                                                ? p.rang6(e)
                                                : e >= 3e5 && e < 5e5
                                                    ? p.rang7(e)
                                                    : e >= 5e5 && e < 8e5
                                                        ? p.rang8(e)
                                                        : e >= 8e5 && e < 1e6
                                                            ? p.rang9(e)
                                                            : e >= 1e6 && e < 2e6
                                                                ? p.rang10(e)
                                                                : e >= 2e6 && e < 5e6
                                                                    ? p.rang11(e)
                                                                    : e >= 5e6 && e < 8e6
                                                                        ? p.rang12(e)
                                                                        : e >= 8e6 && e < 12e6
                                                                            ? p.rang13(e)
                                                                            : e >= 12e6 && e < 17e6
                                                                                ? p.rang14(e)
                                                                                : '超出范围';
                },
                findRateType: function (e) {
                    //支付转换指数还原
                    return void 0 == e
                        ? 0
                        : e >= 0 && e < 23
                            ? p.rangRate1(e)
                            : e >= 23 && e < 70
                                ? p.rangRate2(e)
                                : e >= 70 && e < 100
                                    ? p.rangRate3(e)
                                    : e >= 100 && e <= 3693.5
                                        ? p.rangRate4(e)
                                        : '超出范围';
                },
                rang1: function (e) {
                    return (
                        2.85032440023e-19 * Math.pow(e, 6) -
                        3.26733299167131e-15 * Math.pow(e, 5) +
                        1.56488163015261e-11 * Math.pow(e, 4) -
                        4.33751859674971e-8 * Math.pow(e, 3) +
                        0.000143677524953538 * Math.pow(e, 2) +
                        0.0426669903534544 * e -
                        1.17347128162112
                    );
                },
                rang2: function (e) {
                    return (
                        2.6361693e-23 * Math.pow(e, 6) -
                        2.305291293498e-18 * Math.pow(e, 5) +
                        8.76700064327854e-14 * Math.pow(e, 4) -
                        2.05828554084245e-9 * Math.pow(e, 3) +
                        727213988444307e-19 * Math.pow(e, 2) +
                        0.126991314453936 * e -
                        56.4039982262882
                    );
                },
                rang3: function (e) {
                    return (
                        1.10199e-25 * Math.pow(e, 6) -
                        3.2284892498e-20 * Math.pow(e, 5) +
                        4.2439923457579e-15 * Math.pow(e, 4) -
                        3.58616335129325e-10 * Math.pow(e, 3) +
                        518530019341748e-19 * Math.pow(e, 2) +
                        0.277193063913089 * e -
                        555.674398971899
                    );
                },
                rang4: function (e) {
                    return (
                        8.454e-27 * Math.pow(e, 6) -
                        4.636470035e-21 * Math.pow(e, 5) +
                        1.12750813204514e-15 * Math.pow(e, 4) -
                        1.73450632416443e-10 * Math.pow(e, 3) +
                        458199713387622e-19 * Math.pow(e, 2) +
                        0.376508286240507 * e -
                        1157.16452820911
                    );
                },
                rang5: function (e) {
                    return (
                        -6.1343545e-23 * Math.pow(e, 5) +
                        6.8771145208903e-17 * Math.pow(e, 4) -
                        3.78097694140952e-11 * Math.pow(e, 3) +
                        35566490066202e-18 * Math.pow(e, 2) +
                        0.812733493327658 * e -
                        9309.08526054004
                    );
                },
                rang6: function (e) {
                    return (
                        -9.921835e-24 * Math.pow(e, 5) +
                        1.937505297447e-17 * Math.pow(e, 4) -
                        1.86442674482995e-11 * Math.pow(e, 3) +
                        318094595744882e-19 * Math.pow(e, 2) +
                        1.1849180217423 * e -
                        24209.7551876062
                    );
                },
                rang7: function (e) {
                    return (
                        -3.449782e-24 * Math.pow(e, 5) +
                        9.307994247519e-18 * Math.pow(e, 4) -
                        1.23946227430043e-11 * Math.pow(e, 3) +
                        298760415237449e-19 * Math.pow(e, 2) +
                        1.48275058356596 * e -
                        42476.8535347282
                    );
                },
                rang8: function (e) {
                    return (
                        -3.34135e-25 * Math.pow(e, 5) +
                        1.857997381456e-18 * Math.pow(e, 4) -
                        5.09063423342014e-12 * Math.pow(e, 3) +
                        261974390300692e-19 * Math.pow(e, 2) +
                        2.43509528826424 * e -
                        143734.812525108
                    );
                },
                rang9: function (e) {
                    return (
                        -3.34135e-25 * Math.pow(e, 5) +
                        1.857997381456e-18 * Math.pow(e, 4) -
                        5.09063423342014e-12 * Math.pow(e, 3) +
                        261974390300692e-19 * Math.pow(e, 2) +
                        2.43509528826424 * e -
                        143734.812525108
                    );
                },
                rang10: function (e) {
                    return (
                        -3.4957e-26 * Math.pow(e, 5) +
                        3.90026460982e-19 * Math.pow(e, 4) -
                        2.15062266440996e-12 * Math.pow(e, 3) +
                        231851131049988e-19 * Math.pow(e, 2) +
                        4.01611672970563 * e -
                        483648.680995591
                    );
                },
                rang11: function (e) {
                    return (
                        -3.223e-27 * Math.pow(e, 5) +
                        7.6032423132e-20 * Math.pow(e, 4) -
                        8.80678160840188e-13 * Math.pow(e, 3) +
                        205555297155039e-19 * Math.pow(e, 2) +
                        6.8042707843411 * e -
                        1692703.6365919
                    );
                },
                rang12: function (e) {
                    return (
                        4.745220879e-21 * Math.pow(e, 4) -
                        2.2534536331068e-13 * Math.pow(e, 3) +
                        174075334242049e-19 * Math.pow(e, 2) +
                        14.7202956322245 * e -
                        10003418.7550595
                    );
                },
                rang13: function (e) {
                    return (
                        1.88173071e-21 * Math.pow(e, 4) -
                        1.35986059338809e-13 * Math.pow(e, 3) +
                        163532517979465e-19 * Math.pow(e, 2) +
                        20.2954054532331 * e -
                        21153280.4884378
                    );
                },
                rang14: function (e) {
                    return (
                        7.96482453e-22 * Math.pow(e, 4) -
                        8.51492731921746e-14 * Math.pow(e, 3) +
                        154538934795292e-19 * Math.pow(e, 2) +
                        27.4181492568135 * e -
                        42460659.1147964
                    );
                },
                rangRate1: function (e) {
                    return 0;
                },
                rangRate2: function (e) {
                    return (
                        0.0779253447760533 -
                        0.0131900303435961 * e +
                        0.00093015655979144 * Math.pow(e, 2) -
                        354157386665521e-19 * Math.pow(e, 3) +
                        7.87448131414697e-7 * Math.pow(e, 4) -
                        1.02361136114077e-8 * Math.pow(e, 5) +
                        7.2128868872547e-11 * Math.pow(e, 6) -
                        2.12844187739757e-13 * Math.pow(e, 7)
                    );
                },
                rangRate3: function (e) {
                    return (
                        1.15159043287822 -
                        0.0877250643847525 * e +
                        0.00281297037078605 * Math.pow(e, 2) -
                        492030942670029e-19 * Math.pow(e, 3) +
                        5.0709236128221e-7 * Math.pow(e, 4) -
                        3.07976848571464e-9 * Math.pow(e, 5) +
                        1.0209885402886e-11 * Math.pow(e, 6) -
                        1.42597929843806e-14 * Math.pow(e, 7)
                    );
                },
                rangRate4: function (e) {
                    return (
                        -1.17509656e-22 * Math.pow(e, 6) +
                        1.244978219333e-18 * Math.pow(e, 5) -
                        3.41752276522394e-15 * Math.pow(e, 4) -
                        1.08611167104575e-11 * Math.pow(e, 3) +
                        1.19973853575719e-7 * Math.pow(e, 2) -
                        304110364623966e-20 * e +
                        0.000344332464464969
                    );
                },
            };
            return p
        }
    }
};
</script>

<style lang="less" scoped></style>