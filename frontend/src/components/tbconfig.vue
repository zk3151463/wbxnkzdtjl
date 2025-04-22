<template>
    <div > 
        <Button @click="modelshow = true">设置</Button>
        <Modal v-model="modelshow" width="90" :mask-closable="false" class-name="vertical-center-modal" @contextmenu.prevent>
            <template #header>
                <div style="text-align: center">设置</div>
            </template>
            <div style="text-align: center">
                <Tabs type="card">
                    <TabPane label="基础设置">
                        <Row wrap align="middle">
                            <Col span="12" class-name="col">
                            <div class="p0510">价格设置</div>
                            <Select v-model="configdata.basics.priceType" style="width: 120px" transfer>
                                <Option value="originalPrice">原价</Option>
                                <Option value="discountedPrice">折后价</Option>
                                <!-- <Option value="shenzhen">Sydney</Option> -->
                            </Select>
                            <div class="p0510">X</div>
                            <InputNumber v-model="configdata.basics.priceRatio" :formatter="(value) => `${value}%`"
                                :parser="(value) => value.replace('%', '')" />
                            <div class="p0510">+</div>
                            <InputNumber v-model="configdata.basics.priceIncrease" :formatter="
                                (value) =>
                                    `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            " :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" />
                            </Col>
                            <Col span="12" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.basics.lowPriceSku">低价SKU</Checkbox>
                            </div>
                            <Select v-model="configdata.basics.lowPriceSkutype" style="width: 120px" transfer>
                                <Option value="originalPrice">加价百分比%</Option>
                                <Option value="discountedPrice">加固定金额</Option>
                                <Option value="discountedPrice">乘</Option>
                                <!-- <Option value="shenzhen">Sydney</Option> -->
                            </Select>
                            <InputNumber :min="0" :step="1" v-model="configdata.basics.lowPriceSkuvalue"
                                style="margin-left: 10px;" />
                            </Col>
                            <Col span="12" class-name="col">
                            <div class="p0510">上架设置</div>
                            <Select v-model="configdata.basics.shelfSetting" style="width: 120px" transfer>
                                <Option value="immediately">立刻上架</Option>
                                <Option value="warehouse">放入仓库</Option>
                                <Option value="timing">定时上架</Option>
                                <Option value="drafts">放入草稿箱</Option>
                                <!-- <Option value="shenzhen">Sydney</Option> -->
                            </Select>
                            <DatePicker :model-value="configdata.basics.shelfTime" type="datetime" format="yyyy-MM-dd HH:mm"
                                placeholder="请选择时间" v-if="configdata.basics.shelfSetting == 'timing'"
                                style="margin-left: 10px;" transfer @on-change="uptime" />
                            </Col>
                            <Col span="12" class-name="col">
                            <div class="p0510">库存计数</div>
                            <Select v-model="configdata.basics.inventoryCount" style="width: 120px" transfer>
                                <Option value="placeAnOrder">买家拍下减库存</Option>
                                <Option value="payment">买家付款减库存</Option>
                            </Select>
                            </Col>
                            <!-- <Col span="12" class-name="col">
                            <div class="p0510">店铺分类</div>
                            </Col> -->
                            <Col span="12" class-name="col">
                            <div class="p0510">商家编码</div>
                            <Select v-model="configdata.basics.merchantCode" style="width: 120px" transfer>
                                <Option value="no">不填写</Option>
                                <Option value="source">来源id</Option>
                                <Option value="custom">自定义</Option>
                            </Select>
                            <Input v-model="configdata.sku.inventoryQuantity"
                                v-if="configdata.basics.merchantCode == 'custom'" style="margin-left: 10px;width: 100px"
                                placeholder="自定义前缀" />
                            <Input v-model="configdata.sku.inventoryQuantity"
                                v-if="configdata.basics.merchantCode == 'custom'" style="margin-left: 10px;width: 100px"
                                placeholder="自定义后缀" />
                            </Col>
                            <Col span="12" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.basics.brandother">品牌设置为other/其他</Checkbox>
                                <Checkbox v-model="configdata.basics.brandcustomtype">自定义品牌</Checkbox>
                                <Input v-model="configdata.basics.brandcustom" placeholder="自定义品牌" clearable
                                    style="width: 100px" />
                            </div>
                            </Col>
                            <Col span="12" class-name="col">
                            <div class="p0510">发货时间</div>
                            <Select v-model="configdata.basics.deliveryTime" style="width: 120px" transfer>
                                <Option value="1">24小时内发货</Option>
                                <Option value="2">48小时内发货</Option>
                                <Option value="3">3天内发货</Option>
                                <Option value="5">5天内发货</Option>
                                <Option value="7">7天内发货</Option>
                                <Option value="10">10天内发货</Option>
                                <Option value="15">15天内发货</Option>
                                <Option value="20">20天内发货</Option>
                                <Option value="30">30天内发货</Option>
                            </Select>
                            </Col>
                            <Col span="12" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.basics.repeatTitle">店铺重复标题检测</Checkbox>
                            </div>
                            </Col>
                            <Col span="24" style="height: 100px">
                            <!-- <div class="p0510">发货时间</div> -->
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="标题设置">
                        <Row wrap align="middle" justify="center">
                            <Col span="6" class-name="p0510">
                            <div class="p0510">标题前缀</div>
                            <Input v-model="configdata.title.prefix" type="textarea" :rows="10" placeholder="一行一个多个随机" />
                            </Col>
                            <Col span="6" class-name="p0510">
                            <div class="p0510">标题后缀</div>
                            <div>
                                <Input v-model="configdata.title.suffix" type="textarea" :rows="10"
                                    placeholder="一行一个多个随机" />
                            </div>
                            </Col>
                            <Col span="12" class-name="p0510">
                            <div class="p0510">自定义标题</div>
                            <div>
                                <Input v-model="configdata.title.customTitle" type="textarea" :rows="10"
                                    placeholder="一行一个(宝贝ID=新标题:88888888=新标题)" />
                            </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="过滤设置">
                        <Row wrap align="middle" justify="center">
                            <Col flex="1" class-name="p0510">
                            <div class="p0510">标题过滤</div>
                            <div>
                                <Input v-model="configdata.filter.title" type="textarea" :rows="10" placeholder="" />
                            </div>
                            </Col>
                            <Col flex="1" class-name="p0510">
                            <div class="p0510">违规词过滤</div>
                            <div>
                                <Input v-model="configdata.filter.violation" type="textarea" :rows="10" placeholder="" />
                            </div>
                            </Col>
                            <Col flex="1" class-name="p0510">
                            <div class="p0510">品牌词过滤</div>
                            <div>
                                <Input v-model="configdata.filter.brand" type="textarea" :rows="10" placeholder="" />
                            </div>
                            </Col>
                            <Col flex="1" class-name="p0510">
                            <div class="p0510">旺旺过滤</div>
                            <div>
                                <Input v-model="configdata.filter.wangwang" type="textarea" :rows="10" placeholder="" />
                            </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="商品设置">
                        <Row wrap align="middle">
                            <Col span="7" class-name="p0510">
                            <div class="p0510">宝贝属性</div>
                            <div>
                                <Input v-model="configdata.filter.productProperties" type="textarea" :rows="14"
                                    placeholder="" />
                            </div>
                            </Col>
                            <Col span="10" class-name="p0510">
                            <div class="p0510">自定义首页</div>
                            <div>
                                <Input v-model="configdata.filter.customHomePage" type="textarea" :rows="6"
                                    placeholder="" />
                            </div>
                            <div class="p0510">自定义尾页</div>
                            <div>
                                <Input v-model="configdata.filter.customTailpage" type="textarea" :rows="6"
                                    placeholder="" />
                            </div>
                            </Col>
                            <Col span="7" class-name="p0510">
                            <Row wrap align="middle">
                                <Col span="24" class-name="col">
                                <div class="p0510">主图设置</div>
                                <Select v-model="configdata.commodity.mainImageId" style="width: 120px" transfer>
                                    <Option value="1">不处理</Option>
                                    <Option value="2">第二张做主图</Option>
                                    <Option value="3">第三张做主图</Option>
                                    <Option value="4">第四张做主图</Option>
                                    <Option value="5">第五张做主图</Option>
                                </Select>
                                </Col>
                                <Col span="24" class-name="col">
                                <div class="p0510">主图来源</div>
                                <Select v-model="configdata.commodity.sourceOfMainImage" style="width: 120px" transfer>
                                    <Option value="pc">电脑端</Option>
                                    <Option value="phone">无线端</Option>
                                </Select>
                                </Col>
                                <Col span="24" class-name="col">
                                <div class="p0510">
                                    <Checkbox v-model="configdata.commodity.detailsGoToText">详情去除文字</Checkbox>
                                </div>
                                </Col>
                                <Col span="24" class-name="col">
                                <div class="p0510">
                                    <Checkbox v-model="configdata.commodity.usingWireless">使用无线端详情</Checkbox>
                                </div>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="sku设置">
                        <Row wrap align="middle">
                            <Col span="8" class-name="col">
                            <div class="p0510">库存设置</div>
                            <Select v-model="configdata.sku.inventorySettings" style="width: 120px" transfer>
                                <Option value="source">来源库存</Option>
                                <Option value="unified">统一库存</Option>
                            </Select>
                            <InputNumber :min="1" v-model="configdata.sku.inventoryQuantity"
                                v-if="configdata.sku.inventorySettings == 'unified'" style="margin-left: 10px;" />
                            </Col>
                            <Col span="8" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.sku.UpperLimit">sku上限</Checkbox>
                            </div>
                            <InputNumber :min="0" :step="1" v-model="configdata.sku.UpperLimitNum"
                                style="margin-left: 10px;" />
                            </Col>
                            <Col span="8" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.sku.noPictures">过滤没图sku</Checkbox>
                            </div>
                            </Col>
                            <Col span="8" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.sku.lessThanPrice">过滤来源sku价格小于</Checkbox>
                                <InputNumber :min="1" v-model="configdata.sku.lessThanPricevalue"
                                    v-if="configdata.sku.lessThanPrice" style="margin-left: 10px;" />
                            </div>
                            </Col>
                            <Col span="8" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.sku.priceIsGreaterThan">过滤来源sku价格大于</Checkbox>
                                <InputNumber :min="1" v-model="configdata.sku.priceIsGreaterThanvalue"
                                    v-if="configdata.sku.priceIsGreaterThan" style="margin-left: 10px;" />
                            </div>
                            </Col>
                            <Col span="8" class-name="col">
                            <div class="p0510">
                                <Checkbox v-model="configdata.sku.inventoryIsLessThan">过滤来源sku库存小于</Checkbox>
                                <InputNumber :min="1" v-model="configdata.sku.inventoryIsLessThanvalue"
                                    v-if="configdata.sku.inventoryIsLessThan" style="margin-left: 10px;" />
                            </div>
                            </Col>
                            <Col span="24" class-name="p0510">
                            <div class="p0510">自定义sku</div>
                            <Input v-model="configdata.sku.customSku" type="textarea" :rows="6" placeholder="" />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
            <template #footer>
                <div style="text-align: center">
                    <Button size="large" :loading="modal_loading" @click="$refs.fileInput.click()">导入配置<input type="file"
                            ref="fileInput" accept=".yxj" style="display: none" @change="importFile" /></Button>
                    <Button size="large" :loading="modal_loading" @click="exportFile">导出配置</Button>
                    <Button size="large" :loading="modal_loading" @click="preservation">保存配置</Button>
                </div>
            </template>
        </Modal>
    </div>
</template>
<script>
// var CryptoJS = require('crypto-js');
// import config from '../../../package.json'
export default {
    name: "tbconfig",
    data() {
        return {
            modelshow: false,
            configdata: {
                basics: {
                    priceType: "originalPrice",
                    priceRatio: 100,
                    priceIncrease: 0,
                },
                title: {},
                filter: {},
                commodity: {},
                sku: {},
            },
            version: 0.01
        };
    },
    created() { },
    computed: {},
    methods: {
        importFile(file, fileList) {
            console.log(file)
            // const reader = new FileReader();
            // reader.readAsText(file.target.files[0]);
            // reader.onload = () => {
            //     // var bytes = CryptoJS.AES.decrypt(reader.result, this.$store.state.secretkey);
            //     // var bytes = reader.result;

            //     try {
            //         this.configdata = JSON.parse(reader.result)
            //         // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            //         // this.configdata = decryptedData
            //         // decryptedData = JSON.parse(decryptedData);

            //         console.log(this.configdata)

            //     } catch (error) {
            //         console.log(error)
            //     }
            // };

        },
        exportFile() {
            // let con = CryptoJS.AES.encrypt(JSON.stringify(this.configdata), this.$store.state.secretkey).toString();
            // let con = JSON.stringify(this.configdata);
            // let blob = new Blob([con]); //  创建 blob 对象
            // let link = document.createElement('a');
            // link.href = URL.createObjectURL(blob); //  创建一个 URL 对象并传给 a 的 href
            // link.download = this.version.build.productName + '配置备份' + new Date().toLocaleDateString() + '.yxj'; //  设置下载的默认文件名
            // link.click();

        },
        preservation() {
            this.modelshow = false
        },
        uptime(e) {
            this.configdata.basics.shelfTime = e
        }
    },
};
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

.p0510 {
    padding: 5px 10px;
}

.col {
    display: flex;
    align-content: center;
    padding: 10px 0;
}
</style>
