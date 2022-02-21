<template>
  <div>
    <form method="post">
      <el-input v-model="nickname" placeholder="请输入用户名"></el-input>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
      <el-input v-model="vc" placeholder="请输入验证码"></el-input>
      <img src="http://localhost:8081/verify_code" />
      <el-button type="primary" round native-type="submit">注册</el-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Registe",
  data() {
    return {
      nickname:'',
      username:'',
      password:'',
      vc:'',
    }
  },
  mounted() {
    // this.$axios.registe(this.username, this.password, this.vc, this.nickname)
    // .then((res) => {
    //   console.log(res.data);
    //   this.musicData=res.data.categoryList;
    // })
    this.$axios.getTodayRecommend().then((res) => {
      console.log(res.data);
      this.musicData=res.data.categoryList
    });
  }
}
</script>
