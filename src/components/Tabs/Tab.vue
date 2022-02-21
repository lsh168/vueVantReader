<script>
export default {
  name:"Tab",
  props:{
    index:{
      type:[String,Number],
      default:"1"
    },
    tabName:{
      type:String,
      default:"tab"
    }
  },
  mounted(){
    // this.$parent.panes.push(this.$slots.default);
    this.$parent.panes.push(this);
    // this是这个组件，给content组件是使用
    // console.log(this.$parent.panes);
  },
  computed:{
    active(){
      return this.$parent.currentIndex == this.index
    }

  },
  methods:{
    changeIndexhandler(){
      // 把数据传递给给父元素
      // this.$emit("onChangeIndex",this.index)
      this.$parent.onChangeIndex(this.index)
    }
  },
  render(){
    let className = {
      tab:"tab",
      active:this.active
    }
    return(
      <li class={ className } onClick={this.changeIndexhandler.bind(this)}>
        { this.tabName}
      </li>
    )
  }

}
</script>

<style scoped>
.tab {
  flex: 1;
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  text-align: center;
}
.tab.active {
  border-bottom: 2px solid blue;
}

</style>