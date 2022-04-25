<template>
  <div class="home-container">
    <!-- 搜索导航 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- <van-tab
        title="推荐"
      /> -->
      <van-tab
        v-for="channel in channels"
        :key="channel.categoryId"
        :title="channel.categoryName"
      >
        <book-list :channel="channel" :orderBook="orderBook" />
      </van-tab>
      <!-- 汉堡频道按钮 -->
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="reader reader-jiajianzujianjiahao"></i>
      </div>
    </van-tabs>
    <!-- 频道弹出窗 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '86%' }"
    >
      <channel-edit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>

    <!-- 筛选 -->
    <div class="filter-book">
      <van-tabs type="card" @click="clickOrderBook">
        <van-tab title="默认" name="''" @click="clickOrderBook('')" />
        <van-tab
          title="热度"
          name="quantity"
          @click="clickOrderBook('quantity')"
        />
        <van-tab title="评分" name="score" @click="clickOrderBook('score')" />
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from "@/api/book";
import BookList from "@/components/bookList/BookList";
import ChannelEdit from "@/components/channelEdit/ChannelEdit";

export default {
  name: "Home",
  components: {
    BookList,
    ChannelEdit,
    // Filter
    // FilterA,
    // FilterBar
  },
  data() {
    return {
      active: 1,
      channels: [],
      isChannelEditShow: false,
      orderBook: "",
    };
  },
  created() {
    this.loadChannels();
    // this.onload()
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getCategoryList();
        // console.log(data.categoryList);
        this.channels = data.categoryList;
      } catch (error) {
        this.$toast("获取分类频道失败");
      }
    },
    // 默认参数
    onUpdateActive(index, isChannelEditShow = true) {
      // console.log('home',index);
      this.active = index;
      this.isChannelEditShow = isChannelEditShow;
    },
    clickOrderBook(name) {
      this.orderBook = name;
      console.log("orderbook", this.orderBook);
      console.log("name", name);
    },
  },
};
</script>

<style scoped lang="less" >
// 搜索导航
.home-container {
  // 46+41   *2  列表项向下移两行
  // padding-top: 174px;
  padding-top: 240px;
  // 增加底部距离，显示加载状态
  padding-bottom: 100px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  /deep/ .van-nav-bar {
    background-color: #1989fa;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    /deep/ .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      // 位置设置为浏览器元素的二倍
      // 固定channel标签
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }

    // 激活时的字体颜色
    .van-tab--active {
      color: #333;
    }

    .van-tabs__line {
      background-color: #1989fa;
    }
    .placeholder {
      // 默认评分位置为1
      flex-shrink: 0;
      width: 62px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 62px;
      height: 82px;
      background-color: #fff;
      opacity: 0.8;
      // 图标大小
      i.reader {
        font-size: 33px;
      }
    }
  }
  .filter-book {
    position: fixed;
    top: 175px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 58px;
    padding-top: 5px;
    background-color: #fff;
    /deep/ .van-tabs--card > .van-tabs__wrap {
      height: unset;
    }

    ::v-deep .van-tabs__nav--card {
      width: 270px;
      float: right;
      border: 2px solid #c2c2c2;
    }
    
    ::v-deep .van-tabs__nav--card .van-tab {
      color: unset;
      // color:#646566;
      border-right: 1px solid #c2c2c2;
    }
    ::v-deep .van-tab--active {
      color: #fff !important;
      background-color: #3296fa;
    }
  }
}
</style>