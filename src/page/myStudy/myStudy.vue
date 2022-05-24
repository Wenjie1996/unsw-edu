<template>
  <div class="bcf1" @contextmenu.prevent="menuPlayer()">
    <headmenu ref="head" :index="5"></headmenu>
    <div class="vih" style="line-height: 60px;height: 60px;"></div>
    <div class="mystudy_out">
      <el-row :gutter="20">
        <el-col :span="5">
          <!--页面左边S-->
          <div class="mystudy_left">
            <div class="mystudy_user">
              <div style="padding-top:59px">
                <el-avatar class="userface" :src="user.c_wx_tx"></el-avatar>
              </div>
              <div class="ms_u_name">{{user.c_name}}</div>
              <div class="ms_u_i">积分：{{user.n_integral}}</div>
              <div class="ms_u_i">余额：{{user.n_balance}}</div>
            </div>
            <div class="mystudy_tab">
              <div v-for="(v, i) in tabList" :key="i">
                <div class="mystudy_tab_item cur" :class="tabsActive==v.active?'mystudy_tab_item_active':''" @click="change(v.active)" v-if="(v.type ==0 &&  user.c_type == 1) || (v.type ==0 &&  user.c_type == 2)">
                  <img :src="v.src" style="width:17px;height:14px" /> {{v.title}}
                </div>

                <div class="mystudy_tab_item cur" :class="tabsActive==v.active?'mystudy_tab_item_active':''" @click="change(v.active)" v-if="v.type == user.c_type">
                  <img :src="v.src" style="width:17px;height:14px" /> {{v.title}}
                </div>
              </div>

            </div>
          </div>
        </el-col>
        <!--页面左边E-->

        <!--页面右边S-->
        <el-col :span="19" v-show="tabsActive==1">
          <div class="mystudy_right">
            <div class="study_centre">
              <!--面包屑导航栏组件-->
              <breadcrumb v-bind:text='text' v-bind:name='courseName' ref="sonBreadcrumb" @back="getSonData"></breadcrumb>

              <div v-if="courseList.length==0" class="mystudy_r_content">暂无购买的课程</div>
              <div v-loading="loading" v-if="!ifClickDetail">
                <div class="mystudy_r_content cur" v-for="(i, index) in courseList" :key="index" @click="gotoDetail(i.n_courseid,i.c_name,i.c_state)">
                  <el-image :src="i.c_purl" class="fll" style="width:138.2px;height:92px;border-radius: 6px;"> </el-image>
                  <div class="mystudy_r_cname fll">
                    <span>{{i.c_name}}</span>
                    <span class="mystudy_r_label_g" v-if="i.ifBegin==2">已开始</span>
                    <span class="mystudy_r_label_g" v-if="i.ifBegin==0" style="color: #AD0C18;border:#AD0C18 solid 1px">未开始</span>
                    <span class="mystudy_r_label_g" v-if="i.ifBegin==1" style="color:#797373;border:#797373 solid 1px">已结束</span>
                    <div class="mystudy_r_t">{{i.teacher}}</div>
                    <div class="mystudy_r_time">{{i.time}}</div>
                  </div>
                  <div style="clear:both"></div>
                </div>
              </div>
            </div>
            <!--分页-->
            <div class="block ms_page" v-if="count>0 && !ifClickDetail">
              <el-pagination layout="prev, pager, next" :total="count" :page-size="pagesize" @current-change="handleCurrentChange"> </el-pagination>
            </div>
            <!--详情页-->
            <div class="myStudy_detail_out" v-if="ifClickDetail">
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="购买章节" name="1">
                  <div v-for="(v,i) in chapter" :key="i">
                    <div class="mystudy_item">
                      <h3>{{i+1}}. {{v.c_name}}</h3>
                      <!-- <div class="cur line-limit-length fll" title="观看直播/回放" @click="openIframe(v.c_gkurl, v.sid)" style="display: inline-block;"> -->
                      <div class="cur line-limit-length fll" title="观看直播/回放" @click="openIframe(v.live_url, v.sid,v.cid)" style="display: inline-block;">
                        <i class="el-icon-video-camera fll" style="margin-right:10px;font-size:25px;"></i>
                        <h1 v-html="v.c_text==null?'课程回看'+ '':'课程回看:'+ v.c_text" class="line-limit-length" style="font-size:18px;font-weight: inherit;float:left;width:75%"></h1>
                        <span>
                          <el-link type="info" title="打开教室" class="commentLink openclass" :underline="false" icon="el-icon-position" @click.stop="openClass(v.ccid,v.csid,v.live_url,v.sid,v.cid)">打开教室</el-link>
                          <el-link type="info" title="评论" class="commentLink" :underline="false" @click.stop="changeCommentShows(v.c_name, v.sid)" icon="el-icon-edit">评价课程</el-link>
                        </span>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <!--课程课件-->
                <el-tab-pane label="课程课件" name="2">
                  <span v-if="fileList.length >0" class="title">课程课件</span>
                  <div v-if="chapter.length >0"><span>大黄蜂加密课程安装包</span></div>
                  <div v-if="chapter.length >0">
                    <el-link type="primary" href="https://cpuedu.oss-cn-beijing.aliyuncs.com/DHFPlayer_v6.0.1.exe">下载Win播放器</el-link><br>
                    <el-link type="primary" href="https://cpuedu.oss-cn-beijing.aliyuncs.com/DHF_Player_Mac_5.1.3.zip">下载Mac播放器</el-link>
                  </div>
                  <div v-for="(v, i) in fileList" :key="i" style="height:50px;margin-top:20px">
                    <!--图标组件-->
                    <fileTypeIcon v-bind:c_type="v.c_type" style="width:50px;height:50px" class="fll"></fileTypeIcon>
                    <el-link :underline="false" style="line-height:50px;margin-left:10px;" class="fll myStudy_courseWare" @click="downLoad(v.c_url, v.c_type)">{{v.c_name}} </el-link>
                    <div v-if="fileList.length==0" class="courseware_txt">暂无课件</div>
                  </div>
                  <br>
                  <!--章节课件-->
                  <span v-if="chapter.length >0" class="title">章节课件</span>
                  <div v-for="(i) in chapter" :key="i.sid" style="margin-top:20px">
                    <span> {{i.c_name}}</span>
                    <div v-if="i.file.length ==0 " class="courseware_txt">暂无课件</div>
                    <div v-for="(v, v_index) in i.file" :key="v_index" style="height:50px;margin-top:20px;">
                      <!--图标组件-->
                      <fileTypeIcon v-bind:c_type="v.c_type" style="width:50px;height:50px;display:inline-block"> </fileTypeIcon>
                      <el-link :underline="false" style="margin-left:10px;margin-bottom:35px" class=" myStudy_courseWare" @click="downLoad(v.c_url, v.c_type)">{{v.c_name}} </el-link>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

        </el-col>
        <!--老师课程组件-->
        <teacherCourse v-show="tabsActive==2 && queryMsg==1" v-bind:user="user"></teacherCourse>

        <!--基本资料组件-->
        <myStudyBasics v-show="tabsActive==3"></myStudyBasics>

        <!--我的订单组件-->
        <myOrder v-show="tabsActive==4" v-bind:uid='user.p_n_id'></myOrder>
        <!-- 我的收入 -->
        <myIncome v-show="tabsActive==5"></myIncome>
        <!-- 我的工作安排 -->
        <myWork v-show="tabsActive==6"></myWork>
        <!--我的钱包组件-->
        <myWallet v-show="tabsActive==7"></myWallet>
        <!--页面右边E-->
      </el-row>

    </div>
    <!--iframe直播画面-->
    <div style="margin:0 auto;width:80%;position:relative" v-show="ifOpenIframe" id="iframeOut">
      <div class="CPUIcon" id="CPUIcon"></div> <i class="el-icon-close CPUIcon_i cur" @click="closeIframe"></i>
      <iframe :src="iframeUrl" width="100%" height="750px" scrolling="no" allowfullscreen='true' frameborder="0" id="iframe" ref="iframe">
      </iframe>
    </div>
    <!--视频播放组件-->
    <div v-show="playerIfShow" style="position:relative">
      <!-- <div class="userIcon" id="userIcon">{{this.userMessageIcon}}</div> -->
      <i class="el-icon-close cur playerIcon" @click="closePalyer"></i>
      <player style="width:80%;margin:0 auto" ref="palyerRef" v-bind:userName="userMessageIcon"></player>
    </div>

    <br>
    <!--评论框-->
    <el-dialog title="评价课程" :visible.sync="commentShow" width="40%" class="comment_Out">
      <div class="commentCourseName" style="">{{courseName}} - {{sonName}}</div>
      <comment style="width:95%;margin:0 auto;" v-bind:courseSonId="courseSonId" v-bind:courseId="courseId" @func="closeComment" ref="child"></comment>
    </el-dialog>

    <foote style="margin-top:20px"></foote>
  </div>
