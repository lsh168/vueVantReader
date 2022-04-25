<template>
  <div class="category">
    <title-view
      label="读书榜单"
    ></title-view>
    <div class="category-list">
      <div class="category-item-wrapper" @click="showHeightScoreBooks()">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">高分榜单</div>
            <div class="num sub-title-tiny">{{data.heightScoreBooks.length}}本书</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="data.heightScoreBooks[0].cover" />
              <img class="img2" :src="data.heightScoreBooks[1].cover" />
            </div>
          </div>
        </div>
      </div>
      <div class="category-item-wrapper" @click="showHotBooks()">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">人气榜单</div>
            <div class="num sub-title-tiny">{{data.hotBooks.length}}本书</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="data.hotBooks[0].cover" />
              <img class="img2" :src="data.hotBooks[1].cover" />
            </div>
          </div>
        </div>
      </div>
      <div class="category-item-wrapper" @click="showMonthBooks()">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">本月读书榜单</div>
            <div class="num sub-title-tiny">{{data.monthBooks.length}}本书</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="data.monthBooks[0].cover" />
              <img class="img2" :src="data.monthBooks[1].cover" />
            </div>
          </div>
        </div>
      </div>
      <div class="category-item-wrapper" @click="showYearBooks()">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">年度读书榜单</div>
            <div class="num sub-title-tiny">{{data.yearBooks.length}}本书</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="data.yearBooks[0].cover" />
              <img class="img2" :src="data.yearBooks[1].cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from "@/components/home/title";
// import { categoryText, getCategoryName } from '@/utils/book'

export default {
  components: {
    TitleView,
  },
  data() {
    return {
    };
  },
  props: {
    data: [Array,Object],
  },
  mounted(){
  },
  methods: {
    showHeightScoreBooks(){
      this.$router.push({
        // path: "/ranking",
        name:'ranking',
        params: {
          text:'高分榜单',
          books:this.data.heightScoreBooks
        },
      });
      this.$store.commit('SET_RankingBooks',this.data.heightScoreBooks)
      this.$store.commit('SET_RankingText','高分榜单')
    },
    showHotBooks(){
      this.$router.push({
        path: "/ranking",
        params: {
          text:'人气榜单',
          books:this.data.hotBooks
          // category: getCategoryName(item.category),
          // categoryText: this.categoryText(item.category)
        },
      });
      this.$store.commit('SET_RankingBooks',this.data.hotBooks)
      this.$store.commit('SET_RankingText','人气榜单')
    },
    showMonthBooks(){
      this.$router.push({
        path: "/ranking",
        params: {
          text:'本月读书榜单',
          books:this.data.monthBooks
          // category: getCategoryName(item.category),
          // categoryText: this.categoryText(item.category)
        },
      });
      this.$store.commit('SET_RankingBooks',this.data.monthBooks)
      this.$store.commit('SET_RankingText','本月读书榜单')
    },
    showYearBooks(){
      this.$router.push({
        path: "/ranking",
        // 此处用query传参有问题，出现字符串‘object’，推断：query传参会放到网址链接中，参数过大解析有问题。params不会出现在导航栏中，可以传大参数
        params: {
          text:'年度读书榜单',
          books:this.data.yearBooks
          // category: getCategoryName(item.category),
          // categoryText: this.categoryText(item.category)
        },
      });
      this.$store.commit('SET_RankingBooks',this.data.yearBooks)
      this.$store.commit('SET_RankingText','年度读书榜单')
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.category {
  background: #fff;
  .category-list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    .category-item-wrapper {
      flex: 0 0 50%;
      width: 50%;
      padding: 0 px2rem(5) px2rem(10) px2rem(5);
      box-sizing: border-box;
      &:nth-child(odd) {
        padding-left: px2rem(10);
      }
      &:nth-child(even) {
        padding-right: px2rem(10);
      }
      .category-item {
        display: flex;
        width: 100%;
        background: #eee;
        .img-wrapper {
          flex: 0 0 50%;
          width: 50%;
          padding: px2rem(20) px2rem(10);
          box-sizing: border-box;
          .img-group {
            position: relative;
            width: 100%;
            height: px2rem(60);
            @include left;
            .img {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 2;
              width: px2rem(45);
              height: px2rem(60);
            }
            .img2 {
              position: absolute;
              left: px2rem(30);
              top: px2rem(7.5);
              z-index: 1;
              width: px2rem(30);
              height: px2rem(45);
            }
          }
        }
        .content-wrapper {
          flex: 0 0 50%;
          width: 50%;
          @include columnCenter;
          .title {
            text-align: center;
          }
          .num {
            text-align: center;
            margin-top: px2rem(5);
          }
        }
      }
    }
  }
}
</style>
