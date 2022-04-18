<template>
  <div class="login-container">
    <!-- nav bar -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登陆表单 -->
    <van-form @submit="onSubmit">
      <van-field 
      v-model="username" 
      name="用户名" 
      placeholder="用户名"
      :rules="userFormRules.username"
      
      >
        <i slot="left-icon" class="reader reader-yonghuming"></i>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="userFormRules.password"
      >
        <i slot="left-icon" class="reader reader-shurumima"></i>
        <!-- <template #button>
          <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
        </template> -->
      </van-field>
      <van-field 
      v-model="vc" 
      native-type="button"
      name="验证码" 
      placeholder="验证码"
      maxlength="4"
      :rules="userFormRules.code"
      >
        <i slot="left-icon" class="reader reader-shurumima"></i>
        <template #button>
          <span class="verifyCode" @click="changeImgCode">
            <img :src="imgCode" />
          </span>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { getLogin } from "../../api/user";
export default {
  name: "Login",
  data() {
    return {
      imgCode: "http://localhost:8866/verify_code",
      username: "lsh",
      password: "123456",
      verifyCode: "",
      vc:"",
      userFormRules:{
        username:[{ required: true, message: '请填写用户名' }],
        password:[{ required: true, message: '请填写密码' }],
        code:[{required: true, message: '请填写验证码'}]
      },
      user:{
        userName:'lsh',
        password:'123456'
      }
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: "登陆中...",
        forbidClick: true,//禁用背景点击
        duration:0
      });
      // 请求登录
      try {
        // const res = await login(this.username, this.password, this.verifyCode);
        const { data } = await getLogin(this.user);
        console.log(data);

        console.log("登陆成功！", data.data);
        // data存token
        this.$store.commit('setUser',data.data)


        this.$toast.success("登陆成功！")

        this.$router.back()
        // this.$router.push('/login')
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("密码或验证错误！");
          this.$toast.fail("密码或验证错误！")
          
        } else {
          // console.log("错误！", err);
          this.$toast.fail("错误！")
        }
      }
    },
    changeImgCode() {
      this.imgCode =
        "http://localhost:8081/verify_code" + "?ts=" + new Date().getTime();
    },
  },
  mounted() {
    // request({
    //   url:'/verify_code'
    // }).then(res=>{
    //   console.log(res);
    // })
  },
};
</script>

<style scoped lang="less">
.login-container {
  ::v-deep .van-nav-bar{
    background-color: #1989fa;
  }
  /deep/ .van-nav-bar__title{
    color: #fff;
  }
  .reader {
    font-size: 38px;
  }
  .send-sms-btn {
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px;
  }
  .verifyCode {
    display: inline-block;
    width: 130px;
    height: 53px;
    border: 1px solid #d7d7d7;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>