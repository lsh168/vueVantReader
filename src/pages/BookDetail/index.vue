<template>
  <div class="book-detail">
    <!-- 顶部导航 -->
    <van-nav-bar
      class="page-nav-bar"
      title="图书"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <!-- 主题内容 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading size="24px" vertical>加载中... </van-loading>
      </div>
      <!-- 加载完成文本详情 -->
      <div v-else-if="bookDetail.bookName" class="main-detail">
        <van-row class="picInfo" type="flex" justify="space-around">
          <van-col class="mainpic" span="8">
            <img :src="bookDetail.cover" alt="" width="120px"
          /></van-col>
          <van-col class="info" span="15">
            <p class="bookName">{{ bookDetail.bookName }}</p>
            <p class="text">{{ bookDetail.subTitle }}</p>
            <p class="text">{{ bookDetail.author }}</p>
            <van-button
              icon="https://img3.doubanio.com/f/talion/cf2ab22e9cbc28a2c43de53e39fce7fbc93131d1/pics/card/ic_mark_todo_s.png"
              type="default"
              size="small"
              :disabled="readState == 1 ? true : false"
              @click="clickUpdateState(1)"
              >想看
            </van-button>
            <van-button
              icon="https://img3.doubanio.com/f/talion/3157e2ea17ccc9d21ad3a0b9bd97a49116275219/pics/card/ic_mark_doing_s.png"
              type="default"
              size="small"
              :disabled="readState == 2 ? true : false"
              @click="clickUpdateState(2)"
              >在读
            </van-button>
            <van-button
              icon="https://img3.doubanio.com/f/talion/78fc5f5f93ba22451fd7ab36836006cb9cc476ea/pics/card/ic_mark_done_s.png"
              type="default"
              size="small"
              :disabled="readState == 3 ? true : false"
              @click="clickUpdateState(3)"
              >看过
            </van-button>
          </van-col>
        </van-row>
        <!-- 评分组件 -->
        <star-rate :bookDetail="bookDetail" />
        <!-- 购买图书 -->
        <div class="toBuyBook">
          <van-cell-group inset>
            <van-cell
              class="van-ellipsis"
              :title="bookDetail.bookName"
              is-link
              url="http://search.m.dangdang.com/search.php?keyword=%E4%B8%89%E4%BD%93"
              value="去购买"
              :label="bookDetail.subTitle"
            />
          </van-cell-group>
        </div>

        <!-- 简介 -->
        <div>
          <div
            class="book-detail-content markdown-body"
            v-html="bookDetail.description"
            ref="book-detail-content"
          ></div>
        </div>
      </div>
      <!-- 404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure"></van-icon>
        <p class="text">您访问的资源不存在或者已经删除！</p>
      </div>
      <!-- 其他原因加载失败 -->
      <div v-else class="error-wrap">
        <van-icon name="failure"></van-icon>
        <van-button class="retry-btn" @click="loadBook">点击重试</van-button>
      </div>
      <!-- <van-divider>图书简介结束</van-divider> -->
      <comment-list :evaluationList="evaluationList" :list="comentList" />

      <!-- 底部区域 -->
      <div class="book-detail-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isShow = true"
          >写评论</van-button
        >
        <van-icon
          name="comment-o"
          :badge="evaluationList.length"
          color="#777"
          @click="toComment"
          ref="commentArea"
        />
        <!-- <van-icon color="#777" name="star-o" /> -->
        <!-- <van-icon color="#777" name="good-job-o" /> -->
        <van-icon
          name="share"
          color="#777777"
          @click="showShare = true"
        ></van-icon>
      </div>
      <!-- 底部区域结束 -->
      <!-- 发布评论弹出层 -->
      <van-popup v-model="isShow" round position="bottom">
        <comment-post :bookId="id" @post-success="onPostSuccess" />
      </van-popup>
    </div>
    <!-- 返回顶部 -->
    <back-top />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { getBookById } from "@/api/book";
