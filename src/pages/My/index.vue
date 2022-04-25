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
          <span class="count">10</span>
          <span class="text">haha</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">haha</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">haha</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">haha</span>
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
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
        内容 {{ index }}
      </van-tab>
      <van-tab title="在读">在读</van-tab>
      <van-tab title="想读">想读</van-tab>
      <van-tab title="读过">读过</van-tab>
      <van-tab title="点赞">点赞</van-tab>
      <van-tab title="评论">评论</van-tab>
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

export default {
  name: "My",
  data() {
    return {
      userInfo: {},
      show: false,
      active: 2, //粘性tab激活的值
    };
  },
  computed: {
    // 从容器里拿数据
    ...mapState(["user"]),
  },
  methods: {
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
        })
        .catch(() => {
          // on cancel
          console.log("取消");
        });
    },
  },
  created() {
    this.loadingUserInfo();
    // if(this.user){
    //   // api加载
    // }
    if (!this.user) {
      this.$store.commit("setUser", null);
    }
  },
  mounted() {},
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