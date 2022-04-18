<template>
  <van-cell
    class="book-item"
    :to="{
      //路由名称
      name: 'bookDetail',
      params: {
        id: book.bookId,
      },
    }"
  >
    <div class="title van-multi-ellipsis--l2" slot="title">
      {{ book.bookName }}
    </div>
    <!-- van-multi-ellipsis--l2   内嵌样式、最多显示两行 -->
    <div slot="default">
      <van-image width="95" height="140" :src="book.cover" fit="cover" />
      <!-- fit显示短边 -->
    </div>
    <div class="label-info" slot="label">
      <span>{{ book.author }}</span>
      <div>
        <van-rate
          v-model="book.evaluationScore"
          :size="12"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
        <span>{{ book.evaluationScore }}分</span>
        <span>{{ book.evaluationQuantity }}人评论</span>
        <!-- 文章简介 -->
        <div class="van-multi-ellipsis--l3 datail-intro">
          {{ introHtmlText }}
        </div>
      </div>
      <!-- 借助v-show获取HTML标签内容，显示到文章简介 -->
      <div
        v-show="!book.description"
        v-html="book.description"
        ref="introText"
      ></div>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: "BookItem",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      evaluationScore: "",
      introHtmlText: "",
    };
  },
  methods: {
    handleHtmlText() {
      setTimeout(() => {
        const refContent = this.$refs["introText"];
        const htmlTextArray = refContent.querySelectorAll("p");
        const htmlText = [];
        var sumLength=0
        for (let i = 0; i < htmlTextArray.length; i++) {
          const element = htmlTextArray[i];
          sumLength = sumLength+ element.toString().length
          htmlText.push(element.innerText);
          if (sumLength>200) {
            break
          }
        }
        // foreach无法用Break
        // htmlTextArray.forEach((element) => {
        //   sumLength = sumLength+ element.toString().length
        //   htmlText.push(element.innerText);
        //   if ( sumLength>50  ) {
        //     break
        //   }
        // })
        //join 把数组转为字符串
        this.introHtmlText = htmlText.join("").substring(0,100);
        // console.log(htmlText.join(""));
        // console.log("cl-preview-section");
      }, 0);
    },
  },
  created() {
    // console.log(this.book.description);
    this.handleHtmlText();
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.book-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    padding-left: 25px;
    width: 190px;
    height: 280px;
  }
  .label-info {
    font-size: 22px;
    color: #b4b4b4;
    padding: 10px 0;
    div {
      span {
        margin-right: 25px;
      }
    }
    .datail-intro {
      width: 470px;
      color: #666666;
      font-size: 26px;
      margin-top: 14px;
    }
  }
}
</style>