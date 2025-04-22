<template>
	<div style="margin: 0 20px; height: 100%" ref="myDiv">
		<div style="height: 40px; display: flex; align-items: center; justify-content: flex-end; -webkit-app-region: drag">
			<div style="margin: auto">
				<span class="title">淘宝店群</span>
				<span style="margin: 0 20px">登录店铺:{{ !islogin ? "未登录" : loginuser.username }}</span>
				<Button type="primary" ghost size="small" @click="storeManagementbuten(!islogin ? 1 : 2)">
					{{ !islogin ? "登录" : "切换" }}
				</Button>
			</div>
		</div>
		<!-- 宝贝复制 -->
		<Spin fix v-if="Spintype">
			<Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
			<div>{{ Spincont }}</div>
		</Spin>
		<div style="">
			<Row style="padding: 10px 0">
				<Col span="8">
					<ButtonGroup>
						<!-- <Button size="small" @click="copyurl" type="primary" ghost>粘贴链接</Button> -->
						<Button size="small" @click="$refs.fileInput.click()" type="primary" ghost
							>导入链接
							 <input type="file" ref="fileInput" accept=".txt" style="display: none" @change="importfile"    />
						</Button>
					</ButtonGroup>
				</Col>
				<Col span="8" offset="8" style="text-align: end">
					<tbconfig :shopname="loginuser.name" :starttype="starttype" :logintype="qidong"></tbconfig>
				</Col>
			</Row>
			<Input
				type="textarea"
				:rows="2"
				:autosize="{ maxRows: 2, minRows: 2 }"
				placeholder="请输入商品链接,一行一个（淘宝,天猫,1688,淘特）"
				
				v-model="allurl"
				@on-focus="currentVisible = false"
				@on-blur="closeinput"  v-contextmenu="menus"> 
               
			</Input>

			<Row style="padding: 10px 0">
				<Col span="20">
					<Button size="small" @click="redurl" type="primary" ghost>读取链接</Button>
					<Button size="small" @click="data = []" type="primary" ghost style="margin-left: 20px">清空链接</Button>
					<Button size="small" @click="startTask(1)" type="primary" ghost style="margin-left: 20px">开始复制</Button>
					<Button size="small" @click="startTask(2)" type="primary" ghost style="margin-left: 20px">停止复制</Button>
					<Button size="small" @click="modal1 = true" type="primary" ghost style="margin-left: 20px">导出链接</Button>
				</Col>


			</Row>
		</div>
	

		<Modal v-model="modal1" width="360" class-name="vertical-center-modal">
			<template #header>
				<div style="text-align: center">请选择导出内容</div>
			</template>
			<div style="text-align: center">
				<RadioGroup v-model="exportType" vertical>
					<Radio label="导出所有" border style="margin-top: 10px"></Radio>
					<Radio label="导出未发布" border style="margin-top: 10px"></Radio>
					<Radio label="导出发布失败" border style="margin-top: 10px"></Radio>
					<Radio label="导出发布成功后的链接" border style="margin-top: 10px"></Radio>
          <Button type="primary" size="large" long :loading="modal_loading" @click="exportfile">导出</Button>

				</RadioGroup>
			</div>

		</Modal>

		<Modal v-model="storeType" width="700" class-name="vertical-center-modal" footer-hide>
			<template #header>
				<div style="text-align: center">店铺管理</div>
			</template>
			<div style="text-align: center" :style="{ height: windowHeight - 300 + 'px' }">
				<Modal v-model="zhlogin" width="360" class-name="vertical-center-modal" footer-hide>
					<div v-if="shoplist_data[zhlogincon.key]">
						<Input
							prefix="ios-happy"
							placeholder="请输入旺旺号"
							style="width: 300px; margin: 20px"
							v-model="shoplist_data[zhlogincon.key].name"
							:disabled="zhlogincon.type != 'bind'"
							v-if="zhlogincon.type != 'bind'" />
						<Input
							prefix="ios-contact"
							placeholder="请输入淘宝账户"
							style="width: 300px; margin: 20px"
							v-model="shoplist_data[zhlogincon.key].username" />
						<Input
							prefix="ios-lock"
							type="password"
							password
							placeholder="请输入密码"
							style="width: 300px; margin: 20px"
							v-model="shoplist_data[zhlogincon.key].password" />

						<div style="text-align: center">
							<Button type="primary" @click="accountNumber(zhlogincon.key, zhlogincon.type)">
								{{ zhlogincon.type != "bind" ? "保存" : "绑定" }}
							</Button>
						</div>

						<div style="text-align: center">请输入淘宝账号和密码,密码只用做登录。</div>
					</div>
				</Modal>
				<Table :columns="shoplist" :data="shoplist_data" :height="windowHeight - 300"></Table>
			</div>
			<template #footer> </template>
		</Modal>
	</div>
