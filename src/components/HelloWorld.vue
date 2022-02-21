<template>
  <div class="hello">
    <Tabs :currentIndex="currentIndex" @changeTab="changTabHandler">
      <Tab tabName="tab1" index="1">
        <div>content11</div>
      </Tab>
      <Tab tabName="tab2" index="2">
        <div>content22</div>
      </Tab>
      <Tab tabName="tab3" index="3">
        <div>content33</div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      currentIndex: "1",
    };
  },
  methods: {
    changTabHandler(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style scoped>
</style>