import { updateReadState } from "@/api/user";
import { ImagePreview } from "vant";
import StarRate from "../../components/starRate/StarRate.vue";
import CommentList from "../../components/comment/comment-list.vue";
import CommentPost from "../../components/comment/comment-post.vue";
import BackTop from "@/components/BackTop";
export default {
  name: "BookDetail",
  components: {
    StarRate,
    CommentList,
    CommentPost,
    BackTop,
  },
  props: {
    id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      bookDetail: {},
      loading: true, //加载状态
      errorStatus: 0, //404
      evaluationList: [],
      isShow: false, //弹出层展示
      comentList: [], //评论列表,
      readState: 0,
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  computed: {},
  methods: {
    clickUpdateState(stateNum) {
      this.readState = stateNum;
      this.updateState();
    },
    async loadBook() {
      try {
        this.loading = true;
        const { data } = await getBookById(this.id);
        console.log("通过图书ID查询", data);
        if (data.memberReadState != null) {
          console.log(data.memberReadState.readState);
          this.readState = data.memberReadState.readState;
        }

        // 数据驱动试图不是立即的
        this.bookDetail = data.book;
        this.evaluationList = data.evaluationList;
        // console.log("图书详情",this.bookDetail);
        console.log("评论列表", this.evaluationList);

        // 初始化图片预览
        setTimeout(() => {
          // console.log('789',this.$refs["book-detail-content"]);
          this.previewImage();
        }, 0);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404;
        }
        console.log("获取数据失败", error);
      }
      this.loading = false;
    },
    previewImage() {
      // 得到所有的img结点
      const bookContent = this.$refs["book-detail-content"];
      const imgs = bookContent.querySelectorAll("img");
      // console.log(imgs);
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            onClose() {
              console.log("onclose");
            },
          });
        };
      });
      // console.log(images);
    },
    onClickLeft() {
      this.$router.back();
    },
    // 评论子传父
    onPostSuccess(data) {
      // 关闭弹层
      this.isShow = false;
      // 把新发布的数据放到顶部
      this.evaluationList.unshift(data);
      console.log(data);
    },
    // 更新用户阅读状态
    async updateState() {
      try {
        await updateReadState({
          bookId: this.id,
          readState: this.readState,
        });
        if (this.readState === 1) {
          this.$toast.success("想读");
        }
        if (this.readState === 2) {
          this.$toast.success("在读");
        } else {
          this.$toast.success("读过");
        }
      } catch (error) {
        this.$toast.fail("更新阅读状态错误", error);
      }
    },
    //跳到评论区域
    toComment() {
      // this.$refs.commentArea.scrollTop = 5000
      window.document.documentElement.scrollTop = 5000;
    },
    getscrollEvent() {
      //获取页面高度
      const winHeight = window.document.documentElement.clientHeight;
      // console.log("页面高度", winHeight);
      //监听滚动事件
      window.addEventListener("scroll", () => {
        //获取滚动高度
        let scrollHeight = document.documentElement.scrollTop;
        // console.log("滚动高度", scrollHeight);

        if (scrollHeight >= winHeight) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
    },
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    // // 获取v-html渲染的元素
    // handleHtml($event) {
    //   console.log($event);
    // },
    // 提取文章简介
    // getVHtmlContent() {
    //   setTimeout(() => {
    //     const refContent = this.$refs["book-detail-content"];
    //     const htmlTextArray = refContent.querySelectorAll("p");
    //     const htmlText = [];
    //     htmlTextArray.forEach((element) => {
    //       htmlText.push(element.innerText);
    //     });
    //     //join 把数组转为字符串
    //     console.log(htmlText.join(""));
    //     console.log("cl-preview-section");
    //   }, 500);
    // },
  },
  created() {
    this.loadBook();
    // this.getVHtmlContent();
  },
  mounted() {
    this.getscrollEvent();
  },
};
</script>
<style scoped lang="less">
@import "./github-markdown-light.css";
.book-detail {
  // .van-nav-bar {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  // }
  .main-wrap {
    margin-top: 102px;
    .main-detail {
      .toBuyBook{
        padding-bottom: 18px;
      }
      .picInfo {
        margin: 24px 0;
        font-size: 40px;
        line-height: 50px;
        .mainpic {
          margin-left: 8px;
        }
        .info {
          margin: -20px;
          padding-right: 6px;

          .info p {
            font-size: 40px;
          }
          .bookNmae {
            font-weight: bold;
          }
          .text {
            color: #7e7e7e;
            font-size: 18px;
            line-height: 18px;
          }
          .van-button {
            margin: 20px 5px;
          }
        }
      }
      .book-detail-content {
        padding: 0 25px;
      }
    }
    .book-detail-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 88px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .comment-btn {
        // width: 282px;
        width: 460px;
        height: 46px;
        border: 2px solid #eeeeee;
        font-size: 30px;
        line-height: 46px;
        color: #a7a7a7;
      }
      .van-icon {
        font-size: 40px;
        .van-info {
          font-size: 16px;
          background-color: #e22829;
        }
      }
    }
  }
}
</style>
