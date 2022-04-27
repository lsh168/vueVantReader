<template>
  <div class="search-suggestion">
    <van-cell title="联想建议" />
    <van-cell
      v-for="(item, index) in books"
      :key="index"
      icon="search"
      :to="{
      //路由名称
      name: 'bookDetail',
      params: {
        id: item.bookId,
      },
    }"
    >
    <div slot="title" v-html="highlight(item.bookName,searchText)"></div>
    <div slot="label" v-html="highlight(item.author,searchText)"></div>
    </van-cell>
  </div>
</template>

<script>
import { selectBooks } from "@/api/book";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      books: [], //存放联想建议的数据
    };
  },
  computed: {},
  watch: {
    //  第一次监听不触发内容,加上immediate，第一次也可以监听到
    searchText: {
      // handler(val) {
      //   console.log(val);
      //   this.loadingSearch();
      // },
      handler: debounce(function (val) {
        console.log(val);
        this.loadingSearch();
      }, 500),
      immediate: true,
    },
  },
  methods: {
    // 参数 source: 原始字符串
    // 参数 keyword: 需要高亮的关键词
    // replace不会替换原有字符串，直接返回一个字符串
    highlight(source,keyword) {
      const reg = new RegExp(keyword, "gi");
      return source.replace(
        reg,`<span style="color: #3296fa">${keyword}</span>`
      );
    },
    async loadingSearch() {
      const { data } = await selectBooks();
      this.books = data.book;
      console.log("打印数组", this.books);
      if (this.searchText) {
        const newListData = []; // 用于存放搜索出来数据的新数组
        if (this.searchText) {
          this.books.filter((item) => {
            if (
              item.bookName.indexOf(this.searchText) !== -1 ||
              item.author.indexOf(this.searchText) !== -1
              // || item.subTitle.indexOf(this.searchText) !== -1
            ) {
              console.log(item);
              newListData.push(item);
            }
          });
        }
        this.books = newListData;
      } else {
        // this.fetchData()
      }
    },
  },
  created() {},
  mounted() {
    //  this.loadingSearch()
  },
};
</script>
<style scoped>
</style>