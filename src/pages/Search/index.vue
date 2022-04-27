<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
        background="#3296fa"
      />
    </form>
    <div class="search-content">
      <!-- 搜索结果 -->
      <search-result class="result-content" v-if="isResultShow" :q="searchText" />

      <!-- 联想建议 -->
      <search-suggestion v-else-if="searchText" :search-text="searchText" />
      <!-- 搜索历史纪录 -->
      <search-history
      class="history-content"
        :searchHistories="searchHistories"
        @onSearch="onSearch"
        v-else
      />
    </div>
  </div>

  <!-- 搜索联想建议思路 -->
  <!-- 当输入内容的时候，请求加载搜索建议。将请求的结果绑定模板中。 -->
  <!-- 将父组件搜索的内容传给子组件，子组件监视输入内容的变化，如果变化获取联想建议数据。
  将获取到的联想数据展示到列表中。 -->
  <!-- Lodash 搜索数据防抖  debounce 防抖函数  npm i lodash
  import { debounce }  from 'lodash'
  按需加载
  handler:debounce(function(value){
    log(value)
  },1000),
  一秒之后执行

关键字高亮显示


   -->
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  name: "Search",
  data() {
    return {
      searchText: "",
      isResultShow: false, //控制结果的显示
      searchHistories: [], //存储历史记录
    };
  },
  computed: {},
  methods: {
    onSearch(val) {
      //更新文本框内容
      this.searchText = val;
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        // 删除一个元素
        this.searchHistories.splice(index, 1);
      }
      // 添加元素到数组开头
      this.searchHistories.unshift(val);

      // 渲染搜索结果
      this.isResultShow = true;
    },
    onCancel() {
      // 取消，回到首页
      this.$router.back();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.search-container {
  .van-search {
    z-index: 500;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .van-search__content{
      border-radius:30px
    }
  }
  .search-content{
    padding-top: 25px;
    .result-content{
      padding-top: 88px;
    }
    .history-content{
      padding-top: 88px;
    }
  }
  .van-search__action {
    color: #fff;
  }
}
</style>