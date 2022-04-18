<template>
  <div class="th-back-top" v-show="show" @click="clickHandler">
    <span class="bg-back2top2">
      <van-icon name="back-top" />
    </span>
  </div>
</template>

<script>
export default {
  name:"BackTop",
  data(){
    return {
      show:false
    }
  },
  mounted(){
    //获取页面高度
    const winHeight=window.document.documentElement.clientHeight;
    // console.log("页面高度",winHeight);
    //监听滚动事件
    window.addEventListener("scroll",()=>{
      //获取滚动高度
      let scrollHeight=document.documentElement.scrollTop;
      // console.log("滚动高度",scrollHeight);
      
      if( scrollHeight >= winHeight){
        this.show=true;
      }else{
        this.show=false;
      }
    })
  },
  methods:{
    clickHandler(){
      window.document.documentElement.scrollTop=0;
    }
  }

}
</script>

<style scoped>
.th-back-top{
  position: fixed;
  right: 40px;
  bottom: 150px;
  height: 39px;
  width: 80px;
  z-index: 0;
  opacity: 0.8;
  text-align: center;
  padding-top: 15px;

}
.bg-back2top2{
  display: inline-block;
  /* background: url() no-repeat 0 0; */
  background-color: rgb(175 173 173 / 50%);
  /* background-size: 39px 39px; */
  height: 60px;
  width: 60px;
  border: 1px solid #c3c3c3;
}

</style>