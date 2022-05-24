<template>
  <div class="mh100vh bcf bcf9">
    <headmenu ref="head" :index="1"></headmenu>
    <div class="vih lh40p">&nbsp;</div>
    <div class="mr15">
      <div class=' mh100vh'>
        <div class="tc pd2 font14">{{bean.c_title}}</div>
        <div class="tc pd2 pb2 font13">{{bean.d_addtime}}</div>
        <div class="font13" style="max-width:100%;line-height:6vw" v-html="bean.c_text"></div>
      </div>
      <div class="vih lh100p">&nbsp;</div>
    </div>
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import Vue from 'vue';
import { bannerDetail } from '../api/main.js'
import headmenu from '../components/headmenu.vue';
import foote from '../components/foote.vue';

export default {
  data () {
    return {
      bean: '',
      id: ''
    };
  },

  created () {
    this.id = this.$route.query.p_n_id;
    this.getData()
  },
  components: {
    headmenu: headmenu,
    foote: foote
  },
  methods: {
    getData () {
      // alert(this.p_n_id);
      let postData = {
        p_n_id: this.id
      };
      bannerDetail(postData).then(res => {
        // console.log(res)
        this.bean = res
      });

    },
  },
};
</script>
<style>
@import "../common/css/common.css";
</style>