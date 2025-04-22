<template>
  <Modal
    @on-cancel="onCloseDetailPage()"
    v-model="isShowModel"
    width="700"
    footer-hide
    sticky
    :mask="true"
    title="应用详情"
    :styles="{ top: '10px' }"
  >
    <div>
      <!-- soft detail head -->
      <Row :gutter="16" index="" class="soft-detail-head">
        <Col span="4">
          <Image class="img-icon" style="width: 100px" :src="itemData.icon" />
        </Col>
        <Col span="16">
          <Space direction="vertical">
            <Space
              ><span
                ><b>{{ itemData.title }}</b></span
              ></Space
            >
            <Space style="padding-right: 20px">
              &nbsp;&nbsp; {{ desc ? desc : itemData.content }}</Space
            >
            <span><b>下载次数</b>：{{ user_num }}次</span>
          </Space>
        </Col>
        <Col span="4">
          <Space direction="vertical" v-if="!isPay">
            <Button
              type="success"
              v-if="isBuy != 1 && isTrail == true"
              @click="trailPay()"
              >免费试用</Button
            >
            <!-- <Button type="success"  @click="trailPay()">免费试用</Button> -->
            <Button type="primary" v-if="isBuy == 1" @click="openSoft()"
              >打开软件
            </Button>
            <Button type="primary" v-else @click="buyNow()">购买软件</Button>

            <Button type="success" v-if="isTrailOrder" @click="buyNow()"
              >立即购买</Button
            >

            <Button type="success" v-if="isRenewOrder" @click="renewNow()"
              >立即续费</Button
            >

            <router-link to="/service/serverurl"
              ><Button type="error">联系客服</Button></router-link
            >
          </Space>
          <Space v-else>
            <Button @click="isPay = !isPay">软件详情</Button>
          </Space>
        </Col>
      </Row>
      <!-- end detail head -->
      <Divider />
      <!-- is pay -->
      <div v-if="isPay">
        <Space direction="vertical">
          <Space align="center" wrap="true" size="large">
            <Space
              direction="vertical"
              class="pay-num-pan"
              v-for="(item, key) in payList"
              @click="activateBox(key)"
              :class="{ 'active-pan': activeBox === key }"
            >
              <Space class="pay-num-mon">{{ key }}个月</Space>
              <Space class="pay-num-price">￥{{ item }}</Space>
            </Space>
          </Space>
          <Divider />
          <Space>
            <span> 预充值免费升级，获得更多折扣！</span>
            <Button size="small" @click="recharge()">【立即升级】</Button>
          </Space>
          <Space>
            <div v-for="level_item in level_data" style="width: 160px">
              <Space direction="vertical">
                <span
                  >【{{ level_item.name }}】{{ level_item.discount }} 折</span
                >
                <span style="margin-left: 8px"
                  >实付：{{
                    (original_price * level_item.discount).toFixed(2)
                  }}</span
                >
              </Space>
            </div>
          </Space>
        </Space>

        <Divider />

        <Row>
          <Col span="6">
            待支付：<span style="color: red">￥{{ payPrice }}</span>
          </Col>
          <Col span="10" class="level-txt">
            账户余额 （￥ {{ wallet }}）
            <span style="color: #f9c647"> {{ level }} </span> 折扣：{{
              discount
            }}
          </Col>
          <Col span="4">
            <Button type="primary" disabled v-if="!isSufficient"
              >余额不足</Button
            >
            <Button
              v-else
              style="width: 90%"
              :loading="pay_loading"
              type="primary"
              @click="pay(itemData)"
            >
              <span v-if="!pay_loading">支付</span>
              <span v-else>支付中...</span>
            </Button>
          </Col>
          <Col span="4">
            <Button style="width: 90%" @click="recharge()">充值</Button>
          </Col>
        </Row>
      </div>

      <Tabs size="small" class="soft-detail-content" v-else>
        <TabPane label="使用教程">
          <div v-if="video" style="text-align: center">
            <!-- <img src="@/assets/image/play_mask.png" class="play_tt"> -->
            <Button
              icon="ios-play"
              @click="playVideo(video)"
              :style="'backgroundImage: url(' + play_img + ')'"
              class="play_tt"
              >视频教程</Button
            >
          </div>
          <!-- 软件教程，后台Content内容 -->
          <div style="margin-top: 20px; width: 700px">
            <div v-html="content" class="sotf-content"></div>
          </div>
        </TabPane>
        <TabPane label="软件详情" style="min-height: 40px">
          <!-- //轮播图，后台多图， -->
          <Carousel
            v-model="cvalue"
            style="height: 400px; width: 650px; margin-top: 20px"
          >
            <CarouselItem v-for="(item, index) in images" :key="index">
              <Image
                :src="item"
                fit="fill"
                style="height: 400px; width: 650px"
              />
            </CarouselItem>
          </Carousel>
        </TabPane>
        <TabPane label="版本记录">
          <div style="margin: 20px 0">软件作者： 未来科技有限公司</div>
          <Timeline>
            <TimelineItem>
              <p class="time">0.0.3 版本</p>
              <p class="content">修复官方api变化</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">0.0.2 版本</p>
              <p class="content">优化程序流畅度</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">0.0.1 版本</p>
              <p class="content">测试版本发布</p>
            </TimelineItem>
          </Timeline>
        </TabPane>
      </Tabs>
    </div>
  </Modal>
  <!-- 试用窗口 -->
  <Modal v-model="isShowTrail" width="360">
    <template #header>
      <p style="color: #505a6e; text-align: left">
        <Icon
          v-if="isTrailSucess"
          type="ios-checkmark-circle"
          style="color: #19be6b; font-size: 20px; margin-right: 10px"
        />
        <Icon
          v-else
          type="ios-close"
          style="color: #be1919; font-size: 20px; margin-right: 10px"
        />
        <span>试用通知</span>
      </p>
    </template>
    <div style="text-align: center">
      <p v-if="isTrailSucess">
        恭喜您获得
        {{
          trail_day
        }}
        小时免费试用特权，请先查看“介绍与教程”学习操作，或联系客服咨询使用方法！
      </p>
      <p v-else>
        您此款工具的免费试用特权已使用，如需使用请购买本工具；如需再次试用请联系客服获取试用特权！
      </p>
    </div>
    <template #footer>
      <div v-if="!isTrailSucess">
        <Button type="primary" @click="buyNow()" style="margin-right: 10px"
          >购买软件</Button
        >
        <router-link to="/service/serverurl"
          ><Button type="error">联系客服</Button></router-link
        >
      </div>
      <div v-else>
        <Button type="success" @click="trailSoft()" style="margin-right: 10px"
          >立即使用</Button
        >
        <Button @click="isShowTrail = false">介绍/教程</Button>
      </div>
    </template>
  </Modal>
