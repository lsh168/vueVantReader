<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 标签导航栏 -->
    <!-- route  开启路由模式 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="reader reader-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/piazza">
        <i slot="icon" class="reader reader-paixingbang"></i>
        <!-- <i slot="icon" class="bar-chart-o"></i> -->
        <!-- <van-icon name="bar-chart-o" /> -->
        <span class="text">排行榜</span>
      </van-tabbar-item>
      <van-tabbar-item to="/gc">
        <i slot="icon" class="reader reader-iconfontguangchang"></i>
        <span class="text">广场</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="reader reader-wode"></i>
        <span class="text">{{ $store.state.user ? '我的':'未登录'  }}</span>
      </van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: {},
  data() {
    return {
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.layout-container{
  z-index: 200;
  .layout-tabbar{
    z-index: 500;
    i.reader{
      font-size: 40px;
    }
    span.text{
      font-size: 20px;
    }
  }

}

</style>