</template>

<script>
	// import { ContextMenu } from 'iview';
	import { resolveComponent } from "vue";
	import tbconfig from "@/components/tbconfig.vue";
	export default {
		name: "taobaoCopy",
		components: {
			tbconfig,
		},
		data() {
			return {
                menus: [
                    {
                    text: "粘贴",
                    subText: "从剪切板读取链接",
                    action: async (el, event, axis, menus, item, isDark) =>  {
                      
                    }
                    }
                ],
				starttype: true,
				codetype: [
					"待采集",
					"采集中",
					"下载上传资源",
					"发布中",
					"发布成功",
					"",
					"",
					"等待审核中",
					"已跳过",
					"发布失败",
				],
				zhlogincon: {},
				zhlogin: false,
				Spintype: false,
				Spincont: "",
				exportType: "导出所有",
				modal1: false,
				windowHeight: window.innerHeight,
				windowWidth: window.innerWidth,
				data: [],
				babytype: { 0: "待采集" },
				storeType: false,
				shoplist: [
					{
						title: "旺旺号",
						key: "name",
						render: (h, params) => {
							return h("div", [
								h(
									"strong",
									{
										style: {
											color: params.row.name ? "#21ce1b" : "#f5222d",
										},
									},
									params.row.name ? params.row.name : "未绑定"
								),
							]);
						},
					},
					{
						title: "账户",
						key: "username",
						render: (h, params) => {
							return h("div", [
								h(
									"strong",
									{
										style: {
											color: params.row.username ? "#21ce1b" : "#f5222d",
										},
									},
									params.row.username ? params.row.username : "未绑定"
								),
							]);
						},
					},
					{
						title: "购买时间",
						key: "createtime",
					},
					{
						title: "到期时间",
						key: "expiretime",
					},
					{
						title: "操作",
						key: "action",
						width: 180,
						align: "center",
						render: (h, params) => {
							return h("div", [
								params.row.name
									? h("div", [
											h(
												resolveComponent("Button"),
												{
													type: "primary",
													size: "small",
													style: {
														marginRight: "5px",
													},
													onClick: () => {
														this.storeManagement(
															params.row.username,
															params.row.password,
															params.row.name,
															params.row.is_giv
														);
													},
												},
												{
													default() {
														return "启动";
													},
												}
											),
											h(
												resolveComponent("Button"),
												{
													type: "primary",
													size: "small",
													onClick: () => {
														(this.zhlogin = true),
															(this.zhlogincon = {
																key: params.index,
																type: "guanli",
															});
													},
												},
												{
													default() {
														return "管理";
													},
												}
											),
									  ])
									: h(
											resolveComponent("Button"),
											{
												type: "primary",
												size: "small",
												style: {
													marginRight: "5px",
												},
												onClick: () => {
													(this.zhlogin = true),
														(this.zhlogincon = {
															key: params.index,
															type: "bind",
														});
												},
											},
											{
												default() {
													return "绑定";
												},
											}
									  ),
							]);
						},
					},
				],
				shoplist_data: [],
				loginuser: {},
				add_time: 1,
				intervalId: "",
				errtime: 0,
				qidong: false,
				islogin: false,
				eid: 0,
				is_huakuai: false,
				new_id: "",
				winid: "",
				freightlist: [],
				currentVisible: false,
				contextMenuX: 0,
				contextMenuY: 0,
				locator: null,
				allurl: "",
				allnum: 0,
				oknum: 0,
				errnum: 0,
				skpnum: 0,
				userdata: "",
				uptype: "",
               
			};
		},
		computed: {},
		mounted() {
			this.winid = this.$route.query.winid;

			window.addEventListener("resize", this.handleResize);
			if (localStorage.getItem("user")) {
				this.userdata = JSON.parse(localStorage.getItem("user"));
			}
			// if (!this.$store.state.user.nickname) {
			//     this.$store.state.logintype = true
			// }

			this.init();
			if (localStorage.getItem("uptime")) {
				this.$store.state.uptime = localStorage.getItem("uptime");
			}

			if (localStorage.getItem("skipRepetition")) {
				this.$store.state.skipRepetition = localStorage.getItem("skipRepetition");
			}
			console.log(this.$store.state.uptime);
			
		},
		beforeUnmount() {
			window.removeEventListener("resize", this.handleResize);
		},
		beforeRouteLeave(to, from, next) {
			// console.log(to, from, next)
			if (!this.qidong) {
				// this.$ipc.send('controller.example.taobaoWin', {
				//     type: 'close',
				// })
				this.data = [];
				this.starttype = true;
				this.qidong = false;
				this.islogin = false;
				next();
			} else {
				this.$Message.error({
					content: "店铺已启动请先点击停止按钮后再跳转",
					duration: 5,
				});
			}
		},
		methods: {
			urlcopy(e) {
				this.$Copy({
					text: e,
				});
			},
			gourl() {
				let addcon = { type: "vue", content: "/babyCopy/history" };
				this.$ipc.invoke("controller.example.createWindow", addcon).then(r => {
					console.log(r);
				});
			},
			showContextMenu(event) {
				event.preventDefault();
				this.contextMenuX = event.clientX;
				console.log("🚀 ~ file: taobaoCopy.vue:489 ~ showContextMenu ~ contextMenuX:", this.contextMenuX);
				this.contextMenuY = event.clientY;
				console.log("🚀 ~ file: taobaoCopy.vue:491 ~ showContextMenu ~ contextMenuY:", this.contextMenuY);
				this.currentVisible = true;
				// this.createLocator()
			},
			init() {
				const self = this;
				// 避免重复监听，或者将 on 功能写到一个统一的地方，只加载一次
				
			},
			storeManagementbuten(e) {
				//淘宝修改
				if (e && e == 2) {
					this.startTask(2);
				}

				if (this.$route.meta.title == "淘上淘") {
					this.new_id = "tst";
				} else if (this.$route.meta.title == "猫上淘") {
					this.new_id = "mst";
				} else {
					this.new_id = "bst";
				}
				// postAccountApi({ app_id: 'bst' }).then((res) => {
				// postAccountApi({ app_id: 'mst' }).then((res) => {
				postAccountApi({ app_id: "tst" }).then(res => {
					console.log(res);
					this.shoplist_data = res.data.list;
					this.storeType = true;
				});
			},
			handleResize() {
				this.windowHeight = window.innerHeight;
				this.windowWidth = window.innerWidth;
			},
			remove(row) {
				console.log(row.id);
				let delid = this.data.indexOf(row);
				this.data.splice(delid, 1);
				this.allnum = this.data.length;
				this.getnum();
			},
			deletedata() {
				this.data = [];
			},
			redurl() {
				this.pushurl(this.allurl);
			},
			getnum() {
				this.oknum = this.data.filter(item => item.type == 4).length;
				console.log("🚀 ~ file: taobaoCopy.vue:819 ~ timing ~ this.oknum:", this.oknum);
				this.errnum = this.data.filter(item => item.type == 9).length;
				this.skpnum = this.data.filter(item => item.type == 8).length;
				console.log("🚀 ~ file: taobaoCopy.vue:821 ~ timing ~ this.errnum:", this.errnum);
			},
			closeinput() {
				let _this = this;
				setTimeout(function () {
					_this.currentVisible = false;
				}, 200);
			},
			copyurl() {
				console.log(213);
				this.currentVisible = false;
				navigator.clipboard.readText().then(text => {
					if (text) {
						if (this.allurl.endsWith("\r") || this.allurl.endsWith("\r") || this.allurl == "") {
							this.allurl = this.allurl + text;
						} else {
							this.allurl = this.allurl + "\r" + text;
						}
					}
				});
				//粘贴导入链接
			},
			importfile(e) {
				//txt文件导入链接
				if (e.target.files.length != 0) {
					const reader = new FileReader();
					reader.onload = () => {
						this.pushurl(reader.result);
					};
					reader.readAsText(e.target.files[0]);
					this.$refs.fileInput.value = "";
				}
			},
			exportfile() {
				let text = [];
				this.data.forEach(item => {
					if (this.exportType == "导出所有") {
						text.push(item.url);
					} else if (this.exportType == "导出未发布" && item.type != 9) {
						text.push(item.url);
					} else if (this.exportType == "导出发布失败" && item.type == 9) {
						text.push(item.url);
					} else if (this.exportType == "导出发布成功后的链接" && item.type == 4) {
						text.push(item.newurl);
					}
				});

				const content = text.join("\n");
				const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download =
					this.version.build.productName + "_采集_" + this.exportType + "_" + new Date().toLocaleDateString() + ".txt";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(url);
				this.modal1 = false;
			},
			accountNumber(e, d) {
				if (d == "bind") {
					console.log(this.shoplist_data[e]);
					this.$ipc
						.invoke("controller.example.taobaoWin", {
							type: "bind",
							username: this.shoplist_data[e].username,
							password: this.shoplist_data[e].password,
							winid: this.winid || 0,
						})
						.then(r => {
							console.log("🚀 ~ file: taobaoCopy.vue:644 ~ accountNumber ~ r:", r);

							//绑定旺旺
							postBindApi({
								app_id: this.shoplist_data[e].id,
								username: this.shoplist_data[e].username,
								password: this.shoplist_data[e].password,
								name: r.shopname,
								winid: this.winid || 0,
							}).then(res => {
								if (res.msg == "成功") {
									this.zhlogin = false;
									this.shoplist_data[e].name = r.shopname;
									this.$Message.success("绑定成功");
									this.storeType = false;

									this.loginuser.name = r.shopname;
									this.loginuser.username = this.shoplist_data[e].username;
									this.starttype = false;
									this.islogin = true;
									this.qidong = true;
									this.uptype = r.type;
									// const params = {
									//     type: 'start',
									//     content: '开始'
									// }
									// this.$ipc.send('controller.example.taobaoWin', params)
									this.$ipc.send("controller.example.taobaoWin", {
										type: "huakuai",
										winid: this.winid || 0,
										platform: 1,
									});
									this.$ipc.send("controller.example.upconfig", {
										shop: "taobao",
										type: "add",
										shopname: this.loginuser.name,
									});
								}
							});
						});
				} else {
					//修改账号密码
					postBindApi({
						app_id: this.shoplist_data[e].id,
						username: this.shoplist_data[e].username,
						password: this.shoplist_data[e].password,
						name: this.shoplist_data[e].name,
					}).then(res => {
						if (res.msg == "成功") {
							this.$Message.success("修改成功");
							this.zhlogin = false;
						}
						console.log(res);
					});
					this.zhlogin = false;
				}
			},
			storeManagement(e, d, f, g) {
				this.loginuser = { name: f, username: e, password: d, type: g };
				this.startTask(0);
			},
		
			pushurl(text) {
				//解析文本放到页面
				let addlist = [];
				text = text.split(/\r?\n/);
				console.log(text);
				for (let i = 0; i < text.length; i++) {
					const urlPattern = /^(https?|http):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;
					if (urlPattern.test(text[i])) {
						if (text[i].includes("taobao.com")) {
							const match = text[i].match(/[\?&]id=([^&]*)/);
							// 获取参数的值
							const babyid = match && decodeURIComponent(match[1].replace(/\+/g, ""));
							var lest1 = this.data.find(item => item.id === babyid);
							var lest2 = addlist.find(item => item.id === babyid);
							if (!lest1 && !lest2 && babyid && babyid != null) {
								addlist.push({
									id: babyid,
									title: "",
									img: "",
									type: "0",
									typecode: "0",
									url: "https://item.taobao.com/item.htm?id=" + babyid,
									platform: "淘宝",
								});
							}
						}
						if (text[i].includes("tmall.com")) {
							const match = text[i].match(/[\?&]id=([^&]*)/);
							// 获取参数的值
							const babyid = match && decodeURIComponent(match[1].replace(/\+/g, ""));
							var lest1 = this.data.find(item => item.id === babyid);
							var lest2 = addlist.find(item => item.id === babyid);
							if (!lest1 && !lest2 && babyid && babyid != null) {
								addlist.push({
									id: babyid,
									title: "",
									img: "",
									type: "0",
									typecode: "0",
									url: "https://detail.tmall.com/item.htm?id=" + babyid,
									platform: "天猫",
								});
							}
						}
						if (text[i].includes("1688.com")) {
							const match = text[i].match(/\/(\d+)\./);
							// 获取参数的值
							const babyid = match && decodeURIComponent(match[1].replace(/\+/g, ""));
							var lest1 = this.data.find(item => item.id === babyid);
							var lest2 = addlist.find(item => item.id === babyid);
							if (!lest1 && !lest2 && babyid && babyid != null) {
								addlist.push({
									id: babyid,
									title: "",
									img: "",
									type: "0",
									typecode: "0",
									url: "https://detail.1688.com/offer/" + babyid + ".html?sk=consign",
									platform: "1688",
								});
							}
						}
						// }
					}
				}
				this.data = this.data.concat(addlist);
				this.allnum = this.data.length;
				this.getnum();
				this.$Message.success(`成功添加${addlist.length}个商品`);
			},
		},
	};
