<template>
  <div class="forget">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
      title="忘记密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-field
      v-model="resetUser.userName"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="resetUser.password"
      type="password"
      name="密码"
      label="旧密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="resetUser.newPassword"
      type="password"
      name="密码"
      label="新密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" @click="onSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { forget } from "@/api/user";
export default {
  data() {
    return {
      resetUser: {
        userName: "",
        password: "",
        newPassword: "",
      },
    };
  },
  computed: {},
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.resetPassword();
    },
    async resetPassword() {
      const { data } = await forget(this.resetUser)
      // const { data } = await forget(this.resetUser.user.userName,this.resetUser.user.password,this.resetUser.newPassword)
      console.log(data);
      
    },
    onClickLeft() {
      this.$router.back();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.forget {
  padding-top: 95px;
}
</style>