<template>
  <div class="mh100vh bcf bcf9">
    <headmenu ref="head" :index="1"></headmenu>
    <div class="vih lh50p">&nbsp;</div>
    <div class="mr15">
      <div class="tc font36 pt2"> 联系我们</div>
      <div class="pt2 lh36p font22">
        商科(commerce)运营客服：
      </div>
      <img src="../../common/img/bottom/kf1.png" style="width:200px">
      <div class="pt2 lh36p font22">
        工科(Science/Engineering)运营客服
      </div>
      <img src="../../common/img/bottom/kf2.png" style="width:200px">

      <div class="pt2 lh36p font22">
        CPU Consulting客服：
      </div>
      <img src="../../common/img/bottom/kf3.png" style="width:200px">

      <div class="pt2 lh36p font22">
        网站故障/投诉建议：
      </div>
      <img src="../../common/img/bottom/kf4.png" style="width:200px">

      <div class="pt2 lh36p font22">
        Tutor招聘通道：
        投递邮箱：cpu666666@126.com

      </div>
      <div class="font22 lh36p">应聘者所需要的材料</div>
      <p class="font20 lh36p">
        <li> 1. 个人简历 (中英文版本皆可)</li>
        <li> 2. 截止到当前学期为止的成绩单</li>
        <li>3. 备注感兴趣的课程编号 (可以不止一门)</li>
        <li> 4. 应聘者的联系方式 (微信号必须要填写)</li>

      </p>

      <div class="vih lh100p">&nbsp;</div>
    </div>
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import Vue from 'vue';
import headmenu from '../../components/headmenu.vue';
import foote from '../../components/foote.vue';

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
      // bannerDetail(postData).then(res => {
      //   // console.log(res)
      //   this.bean = res
      // });

    },
  },
};
</script>
<style>
@import "../../common/css/common.css";
</style>