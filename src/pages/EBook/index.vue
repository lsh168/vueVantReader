<template>
 <div class="ebook">
   <EbookTitle></EbookTitle>
<!--   <EbookMenu></EbookMenu>-->
   <e-book-reader></e-book-reader>

   
 </div>
</template>

<script>
import EBookReader from '../../components/ebook/EBookReader.vue';
// import EbookMenu from "../../components/ebook/EbookMenu";
import EbookTitle from "../../components/ebook/EbookTitle";
export default {
 components:{
  EBookReader,
   // EbookMenu,
   EbookTitle

 },
 data() {
 return {
 };
 },

 computed: {},
 methods: {},
 created() {},
 mounted() {}
};
</script>
<style lang="scss" rel="stylesheetscss" scoped>
@import "../../assets/styles/global.scss";
</style>