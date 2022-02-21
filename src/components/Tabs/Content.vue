

<script>
export default {
  name:"Content",
  render(){
    return(
      <div>
        {
          this.panes.map((element)=>{
            return element.active ? element.$slots.default : ""
          })
        }

      </div>
    )
  },
  props:{
    panes:{
      type:Array,
      default:function(){
        return []
      }
    }
  }

}
</script>

<style scoped>

</style>