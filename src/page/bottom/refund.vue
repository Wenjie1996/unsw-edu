<template>
  <div class="mh100vh bcf bcf9">
    <headmenu ref="head" :index="1"></headmenu>
    <div class="vih lh50p">&nbsp;</div>
    <div class="mr15">
      <div class="tc font36 pt2"> 退款条款</div>

      <div class="tl font36 pt4">一、 退款规则</div>
      <div class="pt2 lh36p font22 tl">
        <div class="font20 lh36p">
          <li>1、单次课程退款</li>
          <ul>
            <li>（1）需在课程开始3天前（课程当地时间）发起退款申请，审核申请后将在五到七个工作日内反馈结果；</li>
            <li>（2）课程结束后不支持退款；</li>
            <li>（3）录播课程不支持退款；</li>
          </ul>

          <li>2、套餐课程退款（4节课以上（含4节））</li>
          <ul>
            <li>（1）需在第一节课程开始4天前（课程当地时间）发起退款申请，审核申请后将在两个工作日内反馈结果；</li>
            <li>（2）套餐课程的第一节课后，若发起退款申请，仅退款剩余课程售价（实付套餐课程售价-第一节课正常售价）的80%；</li>
            <li>（3）套餐课程的第二节课后，不支持退款；</li>
            <li>（4）录播课程不支持退款；</li>
          </ul>
          <li>3、储值卡退款</li>
          <ul>
            <li>（1）储值卡(带积分赠送)不支持退款；除某些特殊情况（如：毕业、退学）外，若因毕业或者退学需退款，可支持账户余额转赠，发起转赠申请时则需要提供学校官方文件,审核申请后将在五到七个工作日反馈结果；
            </li>
            <li>（2）储值卡赠送金额不支持退款；</li>
            <li>（3）储值卡已消费课程退款参照单次课程退款及套餐课程退款审核；</li>
          </ul>
        </div>
      </div>

      <div class="tl font36 pt4">2.信息使用</div>
      <div class="pt2 lh36p font22 tl">
        <div class="font20 lh36p">
          <li>(a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。</li>
          <li>(b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。</li>
        </div>
      </div>

      <div class="tl font36 pt4">二、 退款路径</div>
      <div class="pt2 lh36p font22 tl">
        <div class="font20 lh36p">
          <li>退款需联系人工客服，款项原则上原路返回。</li>
          <li>具体解释权归属于CPU EDUCATION PTY LTD所有</li>

        </div>
      </div>

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