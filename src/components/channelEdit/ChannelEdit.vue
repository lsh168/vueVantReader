<template>
  <div class="channelEdit">
    <!-- 第一行 -->
    <van-cell :border="false">
      <div slot="title">我的频道</div>
      <van-button 
      slot="default" 
      type="danger" plain round 
      size="small"
      @click="isEdit=!isEdit"
        >{{isEdit?"完成":"编辑"}}</van-button
      >
    </van-cell>
    <!-- 我的频道单元格 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
      <van-icon 
      v-show="isEdit && !fiexChannels.includes(channel.categoryId)" 
      slot="icon" 
      name="clear"></van-icon>
      <!-- 给数据单独抽出来，设置 我的频道 和 频道 激活 -->
      <!-- 绑定类名   key：active   value：boolean   如果为真，作用类样式-->
      <span 
      class="text" 
      :class="{active: index === active }" 
      slot="text"
      >{{channel.categoryName}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <!-- 频道单元格 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannel"
        :key="index"
        icon="plus"
        :text="channel.categoryName"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/book'
export default {
  data() {
    return {
      allCategorys:[],
      isEdit:false,
      // 不删除频道id为0，2的元素
      fiexChannels:[0,2]
    };
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active:{
      type:Number,
      required:true
    }
  },
  // 计算属性会关注内部数据的变化，发生变化重新开始执行
  computed: {
    recommendChannel(){
      const channels=[]
      this.allCategorys.forEach(channel=>{
        // 找到满足条件的元素
        const ret=this.myChannels.find(myChannel=>{
          return myChannel.categoryId===channel.categoryId
        })
        // 如果我的频道不包含该频道项，则收集到该频道中
        if(!ret){
          channels.push(channel)
        }
      })
      // 返回计算结果
      return channels
    }
  },
  methods: {
   async loadAllCategory(){
     try {
       const {data}=await getCategoryList()
       this.allCategorys=data.categoryList
     } catch (error) {
       this.$toast("频道编辑获取数据失败")
     }
    },
    // 频道推荐
    onAddChannel(channel){
      // 根据计算属性
      this.myChannels.push(channel)
    },
    // 我的频道
    onMyChannelClick(channel, index){
      if(this.isEdit){
        // 编辑状态，删除频道

        // 如果是固定频道，则不删除
        if(this.fiexChannels.includes(channel.categoryId)){
          return 
        }
        if (index<=this.active) {
          this.$emit('update-active',this.active-1,true)
          
        }
        // 参数一：要删除元素的开始索引（包括）
        // 参数二：删除的个数，如果不指定，则从参数一开始，一直删除。
        this.myChannels.splice(index,1)

      }else{
        // 非编辑状态切换频道,需要父组件响应
        this.$emit('update-active',index,false)
      }

    }
  },
  created() {
    this.loadAllCategory()
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.channelEdit {
  padding: 85px 0;
  .grid-item {
    width: 160px;
    height: 86px;
    /deep/ .van-grid-item__content {
      // 文字不折行
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,.text {
        font-size: 28px;
        color: #222;
        // 取消文字上方的margin
        margin-top: 0;
      }
      .active{
        color:blue;
      }
      //由原来的属性icon  改成 插槽，图标发生变化，使图标回复
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        z-index: 2;
        color: #cacaca;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        // 横向排列
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>