<template>
  <div class="bcf">
    <headmenu ref="head" :index="1"></headmenu>
    <div class="vih lh40p">&nbsp;</div>

    <!--弹窗-->
    <el-dialog title="私人定制1V1辅导" :visible.sync="dialogVisible" width="300px">
      <div style="text-align: center;">
        <span>微信扫一扫添加小助手</span><br>
        <el-image :src="wxCode" style="width:200px;height:200px"></el-image><br>
        <span>微信号：{{wechat}}</span>
        <span slot="footer" class="dialog-footer"></span>
      </div>
    </el-dialog>

    <div class="poa" style="top:30%;"><img src="../common/img/BG1.png" class="w100" style="z-index:1"></div>
    <div class="mr15 ">
      <div class="mt4" style="z-index:2">
        <el-carousel indicator-position="outside" class="bcf" style="height:380px;">
          <el-carousel-item v-for="(item,index) in bannerlist" v-bind:key="index" class="bcf" style="height:360px;">
            <el-image style="width:100%;height:100%;" :src="item.c_pic" @click="tobanner(item)"></el-image>
            <!-- <img style="width:100%;height:100%;" :src="item.c_pic" @click="tobanner(item)"> -->
          </el-carousel-item>
        </el-carousel>
        <!-- 快捷菜单 -->
        <div class="w100 ovh mt2 mb2">
          <el-card class="fll w22 br10p cupn ovh" style="margin-right:3.6%;padding:20px 0px" @click.native="contact1">
            <div class="fll w50"><img src="../common/img/main/m1.png" alt=""></div>
            <div class="tl font12 cacb 45" style="padding-top:5%;padding-right:10%">
              <span class="font20 c33 fontw">My Course</span><br><br>
              <span>Content Review</span><br>
              <span>Exam Exercises</span>
            </div>
          </el-card>
          <el-card class="fll w22 br10p cupn ovh" style="margin-right:3.6%;padding:20px 0px" @click.native="contact2">
            <div class="fll w50"><img src="../common/img/main/m2.png" alt=""></div>
            <div class="tl font12 cacb" style="padding-top:5%;padding-right:10%">
              <span class="font20 c33 fontw">Private Tutor</span><br><br>
              <span>Famous Teachers</span><br>
              <span>Good Tutoring</span>
            </div>
          </el-card>
          <el-card class="fll w22 br10p cupn" style="margin-right:3.6%;padding:20px 0px" @click.native="contact3">
            <div class="fll w50"><img src="../common/img/main/m3.png" alt=""></div>
            <div class="tl font12 cacb" style="padding-top:5%;padding-right:10%">
              <span class="font20 c33 fontw">Materials</span><br><br>
              <span>Lecture Notes</span><br>
              <span>Recordings</span>
            </div>
          </el-card>
          <el-card class="flr w22 br10p cupn" style="padding:20px 0px" @click.native="contact4">
            <div class="fll w50"><img src="../common/img/main/m1.png" alt=""></div>
            <div class="tl font12 cacb cupn" style="padding-top:5%;margin-left:50%">
              <span class="font20 c33 fontw">Public Class</span><br><br>
              <span>Conclusions</span><br>
              <span>Typical Questions</span>
            </div>
          </el-card>
        </div>
        <!-- 名师公开课 -->
        <div class="w100">
          <div class="tc pd2">
            <img src="../common/img/t1.png" alt="">
            <span class=" font36">Popular Courses</span>
            <img src="../common/img/t2.png" alt=""><br><br>
            <span class="font18 cacb">Lecture Review, Exercises, Consultation etc.</span>
          </div>
          <el-row :span="24">
            <el-col class="w25 pt2 plr1 br10p cupn" v-for="(item, index) in courseList.slice(0, 8)" :key="index" @click.native="courseDetail(item.p_n_id)">
              <el-card :body-style="{ padding: '10px' }" class="br10p">
                <!-- <img :src="item.c_purl" class="w100"> -->
                <el-image :src="item.c_purl" class="w100" style="height:200px">
                </el-image>
                <div class="line-limit-length" style="padding: 10px;">
                  <span class="font22">{{item.c_name}}</span>
                  <!-- <div class="bottom clearfix">
                    <span></span>
                  </div> -->
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="tc pd4">
            <el-button type="warning" plain round @click="FunMore">More</el-button>
          </div>
        </div>

        <div class="w100">
          <div class="tc pd2">
            <img src="../common/img/t1.png" alt="">
            <span class="  font36">History Feedback</span>
            <img src="../common/img/t2.png" alt=""><br><br>
            <span class="font18 cacb">Feedbacks from past students</span>
          </div>

          <el-card class="mt2 " style="min-height:400px">
            <div v-if="commitList.length==0" class="clearfloat font18 mt2 tc pt2">
              暂无评论
            </div>

            <div v-for="(item,index) in commitList" :key="index" class="ovh">
              <transition name="el-fade-in-linear">
                <div class="pt2" style="margin-left:5%;" v-show="show">
                  <div class="c_u_face fll">
                    <el-image v-if="item.c_nm == 1" :src="item.c_wx_tx" class="c_u_faceIcon"></el-image>
                    <el-image v-if="item.c_nm == 0" :src="require('../common/img/course/mor.jpg')" class="c_u_faceIcon"></el-image>
                  </div>
                  <div>
                    <div>
                      <span class="w12 line-limit-length" style="display:inline-block;margin-right:10px;max-width:150px">{{item.c_nm == 0 ? '匿名用户' : item.uname==null || item.uname==''?'无名':item.uname}}</span>
                      <span class="w75 line-limit-length font14" style="display:inline-block" :title="item.c_text">{{item.c_text}}</span>
                    </div>
                    <div>
                      <!--五项评分S-->
                      <score v-bind:item="item" />

                      <!--五项评分E-->
                    </div>
                  </div>

                  <!-- <div class="flr pt1 font18 w5"><span class="ce69 cupn">详情></span></div> -->
                </div>
              </transition>
            </div>

          </el-card>
          <div class="clearfloat mt2 tc pt2 font24 cupn" @click="FunChange">
            <i class="el-icon-refresh"></i>
            <span class="cbbb">More</span>
          </div>
          <div class="w100 font18 tc h150p mt5 tc" :style="{'background':'url('+bgurl+') no-repeat center center', 'background-size':'100% 100%'}">
            <div class="fll w25  tc" style="padding-top:3%">
              <div class="tc">Total Class</div>
              <div class="fontw font36">100+</div>
            </div>
            <!-- <div><img src="../common/img/line.png" class="poa" style="left:23%;"></div> -->
            <div class="fll w25 tc" style="padding-top:3%">
              <div class="">Students Involved</div>
              <div class="fontw font36">1000+</div>
            </div>
            <div class="fll w25 tc" style="padding-top:3%">
              <div>HD Rate</div>
              <div class="fontw font36">80%</div>
            </div>
            <div class="tc" style="padding-top:3%">
              <div>Satisfaction</div>
              <div class="fontw font36">99%</div>
            </div>
          </div>
        </div>

        <div class="w100 mt5">
