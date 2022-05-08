<template>
  <div class="signIn">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password1"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password2"
        type="password"
        name="密码"
        label="再次密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {createUser} from '@/api/user'
export default {
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
    };
  },
  computed: {},
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      if (this.password1===this.password2) {
        this.toCreateUser({userName:this.username,password:this.password1})
      }else{
        this.$toast.fail("密码不相同！")
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    async toCreateUser(obj){
      // obj={userName:}
      const { data } = await createUser(obj)
      console.log(data);

    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.signIn{
  padding-top: 95px;
}
</style>