</template>
<script>
import { ourCourse, myStudyDetail, courseHistory, ifBuyChapter, myMessage, getLoginLinked } from '../../api/course.js'
import config from '../../../config/config.js'
import cap from '@/common/img/course/cap.png'
import headmenu from '@/components/headmenu'
import foote from '@/components/foote'
import teacherCourse from '@/page/myStudy/teacherCourse'
import fileTypeIcon from '@/components/fileTypeIcon'
import comment from '@/components/comment'
import breadcrumb from '@/components/breadcrumb'
import MyStudyBasics from '@/page/myStudy/MyStudyBasics'
import myOrder from '@/page/myStudy/myOrder'
import MyWallet from '@/page/myStudy/MyWallet'
import MyWork from '@/page/myStudy/myWork'
import myIncome from '@/page/myStudy/myIncome'
import Player from '@/page/myStudy/Player'

// import wateMark from '../common/js/watermark'
var URL = config.apiUrl
export default {
  data () {
    return {
      courseList: '', // 课程列表
      curpage: 1,
      pagesize: 4,
      count: 0,
      user: '', // 用户信息
      cap: cap, // 学士帽图标
      loading: true, // 加载动画
      ifClickDetail: false, // 是否进入详情页
      courseName: '', // 点击的课程名
      sonName: '', // 点击的章节名
      activeName: '1',
      courseId: '',  // 课程id
      courseSonId: '', // 章节id
      fileList: [], // 课件列表
      chapter: [], // 章节列表
      tabsActive: 1,
      ifOpenIframe: false, // 是否打开iframe窗口
      iframeUrl: '', // iframe地址
      tabList: [
        { title: '学习中心', active: 1, src: cap, type: 0 },
        { title: '课程课表', active: 2, src: cap, type: 1 },
        { title: '基本资料', active: 3, src: cap, type: 0 },
        { title: '我的订单', active: 4, src: cap, type: 0 },
        { title: '我的收入', active: 5, src: cap, type: 1 },
        { title: '工作安排', active: 6, src: cap, type: 2 },
        { title: '我的钱包', active: 7, src: cap, type: 0 },
      ],
      disX: 5,  // 水平方向
      disY: 5, // 垂直方向
      x: 0,  // 偏移大小
      y: 0,  // 偏移大小
      time: '', // 定时器
      text: '学习中心',
      playerIfShow: false, // 播放器是否开启
      playerUrl: '', // 视频播放地址
      commentShow: false,
      userMessageIcon: '',
      queryMsg: 0
    }
  },
  components: {
    headmenu,
    foote,
    teacherCourse,
    fileTypeIcon,
    comment,
    MyStudyBasics,
    myOrder,
    breadcrumb,
    MyWallet,
    MyWork,
    myIncome,
    Player
  },
  created () {
    // 获取用户信息
    this.user = JSON.parse(sessionStorage.getItem("user"))
    if (this.user == null) {
      this.$message({
        message: '您还未登录！',
        type: 'error'
      })
      top.location.href = "https://www.cpu-edu.com"
    }
    // 所购买的课程
    this.queryCourse()
    this.queryMessage()
    // this.hh()
  },
  methods: {
    // 点击昨天tab页切换内容
    change (index) {
      this.tabsActive = index
    },
    handleCurrentChange (currentPage) {
      this.curpage = currentPage
      this.queryCourse()
    },
    // 翻页方法
    queryCourse () {
      this.loading = true
      var map = {
        p_n_id: this.user.p_n_id,
        curpage: this.curpage,
        pagesize: this.pagesize
      }
      ourCourse(map).then(res => {
        for (var i = 0; i < res.list.length; i++) {
          res.list[i].c_purl = URL + res.list[i].c_purl
        }
        this.courseList = res.list
        this.count = res.count
        this.loading = false

      })
    },
    // 查询具体的章节与课件
    gotoDetail (courseId, courseName, state) {
      if (state != 0) {
        this.$message({
          message: "课程暂未开放",
          type: 'error'
        })
        return false
      }
      this.courseName = courseName
      this.courseId = courseId
      this.ifClickDetail = true
      // 向面包屑导航栏组件传递数据
      this.$refs.sonBreadcrumb.getData(true)
      // 查询的方法
      let postData = {
        sid: this.courseId, // 课程id
        id: this.user.p_n_id, // 用户id
      }
      myStudyDetail(postData).then(res => {
        this.chapter = []
        this.fileList = []
        // 购买的章节
        for (var i in res.fileList) {
          if (res.fileList[i].ifBuy == 1) {
            this.chapter.push(res.fileList[i])
          }
        }
        // 课程课件
        this.fileList = res.courseFile
      })
    },
    // 返回课程列表
    getSonData (msg) {
      this.ifClickDetail = msg
    },
    // 课件下载
    downLoad (fileUrl, type) {
      /* if (type != 0) {
        window.open(URL + fileUrl, "_blank")
      } else {
        // 如果课件类型是视频，只进行观看不进行下载
        this.playerUrl = URL + fileUrl
        this.$refs.palyerRef.getData(this.playerUrl)
        this.playerIfShow = true
        setTimeout(() => {
          var height = document.body.clientHeight
          window.scrollTo(0, height / 2.5)
        }, 500);

      } */
      if(type != 0){
        window.open(URL + fileUrl, "_blank")
      }else{
        // window.open(URL + fileUrl, "_self")
        // 如果课件类型是视频，只进行观看不进行下载
        this.playerUrl = URL + fileUrl
        this.$refs.palyerRef.getData(this.playerUrl)
        this.playerIfShow = true
        setTimeout(() => {
          var height = document.body.clientHeight
          window.scrollTo(0, height / 2.5)
        }, 500);
      }
    },
    // 关闭视频窗口
    closePalyer () {
      this.playerIfShow = false
      this.$refs.palyerRef.getData('close')
    },
    // 打开iframe窗口
    openIframe (url, sid, cid) {
      // var div = document.getElementById("CPUIcon")
      // clearInterval(this.time) // 打开前先清掉之前的定时器 否则可能会越来越快
      this.courseSonId = sid
      if (this.csIfBuyChapter() == 0) { // 确保用户已经购买了该章节
        this.$message({
          message: '尚未购买本章节',
          type: 'error'
        })
        return false
      }
      if (url != null && url != '') {
        this.$refs.iframe.src = url
        // this.iframeUrl = url
        this.ifOpenIframe = true
        this.history(sid, cid);

        // 根据iframe长度设置高度
        document.getElementById("iframe").style.height = (window.innerWidth) * 0.8 * 0.5 + 'px'
        setTimeout(() => {
          var height = document.body.clientHeight
          window.scrollTo(0, height / 2.3)
        }, 500);
      } else {
        this.$message({
          message: '老师暂未开播',
          type: 'error'
        })
      }

    },
    history (sid, cid) {
      let data = {
        n_course_sonid: sid, // 课程章节id
        n_uid: this.user.p_n_id,
        n_courseid: cid
      }
      // 新增历史记录
      courseHistory(data).then(res => {
      })
    },
    // 水印浮动
    // wateMakr () {
    // var div = document.getElementById("CPUIcon")
    // var maxW = (window.innerWidth) * 0.725
    // if (this.x >= maxW) this.disX *= -1;
    // if (this.y >= (window.innerWidth) * 0.725 * 0.5) this.disY *= -1;
    // if (this.x < 0) this.disX *= -1;
    // if (this.y < 0) this.disY *= -1;
    // this.x += this.disX
    // this.y += this.disY
    // div.style.left = this.x + 'px'
    // div.style.top = this.y + 'px'
    // div.style.left = '80px'
    // div.style.top = '160px'

    // },
    // 关闭Iframe窗口
    closeIframe () {
      this.ifOpenIframe = false
      // clearInterval(this.time)
    },
    csIfBuyChapter () {
      var data = {
        n_uid: this.user.p_n_id,
        n_course_sonid: this.courseSonId
      }
      ifBuyChapter(data).then(() => {
      })
    },

    // 用户基本信息 
    queryMessage () {
      var data = {
        id: this.user.p_n_id
      }
      myMessage(data).then(res => {
        this.user = res.message
        var tel = this.user.c_tel == null ? "" : this.user.c_tel
        var nick = this.user.c_wx_nick == null ? "" : this.user.c_wx_nick
        this.userMessageIcon = nick + tel
        this.queryMsg = 1
      })
    },
    // 打开评论弹窗
    changeCommentShows (name, sid) {
      this.sonName = name
      this.courseSonId = sid
      this.commentShow = true
      setTimeout(() => {
        this.$refs.child.clearRate()
      }, 100);

    },
    closeComment () {
      this.commentShow = false
    },
    // 判断是否打开了控制台
    // hh () {
    //   var threshold = 100;
    //   if (window.outerWidth - window.innerWidth > threshold ||
    //     window.outerHeight - window.innerHeight > threshold) {
    //     document.body.innerHTML = '';
    //     window.open("", "_self").close()
    //     window.open(window.location.href)
    //   }
    // },
    menuPlayer () {

    },
    openClass (ccid, csid, url, sid, cid) {
      if (ccid == null || ccid == '') {
        this.$message({
          message: '该课程暂未创建classin课程',
          type: 'error'
        })
        return false
      }
      if (url == null || url == '') {
        this.$message({
          message: '老师暂未开播',
          type: 'error'
        })
        return false
      }
      let data = {
        uid: this.user.classinuid,
        courseId: ccid,  // 课程id
        classId: csid  // 课节id
      }

      getLoginLinked(data).then(res => {
        this.$message({
          message: res.error_info.error
        })
        if (res.error_info.errno == 102 || res.error_info.errno == 145 || res.error_info.errno == 400) {
          return false
        }
        this.history(sid, cid);
        window.open("https://www.eeo.cn/client/invoke/index.html?" + res.data.split('?')[1])
      })
    }

  }

}
</script>

