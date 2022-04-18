<template>
 <div class="update-gender">
   <van-picker
  title="标题"
  show-toolbar
  :columns="columns"
  :default-index="value"
  @cancel="$emit('close')"
  @confirm="onConfirm"
  @change="onGenderChange"
/>
   更新昵称
 </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name:'UpdateGender',
  props:{
    value:{
      type:[Number,String],
      required:true
    }
  },
 data() {
 return {
   columns:['男','女'],
   localGender:this.value
 };
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
        const{ data }=await updateUserProfile({
          sex:this.localGender
        })
        // 更新视图
        this.$emit("input",this.localGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('修改成功')
        console.log(data);
      } catch (error) {
        this.$toast.fail("请求失败！")
        
      }

    },
   onGenderChange(picker, value, index){
     this.localGender=index
     console.log(index);

   }
 },
 created() {},
 mounted() {}
};
</script>
<style scoped>
</style>