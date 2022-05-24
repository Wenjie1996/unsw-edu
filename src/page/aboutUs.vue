<template>
  <div class="mh100vh bcf bcf9">
    <headmenu ref="head" :index="4"></headmenu>
    <div class="vih lh40p">&nbsp;</div>
    <div class="mr15">
      <div class="mt4"><img src="../common/img/about/t1.png" class="w100"></div>

      <div class="w100 mt5">
        <div class="tc pd2">
          <img src="../common/img/t1.png" alt="">
          <span class="  font36">关于我们</span>
          <img src="../common/img/t2.png" alt=""><br><br>
          <span class="font18 cacb" style="line-height:30px">只提供最优质的教育</span>
        </div>
        <div class="mt5"><span class="font22 tl" style="line-height:36px">CPU Education 成立于2018年3月，是一家集大学教育、留学咨询、软件开发为一体的教育科技公司，总部设立于澳大利亚墨尔本自成立以来，业务范围逐步扩展，稳定发展，立志于为留学生提供优质的服务。</span></div>

        <div class="tc mt5">
          <img src="../common/img/t1.png" alt="">
          <span class="  font36">三大核心业务</span>
          <img src="../common/img/t2.png" alt=""><br><br>
          <span class="font18 cacb" style="line-height:36px">为海外各大高校学生提供课后补习，作业的辅导</span>
        </div>

        <div class="tl mt5 w100 ovh">
          <div class="fll w30 pt2"><img src="../common/img/about/v1.png" class="w90"></div>
          <div class="fll pt4 pl2 w65">
            <div class="fontw font24">CPU Education</div><br><br>
            <div class="font22 cbbb" style="line-height:36px">为海外各大高校学生提供课后补习，作业辅导的服务，开设线上/线下大班课程及一对一课程，帮助数以万计的同学们稳步完成学业课程，近半数学生在考试中取得了First degree/ High distinction的高分！</div>
            <div class="font18 fontw pt6 ovh">
              <div class="fll w20"><img src="../common/img/about/dot.png" class="plr2"> 一流师资队伍</div>
              <span class="fll w80 cbbb" style="line-height:30px">超过90%的CPU Tutor拥有三年以上教学经验</span>
            </div>
            <div class="font18 fontw pt2">
              <div class="fll w20"> <img src="../common/img/about/dot.png" class="plr2"> 一站式服务</div>
              <span class="fll w80 cbbb" style="line-height:30px">助教团队全程辅助学生的学习过程，带领同学们找到最高效的学习方法</span>
            </div>
          </div>
        </div>

        <div class="tl mt10 w100 ovh">
          <div class="fll pt4  w65 pl2">
            <div class="fontw font24">CPU Consullting</div><br><br>
            <div class="font22 cbbb" style="line-height:36px">CPU王牌教育咨询板块，打造建立免费墨大信息咨询驿站。团队负责人是墨大前stop1工作人员，帮助广大学子解决了新学期选课、换专业的条件和注意事项、休学相关事宜、交学费、期末Special Consideration的申请、成绩单毕业证书等行政文件的领取、海外交换等问题。</div>
            <div class="font18 fontw pt6 ovh">
              <div class="fll w25"><img src="../common/img/about/dot.png" class="plr2"> 免费一对一咨询</div>
              <span class="fll w75 cbbb" style="line-height:30px">CPU Consulting为学生提供点对点、一对一的咨询服务，高效解决各种几首问题</span>
            </div>
            <div class="font18 fontw pt2">
              <div class="fll w25"> <img src="../common/img/about/dot.png" class="plr2"> FQA查询库</div>
              <span class="fll w75 cbbb" style="line-height:30px">CPU Consulting会定期将常见问题进行归类整理，以推文的形式放出，方便学生自查</span>
            </div>
          </div>
          <div class="flr w30 pt4" style="padding-top:10%"><img src="../common/img/about/v2.png" class="w100"></div>
        </div>

        <div class="tl mt10 w100 ovh">
          <div class="fll w30 pt4"><img src="../common/img/about/v3.png" class="w100"></div>
          <div class="fll pt4 pl2 w65">
            <div class="fontw font24">CPU Career</div><br><br>
            <div class="font22 cbbb" style="line-height:36px">CPU Career致力于为海外留学生谋求更多的求职机会，密切关注国内外求职市场的动向，为身在异乡的海外留学生铺平求职道路。</div>
            <div class="font18 fontw pt6 ovh">
              <div class="fll w20"><img src="../common/img/about/dot.png" class="plr2"> 国内大厂资源</div>
              <span class="fll w80 cbbb" style="line-height:30px">CPU 与腾讯、字节跳动、华为等国内知名大厂的HR部门保持长期合作，为海外学子免费提供实习、校招内推的岗位</span>
            </div>
            <div class="font18 fontw pt2">
              <div class="fll w20"> <img src="../common/img/about/dot.png" class="plr2"> 一站式服务</div>
              <span class="fll w80 cbbb" style="line-height:30px">CPU Career会定期整理推送国内外的岗位信息，为需要寻找实习经历，工作机会的同学提供大量免费，专业，有保障的投递途径</span>
            </div>
          </div>
        </div>

        <div class="vih lh100p">&nbsp;</div>
      </div>
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
    // this.id = this.$route.query.p_n_id;
    // this.getData()
  },
  components: {
    headmenu: headmenu,
    foote: foote
  },
  methods: {
    // getData () {
    //   let postData = {
    //     p_n_id: this.id
    //   };
    //   bannerDetail(postData).then(res => {
    //     console.log(res)
    //     this.bean = res
    //   });

    // },
  },
};
</script>
<style>
@import "../common/css/common.css";
</style>