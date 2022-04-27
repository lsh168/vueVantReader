<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadingSearch()"
    >
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.bookName" /> -->
      <book-item v-for="(item,index) in list" :key="index"  :book="item"  />
    </van-list>
  </div>
</template>

<script>
import { selectBooks } from "@/api/book";
import BookItem from '../../../components/bookItem/BookItem.vue';
export default {
  components: { BookItem },
  name: "SearchResult",
  props: {
  q: {
    type: String,
    require: true
  }
},
  data() {
    return {
      list: [],//真正显示的数据
      books:[],//总数据

      loading: false,
      finished: false,
    };
  },
  computed: {},
  methods: {
    async loadingSearch() {
      const { data } = await selectBooks();
      this.books = data.book;
      console.log("打印数组", this.books);
      if (this.q) {
        const newListData = []; // 用于存放搜索出来数据的新数组
        if (this.q) {
          this.books.filter((item) => {
            if (
              item.bookName.indexOf(this.q) !== -1 
              || item.author.indexOf(this.q) !== -1 
              // || item.subTitle.indexOf(this.searchText) !== -1
            ) {
              console.log(item);
              newListData.push(item);
            }
          });
        }
        this.list = newListData;
      } 
      // 加载状态结束
        this.loading = false;
        this.finished=true

      // this.loading = false;
      //   if (this.list.length) {
      //     this.finished=true
      //   }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
</style>