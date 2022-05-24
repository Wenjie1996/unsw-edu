<template>
  <div class=" bcf1" v-loading="loading">
    <headmenu ref="head" :index="2"></headmenu>
    <div class="vih" style="line-height: 60px;height: 60px;"></div>
    <!--面包屑导航栏-->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right ">
        <el-breadcrumb-item>课程总览</el-breadcrumb-item>
        <el-breadcrumb-item>课程详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--课程详情S-->
    <div class="detail">
      <div class="course_img">
        <el-image :src="imgUrl" style="width:357px;height:211px">
        </el-image>
      </div>
      <div class="detail_right">
        <div class="course_title">{{courseBean.c_name}}</div>
        <div class="course_type" v-if="courseBean.n_people_virtual != null && courseBean.n_people_virtual!=''">
          <p style="color:#EA0F0F;display:inline-block">{{courseBean.n_people_virtual}}</p>人报名 | {{courseBean.cname}}
        </div>
        <div class="c_teacher" v-if="teacher!=''">主讲导师：&nbsp;
          <el-image :src="faceicon" class="faceIcon"></el-image>&nbsp;&nbsp;{{teacher.c_name}}
        </div>
        <div class="c_time" v-if="time!=null && time!=''">有效期至: {{time}}</div>
        <div class="c_aide"><a href="#" style="color:#E79E56;" @click="contact">联系小助手</a></div>
        <!--弹窗-->
        <el-dialog title="联系小助手" :visible.sync="dialogVisible" width="20%">
          <div style="text-align: center;">
            <span>微信扫一扫添加小助手</span><br>
            <el-image :src="wxCode" style="width:200px;height:200px"></el-image><br>
            <span>微信号：{{wechat}}</span>
            <span slot="footer" class="dialog-footer"></span>
          </div>

        </el-dialog>
      </div>
    </div>
    <!--课程详情E-->

    <!--课程价格S-->
    <div class="c_price">
      <el-row>
        <el-col :span="16">

          <div class="price">A${{courseMoney==null || courseMoney==''?0:courseMoney}}</div>
          <div class="c_number">时长：{{courseBean.c_duration ==null || courseBean.c_duration==''?0:courseBean.c_duration}}小时 &nbsp; &nbsp;
            学习人数： {{courseBean.n_people_virtual==null || courseBean.n_people_virtual==''?0:courseBean.n_people_virtual}}人 &nbsp; &nbsp;
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="primary" round class="c_but" style="border-radius: 29px;" @click="signUp">立即报名</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--课程价格E-->

    <!--课程介绍S-->
    <!--课程详情-->
    <div class="c_detail">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="c_tabs">
        <el-tab-pane label="课程介绍" name="1" class="c_tab_font">
          <div class="c_tf_c" v-html="courseDetail" v-if="courseDetail.length>0"></div>
          <div class="c_tf_c" v-if="courseDetail.length==0"> 暂无课程介绍</div>
        </el-tab-pane>
        <!--课程章节-->
        <el-tab-pane label="购买章节" name="2" class="c_tab_font">
          <!-- <el-checkbox-group v-model="checkList" class="check_out" >
        <el-checkbox  class="fll" :disabled="i.ifBuy==1" :checked="i.ifBuy==1"   v-for="i in chapter" :key="i.p_n_id" @change="check_c(i.p_n_id)">
         <div class="check_c fll">
                <div class="check_title">{{i.c_name}}</div>
                <div class="check_content" v-html="i.c_text"></div>
                <div class="check_c_money">￥{{i.n_money}}</div>
          </div>
        </el-checkbox>
        <div style="clear:both"></div>
        </el-checkbox-group> -->
          <div v-if="chapter.length==0" style="margin-bottom:29px">
            暂无章节
          </div>
          <el-checkbox-group v-model="checked" @change="getValue()" class="check_out ">
            <el-checkbox class="fll w100 check_style" v-for="(i, index) in chapter" :key="index" :label="i.sid" :disabled="i.ifBuy >0 || i.ifHave > 0 || allCourse">
              <div class="check_c fll">
                <div class="check_title" style="color:black">{{i.c_name}} <span v-if="i.ifBuy>0 || i.ifHave > 0 || allCourse" class="ifBuy">{{i.ifBuy>0?'已购买': (i.ifHave > 0 || allCourse)?'待审核':''}}</span></div>
                <div class="check_content" v-html="i.c_text"></div>

                <div class="check_c_money">A${{i.n_pre_price}}</div>
              </div>
            </el-checkbox>
            <div style="clear:both"></div>
          </el-checkbox-group>

          <!--课程评论-->
        </el-tab-pane>
        <el-tab-pane label="课程评论" name="3" class="c_tab_font">
          <div class="c_u_comment_out" v-for="(item, index) in comments" :key="index">
            <div class="c_u_face fll">
              <el-image v-if="item.showName == 0" :src="item.wxPhoto" class="c_u_faceIcon"></el-image>
              <el-image v-if="item.showName == 1" :src="require('../common/img/course/mor.jpg')" class="c_u_faceIcon"></el-image>
            </div>
            <div class="fll" style="margin-left:19px;max-width:85%">
              <div class="c_u_name">{{item.showName == 0 ? '匿名用户' : item.studentName==null || item.studentName==''?'无名':item.studentName}} <el-image v-if="item.qualityStatus==1" :src="require('@/common/img/course/fine.png')" class="fine_comment"></el-image>
              </div>
              <div class="c_u_comment">{{item.comment}}</div>
              <!--五项评分S-->
              <score v-bind:item="item" />
              <!--五项评分E-->
              <div class="c_u_only">
                <div class="c_u_cname fll">{{item.sectionName}}</div>
                <div class="c_u_teacher fll">讲师：{{item.teacherName}}</div>
              </div>
            </div>
            <div style="clear:both"></div>
          </div>
          <!--分页-->
          <div class="block ms_page" v-if="count>0">
            <el-pagination layout="prev, pager, next" :total="count" :page-size="pagesize" @current-change="handleCurrentChange"> </el-pagination>
          </div>
          <div v-if="total==0" style="margin-bottom:29px">
            暂无评论
          </div>
        </el-tab-pane>

        <!--课程课件-->
        <!-- <el-tab-pane label="课程课件" name="4" class="c_tab_font">
        <div v-if="fileList.length ==0 && courseWare.length ==0" style="margin-bottom:29px">暂无课件</div>
        <span v-if="courseWare.length >0">课程课件</span>
        <div v-for="(i, index) in courseWare" :key="index" class="courseware"> 
             <fileTypeIcon v-bind:c_type="i.c_type"></fileTypeIcon>
             <el-link :class='[flag<1?"courseware_link_noBuy":"courseware_link","fll"]' :underline="false" @click="downLoad(i.c_url)" :disabled="flag<1"> {{i.c_name}}</el-link> &nbsp;
             <div style="clear:both"></div>
        </div>
        <br>
          <span v-if="fileList.length >0">章节课件</span>
          <div class="courseware" v-for="(i) in fileList" :key="i.p_n_id">
            <span > {{i.c_name}}</span> 
              <div v-if="i.file.length ==0 " class="courseware_txt">暂无课件</div>
              <div class="courseware_inner" v-for="(file, index) in i.file" :key="index" >
                  <fileTypeIcon v-bind:c_type="file.c_type"></fileTypeIcon>
                  <el-link :underline="false"   :class='[i.ifBuy<1?"courseware_link_noBuy":"courseware_link","fll"]' @click="downLoad(file.c_url)" :disabled="i.ifBuy<1"  >{{file.c_name}}</el-link>
              </div>
          </div>
          
      </el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="vih lh40p">&nbsp;</div>
    <!--课程介绍E-->
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import { courseDetail, commentList, selectList, myStudyDetail, ifBuyAllChapter } from '../api/course.js'
import { courseSonPrice } from '../api/hta'
import config from '../../config/config.js';
import headmenu from '../components/headmenu'
import foote from '../components/foote'
import fileTypeIcon from '../components/fileTypeIcon'
import score from '../components/score.vue'
var URL = config.apiUrl;
export default {
  data () {
    return {
      imgUrl: '',
      faceicon: '',
      time: '2021年02月28日',
      activeName: '1',
      user: '', // 用户
      courseBean: '',
      teacher: '',
      courseDetail: '', // 课程介绍
      chapter: '', // 章节
      checked: [], // 默认选项，要在el-checkbox-group里绑定一个空数组
      comments: '', // 评论
      dialogVisible: false, // 弹窗
      wechat: '', // 客服微信号
      wxCode: '', // 二维码
      page: 1, // 评论当前页
      rows: 4, // 每页条数
      total: '', // 评论数据总数
      fileList: '', // 章节课件

      courseId: '', // 课程id
      courseWare: '', // 课程课件

      flag: '', // 是否购买
      tmp: '1',
      money: 0,
      p_n_id: '',
      ifHave: '', // 已经购买但是未审核
      sumMoney: 0, // 购买过的章节金额总和
      courseMoney: 0, // 课程金额
      loading: true,
      allCourse: false
    }
  },
  components: {
    foote,
    headmenu,
    fileTypeIcon,
    score
  },
  watch: {
    // 'checked': function () {//'goodList'是我要渲染的对象，也就是我要等到它渲染完才能调用函数
    //   var that = this
    //   this.$nextTick(function () {
    //     that.buycoursesno();
    //   });
    // }
  },
  created () {
    // 获取课程id
    this.courseId = this.$route.query.p_n_id || 0
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (this.user != '' && this.user != undefined) {
      this.p_n_id = this.user.p_n_id
    }
    if (this.courseId != null) {
      // 课件
      this.querycourseware()

      // 评论
      this.queryComment()
      // }

      //  this.ifHaveCourse()
    }

    // 客服联系方式
    selectList().then(res => {
      this.wxCode = URL + res.c_custom
      this.wechat = res.c_customnum
    })

  },
  methods: {
    buycoursesno () {
      let postData = {
        p_n_id: this.checked
      };
      courseSonPrice(postData).then(res => {
        this.money = res;
        this.courseMoney = res;
        if (this.checked.length == 0) {
          this.courseMoney = this.courseBean.n_pre_price
          this.money = this.courseMoney
        }
      });

    },
    // 查询课程的章节
    querycourseware () {
      let postData = {
        sid: this.courseId, // 课程id
        id: this.p_n_id, // 用户id
      };
      // 课程章节与课件
      myStudyDetail(postData).then(res => {
        this.fileList = this.chapter = res.fileList
        this.courseWare = res.courseFile
        this.flag = res.flag
        // 计算已经购买的金额总和
        // flag计算用户该课程买了几个章节，如果与该课程章节数量一致说明用户已经全部购买了该课程
        var flag = 0
        for (var i in this.chapter) {
          if (this.chapter[i].ifBuy == 1) {
            flag++
            this.sumMoney = this.sumMoney + this.chapter[i].n_pre_price
          }
        }
        // 拥有部分章节
        if (flag > 0 && flag < this.chapter.length) {
          this.ifHave = 'haveOne'
        }

        // 已经全部购买
        if (flag == this.chapter.length) {
          this.ifHave = 'have'
        }

        // 查找课程详情，只有算出购买金额之后才能去查
        this.queryDetail()
      })
    },
    handleClick (tab, event) {
      if (tab.name === '1') {
        this.tmp = '1'
        this.courseMoney = this.courseBean.n_pre_price
        this.money = this.courseMoney
        this.checked = []
      } else if (tab.name === '2') {
        this.tmp = '2'
      }
    },
    // 立即报名
    signUp () {
      if (this.courseDetail == '') {
        return false
      }

      if (sessionStorage.user == undefined || sessionStorage.user == '') {
        this.$refs.head.login("2");
        return
      }
      var money = 0
      if (this.ifHave == 'have' && this.courseBean.c_style == 0) {
        this.$message({
          message: '您已全课购买该课程',
        });
        return false

      }
      if (this.ifHave == 'haveOne' && this.tmp === '1') {
        this.$message({
          message: '您已购买部分章节，无法全课购买',
        });
        return false

      }
      if (this.tmp === '1') {
        money = this.money
      } else if (this.tmp === '2') {
        // console.log(this.checked.length)
        if (this.checked.length == 0) {
          this.$message({
            message: '请选择购买章节',
          });
          return
        }

        money = this.money
      }
      sessionStorage.setItem("orderType", 2)
      sessionStorage.setItem('pay', JSON.stringify({ n_courseid: this.courseId, n_course_sonid: this.checked, money: this.money }))
      this.$router.push({ name: 'pay' })
    },
    // 选中的章节课程
    getValue () {
      this.buycoursesno();
    },
    // 联系小助手
    contact () {
      this.dialogVisible = true
    },
    // 查询评论方法
    queryComment () {
      var paramsMap = {
        courseId: this.courseId,
        page: this.page,
        rows: this.rows
      }
      commentList(paramsMap).then(res => {
        this.comments = res.items
        this.total = res.total
      })
    },

    // 翻页
    handleCurrentChange (currentPage) {
      this.curpage = currentPage
      this.queryComment()
    },
    // 查询课程详情 
    queryDetail () {
      var paramsMap = {
        p_n_id: this.courseId // 课程id
      }
      courseDetail(paramsMap).then(res => {
        this.time = res.d_end_time != null && res.d_end_time != '' ? res.d_end_time.replace('-', '年').replace('-', '月') + '日' : ''
        if (res.teacher != '' && res.teacher != null) {
          this.teacher = res.teacher[0]
          this.faceicon = this.teacher.c_wx_tx
        }
        if (res.c_style == 1) {
          this.$router.push({ path: '/publicClassDetail', query: { p_n_id: this.courseId } });
        }
        this.courseBean = res
        this.imgUrl = res.c_purl != null && res.c_purl != '' ? URL + res.c_purl : ''
        this.courseDetail = res.c_detailed != null && res.c_detailed != '' ? res.c_detailed : ''
        this.courseMoney = this.courseBean.n_pre_price
        this.money = this.courseMoney
        // 课程总价格减去已经购买的章节总价格
        // if(this.courseBean.n_pre_price - this.sumMoney > 0) {
        //    this.courseMoney =  this.courseBean.n_pre_price - this.sumMoney
        //    this.money =  this.courseMoney
        // } else {
        //   // 价格小于0是算作是0
        //    this.courseMoney =  0
        //    if(this.ifHave == 'have') {
        //      // 如果用户购买了全课，价格变为原价格
        //      this.courseMoney =  this.courseBean.n_pre_price
        //    } 
        //   }
        this.loading = false

      })
    },
    downLoad (fileUrl) {
      window.open(URL + fileUrl, "_blank")
    },
    // 该章节是否能购买
    // ifHaveCourse () {
    //   var data = {
    //     n_courseid: this.courseId,
    //     n_uid: this.user.p_n_id
    //   }
    //     ifBuyAllChapter(data).then(res => {
    //      this.ifHave = res
    //      if(res == 'have') {
    //        this.allCourse = true
    //      }
    //     })
    // }
  }
}
</script>