<style>
@import "../../common/css/common.css";
</style>

<style scoped>
div {
  font-family: Microsoft YaHei;
}
.mystudy_out {
  width: 80%;
  margin: 0 auto;
  padding-top: 57px;
  padding-bottom: 64px;
  height: 642px;
}

.mystudy_left {
  float: left;
  width: 100%;
}

.mystudy_user {
  height: 282px;
  background: url("../../common/img/course/bg.png") no-repeat;
  background-size: cover;
  min-width: 219px;
  text-align: center;
  margin-bottom: 17px;
}
.mystudy_tab {
  height: 333px;
  background: #fff;
  min-width: 219px;
  overflow: hidden;
  padding-top: 10px;
}
.userface {
  width: 80px;
  height: 80px;
  font-size: 66px;
  border: #ffff solid 1px;
}
.ms_u_name {
  font-size: 16px;
  margin-top: 23px;
}
.ms_u_i {
  color: #908e8eff;
  font-size: 14px;
  margin-top: 15px;
}
.mystudy_tab_item {
  height: 47px;
  color: #e6984dff;
  font-size: 16px;
  padding-left: 51px;
  line-height: 47px;
}
.mystudy_tab_item_active {
  padding-left: 48px;
  background: #fdf8f4;
  border-left: #e6984dff solid 3px;
}

