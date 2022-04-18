<template>
  <div class="update-email">
    <van-nav-bar
      title="设置邮箱"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm()"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="localEmail"
        rows="1"
        autosize
        type="textarea"
        maxlength="18"
        placeholder="请输入邮箱"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: "UpdateEmail",
  data() {
    return {
      localEmail: this.value,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    }
  },
  computed: {},
  methods: {
    async onConfirm(){
      this.$toast.loading({
        message:'保存中...',
        forbidClick:true,//禁止背景点击
        duration:0  //持续展示
      })
      try {
        const localEmail=this.localEmail
        if(!localEmail.length){
          this.$toast('昵称不能为空！')
          return 
        }
        const{ data }=await updateUserProfile({
          email:this.localEmail
        })
        // 更新视图
        this.$emit("input",localEmail)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('修改成功')
        console.log(data);
      } catch (error) {
        this.$toast.fail("请求失败！")
        
      }

    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>