</script>

<style lang="less" scoped>
	:deep(.ivu-table-cell) {
		padding-right: 5px;
		padding-left: 5px;
	}

	.title {
		// font-size: 20px;
		font-weight: bolder;
		color: @primary-color;
		-webkit-app-region: no-drag;
	}

	:deep(.ivu-btn-ghost.ivu-btn-primary) {
		-webkit-app-region: no-drag;
	}

	:deep(textarea::-webkit-scrollbar) {
		width: 10px;
		height: 10px;
		display: block;
	}

	:deep(textarea::-webkit-scrollbar-thumb) {
		background-color: @primary-color;
		border-radius: 5px;
		border: 1px solid #f1f1f1;
		box-shadow: inset 0 0 6px rgba(255, 119, 130, 0.3);
	}

	.col-left {
		text-align: left;
	}

	:deep(.mytable-scrollbar ::-webkit-scrollbar) {
		width: 10px;
		height: 10px;
		display: block;
	}

	/*滚动条的轨道*/
	:deep(.mytable-scrollbar ::-webkit-scrollbar-track) {
		background-color: #ffffff;
	}

	/*滚动条里面的小方块，能向上向下移动*/
	:deep(.mytable-scrollbar ::-webkit-scrollbar-thumb) {
		background-color: @primary-color;
		border-radius: 5px;
		border: 1px solid #f1f1f1;
		box-shadow: inset 0 0 6px rgba(255, 119, 130, 0.3);
	}

	:deep(.mytable-scrollbar ::-webkit-scrollbar-thumb:hover) {
		background-color: @primary-color;
	}

	:deep(.mytable-scrollbar ::-webkit-scrollbar-thumb:active) {
		background-color: @primary-color;
	}

	/*边角，即两个滚动条的交汇处*/
	:deep(.mytable-scrollbar ::-webkit-scrollbar-corner) {
		background-color: #ffffff;
	}
</style>