<style scoped>
@import "../common/css/common.css";
.c_price,
.detail,
.c_detail {
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10px;
}
.bread {
  padding: 15px 0px 15px 9px;
  width: 70%;
  margin: 0 auto;
}
/*课程详情S */
.detail {
  width: 70%;
  height: 269px;
  position: relative;
}
.course_img {
  padding: 29px 0px;
  margin-left: 26px;
  float: left;
}
.detail_right {
  margin-left: 34px;
  float: left;
}
.course_title {
  padding-top: 34px;
  height: 29px;
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #242121;
}
.course_type {
  margin-top: 15px;
  color: #605c5c;
  font-size: 18px;
  font-family: Microsoft YaHei;
}
.c_teacher {
  height: 39px;
  line-height: 39px;
  margin-top: 20px;
}
.faceIcon {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  vertical-align: middle;
}
.c_time {
  margin-top: 18px;
  width: 226px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
}
.c_aide {
  position: absolute;
  right: 1.56%;
  top: 33.09%;
}
/*课程详情E */

/*课程价格S */
.c_price {
  margin-top: 16px;
  width: 70%;
}
.price {
  color: #f77a11;
  margin-left: 2%;
  margin-top: 2.76%;
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: bold;
}
.c_number {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #272625;
  margin-top: 4%;
  margin-left: 2%;
  margin-bottom: 4%;
}
.c_but {
  border: 0px;
  background: linear-gradient(0deg, #00ddfd, #1cf4e3);
  box-shadow: 0px 8px 10px 0px rgba(30, 28, 28, 0.14);
  border-radius: 29px;
  width: 181px;
  height: 57px;
  font-size: 24px;
  text-shadow: 0px 6px 10px rgba(30, 28, 28, 0.41);
  float: right;
  margin-top: 11%;
  margin-right: 30%;
}
/*课程价格E */

/*课程详情 S*/
.c_detail {
  width: 70%;
  margin-top: 16px;
}
.c_tab_font {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #131212;
  padding: 0px 29px;
}
.c_tabs {
  padding-top: 16px;
}

.c_tf_c {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #131212;
  padding-bottom: 50px;
  padding-right: 80px;
  line-height: 30px;
}
.check_style {
  border-bottom: #dfdfdf solid 1px;
  padding-bottom: 29px;
  margin-top: 26px;
}
/*课程详情 E*/

/*课程评论S */
.c_u_comment_out {
  padding-top: 11px;
  padding-left: 5px;
  padding-bottom: 28px;
  margin-right: 22px;
  border-bottom: #f1f1f1 solid 1px;
}
.c_u_faceIcon {
  width: 64.6px;
  height: 64.6px;
  border-radius: 50%;
  border: #f18817ff solid 1px;
}
.c_u_face {
  width: 64.6px;
}
.c_u_name {
  font-family: PingFang SC;
  color: #050505;
  margin-bottom: 8px;
}
.c_u_comment {
  color: #777575;
}
.fine_comment {
  vertical-align: middle;
}
.c_u_cname {
  height: 19px;
  background: linear-gradient(0deg, #f8b43c, #f18817);
  border-radius: 4px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  padding: 0px 5px;
}
.c_u_teacher {
  font-size: 12px;
  color: #acb0b4;
  margin-left: 14px;
}
.check_c {
  margin-left: 22px;
}
.check_out {
  margin-top: 20px;
  border-bottom: #f1f1f1 solid 1px;
}
.check_title,
.c_u_comment,
.c_u_name {
  font-size: 18px;
}
.check_title {
  margin-bottom: 26px;
}
.check_content {
  font-size: 16px;
  color: #8f8e8cff;
  margin-bottom: 18px;
}
.check_c_money {
  color: #f38f0d;
  font-size: 24px;
}
/*课程评论E */
</style>

<style  scoped>
/*课程章节 */
.check_out /deep/ .el-checkbox__inner {
  width: 25px;
  height: 25px;
}
.check_out /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: white;
  border: 1px solid #cccaca;
}
.check_out /deep/ .el-checkbox__inner:hover {
  border: 1px solid #f18817;
}
.check_out /deep/ .el-checkbox__inner::after {
  height: 18px;
  left: 7px;
  width: 7px;
  border-bottom: 2px solid #f18817;
  border-right: 2px solid #f18817;
}
/*课程详情 */
.c_tabs /deep/ .el-tabs__active-bar {
  background-color: #e6984dff;
}
.c_tabs /deep/ .el-tabs__item.is-active {
  color: black;
}
.c_tabs /deep/ .el-tabs__item:hover {
  color: #e6984dff;
  cursor: pointer;
}
.c_tabs /deep/ .el-tabs__nav-wrap {
  padding-left: 31px;
}
.check_out /deep/ .el-checkbox__input {
  float: left;
}
.c_u_only {
  clear: both;
  padding-top: 8px;
}

/*分页 */
.ms_page {
  margin: 10px 0px;
}

.ms_page /deep/ .el-pager li.active {
  color: #e6984d;
}

.ms_page /deep/ .el-pager li:hover {
  color: #e6984d;
}
.ms_page /deep/ .el-pager li {
  color: #414040;
}
.courseware {
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: #f1f1f1 solid 1px;
}
.courseware span {
  font-weight: bold;
}
.courseware_txt {
  cursor: pointer;
}
.courseware_link,
.courseware_txt,
.courseware_link_noBuy {
  font-size: 14px;
  margin-left: 17px;
  line-height: 50px;
  text-decoration: underline;
}
.courseware_link,
.courseware_txt {
  color: #7f7e7e;
}
.courseware_link:hover {
  color: #e6984d;
}
.courseware_link_noBuy:hover {
  color: #c0c4cc;
}
.courseware_inner {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  padding-bottom: 19px;
}
.ifBuy {
  color: #f38f0d;
  font-size: 14px;
  margin-left: 20px;
}
</style>