<!--          <div class="tc pd2">-->
<!--            <img src="../common/img/t1.png" alt="">-->
<!--            <span class="  font36">1V1 Tutoring</span>-->
<!--            <img src="../common/img/t2.png" alt=""><br><br>-->
<!--            <span class="font18 cacb">More exercises, Content review</span>-->
<!--          </div>-->
<!--          <el-card class="mt2 h300p">-->
<!--            <div>-->
<!--              <div class="fll w20"><img src="../common/img/main/1v1.png" class="w90"></div>-->
<!--              <div class="fll tl pt4 pl2 w50 tl">-->
<!--                <span class="fontw font36">名校导师1V1辅导</span><br><br>-->
<!--                <span class="font18">关注大学课代表，获得只属于你的选课，作业，美食，生活资讯课程补习, 考试冲刺, 作业辅导, 知识拓展。</span>-->
<!--              </div>-->
<!--              <div class="flr pt2 font18 w15" style="padding-right:5%">-->
<!--                <el-image :src="wxCode" style="width:200px;height:200px"></el-image>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
        </div>

        <div class="w100 mt5">
<!--          <div class="tc pd2">-->
<!--            <img src="../common/img/t1.png" alt="">-->
<!--            <span class="  font36">Precious Resources</span>-->
<!--            <img src="../common/img/t2.png" alt=""><br><br>-->
<!--&lt;!&ndash;            <span class="font18 cacb">详细基础讲解+商业项目实战, 澳洲最强导师团队带你从零基础到就业</span>&ndash;&gt;-->
<!--          </div>-->
<!--          <el-card class="mt2 h300p">-->
<!--            <div class="fll pt2 font18 w15" style="padding-left:3%">-->
<!--              <el-image :src="wxCode" style="width:200px;height:200px"></el-image>-->
<!--            </div>-->
<!--            <div class="flr w25 pt2 pl2" style=""><img src="../common/img/main/zczl.png" class="w90"></div>-->
<!--            <div class="flr pt4 w50 tr" style="padding-right:2%">-->
<!--              <span class="fontw font36">多年培训经验珍藏资料</span><br><br>-->
<!--              <span class="font18">详细基础讲解+商业项目实战, 澳洲最强导师团队带你从零基础到就业 冲刺, 作业辅导, 知识拓展。</span>-->
<!--            </div>-->
<!--          </el-card>-->
        </div>

        <div class="w100 mt5">
