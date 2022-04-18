<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
        background="#3296fa"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />

    <!-- 联想建议 -->
    <search-suggestion 
    v-else-if="searchText"
    :search-text="searchText"

     />
    <!-- 搜索历史纪录 -->
    <search-history v-else />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
  components: { 
    SearchHistory, 
    SearchSuggestion, 
    SearchResult 
  },
  name: "Search",
  data() {
    return {
       searchText: '',
       isResultShow:false//控制结果的显示
    };
  },
  computed: {},
  methods: {
     onSearch(val) {
      console.log(val);
      this.isResultShow=true
    },
    onCancel() {
      // 取消，回到首页
      this.$router.back()
    },
 
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.search-container{
  .van-search__action{
    color: #fff;
  }
}

</style>