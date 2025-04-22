<template>
	<div>
		<div style="overflow-y: scroll; height: calc(100vh - 0px); padding: 2%">
			<div class="home_title">{{ $route.meta.title }}</div>
			<div class="home_content">
				<div class="home_content_list" v-for="(item, index) in home_list.slice(1)" :key="index">
					<div style="width: 20%; margin-left: 5%">
						<img :src="item.meta.icon" alt="" style="width: 100%; border-radius: 10px" />
					</div>
					<div class="home_list_title">
						<div style="width: 100%; padding-bottom: 10px; font-weight: 600">{{ item.meta.title }}</div>
						<div class="home_list_title_content">
							{{ item.meta.content }}
						</div>
						<div class="home_buten_list">
							<Button size="small" @click="isBuy(item)">打开</Button>
							<Button size="small" @click="softDetail(item.meta)">详情</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 软件详情  -->

<SoftDetail ref="softDetail" :item-data="soft_item" @open-soft="isBuy" />

</template>
<script>

import SoftDetail from "@/components/SoftDetail.vue"
export default {
	name: "thing",
	components: {
		SoftDetail
	},
	watch: {
		$route(to, from) {
			this.home_list = this.$route.matched[0].children;
		},
	},
	data() {
		return {
			home_list: [],
			soft_item: {},
			isShowSoftDetail: false,
		};
	},
	computed: {},
	mounted() {
		this.home_list = this.$route.matched[0].children;
		console.log(this.$route.matched[0].children);
	},
	methods: {


		gourl(e) {
			console.log(e)

			this.$router.push({ name: e.url });
						
		},
	 
		//打开之前看看买了没买
		isBuy(item) {
	

			let app_path = item.path;
			//没有 path就去路由中找
			//为了兼容 index 中的 路由数据，后期中心优化这里结构
			if (!item.path) {

				this.$route.matched[0].children.map( data => {
					if (data.meta.app_id == item.app_id) {
			 
						app_path= data.path;
					}
				})
			}
			//和前面比要做下路由中的参数转换，默认路由window 没有路径，index，自定义了路径
			let winPath = this.$route.matched[0].path + "/" + app_path;
			
			item = item.meta || item;
			item.window = winPath;


			
			//========增加调试模式
			if (item.isDev == true) {
				this.gourl(item);
				return;
			}
            // this.softDetail(item)
            this.gourl(item);
			// apiSoftDetail({
			// 		id: item.app_id
			// 	}).then(res => {
			// 		if ( res.code == 1 && res.data.is_freedata == 1 ) {
			// 			this.gourl(item);
			// 			console.log('SUC: 免费的软件');
			// 			return;
			// 		}
			// 		if (res.code == 1 && res.data.is_buy == 1) {
			// 			this.gourl(item);
			// 			console.log('SUC: 软件已经买了');
			// 			return;
			// 		} 
			// 		console.log('SUC: 赶紧去买');
			// 		this.softDetail(item)
			// 	}).catch(err => {
			// 		console.log('err: home.vue isbuy!');
			// 	});
		},

		// 软件详情
		softDetail(item) {
			const appList = JSON.parse(localStorage.getItem('appList'))
			appList.map(data => {
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
		}

	},
};
</script>

<style lang="less" scoped>
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