<!--          <div class="tc pd2">-->
<!--            <img src="../common/img/t1.png" alt="">-->
<!--            <span class="  font36">教育咨询</span>-->
<!--            <img src="../common/img/t2.png" alt=""><br><br>-->
<!--            <span class="font18 cacb">按职业发展选择合适的学习内容，帮助你快速全面掌握所需知识和技能</span>-->
<!--          </div>-->
<!--          <el-card class="mt2 h300p">-->
<!--            <div class="fll pt4 w65 tl" style="padding-left:5%">-->
<!--              <span class="fontw font24">公开课有哪些上课方式？</span><br><br>-->
<!--              <span class="font18">上课方式一般有线下课程，Zoom 线上课程，录播课程，即将开放线上直播课程，敬请期待。</span><br><br>-->
<!--              &lt;!&ndash; <el-button class="w20 font18 cff" style="background:#1CF4E3" round>立即咨询</el-button> &ndash;&gt;-->
<!--              <img @click="contact2" src="../common/img/bt.png" class="cupn">-->
<!--            </div>-->
<!--            <div class="flr w25 pl2"><img src="../common/img/main/jyzx.png" class="w70"></div>-->
<!--          </el-card>-->
        </div>

        <!-- <div class="w100 mt5">
          <div class="tc pd2">
            <img src="../common/img/t1.png" alt="">
            <span class="  font36">名师阵容</span>
            <img src="../common/img/t2.png" alt=""><br><br>
            <span class="font18 cacb">优秀视频评价，往期好评，优秀学员留言</span>
          </div>
          <div class="w100 h100 ovh">
            <div class="fll w20 pt2" v-for="(item,index) in teacherList" :key="index">
              <img :src="item.url" class="cupn">
            </div>
          </div>
        </div> -->

        <!-- <div class="w100 mt5 ">
          <div class="tc pd2">
            <img src="../common/img/t1.png" alt="">
            <span class="  font36">合作伙伴</span>
            <img src="../common/img/t2.png" alt=""><br><br>
            <span class="font18 cacb">优秀视频评价，往期好评，优秀学员留言</span>
          </div>

          <el-card class="mt2">
            <div class="w100 ">
              <div class="fll w20 pd2" v-for="(item,index) in hzhbList" :key="index">
                <img :src="item.url" alt="">
              </div>
            </div>
          </el-card>
        </div> -->
        <div class="vih lh150p">&nbsp;</div>
      </div>
    </div>
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import Vue from 'vue';

