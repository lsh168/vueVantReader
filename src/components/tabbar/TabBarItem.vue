<template>
  <div class="tab-bar-item">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active: isActive}"><slot name="item-text"></slot></div>
    
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data() {
    return {
      isActive:true
    }
  },
  components:{
  }
}

</script>

<style>
  .tab-bar-item{
    flex: 1;
    /* 均等分 */
    text-align: center;
    height: 49px;

    font-size: 14px;
    /* 每个item-text 文字大小 */
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* icon下移三像素 */
    vertical-align: middle;
    /*  */
    margin-bottom: 2px;
    
  }
  .active {
    color: #c2c2c2;
  }

</style>
