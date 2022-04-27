<template>
  <div class="my-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
      title="个人中心"
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="wap-nav" size="18" />
      </template>
    </van-nav-bar>

    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" fit="cover" round :src="userInfo.avatar" />
          <span class="name">{{ userInfo.nickName }}</span>
        </div>
        <div class="right">
          <van-button size="mini" to="/user/profile" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{toReadBooks.length}}</span>
          <span class="text">想读</span>
        </div>
        <div class="data-item">
          <span class="count">{{readingBooks.length}}</span>
          <span class="text">在读</span>
        </div>
        <div class="data-item">
          <span class="count">{{readBooks.length}}</span>
          <span class="text">读过</span>
        </div>
        <div class="data-item">
          <span class="count">{{evaluation.length}}</span>
          <span class="text">评论</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/logo.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 在读、想读、读过 -->
    <van-tabs class="menu-read" v-model="active" scrollspy sticky>
      <van-tab title="想读">
        <van-cell title="我想读的书"  />
        <div 
          class="read-item"
          v-for="(item, index) in toReadBooks"
          :key="index"
          @click="clickToBookDetail(item)"
        >
          <div><img :src="item.cover" alt="" width="60px" height="80px" /></div>
          <div class="read-text">
            <span>{{ item.bookName }}</span
            ><br />
            <span class="text-color">{{ item.author }}</span
            ><br />
            <span class="text-color">{{ item.subTitle }}</span>
          </div>
        </div></van-tab>
      <van-tab title="在读">
        <van-cell title="我在读的书"  />
        <div
          class="read-item"
          v-for="(item, index) in readingBooks"
          :key="index"
          @click="clickToBookDetail(item)"
        >
          <div><img :src="item.cover" alt="" width="60px" height="80px" /></div>
          <div class="read-text">
            <span>{{ item.bookName }}</span
            ><br />
            <span class="text-color">{{ item.author }}</span
            ><br />
            <span class="text-color">{{ item.subTitle }}</span>
          </div>
        </div>
      </van-tab>
      
      <van-tab title="读过">
        <van-cell title="我读过的书"  />
        <div
          class="read-item"
          v-for="(item, index) in readBooks"
          :key="index"
          @click="clickToBookDetail(item)"
        >
          <div><img :src="item.cover" alt="" width="60px" height="80px" /></div>
          <div class="read-text">
            <span>{{ item.bookName }}</span
            ><br />
            <span class="text-color">{{ item.author }}</span
            ><br />
            <span class="text-color">{{ item.subTitle }}</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="评论">
        <van-cell title="我的评论"  />
          <comment-item-my
      v-for="item in evaluation"
      :key="item.evaluationId"
      :evaluation="item"
      :user="userInfo"
      @reLoadingEvaluation="toSelectByMember()"
    />
      </van-tab>
    </van-tabs>

    <!-- <van-cell title="URL 跳转" is-link /> -->
    <van-cell
      v-if="user"
      class="logout-cell"
      @click="onLogout"
      title="退出登录"
      clickable
      is-link
    />

    <van-popup
      v-model="show"
      position="left"
      closeable
      :style="{ height: '100%', width: '60%' }"
    >
      <div class="user-info-popup">
        <van-cell title="URL 跳转" is-link />
        <van-cell
          v-if="user"
          class="logout-cell"
          @click="onLogout"
          title="退出登录"
          clickable
          is-link
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
// 从容器里拿数据
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user.js";
import { selectReadStateByUser } from "@/api/book";
import { selectByMember } from "@/api/evaluate"
import CommentItemMy from '../../components/comment-item/comment-item-my.vue';

export default {
  name: "My",
  components:{
    CommentItemMy
  },
  data() {
    return {
      userInfo: {},
      show: false,
      active: 2, //粘性tab激活的值
      toRead: 1,
      reading: 2,
      read: 3,
      toReadBooks: [],
      readingBooks: [],
      readBooks: [],
      evaluation:[]
    };
  },
  computed: {
    // 从容器里拿数据
    ...mapState(["user"]),
  },
  methods: {
    
    clickToBookDetail(item){
      this.$router.push({
        // path: "/ranking",
        name: 'bookDetail',
        params: {
          id: item.bookId,
        },
      });
    },
    async toSelectReadStateByUser() {
      const rbs1 = await selectReadStateByUser({ readState: 2 });
      this.readingBooks = rbs1.data.data;
      const rbs2 = await selectReadStateByUser({ readState: 1 });
      this.toReadBooks = rbs2.data.data;
      const rbs3 = await selectReadStateByUser({ readState: 3 });
      this.readBooks = rbs3.data.data;
      
    },
    onClickLeft() {
      this.show = true;
    },
    async loadingUserInfo() {
      try {
        const { data } = await getUserInfo();

        this.userInfo = data.data;
        console.log(this.userInfo);
      } catch (error) {
        this.$toast.fail("获取用户信息失败，请稍后重试！");
      }
    },

    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出嘛？",
          message: "弹窗内容",
        })
        .then(() => {
          // on confirm
          console.log("确认");
          // 确认退出，清楚状态（容器中的user+本地存储）
          this.$store.commit("setUser", null);
          this.toReadBooks.splice(0,this.readingBooks.length)
          this.readingBooks.splice(0,this.readingBooks.length)
          this.readBooks.splice(0,this.readBooks.length)
          this.evaluation.splice(0,this.evaluation.length)
        })
        .catch(() => {
          // on cancel
          console.log("取消");
        });
    },
    // 查询短评
    async toSelectByMember(){
      const { data } = await selectByMember()
      this.evaluation=data.data
      console.log(this.evaluation);
    },
  },
  created() {
    this.loadingUserInfo();
    // if(this.user){
    //   // api加载
    // }
    // if (!this.user) {
    //   this.$store.commit("setUser", null);
    // }
  },
  mounted() {
    this.toSelectReadStateByUser();
    this.toSelectByMember()
  },
};
</script>
<style scoped lang="less">
.my-container {
  padding-bottom: 95px;
  padding-top: 93px;
  .header {
    height: 361px;
    // background-color: rgb(24, 190, 231);
    background-image: url("~@/assets/img.webp");
    // background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      // 垂直排列
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: aliceblue;
      }
    }
  }
  .menu-read {
    background-color: #fff;
    /deep/ .van-sticky--fixed {
      top: 90px;

      .van-tabs__wrap {
        .van-tabs__line {
          background-color: #3296fa;
        }
      }
    }
    /deep/ .van-sticky {
      top: 90px;
      .van-tabs__wrap {
        .van-tabs__line {
          background-color: #3296fa;
        }
      }
    }
    .read-item {
      display: flex;
      align-items: center;
      margin: 16px 28px;
      .read-text {
        padding-left: 16px;
        font-size: 32px;
        .text-color {
          color: rgb(133, 134, 134);
        }
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      // background-color: rgb(192, 70, 70);
      padding: 76px 32px 23px;
      box-sizing: border-box;

      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 3px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // height: 130px;
      // background-color: #ccc;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 28px;
        }
      }
    }
  }
  .user-info-popup {
    padding-top: 25%;
  }
}
</style>