import { bannerList, getCourseList, commentsList, selSetting, wxQrCodeLogin } from '../api/main.js'
import config from '../../config/config.js'
import headmenu from '../components/headmenu.vue';
import foote from '../components/foote.vue';
import score from '../components/score.vue'

export default {
  data () {
    return {
      dialogVisible: false, // 弹窗
      wxCode: '',
      wechat: '',
      bgurl: require('../common/img/bg.png'),
      code: this.getUrlParams('code') ? this.getUrlParams('code') : "",
      state: this.getUrlParams('state') ? this.getUrlParams('state') : "",
      bannerlist: [],
      courseList: [],
      commitList: [],
      teacherList: [{ url: require('../common/img/teacher/1.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/2.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/3.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/4.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/5.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/6.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/7.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/8.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/9.jpg'), name: "程老师", title: "4年教学经验" },
      { url: require('../common/img/teacher/10.jpg'), name: "程老师", title: "4年教学经验" },
      ],
      hzhbList: [{ url: require('../common/img/main/t1.jpg') },
      { url: require('../common/img/main/t2.jpg') },
      { url: require('../common/img/main/t3.jpg') },
      { url: require('../common/img/main/t4.jpg') },
      { url: require('../common/img/main/t5.jpg') },
      { url: require('../common/img/main/t6.jpg') },
      { url: require('../common/img/main/t7.jpg') },
      { url: require('../common/img/main/t8.jpg') },
      { url: require('../common/img/main/t9.jpg') },
      { url: require('../common/img/main/t10.jpg') },
      { url: require('../common/img/main/t11.jpg') },
      { url: require('../common/img/main/t12.jpg') },
      ],
      show: true
    };
  },
  components: {
    headmenu: headmenu,
    foote: foote,
    score
  },
  created (e) {
    // console.log(sessionStorage.getItem('user'))
    if (sessionStorage.getItem('user') == undefined || sessionStorage.getItem('user') == null) {
      if (this.code !== '' && this.code !== null && this.code !== undefined) {
        //扫码登入
        // console.log(this.code)
        this.wxQrCodeLogin(this.code)
      }
    }

    this.getBanner()
    this.getCourseList();
    this.commentsList()
    this.selSetting()
  },
  computed: {},
  methods: {
    getUrlParams (name) { // 不传name返回所有值，否则返回对应值
      var url = window.location.search;
      if (url.indexOf('?') == 1) { return false; }
      url = url.substr(1);
      url = url.split('&');
      var name = name || '';
      var nameres;
      // 获取全部参数及其值
      for (var i = 0; i < url.length; i++) {
        var info = url[i].split('=');
        var obj = {};
        obj[info[0]] = decodeURI(info[1]);
        url[i] = obj;
      }
      // 如果传入一个参数名称，就匹配其值
      if (name) {
        for (var i = 0; i < url.length; i++) {
          for (const key in url[i]) {
            if (key == name) {
              nameres = url[i][key];
            }
          }
        }
      } else {
        nameres = url;
      }
      // 返回结果
      // console.log(nameres)
      return nameres;
    },
    // 微信扫码登录
    wxQrCodeLogin (code) {
      let _this = this
      let postData = {
        code: code
      }
      wxQrCodeLogin(postData).then(res => {
        if (res.err === 'success') {
          // console.log("扫码登录用户信息：", res)
          //数据放入缓存
          // sessionStorage.setItem("openid", res.user.openid); //openid
          // sessionStorage.setItem("headimgurl", res.user.headimgurl); //头像
          // sessionStorage.setItem("nickname", res.user.nickname); //昵称
          // sessionStorage.setItem("sex", res.user.sex); //普通用户性别，1为男性，2为女性
          // sessionStorage.setItem("unionid", res.user.unionid) // 微信的unionid
          sessionStorage.setItem("user", JSON.stringify(res.bean))
          sessionStorage.setItem("token", res.token)
          this.$refs.head.loginStatus(true);
        } else {
          this.$refs.head.loginStatus(false);
          this.$message.error(res.err);
          // sessionStorage.setItem("openid", "");
          // sessionStorage.setItem("unionid", "");
        }
      })
    },
    // 获取参数表
    selSetting () {
      var url = config.apiUrl;
      var cs = {
        t: new Date(),
      }
      selSetting(cs).then(res => {
        this.wechat = res.c_onenum
        this.wxCode = url + res.c_coach
      })
    },
    // 我的课程
    contact1 () {
      // this.$emit('FunLogin', "4")
      if (!sessionStorage.getItem('user') || sessionStorage.getItem('user') == '') {
        this.$refs.head.login("2");
      } else {
        this.$router.push({ path: '/myStudy', query: "" });
      }
    },
    contact2 () {
      this.dialogVisible = true
    },
    contact3 () {
      // this.$router.push({ path: '/course', query: "" });
      if (!sessionStorage.getItem('user') || sessionStorage.getItem('user') == '') {
        this.$refs.head.login("2");
      } else {
        this.$router.push({ path: '/myStudy', query: "" });
      }
    },
    contact4 () {
      this.$router.push({ path: '/publicClassList', query: "" });
    },
    courseDetail (id) {
      this.$router.push({ path: '/courseDetail', query: { p_n_id: id } });
    },
    FunMore () {

      this.$router.push({ path: '/course', query: "" });

    },
    tobanner (x) {
      // console.log(x);
      if (x.c_type == '0') {
        this.$router.push({ path: '/code', query: { p_n_id: x.p_n_id } });
      } else if (x.c_type == '1') {
        window.open(x.c_link);
      }
    },
    getBanner () {
      var url = config.apiUrl;
      var cs = {
        t: new Date(),
        c_bantype: "1"
      }
      bannerList(cs).then(res => {
        this.bannerlist = res;
        // console.log(res)
        for (var i = 0; i < this.bannerlist.length; i++) {
          this.bannerlist[i].c_pic = url + this.bannerlist[i].c_pic;
        }
      })
    },
    getCourseList () {
      var url = config.apiUrl;
      var cs = {
        t: new Date(),
        c_excellence: '1',
        c_style: '0',
      }
      getCourseList(cs).then(res => {
        // console.log(res)
        this.courseList = res.list;
        for (var i = 0; i < this.courseList.length; i++) {
          if (this.courseList[i].c_purl != '') {
            this.courseList[i].c_purl = url + this.courseList[i].c_purl;
          }
        }
      })
    },
    FunChange () {
      this.show = false
      this.commentsList()

    },
    // 优质评论
    commentsList () {
      var url = config.apiUrl;
      var cs = {
        t: new Date(),
        index: 4
      }
      commentsList(cs).then(res => {
        this.commitList = res;
        this.show = true
        // for (var i = 0; i < this.commitList.length; i++) {
        //   if (this.commitList[i].c_wx_tx != '') {
        //     this.commitList[i].c_wx_tx = url + this.commitList[i].c_wx_tx;
        //   }
        // }
      })
    },
  },
};
</script>
<style>
@import "../common/css/common.css";
.el-carousel__item h3 {
  /* color: #475669; */
  font-size: 18px;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffff !important;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffff !important;
}
.el-card__body {
  padding: 0px;
}
.c_u_face {
  width: 64.6px;
  margin-right: 10px;
}
.c_u_faceIcon {
  width: 64.6px;
  height: 64.6px;
  border-radius: 50%;
  border: #f18817ff solid 1px;
}
</style>
