<template>
 <div class="search-suggestion">
   <van-cell title="hahaha" icon="search"></van-cell>
   </div>
</template>

<script>
export default {
  name:'SearchSuggestion',
  props:{
    searchText:{
      type:String,
      required:true
    }
  },
 data() {
 return {
 };
 },
 computed: {},
 watch:{
  //  第一次监听不触发内容,加上immediate，第一次也可以监听到
   searchText:{
     handler(val){
       console.log(val);

     },
     immediate:true
   }
 },
 methods: {},
 created() {},
 mounted() {}
};
</script>
<style scoped>
</style>