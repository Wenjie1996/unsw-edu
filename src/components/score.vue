<template>
  <div>
    <div class="block fll">
      <span class="demonstration">课程内容</span>
      <el-rate :value="item.n_courserware" class="rate" disabled></el-rate>
    </div>
    <div class="block fll">
      <span class="demonstration">讲课风格</span>
      <el-rate :value="item.n_style" class="rate" disabled></el-rate>
    </div>
    <div class="block fll">
      <span class="demonstration">讲课逻辑</span>
      <el-rate :value="item.n_logic" class="rate" disabled></el-rate>
    </div>
    <div class="block fll">
      <span class="demonstration">课后答疑</span>
      <el-rate :value="item.n_afterClass" class="rate" disabled></el-rate>
    </div>

    <div class="block fll">
      <span class="demonstration">综合评价</span>
      <el-rate :value="item.n_zt" class="rate" disabled></el-rate>
    </div>
  </div>

</template>

<script>
export default {
  props: ['item'],
  data () {
    return {}
  }

}
</script>
<style scoped>
.block {
  margin-right: 10px;
  margin-top: 10px;
  float: left;
}
.demonstration {
  font-size: 10px;
}
.block ::after {
  content: "";
  display: block;
  clear: both;
}
.rate /deep/ .el-rate__icon {
  margin-right: 0px;
}
</style>