<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    /* 变成行 */
    background: #f6f6f6;
    position: fixed;
    /* tabbar去下面 */
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  }
  .tab-bar-item{
    flex: 1;
    /* 均等分 */
    text-align: center;
    height: 49px;
  }
</style>