</template>

<script>

export default {
  props: ["itemData", "isShowDetail"],
  emits: ["openSoft"],
  data() {
    return {
      images: [],
      isShowModel: false,
      isShowTrail: false,
      isTrailSucess: true,
      isTrail: false,
      isTrailOrder: false, //是否正在试用
      isRenewOrder: false, //是否显示续费
      renewOrderId: 0,
      pay_loading: false,
      showResultPage: false,
      isBuy: 0, //是否购买
      isPay: false,
      cvalue: 0, //轮播图默认显示
      mom: 1,
      activeBox: 0,
      payList: {},
      trail_data: {}, //试用数据
      payPrice: 0,
      startvalue: 5,
      wallet: 0, //钱包余额
      user_num: 200,
      video: "",
      trail_day: 0,
      level: "普通用户",
      level_data: {},
      original_price: 0, //原价
      discount: 1,
      isSufficient: false, //有没有充足的钱购买？
      desc: "",
      content: "",
      play_img:"@/assets/image/play_mask.png",
    };
  },

  created() {
    this.initData();
  },
  updated() {
    this.userWallet();
    this.updateItemData();
    this.pay_loading = false;
  },
  methods: {
    initData() {
      //初始化钱包数据
      // this.userWallet();
      this.pay_loading = false;
      this.isPay = false;
      this.showResultPage = false;
    },

    //打开软件
    openSoft() {
      this.checkUserLogin();
      this.$emit("openSoft", this.itemData);
      this.closeDetailPage();
    },
    //检查用户是否登陆状态
    checkUserLogin() {
      const user = localStorage.getItem("user");
      if (user == null) {
        this.isShowModel = false;
        this.$store.state.logintype = true;
      }
    },

    //有没有充足的钱购买
    hasSufficientWallet() {
      if (this.wallet >= this.payPrice * 1) {
        console.log("钱够了");
        this.isSufficient = true;
      } else {
        console.log("钱不够了。。。");
        this.isSufficient = false;
        console.log(this.payPrice);
        console.log(this.wallet);
      }
    },
    //更新sku
    updateSku(skuDataJson) {
      this.payList = {};
      const skuData = JSON.parse(skuDataJson);
      for (let key in skuData) {
        key = key.toString();
        if (key != "-1") {
          this.payList[key] = skuData[key];
        } else {
          this.trail_data[key] = skuData[key];
          this.isTrail = true;
          console.log("支持试用");
        }
      }
      this.activeBox = Object.keys(this.payList)[0];
      this.original_price = this.payList[Object.keys(this.payList)[0]];
      this.payPrice = (
        this.payList[Object.keys(this.payList)[0]] * this.discount
      ).toFixed(2);
    },

    updateItemData() {
      console.log("软件信息更新了:...");
      this.isTrail = false;
      this.isTrailOrder = false;
      this.isRenewOrder = false;
      const appDetail = this.itemData.app_detail;

      if (appDetail.arge_images != "") {
        this.images = appDetail.large_images.split(",");
      }

    },

    //有没有试用订单，如果有，显示购买按钮
    hasTrailOrder(app_id) {

    },
    //续费订单
    renewOrder() {
      const data = {
        application_id: this.itemData.app_detail.id,
        period: this.activeBox, //几个月
        price: this.payList[this.activeBox], //价格
        number: 1,
        isrenewal: 1,
        application_pit_id: this.renewOrderId,
      };


    },
    //支付
    buyNow() {
      this.checkUserLogin();
      this.isPay = !this.isPay;
      this.isShowTrail = false;
      this.hasSufficientWallet();
    },
    //续费
    renewNow() {
      this.buyNow();
    },

    //试用订单流程
    trailPay() {
      this.checkUserLogin();
      const trayDataDay = Object.keys(this.trail_data)[0].toString();
      const trayDataPrice = this.trail_data[trayDataDay];

      const data = {
        application_id: this.itemData.app_detail.id,
        period: trayDataDay, //几个月
        price: trayDataPrice, //价格
        number: 1,
      };


    },
    // 试用
    trailSoft() {
      this.isShowTrail = false;
      this.openSoft();
    },

    //用户余额数据
    userWallet() {
      // apiUserWallet()
      //   .then((res) => {
      //     console.log(res);
      //     this.wallet = res.data.wallet;
      //     this.discount = res.data.discount;
      //     this.level = res.data.leveldata_textattr;
      //     this.level_data = res.data.member;
      //   })
      //   .catch((err) => {
      //     console.log("Error: get wallet data err");
      //   });
    },
    //显示model
    showDetailPage() {
      this.isShowModel = true;
    },

    //这里可以优化下，关闭时候不闪烁里面的内容，延迟initData()
    closeDetailPage() {
      this.isShowModel = false;
      setTimeout(() => {
        this.initData();
      }, 1000);
    },
    //关闭软件详情页面
    onCloseDetailPage() {
      //  @on-cancel
      this.initData();
    },
    //支付购买
    pay(item) {
      //如果是续费走续费
      if (this.isRenewOrder) {
        this.renewOrder();
        return;
      }

      this.pay_loading = true;
      console.log("Buy it:");
      console.log(item);

      const data = {
        application_id: item.app_id,
        period: this.activeBox, //几个月
        price: this.payList[this.activeBox], //价格
        number: 1,
      };


    },
    activateBox(boxNumber) {
      this.activeBox = boxNumber;
      this.payPrice = (this.payList[boxNumber] * this.discount).toFixed(2);
      this.original_price = this.payList[boxNumber];
      this.hasSufficientWallet();
    },

    playVideo(url) {
      let addcon = {
        type: "web",
        content: url,
        width: 1300, //1000 * 650
        height: 850,
        ishidTitileBar: "default",
      };
      this.$ipc.invoke("controller.utils.createWindow", addcon);
    },

    //充值
    recharge() {
      this.closeDetailPage();

    },
  },
};
</script>
<style>
.soft-detail-head {
  height: 100px;
}

.pay-num-pan {
  border: 2px solid #e8eaec;
  border-radius: 8px;
  padding: 10px;
  width: 180px;
  text-align: center;
}

.pay-num-mon {
  font-weight: bold;
}

.pay-num-price {
  font-weight: bold;
  font-size: large;
}

.pay-num-s-price {
  font-weight: bold;
  text-decoration: line-through;
}

.active-pan {
  border: 2px solid #f5cc87;
}

/* #657180 */
.level-txt {
  font-size: 12px;
  color: #657180;
}

.img-icon img {
  border-radius: 20%;
}
.sotf-content {
  display: block;
}
.sotf-content img {
  width: 100%;
}
.play_tt {
  color: #fff;
  font-size: 30px;
  width: 600px;
  height: 350px;
}
</style>
