<template>
    <div @contextmenu.prevent>
        <div style="height: 40px;display: flex;align-items: center;justify-content: flex-end;">
            <button class="gradient-btn" @click="$store.state.buytype=true"><Icon type="ios-cart-outline" />
                
            <span style="margin-left: 5px;">购买服务</span>
            </button>
        </div>
        <Modal v-model="$store.state.buytype" width="500" :mask-closable="false" :footer-hide="true" class-name="vertical-center-modal" @contextmenu.prevent>
            <div style="display: flex;">
                <div style="width: 20%;background-color: bisque;">1</div>
                <div style="width: 80%;">2</div>
            </div>
            
        </Modal>
    </div>
</template>
<script>
export default {
    name: "buy",
    data() {
        return {
            
        }
    },
    created(){
       
    },
    computed: {
        
    },
    methods: {
        
    }
}
</script>
<style>
.gradient-btn {
  background-color: #ff7f50;
  color: white;
  height: 25px;
  font-size: 14px;
  border: none;
  padding: 0px 30px;
  border-radius: 20px;
  cursor: pointer;
  background-image: linear-gradient(to right, #ff7782, #ff6347);
  line-height: 0;
}
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
}

.vertical-center-modal .ivu-modal {
    top: 0;
}
</style>
