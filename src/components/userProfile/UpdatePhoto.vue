<template>
  <div class="update-photo">
    <img :src="img" ref="image" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
// npm install cropperjs
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { getUploadImgUrl } from "@/api/book.js";
import { updateUserProfile } from "@/api/user.js"
export default {
  name: "UpdatePhoto",
  data() {
    return {
      cropper: null,
    };
  },
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
    imgName: {
      type: String,
      required: true,
    },
  },
  computed: {},
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
        
      });
    },
    async updateUserPhoto(blob){
      this.$toast.loading({
        message:'保存中',
        duration:0,
        forbidClick:true
      })
      try {
         console.log(blob);
        // 普通的接口是Content-Type 是 application/json
        // 如果接口要求是Content-Type 是multipart/form-data
        // 用FormData对象传递参数
        const formData = new FormData();
        // Pass the image file name as the third parameter if necessary.
        // formData.append("参数名"，要传递的对象,文件名)
        formData.append("file", blob,this.imgName);
        // formData.append("filename", this.imgName);
        // console.log(formData);
        const { data } = await getUploadImgUrl(formData);
        console.log(data.imgUrl[0]);
        // console.log(data);
        // 更新数据库图片连接
        await updateUserProfile({avatar:data.imgUrl[0]})
        console.log("后台更新头像更新成功");


        // 关闭弹出层
        this.$emit('close')

        // 更新视图      父组件的监听事件，$event
        this.$emit('update-photo',data.imgUrl[0])
        // 父组件的当前标签加上属性@update-photo ="user.photo=$event"

        // 

        this.$toast.success('更新成功！')
      } catch (error) {
        this.$toast.fail('更新失败！')
      }
     
    },

  },
  created() {},
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
    // console.log(this.cropper);
  },
};
</script>
<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>