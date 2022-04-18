<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <!-- 头像 -->
    <!-- ref 操作dom -->
    <input 
    type="file" 
    hidden 
    ref="file"
    @change="onFileChange"
    >
    <van-cell title="头像" is-link>
      <van-image
      class="avatar"
        fit="cover"
        round
        :src="user.avatar"
        @click="$refs.file.click()"
      />
    </van-cell>
    <!-- /头像 -->

    <van-cell title="昵称" 
    :value="user.nickName" 
    @click="isUpdateShow=true" 
    is-link />
    <van-cell title="性别" 
    :value="user.sex===0 ? '男' : '女' " 
    @click="isUpdateGenderShow=true"
    is-link />
    <van-cell title="邮箱" 
    @click="isUpdateEmailShow=true"
    :value="user.email" 
    is-link />

    <!-- /个人信息 -->
    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="isUpdateShow" position="bottom" :style="{ height: '100%' }" >
      <update-name 
      v-if="isUpdateShow"
      @close="isUpdateShow=false" 
      v-model="user.nickName"/>
      <!-- v-if="isUpdateShow" 是否渲染组件的内容 -->
    </van-popup>
    <!-- 编辑昵称弹出层 -->

    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom"  >
      <update-gender 
      v-if="isUpdateGenderShow"
      v-model="user.sex"
      @close="isUpdateGenderShow=false"
      />
      <!-- v-if="isUpdateShow" 是否渲染组件的内容 -->
    </van-popup>
    <!-- 编辑性别弹出层 -->

    <!-- 编辑email弹出层 -->
    <van-popup v-model="isUpdateEmailShow" position="bottom" :style="{ height: '100%' }" >
      <update-email 
      v-if="isUpdateEmailShow"
      @close="isUpdateEmailShow=false" 
      v-model="user.email"/>
      <!-- v-if="isUpdateShow" 是否渲染组件的内容 -->
    </van-popup>
    <!-- 编辑昵称弹出层 -->

        <!-- 编辑头像弹出层 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" :style="{ height: '100%' }" >
      <!-- v-if="isUpdatePhotoShow"   解决popup层出入图片不刷新问题 -->
      <update-photo 
      v-if="isUpdatePhotoShow"  
      :img="img" 
      :imgName="imgName" 
      @close=" isUpdatePhotoShow=false "
      @update-photo="user.avatar=$event"
       />
      <!-- v-if="isUpdateShow" 是否渲染组件的内容 -->
    </van-popup>
    <!-- 编辑昵称弹出层 -->

  </div>
</template>

<script>
import { getUserInfo } from '@/api/user.js'
import UpdateName from '../../components/userProfile/UpdateName.vue';
import UpdateGender from '../../components/userProfile/UpdateGender.vue';
import UpdateEmail from '../../components/userProfile/UpdateEmail.vue';
import UpdatePhoto from '../../components/userProfile/UpdatePhoto.vue';

export default {
  components: { UpdateName, UpdateGender, UpdateEmail, UpdatePhoto },
  name: "UserProfile",
  data() {
    return {
      user:{},
      isUpdateShow:false,
      isUpdateGenderShow:false,
      isUpdateEmailShow:false,
      isUpdatePhotoShow:false,
      img:null,
      imgName:null

    };
  },
  computed: {},
  methods: {
    async userProfile(){
      const {data}=await getUserInfo();
      this.user=data.data
      console.log(this.user)
    },
    onFileChange(){
      // 获取文件对象
      const file=this.$refs.file.files[0]
      this.imgName=file.name
      console.log(file.name);
      // 基于文章对象获取blob数据
      this.img=window.URL.createObjectURL(file)
      console.log(this.$refs.file);
      
      console.log(this.img)
      this.isUpdatePhotoShow=true

      // file-input 如果选中了同一个文件，再次选择change不会触发
      // 每次使用完毕，清空ref的值为空
      this.$refs.file.value = ''
    }
  },
  created() {
    this.userProfile();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.user-profile{
  .avatar{
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>