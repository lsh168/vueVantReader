<template>
  <van-cell class="topic-item">
    <!-- 用户头像 -->
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="topic.user.avatar"
    />
    <div slot="title" class="title-wrap">
      <!-- 用户昵称 -->
      <div class="user-name">
        <div class="username-text">
          {{ topic.user.nickName }}
        </div>
        <div class="time-text">
          {{ topic.createtime }}
        </div>
        
      </div>
      <!-- 点赞 -->
      <van-button
        class="like-btn"
        icon="ellipsis"
        ></van-button
      >
    </div>
    <!-- 话题内容 -->
    <div slot="label">
      <p class="comment-content">{{ topic.content }}</p>
      <div class="bottom-info">
        <!-- <span class="comment-pubdate">{{
          topic.createtime | relativeTime
        }}</span> -->
        <!-- <van-button class="reply-btn" round>回复0</van-button> -->
      </div>
      <div>
        <van-button
        class="bottom-btn-o"
        icon="share-o"
        width="200px"
        ></van-button
      >
      <van-button
        class="bottom-btn"
        icon="chat-o"
        ></van-button
      >
      <van-button
        class="bottom-btn"
        icon="like-o"
        ></van-button
      >
      </div>
    </div>
  </van-cell>
</template>

<script>
// import { addEnjoy } from "@/api/user.js";
export default {
  data() {
    return {
      isLiking: false,
    };
  },
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {
    // async clickEnjoy() {
    //   const { data } = await addEnjoy({
    //     evaluationId: this.evaluation.evaluationId,
    //   });
    //   this.evaluation.enjoy++;
    //   this.isLiking = true;
    //   console.log(data);
    //   console.log(this.evaluation);
    // },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.topic-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
      .username-text{
        color: rgb(78, 78, 78);
        font-size: 32px;
        line-height: 50px;
      }
      .time-text{
        color: #c3c3c3;
        line-height: 26px;
      }
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    width: 60px;
    border: 0;
  }
  .bottom-btn-o{
    height: 30px;
    width: 60px;
    border: 0;
    font-size: 32px;
  }
  .bottom-btn {
    height: 30px;
    width: 60px;
    border: 0;
    font-size: 32px;
    float: right;
    margin-left: 30px;
  }
}
</style>