<template>
  <div class="comment-post">
    <div class="comment-rate">
      <span>您对这本书的评分：</span>
      <van-rate
        v-model="score"
        :size="25"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
    </div>

    <div class="comment-area">
      <van-field
        class="post-field"
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button
        class="post-btn"
        @click="updateEvaluate()"
        :disabled="!message.length"
        >发布</van-button
      >
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user.js";
import { evaluate } from "@/api/comment.js";
export default {
  name: "CommentPost",
  components: {},
  props: {
    bookId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      message: "",
      userId: this.userId,
      score: 0,
      content: this.message,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserId();
  },
  mounted() {},
  methods: {
    // 获取用户id
    async getUserId() {
      const { data } = await getUserInfo();
      console.log(data);
      this.userId = data.data.id;

      console.log(this.userId);
    },
    async updateEvaluate() {
      // 加载轻提示
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
      });

      const { data } = await evaluate({
        memberId: this.userId,
        bookId: this.bookId,
        score: this.score,
        content: this.message,
      });
      console.log(data.evaluation);
      this.message = "";

      this.$emit("post-success", data.evaluation);

      //
      this.$toast.success("发布成功！");
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {

  .comment-rate{
    margin-top: 32px;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comment-area {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;
    .post-field {
      background-color: #f5f7f9;
    }
    .post-btn {
      width: 150px;
      border: none;
      padding: 0;
      color: #6ba3d8;
      &::before {
        display: none;
      }
    }
  }
}
</style>
