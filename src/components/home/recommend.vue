<template>
  <div class="recommend">
    <title-view label="热门推荐" btn="查看全部" @onClick="click()"></title-view>
    <div class="recommend-list">
      <div
        class="recommend-item"
        v-for="(item, index) in data"
        :key="index"
        @click="showBookDetail(item)"
      >
        <div class="img-wrapper">
          <img class="img" :src="item.cover" />
        </div>
        <div class="content-wrapper">
          <div class="title title-medium" ref="title">{{ item.bookName }}</div>
          <div class="num sub-title" ref="num">
            <van-rate
              v-model="item.evaluationScore"
              :size="9"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />&nbsp;{{item.evaluationScore}}分&nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from "@/components/home/title";
// import { ebookHome } from '../../utils/mixin'

export default {
  // mixins: [ebookHome],
  components: {
    TitleView,
  },
  props: {
    data: Array,
  },
  methods:{
    click(){
      this.$router.push({
        // path: "/ranking",
        name: 'recommend',
      });
    },
    showBookDetail(item){
      this.$router.push({
        // path: "/ranking",
        name: 'bookDetail',
        params: {
          id: item.bookId,
        },
      });
    },

    
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.recommend {
  background: #fff;
  .recommend-list {
    width: 100%;
    @include top;
    padding: 0 px2rem(5);
    box-sizing: border-box;
    .recommend-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: 0 px2rem(2);
      box-sizing: border-box;
      .img-wrapper {
        @include center;
        .img {
          width: 80%;
        }
      }
      .content-wrapper {
        width: 100%;
        margin-top: px2rem(10);
        @include columnCenter;
        .title {
          text-align: center;
          font-size: 12px;
        }
        .num {
          margin-top: px2rem(5);
        }
      }
    }
  }
}
</style>
