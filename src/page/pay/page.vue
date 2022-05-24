<template>
  <div class="mh100vh bcf bcf9">
    <div v-html="payGateWay" ref="payGateWay">{{payGateWay}}</div>
  </div>
</template>

<script>
import Vue from 'vue';


export default {
  data () {
    return {
      payGateWay: ''
    };
  },

  created () {

  },
  mounted () {
    // 支付宝支付 暂时注释

    let form = this.$route.query.htmlData
    this.payGateWay = form
    this.$nextTick(() => {
      this.$refs.payGateWay.children[0].submit()
    })


  },
  methods: {

  },
};
</script>
<style>
@import "../../common/css/common.css";
</style>