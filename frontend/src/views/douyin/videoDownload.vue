<template>
	<div style="margin: 0 10px; height: 100%; background: #f5f7f9; margin-bottom: 20px;" ref="myDiv">
		<div style="height: 30px; display: flex; align-items: center; justify-content: flex-end; -webkit-app-region: drag">
			<div style="margin: auto">
				<span class="title" style=" -webkit-app-region: drag">抖音短视频下载( 视频地址有时效性，请及时下载，不能下载的，请重新导入视频 )</span>
				<span style="margin-left: 10px;"> 【免费使用】</span>
			</div>
		</div>
		<!-- 直播间信息及基本配置 -->
		<div>
      <Row>
        <Col span="24" style="padding-top: 15px;">
          <Space style="margin-bottom: 10px;">
            <Input style="width: 230px;" v-model="video_url" size="small" placeholder="短视频地址,口令里的地址"  />

            <Button size="small" >添加</Button>
            <Button size="small" type="success">登陆抖音</Button>
            <Dropdown size="small">
              <Button size="small" type="primary" style="background-color: #6639a6; color: #f5f7f9;">
                导入数据
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <template #list>
                <DropdownMenu>
                  <DropdownItem >达人主页</DropdownItem>
                  <DropdownItem   divided>我的收藏</DropdownItem>
                </DropdownMenu>
              </template>
            </Dropdown>
            <Button size="small" >全部下载</Button>
            <Button size="small" >全部停止</Button>
            <Button size="small" >清空视频</Button>
            <Button size="small" >导出视频</Button>
            <Button size="small"   icon="md-cog">设置</Button>
          </Space>

        </Col>


      </Row>
      <vxe-table
          :data="tableData">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
      </vxe-table>
		</div>
	
	</div>

	 

</template>

<script>
import VueQr from "vue-qr/src/packages/vue-qr.vue";
export default {
  name: "douyinLive",
  components: {
    VueQr
  },
  data() {
    return {
      updateLoading      : false,
      getAllVideosLoading: false,
      title              : '抖音短视频获客',
      video_url          : '',
      persionHomeUrl     : '',
      ctr_result_scroll  : false,
      timer_id           : 0,
      dy_user_url        : '',

      favCollectionData: [

      ],
      tableData : [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ],
      video_data:[
      ],
      video_comments_data: [
      ],
      video_download_jobs: [],
      current_jobs: [],
      cfg: {
        max_download_num: 5,
        save_dir: '',
      },
      acfg: {	//属性筛选
        mobile: "0",
        sex: "0",
      },
      favCollectionModal: false,
      persionVideoModal : false,
      settingModal      : false,
      expirationDate: "",// 软件到期时间
      //右键菜单
      contextMenuVisible: false,
      contextMenuStyle: {
        top: '0px',
        left: '0px'
      }
    }
  },
  // mounted
  mounted() {


  },

  // methods
  methods: {
    // 时间格式转换
    formatDateTime(datetime) {
      if (!datetime) return ""; // 处理空值
      const date = new Date(datetime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

/**
//========= custom ui
*/


#run-contorller button {
	width: 95%;
}

.tab-pane-min {
	min-height: 392px;
}
.limit-number-input {
	width: 80px;
}
.span-title{
	display: block;
	width: 60px;
}


/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}

.custom-context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.context-menu-item {
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.context-menu-item:hover {
  background-color: #f0f0f0;
}

</style>
