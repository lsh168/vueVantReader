<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{evaluation.member.nickname}}</div>
      <van-button 
      class="like-btn" 
      :icon="isLiking ? 'good-job' : 'good-job-o'"
      @click="clickEnjoy"
      :disabled="isLiking"
      >{{ evaluation.enjoy > 0 ? evaluation.enjoy : "赞"}}</van-button>
    </div>
    <div slot="label">
      <p class="comment-content">{{evaluation.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{evaluation.createTime | relativeTime}}</span>
        <!-- <van-button class="reply-btn" round>回复0</van-button> -->
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addEnjoy } from '@/api/user.js'
export default {
  data() {
    return {
      isLiking:false
      
    };
  },
  props:{
    evaluation:{
      type:Object,
      required:true
    }
  },
  computed: {},
  methods: {
    async clickEnjoy(){
      const { data } = await addEnjoy({evaluationId:this.evaluation.evaluationId})
      this.evaluation.enjoy++
      this.isLiking=true
      console.log(data);
      console.log(this.evaluation);

    },
    

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
  .comment-content{
    font-size: 32px;
    color: #222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate{
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info{
    display: flex;
    align-items: center;
  }
  .reply-btn{
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn{
    height: 30px;
    width: 60px;
    border: 0;
  }

}
</style>