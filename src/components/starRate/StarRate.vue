<template>
  <div class="starRate">
    <van-cell-group inset>
      <van-cell title="书记评分TM">
        <div slot="label">
          <van-row type="flex" justify="center">
            <!-- 左评分 -->
            <van-col class="leftStar" span="6">
              <h1>{{ bookDetail.evaluationScore }}</h1>
              <van-rate
                v-model="bookDetail.evaluationScore"
                :size="12"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
            /></van-col>
            <!-- 中间  星 -->
            <van-col class="centerStar" span="5">
              <van-icon
                v-for="(value, index) in 5"
                :key="index"
                name="star"
                size="1"
              >
                <div v-for="val in index" :key="val">
                  <van-icon name="star" size="1" />
                  <br />
                </div>
              </van-icon>
            </van-col>
            <van-col class="rightStar" span="7">
              <van-progress
                v-for="(value, index) in scoreStatistics"
                :key="index"
                color="#ffd21e"
                :show-pivot="false"
                :percentage="parseInt(value === null ? 0 : value[1])"
              >
              </van-progress>
            </van-col>
          </van-row>
          <van-row>
            <van-divider :dashed="false" />
          </van-row>
          <van-row>
            <van-col span="5">{{ readed }}人读过</van-col>
            <van-col span="5">{{ reading }}人在读</van-col>
            <van-col span="5">{{ toRead }}人想读</van-col>
            <van-col offset="3" span="6">{{bookDetail.evaluationQuantity}}人评分</van-col>
          </van-row>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { scoreStatistics } from "@/api/evaluate";
import{ getReadState } from "@/api/book"
export default {
  name: "StarRate",
  data() {
    return {
      scoreStatistics: null,
      percentage: "",
      toRead:0,
      reading:0,
      readed:0
    };
  },
  props: {
    bookDetail: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {
    // 统计一本书的阅读状态 在读 想读 度过
    async selectReadState(){
      try {
        const { data }=await getReadState({
        bookId:this.bookDetail.bookId
      })
      this.toRead=data.data.toRead
      this.reading=data.data.reading
      this.readed=data.data.readed
      } catch (error) {
        this.$toast.fail("统计阅读状态请求失败",error)
      }
    },
    async getscoreStatistics() {
      const { data } = await scoreStatistics({
        bookId: this.bookDetail.bookId,
      });
      this.scoreStatistics = data.data.scoreStatistics;
    },
  },
  created() {
  },
  mounted() {
    this.getscoreStatistics();
    this.selectReadState();
  },
};
</script>
<style scoped lang="less">
.starRate {
  .van-divider{
    margin: 10px;
  }
  margin-bottom: 18px;
  .leftStar {
    h1 {
      text-align: center;
      line-height: 25px;
    }
  }
  .rightStar {
    .van-progress {
      margin-bottom: 20px;
    }
  }
}
</style>
