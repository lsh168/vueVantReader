<template>
  <div class="book-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshSuccessText">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <book-item 
        v-for="(book, index) in list" 
        :key="index" 
        :book="book" />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getBooks} from '@/api/book'
import BookItem from '@/components/bookItem/BookItem'
export default {
  name: "BookList",
  components: {
    BookItem,
  },
  data (){
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,  //分页的页数
      error: false,//控制列表的失败状态
      refreshing: false,//下拉刷新
      refreshSuccessText:''


    }
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
    orderBook:{
      type:String,
      required:true
    }
  },
  methods:{
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    async onLoad(){
      try{
        //1.获取数据  没有await请求会显示undefine
        const {data} = await getBooks({
          categoryId:this.channel.categoryId,
          order:this.orderBook,//*********需要修改 */
          page:this.page
        })
        // 模拟失败加载
        // if(Math.random>0.5){
        //   JSON.parse('slkdjfkj')
        // }
          const results =data.records
          console.log(data);
          this.list.push(...results)
          // 本次加载之后把loading改成false
          this.loading=false
          // 判断是否加载完成
          if(data.current<data.pages){
            this.page+=1
          }else{
            this.finished=true
          }
      }catch(error){
        // 错误提示信息
        this.error=true 
        // 关闭加载状态
        this.loading=false
      }
      
      
    },
    onRefresh(){
      try {
        if (Math.random()<0.5) {
          JSON.parse('sdjfhsk')
        }

        //请求获取数据
        //把数据添加到最顶端
        // this.list.unshift(...results)
        // 关闭刷新
        this.refreshing=false
        // 提示刷新成功了几条数据
        this.refreshSuccessText=`刷新成功，更新了${this.list.length}数据！`

      } catch (error) {
        
        this.refreshSuccessText=`刷新失败！`
        this.refreshing=false
      }

      
    }
  },
  watch:{
    orderBook:{
      handler(){
        this.loading=true
        this.finished=false
        console.log(this.orderBook);
        this.list=[]
        this.page=1
        this.onLoad()

      }
    }
  }
};
</script>

<style scoped>
/* 记住列表的滚动位置 */
.book-list{
  height:79vh;
	overflow-y:auto;
}
</style>