<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="评论加载失败，刷新重试！"
  >
  <van-cell title="书籍评论"/>
    <comment-item
      v-for="evaluation in evaluationList"
      :key="evaluation.evaluationId"
      :evaluation="evaluation"
    />
  </van-list>
</template>

<script>
import commentItem from "../comment-item/comment-item.vue";
export default {
  components: { commentItem },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false,
    };
  },
  props: {
    evaluationList: {
      type: [Array],
      required: true,
    },
    list:{
      type:Array,
      default:()=>[]
    }
  },
  computed: {},
  methods: {
  },
  created() {
  },
  mounted() {},
};
</script>
<style scoped>
</style>