<template>
  <div>
    <div class="labelList">
      <div class="label-item" v-for="(item,index) in labelList" :key="index">
        <div>
          <van-image
            width="68"
            height="68"
            fit="cover"
            round
            :src="item.img"
          />
        </div>
        <i class="smile-o"></i>
        <van-icon name="smile-o" />
        <div class="label-text">{{item.labelName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    labelList: {
      type: Array,
      required: true,
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.labelList {
  background: #fff;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  // 不换行
  white-space: nowrap;
  &::-webkit-scrollbar {
    // 滚动条整体
    // background: none;
  }
  &::-webkit-scrollbar-thumb {
    //滑块
    background: rgba(71, 145, 242, 0);
    // border-radius: 0px;
  }
  // &::-webkit-scrollbar-track {
  //   //轨道
  // }
  // &::-webkit-scrollbar-button {
  //   //两端按钮
  // }
  // &::-webkit-scrollbar-track-piece {

  //   //滚动条中间部分
  // }
  .label-item {
    display: inline-block;
    position: relative;
    .van-icon-smile-o {
      position: absolute;
      top: 120px;
      right: 16px;
      color: #ffffff;
      background-color: #87f5f5;
      border-radius: 50%;
      border: 5px solid #fff;
    }
    div {
      // 双边框
      padding: 5px;
      border-radius: 50%;
      border: 2px solid #fff;
      // margin: 15px;
      .van-image {
        margin: 4px 4px 0px;
        border: 5px solid rgb(114, 250, 250);
        // border-style: solid;
        // border-color: aqua;
      }
    }

    .label-text {
      font-size: 32px;
      line-height: 44px;
      text-align: center;
    }
  }
}
</style>