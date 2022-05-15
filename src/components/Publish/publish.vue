<template>
  <div class="publish">
    <!-- 导航 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
      title="发布内容"
      left-text="取消"
      right-text="发表"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-field
      v-model="text"
      rows="5"
      autosize
      type="textarea"
      maxlength="500"
      placeholder="分享新鲜事..."
      show-word-limit
    />
    <van-field name="uploader">
      <template #input>
        <van-uploader
          v-model="uploader"
          :after-read="afterRead"
          @delete="deleteImg"
          multiple
        />
      </template>
    </van-field>
  </div>
</template>

<script>
import { uploadFiles, insertTopic } from "@/api/topic";
export default {
  name:'publish',
  components:{},
  data() {
    return {
      text: "",
      uploader: [],
      img: null,
      imgName: null,
      uploadImage: [],
      imgsUrl: [],
      newTopic:{}
      
    };
  },
  methods: {
    afterRead(file) {
      if (file instanceof Array && file.length) {
        file.forEach((item) => {
          this.uploadImage.push(item.file);
        });
      } else {
        this.uploadImage.push(file.file);
      }
    },
    //删除方法
    deleteImg(file) {
      for (let i = 0, len = this.uploadImage.length; i < len; i++) {
        if (
          file.file.name === this.uploadImage[i].name &&
          file.file.size === this.uploadImage[i].size
        ) {
          this.uploadImage.splice(i, 1);
          break;
        }
      }
    },
    // 合并文字和图片内容
    async handlerTextAndImg() {
      let str = "";
      let strImg = "";
      console.log(this.imgsUrl);
      this.imgsUrl.forEach((element) => {
        strImg =
          strImg +
          `<img style="width:92px; margin:2px 2px 2px " src="${element}" alt="">`;
      });
      str = `<div class="content-img"><p>${this.text}</p>${strImg}</div>`;
      console.log(str);

      const  {data}  = await insertTopic({ content: str });
      this.newTopic=data.data
      console.log('90',this.newTopic);
    },
    async uploadFile() {
      if (this.uploadImage && this.uploadImage.length) {
        // this.btnLoading = true;
        const params = new FormData();
        this.uploadImage.forEach((item) => {
          // console.log("遍历", item);
          params.append("files", item, item.name);
        });
        const { data } = await uploadFiles(params);
        
        this.imgsUrl = data.imgsUrl;
        this.handlerTextAndImg();
      }
      
     
    },
  //  取消
    onClickLeft() {
      this.$emit("oncancel",null)
    },
    // 发布内容
    onClickRight() {
     this.uploadFile()
    //  this.newTopic=data.data   
    // 变化时，执行监视处理函数

    },
  },
  watch:{
    newTopic:{
      handler(val){
        this.$emit("oncancel", val)
      }
    }
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.publish {
  padding-top: 95px;
}
</style>
