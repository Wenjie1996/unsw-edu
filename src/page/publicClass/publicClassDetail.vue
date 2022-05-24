<template>
  <div class="bcf1">
    <headmenu ref="head" :index="3"></headmenu>
    <div class="mr15">
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
        <div style="clear:both"></div>
      </div>
      <!--课程详情E-->
      <!--课程介绍-->
      <div class="c_price">
        <el-tabs v-model="activeName" class="c_tabs">
          <el-tab-pane label="课程介绍" name="1" class="c_tab_font">
            <div class="c_tf_c" v-html="courseDetail" v-if="courseDetail.length>0"></div>
            <div class="c_tf_c" v-if="courseDetail.length==0"> 暂无课程介绍</div>
          </el-tab-pane>
        </el-tabs>
        <div class="grid-content bg-purple">
          <el-button type="primary" round class="c_but" style="border-radius: 29px;" @click="watch">立即观看</el-button>
        </div>
      </div>

      <!--iframe直播画面-->
      <div style="width:100%;position:relative;margin-bottom:10px" v-show="ifOpenIframe" id="iframeOut">
        <div class="CPUIcon" id="CPUIcon"></div> <i class="el-icon-close CPUIcon_i cur" @click="closeIframe"></i>
        <iframe width="100%" height="750px" scrolling="no" allowfullscreen='true' frameborder="0" id="iframe" ref="iframe">
        </iframe>
      </div>
    </div>
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import headmenu from '../../components/headmenu'
import foote from '../../components/foote'
import { courseDetail, selectList } from '@/api/course.js'
import config from '../../../config/config.js';
var URL = config.apiUrl;
export default {
  data () {
    return {
      imgUrl: '',
      wechat: '', // 客服微信号
      wxCode: '', // 二维码
      courseBean: '',
      courseDetail: '', // 课程介绍
      teacher: '',
      loading: true,
      faceicon: '',
      time: '',
      dialogVisible: false, // 弹窗
      activeName: '1',
      ifOpenIframe: false, // 是否打开iframe窗口,

    }
  },
  components: {
    headmenu,
    foote
  },
  created () {
    this.courseId = this.$route.query.p_n_id || 0
    this.queryDetail()
    // 客服联系方式
    selectList().then(res => {
      this.wxCode = URL + res.c_custom
      this.wechat = res.c_customnum
    })

  },
  methods: {
    // 课程详情
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
        if (res.c_style == 0) {
          this.$router.push({ path: '/courseDetail', params: { p_n_id: this.courseId } });
        }
        this.courseBean = res
        this.imgUrl = res.c_purl != null && res.c_purl != '' ? URL + res.c_purl : ''
        this.courseDetail = res.c_detailed != null && res.c_detailed != '' ? res.c_detailed : ''
        this.loading = false
      })
    },
    contact () {
      this.dialogVisible = true
    },
    // 立即观看
    watch () {
      if (this.courseBean.live_url == null || this.courseBean.live_url == '') {
        this.$message({
          message: '老师暂未开播',
          type: 'error'
        })
      } else {
        // 直播地址不为空的时候
        // 根据iframe长度设置高度
        document.getElementById("iframe").style.height = (window.innerWidth) * 0.8 * 0.5 + 'px'
        this.$refs.iframe.src = this.courseBean.live_url
        this.ifOpenIframe = true
        setTimeout(() => {
          var height = document.body.clientHeight
          window.scrollTo(0, height / 2.6)
        }, 500);
      }
    },
    // 关闭Iframe窗口
    closeIframe () {
      this.ifOpenIframe = false
    },
  }
}
</script>

<style scoped>
@import "../../common/css/common.css";
.bread {
  padding: 15px 0px 15px 9px;
}
.detail {
  position: relative;
}
.c_price,
.detail {
  background: #ffffff;
  border-radius: 10px;
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
.c_teacher {
  height: 39px;
  line-height: 39px;
  margin-top: 25px;
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
.c_price {
  margin-top: 16px;
  margin-bottom: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
}
.c_price >>> .el-tabs__nav-wrap {
  padding-left: 31px;
}
.c_price >>> .is-active {
  color: #e6984d;
}
.c_price >>> .el-tabs__active-bar {
  background-color: #e6984d;
}
.c_tf_c {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #131212;
  padding-right: 80px;
  line-height: 30px;
  padding-left: 10px;
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
}
.bg-purple {
  margin-left: 80%;
}
.CPUIcon_i {
  color: rgb(190, 190, 190);
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
}
.CPUIcon {
  position: absolute;
  background: url("../../common/img/LOGO.png") no-repeat;
  width: 144px;
  height: 64px;
  opacity: 0.5;
  top: 20px;
}
</style>