/**右边 */

.mystudy_r_content {
  margin-left: 24px;
  margin-top: 21px;
  border-bottom: #f1f1f1 solid 1px;
  padding-bottom: 17px;
  margin-right: 24px;
}
.mystudy_r_cname {
  font-size: 18px;
  margin-left: 12px;
}
.mystudy_r_label_g {
  width: 36px;
  height: 13px;
  color: #0cad1b;
  border: 1px solid #0cad1b;
  font-size: 12px;
  margin-left: 11px;
  border-radius: 2px;
  padding: 0px 2px;
}
.mystudy_r_t {
  font-size: 16px;
  color: #777474;
  margin-top: 13px;
  font-size: 16px;
}
.mystudy_r_time {
  font-size: 16px;
  float: right;
  color: #777474;
  position: absolute;
  right: 36px;
}
.courseware_txt {
  color: #949393;
  margin-top: 20px;
}
.title {
  font-weight: bold;
  font-size: 18px;
}
/*分页 */
.ms_page {
  margin-top: 10px;
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
.mystudy_r_top >>> .el-breadcrumb {
  font-size: 15px;
  line-height: 22px;
}
.mystudy_r_top >>> .el-breadcrumb__inner {
  color: black;
}
.mystudy_r_top >>> .el-breadcrumb__separator {
  color: black;
}
.myStudy_detail_out {
  margin: 0 30px;
}
.myStudy_detail_out >>> .el-tabs__item.is-active {
  color: #e6984d;
}
.myStudy_detail_out >>> .el-tabs__item:hover {
  color: #e6984d;
}

.mystudy_item {
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.mystudy_item div {
  background-color: #fdf9f6;
  line-height: 50px;
  padding-left: 30px;
  margin-right: 20px;
  width: 95%;
}
.mystudy_item div:hover {
  text-decoration: underline;
}
.mystudy_item div i {
  position: relative;
  top: 25px;
}
.myStudy_detail_out >>> .el-tabs__content {
  position: relative;
  overflow-y: scroll;
  max-height: 500px;
}
.myStudy_detail_out >>> .el-tabs__content::-webkit-scrollbar {
  width: 4px;
}

.myStudy_detail_out >>> .el-tabs__content::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
.myStudy_detail_out >>> .el-tabs__content::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 53%, 0.4);
}

