<template>
  <div class="ebook-reader">
    <!-- EBookReader{{ $route.params.fileName }} -->
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Epub from "epubjs";
global.ePub = Epub;
export default {
  data() {
    return {
      // book:''
    };
  },
  computed: {
    ...mapGetters(["fileName","menuVisible"]),
  },
  methods: {
    prevPage(){
      if (this.rendition){
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage(){
      if (this.rendition){
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu(){
      console.log("title and menu...")
      this.$store.dispatch("setMenuVisible",!this.menuVisible)
    },
    hideTitleAndMenu(){
      this.$store.dispatch("setMenuVisible",false)
    },


    initEpub() {
      const url='http://localhost:9001/epub/'+this.fileName+'.epub'
      this.book=new Epub(url)
      console.log(this.book);
      this.rendition = this.book.renderTo('read',{
        width:innerWidth,
        height: innerHeight,
        // 微信兼容
        method: 'default'
      })
      this.rendition.display()
      this.rendition.on('touchstart',event=>{
        // 0 一根手指  clientX用户的点击X轴位置
        this.touchStartx=event.changedTouches[0].clientX
        this.touchStartTime=event.timeStamp
      })
      this.rendition.on('touchend',event=>{
        // event.changedTouches[0].clientX离开时的手指坐标 减去刚开始手指的x坐标
        //x轴偏移量
        const offsetX=event.changedTouches[0].clientX-this.touchStartx
        //time从滑动到离开时的时间间隔
        const time=event.timeStamp-this.touchStartTime
        //根据打印时间和偏移量判断，上一页还是下一页
        if (time < 500 && offsetX > 40){
        //  进入上一页
          this.prevPage()
        }else if (time < 500 && offsetX < -40){
        //  进入下一页
          this.nextPage()
        }else {
          //显示标题栏和菜单栏
          this.toggleTitleAndMenu()
        }
        //禁止 默认方法调用 禁止时事件传播
        event.preventDefault()
        event.stopPropagation()

        console.log(offsetX,time);
      })

      
      
    },
  },
  created() {},
  mounted() {
    // const Base_URL = "http://localhost:9001/epub/";
    // console.log("baseurl");
    const fileName = this.$route.params.fileName.split("|").join("/");
    console.log(fileName);
    this.$store.dispatch("setFileName", fileName).then(()=>{
      this.initEpub()
    })
  },
};
</script>
<style scoped>
</style>