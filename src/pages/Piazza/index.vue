<template>
  <div class="piazza">
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
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item><img width="450" height="150"  
      src="https://img3.doubanio.com/view/freyr_page_photo/raw/public/8450.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item><img width="450" height="150"  
      src="https://img2.doubanio.com/view/freyr_page_photo/raw/public/8902.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item><img width="450" height="150"  
      src="https://img2.doubanio.com/view/freyr_page_photo/raw/public/8892.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item><img width="450" height="150"  
      src="https://img1.doubanio.com/view/freyr_page_photo/raw/public/8827.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item><img width="450" height="150"  
      src="https://img9.doubanio.com/view/freyr_page_photo/raw/public/8754.jpg" alt="">
      </van-swipe-item>
    </van-swipe>
    <Recommend :data="books"></Recommend>
    <category :data="rankingBooks"></category>
    <!-- <category-book></category-book> -->
  </div>
</template>

<script>
import Recommend from "@/components/home/recommend";
import Category from "@/components/home/category";
// import CategoryBook from "@/components/home/categoryBook";
import { getBooks, selectHotBooks,rankingBooks } from "@/api/book";


export default {
  name: "Piazza",
  data() {
    return {
      books: [],//热门推荐
      rankingBooks:{},//排行榜
    };
  },
  components: {
    Recommend,
    Category,
    // CategoryBook,
  },
  methods: {
    async getRankingBooks(){
      const { data }=await rankingBooks()
      this.rankingBooks=data.data

      console.log(this.rankingBooks);
    },
    async toSelectHotBooks() {
      try {
        const { data } = await selectHotBooks();
        this.books = data.data;
        this.books = this.books.slice(0, 3);
        console.log(this.books);
      } catch (error) {
        console.log(error);
      }
    },
    async getBookData() {
      try {
        await getBooks();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.toSelectHotBooks();
    this.getRankingBooks();
  },
};
</script>

<style scoped lang="less">
.piazza {
  // 46+41   *2  列表项向下移两行
  // padding-top: 174px;
  padding-top: 87px;
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
}
</style>
