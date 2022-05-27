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
        @click="showShare=true"
      ></van-button>
      <!-- 删除和分享 -->
      <van-share-sheet
        v-model="showShare"
        title="分享给好友"
        :options="options"
        @select="onSelect"
      />
    </div>
    <!-- 话题内容 -->
    <div slot="label">
      <p v-html="topic.content" class="comment-content"></p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          topic.createtime | relativeTime
        }}</span>
        <!-- <van-button class="reply-btn" round>回复0</van-button> -->
      </div>
      <div>
        <van-button
          class="bottom-btn-o"
          icon="share-o"
          width="200px"
          @click="showShare=true"
        ></van-button>
        <!-- 评论按钮 -->
        <!-- <van-button class="bottom-btn" icon="chat-o" @click="showReplyPopup(topic)" >{{topic.reply}}</van-button> -->
        <!-- <van-icon class="bottom-btn" name="chat-o" @click="clickEnjoy" /> -->
        <van-button 
        class="bottom-btn" 
        :icon="isRed===false?'like-o' : 'like'" 
        :class="{textColor:isRed}" 
        :disabled="isRed"
        @click="toEnjoy">
          {{topic.thumbup}}
          </van-button>
      </div>
    </div>
    
  </van-cell>
</template>

<script>
import { removeTopic,updateTopicEnjoy } from "@/api/topic.js";
export default {
  data() {
    return {
      show:false,
      isRed:false,//控制点赞颜色
      isLiking: false,
      showShare:false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '删除', icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.669pic.com%2Felement_pic%2F6%2F16%2F71%2F70%2F94fa6795f9dbbed993259599c57c04ac.jpg&refer=http%3A%2F%2Fimages.669pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654693560&t=2b6a4f9b95f22408be8e2dd35a50c8d5' },
          
        ],
      ],
      color:'red'
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
    showReplyPopup(item){
      console.log(item);
      
      this.$emit("showReplyPopup",item)
    },
    clickEnjoy(){
      this.isRed=true
      console.log(123);
    },
    async toEnjoy(){
      const { data }=await updateTopicEnjoy({
        id:this.topic.id,
        thumbup:this.topic.thumbup
      })
      console.log(data);
      this.isRed=true
      this.topic.thumbup=this.topic.thumbup+1
    },
    // 
    onSelect(option,index) {
      if (index===3) {
        this.toRemoveTopic()
      }

      console.log(option);
      console.log(index);
      this.$toast(option.name);
      this.showShare = false;
    },
    async toRemoveTopic() {
      const { data } = await removeTopic({ id: this.topic.id });
      console.log(data);
      this.$emit("loadTopic")
    },
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
      .username-text {
        color: rgb(78, 78, 78);
        font-size: 32px;
        line-height: 50px;
      }
      .time-text {
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
  .bottom-btn-o {
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
  .textColor{
    color: red;

  }
}
</style>