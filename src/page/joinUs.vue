<template>
  <div class="mh100vh bcf bcf9">
    <headmenu ref="head" :index="3"></headmenu>
    <div class="vih lh40p">&nbsp;</div>
    <div class="mr15">
      <div class="mt4"><img src="../common/img/join/t1.png" class="w100"></div>
      <div class="tc cbbb font18 mt5">
        <div style="line-height:30px">CPU网校是隶属于全球最大留学教育企业</div>
        <div style="line-height:30px">打造为全球留学生提供职业规划教育的专业在线平台</div>
        <div style="line-height:30px">多年来致力于为全球留学生提供就业解决方案以及职业发展资源一站式服务</div>
      </div>

      <div class="w100 mt5">
        <div class="tc pd2">
          <img src="../common/img/t1.png" alt="">
          <span class="  font36">我们的课程与服务</span>
          <img src="../common/img/t2.png" alt=""><br><br>
          <span class="font18 cacb" style="line-height:30px">导师辅导名师教学，获得澳洲本地工作经验</span>
        </div>
        <div class="w100 ovh mt2">
          <el-card class="mt2 fll w49" style="width:46%;margin-right:7%;height:500px">
            <div class="w100 pd2">
              <div class="tc">
                <img src="../common/img/join/v1.jpg" alt="">
              </div>
              <div class="tc"><span class="font30 fontw cbbb">职场必备核心技能</span></div>
              <div class="tl" style="margin-top:10%"><span class="font18 cbbb" style="line-height:28px">拆解求职热门岗位招聘要求，让学员掌握工作所需技能，完美匹配岗位需求，在专业学科背景基础上增强行业认知，结合具体案例掌握职场必备技能。</span></div>
            </div>
          </el-card>

          <el-card class="mt2 fll w49" style="width:46%;height:500px">
            <div class="w100 pd2">
              <div class="tc">
                <img src="../common/img/join/v2.jpg" alt="">
              </div>
              <div class="tc"><span class="font30 fontw cbbb">求职加分证书认证</span></div>
              <div class="tl" style="margin-top:10%"><span class="font18 cbbb" style="line-height:28px">精选民企认证、市场认可的高含金量职场实用证书，搭配课程辅导及全方位备考服务，帮助学员在最短时间内获得资格认证，往期学员平均考试通过率93%以上。</span></div>
            </div>
          </el-card>

          <el-card class="fll w49" style="width:46%;margin-right:7%;height:500px;margin-top:7%">
            <div class="w100 pd2">
              <div class="tc">
                <img src="../common/img/join/v3.jpg" alt="">
              </div>
              <div class="tc"><span class="font30 fontw cbbb">1对1私人定制VIP</span></div>
              <div class="tl" style="margin-top:10%"><span class="font18 cbbb" style="line-height:28px">名企在职导师1对1辅导，提供求职规划、简历、面试、求职、社交、新人工作指南等经验辅导。根据学员求职意向及基础背景，提供个性化职业咨询服务，助你求职一路无阻。</span></div>
            </div>
          </el-card>

          <el-card class="fll w49" style="width:46%;height:500px;margin-top:7%">
            <div class="w100 pd2">
              <div class="tc">
                <img src="../common/img/join/v4.jpg" alt="">
              </div>
              <div class="tc"><span class="font30 fontw cbbb">背景优势提升项目</span></div>
              <div class="tl" style="margin-top:10%"><span class="font18 cbbb" style="line-height:28px">求职背景急速提升，解决简历一片空白、经历无亮点等难题。真实名企项目，PBL教学方法，重视个人作品输出，提升简历含金量，优秀学员直推合作企业。</span></div>
            </div>
          </el-card>
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