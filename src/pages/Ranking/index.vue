<template>
  <div class="ranking">
    <van-nav-bar
      fixed
      class="page-nav-bar"
      :title="rankingText"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="bookList">
      <van-card
        v-for="(item, index) in rankingBooks"
        :key="index"
        :tag="'TOP' + (index + 1)"
        :desc="item.subTitle"
        :title="item.bookName"
        :thumb="item.cover"
        @click="clickItem(item.bookId)"
      >
        <template #desc>
          <div class="bookDesc">
            <van-tag plain type="danger">评分{{ item.evaluationScore }}</van-tag
            >&nbsp;&nbsp;
            <van-tag plain type="warning"
              >评分人数{{ item.evaluationQuantity }}</van-tag
            ><br />
            <p>
              <span>{{ item.subTitle }}</span
              ><br />
              <span>{{ item.author }}</span
              ><br />
            </p>
          </div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
// import CategoryBook from "@/components/home/categoryBook";
import { mapState } from "vuex";
export default {
  components: {
    // CategoryBook
  },
  data() {
    return {
      // rankingBooks:{
      //   text: this.$route.params.text,
      // books: this.$route.params.books,
      // },
      text: this.$route.params.text,
      books: this.$route.params.books,
    };
  },
  computed: {
    // 从容器里拿数据
    ...mapState(["rankingBooks", "rankingText"]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    clickItem(bookId) {
      this.$router.push({
        name: "bookDetail",
        params: { id: bookId },
      });
      //   this.$store.commit('SET_RankingBooks',this.books)
      // this.$store.commit('SET_RankingText',this.text)
    },
  },
  created() {
    // // 确认退出，清楚状态（容器中的user+本地存储）
    // this.$store.commit('SET_RankingBooks',this.books)
    
    // if (!this.books || !this.text) {
    //   this.books=this.rankingBooks
    //   this.text=this.rankingText
    //   // this.$store.commit("SET_RankingBooks", this.$route.params.books);
    //   // this.$store.commit("SET_RankingText", this.$route.params.text);
    // }

  },
  mounted() {
    // 确认退出，清楚状态（容器中的user+本地存储）
    // this.$store.commit('SET_RankingBooks',this.$route.params.books)
    // this.$store.commit('SET_RankingText',this.$route.params.text)
  },
};
</script>
<style scoped lang="less">
.ranking {
  padding-top: 98px;
  .bookList {
    ::v-deep .van-card {
      padding: 12px 20px;
      .van-card__header {
        .van-card__thumb {
          width: unset;
          .van-image {
            .van-image__img {
              width: 180px;
              height: auto;
            }
          }
        }
        .van-card__thumb img {
          border-radius: unset;
        }
        .van-card__content {
          height: 240px;
          .van-card__title {
            font-size: 36px;
            line-height: 56px;
          }
          .bookDesc span {
            font-size: 28px;
          }
          .van-card__desc {
            line-height: 52px;
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style>