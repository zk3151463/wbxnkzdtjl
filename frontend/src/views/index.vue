<template>
  <div class="home">
    <Carousel v-model="value" loop autoplay :autoplay-speed="5000">
      <CarouselItem v-for="(item, index) in banner" :key="index">
        <img
          v-bind:src="item.src"
          alt=""
          style="width: calc(97vw - 210px); height: 20vw"
        />
      </CarouselItem>
    </Carousel>
    <Row>
      <Col span="24" class="home_title">
        <span>精选工具</span>
      </Col>
    </Row>
    <Row>
      <Col flex="3">
        <div>
          <div class="home_content">
            <div
              class="home_content_list"
              v-for="(item, index) in home_list"
              :key="index"
            >
              <div style="width: 20%; margin-left: 5%">
                <img
                  :src="item.icon"
                  alt=""
                  style="width: 100%; border-radius: 10px"
                />
              </div>
              <div class="home_list_title">
                <div
                  style="width: 100%; padding-bottom: 10px; font-weight: 600"
                >
                  {{ item.title }}
                </div>
                <div class="home_list_title_content">
                  {{ item.content }}
                </div>
                <div class="home_buten_list">
                  <Button size="small" @click="isBuy(item)">打开</Button>
                  <Button size="small" @click="softDetail(item)">详情</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <!-- //暂时隐藏掉资讯 -->
      <!-- <Col flex="2">
				<Col flex="3">
					<div style="margin: 10px 0">
						<div style="background-color: #ffffff; border-radius: 5px; width: 100%">
							<div style="padding: 10px 10px 0; font-weight: bold">最新资讯</div>
							<div style="display: flex; padding: 10px" v-for="(item, index) in Newlist" :key="index" class="home_news_list">
								<div style="border-left: 4px solid #0280FB; padding: 5px"></div>
								<router-link :to="{ name: 'newscontenthome', query: { id: item.id } }" style="width: 100%; color: #17233d">
									<Row style="width: 100%">
										<Col flex="5" v-line-clamp="1">{{ item.title }} </Col>
									</Row>
								</router-link>
							</div>
						</div>
					</div>
				</Col>
				<Col flex="2"> </Col>
			</Col> -->
    </Row>
  </div>

  <!-- 软件详情  -->
  <!-- <Modal v-model="isShowSoftDetail" width="700" footer-hide  sticky  :mask="true" title="应用详情" :styles="{top: '10px'}">
		<SoftDetail :item-data="soft_item" @open-soft="isBuy"/>
	</Modal> -->
  <SoftDetail
    ref="softDetail"
    :is-show-detail="isShowSoftDetail"
    :item-data="soft_item"
    @open-soft="isBuy"
  />
</template>

<script>
// import Head from '@/components/head.vue';
// import MyFooter from '../components/MyFooter.vue';

import { getImgUrl } from "../utils/tools";

export default {
  name: "index",
  components: {
    // Head
  },
  data() {
    return {
      menus: [
        {
          text: "右击菜单",
          subText: "副标题",
          action: (el, event, axis, menus, item, isDark) => {
            alert("F12 控制台查看点击事件接口可用参数");

            console.log("点击的dom", el);
            console.log("点击的原生事件", event);
            console.log("点击的坐标", axis);
            console.log("右击菜单的完整列表信息", menus);
            console.log("当前右击菜单信息", item);
            console.log("当前右击菜单是否使用夜间模式", isDark);
          },
        },
      ],

      home_list: [
        {
          title: "抖音达人采集",
          icon: getImgUrl("image/douyin.jpeg"),
          url: "videoDownload",
          content: "全自动邀约达人，每天触达5000+，采集手机号、微信号等功能",
        },
        {
          title: "抖音视频下载",
          icon: getImgUrl("image/douyin.jpeg"),
          url: "videoDownload1",
          content: "全自动邀约达人，每天触达5000+，采集手机号、微信号等功能",
        },
        {
          title: "指数还原",
          url: "exponentialReductionhome",
          icon: getImgUrl("icon/shujuzhanshi.png"),
          content: "无需授权上传任意宝贝到淘宝店铺",
        },
      ],
      idtype: 0,
      value: 0,
      banner: [
        {
          src: "https://yxjgjx.obs.cn-east-3.myhuaweicloud.com/uploads/20230522/7ede1ffa0c1a2da28aa20c6bc0165b67.jpg",
        },
        {
          src: "https://yxjgjx.obs.cn-east-3.myhuaweicloud.com/uploads/20230522/7ede1ffa0c1a2da28aa20c6bc0165b67.jpg",
        },
      ],
    };
  },
  computed: {},
  methods: {
    gourl(e) {
      console.log(e);
      console.log(e.url);
      this.$router.push({ name: e.url });
    },

    //打开之前看看买了没买
    isBuy(item) {
      // this.softDetail(item)
      this.gourl(item);

      // apiSoftDetail({
      // 	id: item.app_id
      // }).then(res => {
      // 	if ( res.code == 1 && res.data.is_freedata == 1 ) {
      // 		this.gourl(item);
      // 		console.log('SUC: 免费的软件');
      // 		return;
      // 	}
      // 	if (res.code == 1 && res.data.is_buy == 1) {
      // 		this.gourl(item);
      // 		console.log('SUC: 软件已经买了');
      // 		return;
      // 	}
      // 	console.log('SUC: 赶紧去买');
      // 	this.softDetail(item)
      // })
    },
    // 软件详情
    softDetail(item) {
      const appList = JSON.parse(localStorage.getItem("appList"));
      appList.map((data) => {
        if (data.id == item.app_id) {
          item.app_detail = data;
          item.is_buy = 0;
          if (data.is_freedata == 1) {
            item.is_buy = 1;
          }

          if (data.is_buy == 1) {
            item.is_buy = 1;
          }
          this.soft_item = item;
          this.isShowSoftDetail = true;
          this.$refs.softDetail.showDetailPage();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  padding: 0 2%;
  height: 93vh;
  overflow: scroll;
}
.home_title {
  font-size: 1rem;
  color: @v-bg-title;
  font-weight: 500;
  margin-left: 2%;
}

.home_content {
  margin: 25px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 255px);
  justify-content: center;
  grid-gap: 22px;
}

.home_content_list {
  width: 255px;
  background-color: @v-bg-left-box;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
}

.home_content_list:hover {
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.3);
}

.home_content_list:hover .home_list_title_content {
  display: none;
}

.home_list_title {
  color: @v-bg-left-box;
  width: 85%;
  margin: 5%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  color: @v-bg-title;
}

.home_list_title_content {
  color: #9b9ba0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.home_content_list:hover .home_buten_list {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.home_buten_list {
  display: none;
}

.home_list_title_content {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
