<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="user.avatar"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">
        {{ user.nickName }}
        <van-rate
          v-model="evaluation.score"
          :size="10"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
        {{evaluation.score}}分
      </div>
      <van-button
        class="like-btn"
        @click="toDeleteEvaluation(evaluation.evaluationId)"
        >删除</van-button
      >
      <!-- <van-icon name="ellipsis" /> -->
    </div>
    <div slot="label">
      <p class="comment-content">{{ evaluation.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          evaluation.createTime | relativeTime
        }}</span>
        <!-- <van-button class="reply-btn" round>回复0</van-button> -->
      </div>
    </div>
  </van-cell>
</template>

<script>
import { deleteEvaluation } from "@/api/evaluate"
export default {
  data() {
    return {
    };
  },
  props: {
    evaluation: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {
    async toDeleteEvaluation(evaluationId){
      const {data} = await deleteEvaluation({id:evaluationId})
      this.$emit("reLoadingEvaluation")
      console.log(data);

    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.comment-item {
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
    font-size: 30px;
    height: 30px;
    width: 120px;
    border: 0;
  }
}
</style>