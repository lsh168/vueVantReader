<template>
  <div class="recommend">
    <van-nav-bar
    class="page-nav-bar" fixed
      title="热门图书推荐"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="hot-recommend">热门推荐</div>
    <div>
      <book-item v-for="(item,index) in books" :key="index" :book="item" />
    </div>
  </div>
</template>

<script>
import { selectHotBooks } from "@/api/book";
import BookItem from '../../components/bookItem/BookItem.vue';
export default {
  components: { BookItem },
  data() {
    return {
      books: [], //热门推荐
    };
  },
  computed: {},
  methods: {
    onClickLeft(){
      this.$router.back()
    },
    async toSelectHotBooks() {
      try {
        const { data } = await selectHotBooks();
        this.books = data.data;
        // this.books = this.books.slice(0, 3);
        console.log(this.books);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {},
  mounted() {
    this.toSelectHotBooks();
  },
};
</script>
<style scoped lang="less">
.recommend{
  padding-top: 94px;


.hot-recommend {
  height: 200px;
  color: #fff;
  text-align: center;
  padding-top: 80px;
  background-image: url("https://img1.doubanio.com/view/activity_page/raw/public/5279.jpg");
  opacity: 0.9;
}
}

</style>