.myStudy_detail_out >>> .el-tabs__content::-webkit-scrollbar-track {
  background: hsla(0, 0%, 53%, 0.1);
}
.bold {
  font-weight: bold;
}
.comment_Out >>> .el-dialog__body {
  padding-top: 10px;
}
.comment_Out >>> .el-icon-close:hover {
  color: #e6984d;
}
</style>

<style >
/**右边的样式 */
.mystudy_tab,
.mystudy_user,
.mystudy_right {
  border-radius: 6px;
}
.mystudy_right {
  background: rgb(255, 255, 255);
  height: 642px;
  overflow: hidden;
}
.mystudy_r_top {
  margin-left: 30px;
  margin-top: 28px;
  border-left: #e6984d solid 3px;
  padding-left: 16px;
  margin-bottom: 17px;
  height: 22px;
}
.myStudy_courseWare :hover {
  color: #e6984d;
}
.CPUIcon {
  position: absolute;
  background: url("../../common/img/LOGO.png") no-repeat;
  width: 144px;
  height: 64px;
  opacity: 0.5;
  top: 20px;
}
.userIcon {
  position: absolute;
  width: 100%;
  height: 64px;
  opacity: 0.5;
  top: 40px;
  left: 13%;
  z-index: 4;
  color: #e6984d;
  font-size: 20px;
}
.CPUIcon_i,
.playerIcon {
  color: white;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
}
.playerIcon {
  right: 170px;
  z-index: 9999;
}
.commentLink:hover {
  color: #e6984d !important;
}
.commentLink {
  float: right;
  margin-right: 5px;
  margin-top: 10px;
}
.openclass {
  margin-right: 10px;
}
.commentCourseName {
  width: 95%;
  margin: 0px auto;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: bold;
}
</style>