<template>
  <!-- 广场 -->
  <div class="gc">
    <!-- 导航  -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
      title="广场"
      @click-left="onClickPublish"
      @click-right="onClickSearch"
    >
      <template #left>
        <van-icon name="plus" size="18" />
      </template>
      <template #right>
        <!-- <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      > -->
        <!-- <van-icon name="search" size="18" /> -->
      </template>
    </van-nav-bar>
    <!-- 标签 -->
    <!-- <scrollbar :labelList="labelList" /> -->

    <!-- topic -->
    <div>
      <topic-item
        v-for="(item, index) in topicList"
        :key="index"
        :topic="item"
        @loadTopic="loadTopic"
      />
    </div>
    <van-popup v-model="show" position="top" :style="{ height: '100%' }">
      <publish @oncancel="onCancel"  />
    </van-popup>
  </div>
</template>

<script>
import TopicItem from "../../components/topic/Topic-item.vue";
import { getTopicList, getLabelList } from "@/api/topic";
// import Scrollbar from "../../components/Scrollbar/scrollbar.vue";
import Publish from "../../components/Publish/publish.vue";
export default {
  components: {
    TopicItem,
    // Scrollbar,
    Publish,
  },
  data() {
    return {
      topicList: [],
      labelList: [],
      show: false,
    };
  },
  computed: {},
  methods: {
    onCancel(data) {
      this.show = false;
      
      console.log('71',data);
      if (data) {
        this.topicList.unshift(data)
      }
      this.toGetTopicList();
      
    },
   
    // 删除后重新加载topic列表
    loadTopic() {
      this.toGetTopicList();
    },
    async toGetTopicList() {
      const { data } = await getTopicList();
      this.topicList = data.data;
      console.log(data.data);
    },
    async toGetLabelList() {
      const { data } = await getLabelList();
      this.labelList = data.data;
      console.log(data.data);
    },
    onClickPublish() {
      this.show = true;
      // this.$router.push({
      //   name: 'publish',
      //   // params: { username: 'eduardo' }
      // })
    },
    onClickSearch() {},
  },
  created() {},
  mounted() {
    this.toGetTopicList();
    this.toGetLabelList();
  },
};
</script>
<style scoped lang="less">
.gc {
  padding-top: 95px;
  .search-btn {
    width: 180px;
    height: 64px;
    text-align: right;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    /deep/ .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }
}
</style>