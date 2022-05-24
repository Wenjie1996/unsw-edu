<template>
  <div>
    <el-col :span="11">
      <div class="mystudy_right">
        <div class="mystudy_r_top">
          <span class="cur">课程课表</span>
        </div>
        <!--日历-->
        <el-calendar v-model="value" style="height:620px" @click.native="getTime()" class="el_cal_out">
          <template slot="dateCell" slot-scope="{ data}">
            <p style="margin:0px">
              {{ data.day.split('-').slice(2).join() }}<br />
              <!--标记-->
            <div v-for="(i, index) in dayTime" :key="index">
              <div v-if="data.day==i" class="budge"></div>
            </div>
            </p>
          </template>
        </el-calendar>
      </div>
    </el-col>
    <!--老师的课程内容-->
    <el-col :span="8" style="padding:0px">
      <div class="myStudy_course_out">
        <div class="myStudy_course" v-for="(v, index) in dayCourse" :key="index">
          <span class="my_s_c_font line-limit-length" :title="v.cname" v-html="v.c_style==1?'公开课: '+v.cname :v.cname "></span>
          <el-button type="warning" v-if="(v.live_url==null||v.live_url=='') && v.c_style==0" round class="teacher_btn" size="mini" slot="reference" @click="begin_course(v)">开始上课</el-button>
          <el-button type="warning" v-if="(v.curl==null || v.curl=='') && v.c_style==1" round class="teacher_btn" size="mini" slot="reference" @click="begin_course(v)">开始上课</el-button>

          <el-button type="warning" v-if="(v.live_url!=null && v.live_url!='') && v.c_style==0" round class="teacher_btn" size="mini" slot="reference" @click="openClass(v.ccid,v.csid)">打开教室</el-button>
          <el-button type="warning" v-if="(v.curl!=null && v.curl!='')&& v.c_style==1" round class="teacher_btn" size="mini" slot="reference" @click="openClassGK(v.c_ccid,v.c_csid)">打开教室</el-button>
          <!-- <el-button type="warning" round class="teacher_btn" size="mini" slot="reference" @click="begin_course(v)">开始上课</el-button> -->

          <el-button type="warning" round class="teacher_btn upload_btn" size="mini" slot="reference" @click="openUpload(v.sname,v.n_coures_sonid,v.n_course_id,v.cname)">上传课件</el-button>
          <p class="line-limit-length;" v-if="v.c_style==0">章节名称: &nbsp;{{v.sname}}</p>
          <div v-if="v.meet_uid!=null && v.meet_uid!=''">
            <p>上课时间: &nbsp;{{v.detailTime}}</p>
            <p style="max-width:90%;" class="line-limit-length">授课地址: &nbsp; <el-link :href=" v.c_url" target="_blank" class="c_link" :underline="false">{{v.c_url}}</el-link>
            </p>
            <p>登录账号：&nbsp;{{v.utel}} &nbsp;&nbsp;&nbsp; 登录密码：{{v.upass}}</p>
          </div>
        </div>
        <div v-if="dayCourse.length==0" class="noCourse">该天暂无课程！</div>
      </div>
    </el-col>

    <!--上传课件组件-->
    <teacherCourse v-show="upload_teacher" ref="uploadRef">
    </teacherCourse>
  </div>
</template>

<script>
import { teacher_Course, courseByMouth, createHy, addCourseClass, addCourseClassGK, getLoginLinked, teacherOrder } from '../../api/course.js'
import teacherCourse from '../../components/uploadCourse'
export default {
  props: ['user'],
  data () {
    return {
      value: new Date(),
      dayTime: [],
      clickDayTime: '', // 格式化后的时间，用于按时间查找课程
      uid: '', // 用户id
      uName: '', // 用户名
      uFace: '', // 用户头像
      dayCourse: '', // 当天的课程
      upload_teacher: false,
      beginFlag: 0 // 是否点击了开始上课 只能点击一次
    }
  },
  methods: {
    getTime () {
      let mm = new Date(this.value).getMonth() + 1
      let yy = new Date(this.value).getFullYear()
      let dd = new Date(this.value).getDate()
      // 月份与天如果小于10要在前面加上0
      mm = mm < 10 ? '0' + mm : mm
      dd = dd < 10 ? '0' + dd : dd
      // 年-月-日
      this.clickDayTime = yy + '-' + mm + '-' + dd
      this.queryTeacherCourse()
    },
    // 按天查找上课课程
    queryTeacherCourse () {
      let data = {
        uid: this.uid,
        day: this.clickDayTime
      }
      teacher_Course(data).then(res => {
        this.dayCourse = res
      })
    },
    // 按月查询
    courseByMouth () {
      let data = {
        uid: this.uid,
      }
      courseByMouth(data).then(res => {
        this.dayTime = res
      })
    },
    // 开始上课
    begin_course (v) {
      if (v.c_ccid == null || v.c_ccid == '') {
        this.$message({
          message: '该课程暂未创建classin课程',
          type: 'error'
        })
        return false
      }
      if (this.user.classinuid == null || this.user.classinuid == '') {
        this.$message({
          message: '该老师暂未创建classin账号',
          type: 'error'
        })
        return false
      }
      let data = {
        className: v.sname, // 章节名
        courseId: v.c_ccid,  // classinId
        p_n_id: v.n_coures_sonid,  // 章节id
        teacherUid: this.user.classinuid, // 老师id
        classin_courseid: v.c_ccid, // classin课节id
        courseName: v.cname, //课程名
        tid: this.user.p_n_id,
        cid: v.n_courseid, //课程id
        c_duration: v.c_duration // 授课时长
      }
      if (v.c_style == 0 && this.beginFlag == 0) {
        // // 普通课程
        this.$confirm('是否开始上课?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.beginFlag = 1
          //点击确定的操作(调用接口)
          addCourseClass(data).then(res => {
            this.queryTeacherCourse()
            if (res.error_info.errno == 1 || res.error_info.errno == 100) {
              // 开课成功以后教师自动购买自己的课程
              let order = {
                n_courseid: v.n_courseid,
                c_course_son: v.n_coures_sonid,
                userc_name: this.user.p_n_id,
                c_pay_state: 1,
                c_typr: 6,
                c_order_type: 2
              }
              // 添加管理员114订单
              let order1 = {
                n_courseid: v.n_courseid,
                c_course_son: v.n_coures_sonid,
                userc_name: 114,
                c_pay_state: 1,
                c_typr: 6,
                c_order_type: 2
              }
              teacherOrder(order).then(res => {
                if (res.err == 'success') {
                  teacherOrder(order1).then(res => {
                    if (res.err == 'success') {
                      this.beginFlag = 0
                    }
                  })

                }
              })

            }
            this.runCode(res.error_info.errno)

          }).catch((err) => {
            this.$message({
              message: '系统错误',
              type: 'error'
            })
          })
        }).catch(() => {
          //取消的提示
        })
      } else if (v.c_style == 1) {
        data.p_n_id = v.n_courseid
        // 公开课
        this.$confirm('是否开始上课?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //点击确定的操作(调用接口)
          addCourseClassGK(data).then(res => {
            this.queryTeacherCourse()
            runCode(res.error_info.errno)
          }).catch((err) => {
            this.$message({
              message: '系统错误',
              type: 'error'
            })
          })
        }).catch(() => {
          //取消的提示
        })
      } else {
        this.$message({
          message: '开始上课...',
          type: 'success'
        })
      }
      // let data = {
      //   title: v.sname,
      //   zid: v.n_coures_sonid,
      //   useid: this.uid,
      //   usename: this.uName,
      //   usetx: this.uFace,
      // }
      // this.$confirm('是否开始上课?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   //点击确定的操作(调用接口)
      //   createHy(data).then(res => {
      //     if (res.err == 0) {
      //       // 有主持人账号，重新加载数据
      //       this.queryTeacherCourse()
      //       this.$message({ message: '开课成功！', type: 'success' })
      //     } else {
      //       // 没有主持人账号的时候
      //       this.$message(res.errmsg)
      //     }
      //   }).catch((err) => {
      //     this.$message({
      //       message: '系统错误',
      //       type: 'error'
      //     })
      //   })
      // }).catch(() => {
      //   //取消的提示
      // })

    },
    openUpload (name, sid, cid, cname) {
      /* 
      vue经过this.$refs引用子组件出现undefined或者is not a function的错误
      包含子组件的标签须要放在<template></template>中第一个子标签的子标签中，并且须要设置ref属性，经过该属性调用子组件的方法或者属性
      this.$refs.uploadRef.getData() //子组件有getData方法，调用方式`.方法名()`
       */
      this.$refs.uploadRef.getData(true, name || cname, sid, cid)
      this.upload_teacher = true
    },
    openClass (ccid, csid) {
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
        // window.open(res.data)
        window.open("https://www.eeo.cn/client/invoke/index.html?" + res.data.split('?')[1])
      })
    },
    openClassGK (ccid, csid) {
      let data = {
        uid: this.user.classinuid,
        courseId: ccid,  // 课程id
        classId: csid  // 课节id
      }
      getLoginLinked(data).then(res => {
        this.$message({
          message: res.error_info.error
        })
        if (res.error_info.errno == 102 || res.error_info.errno == 145) {
          return false
        }
        // window.open(res.data)
        window.open("https://www.eeo.cn/client/invoke/index.html?" + res.data.split('?')[1])
      })
    },
    runCode (code) {

      if (code == 1 || code == 100) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      } else if (code == 153) {
        this.$message({
          message: '该课程已过期',
          type: 'error'
        })
      } else {
        this.$message({
          message: code
        })
      }
    }

  },
  created () {
    this.uid = this.user.p_n_id
    if (this.user.c_name == null) {
      this.uName = this.user.c_wx_nick
    } else {
      this.uName = this.user.c_name
    }

    this.uFace = this.user.c_wx_tx
    this.getTime()
    // 获取上课的天
    // this.queryTeacherCourse()

    // 按月查询
    this.courseByMouth()
  },
  components: {
    teacherCourse
  }
}
</script>

<style scoped>
@import "../../common/css/common.css";

.myStudy_course_out {
  background: #ffffff;
  border-radius: 6px;
  height: 608px;
  padding-top: 34px;
  overflow-y: scroll;
  width: 99%;
}
.myStudy_course_out::-webkit-scrollbar {
  width: 4px;
}

.myStudy_course_out::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
.myStudy_course_out::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 53%, 0.4);
}

.myStudy_course_out::-webkit-scrollbar-track {
  background: hsla(0, 0%, 53%, 0.1);
}

.mystudy_right >>> .el-calendar-day {
  height: 65px;
  text-align: center;
}
.myStudy_course {
  padding-top: 10px;
  position: relative;
  min-height: 90px;
  border-bottom: #f1f1f1ff solid 1px;
}
.my_s_c_font {
  font-size: 24px;
  font-weight: bold;
  color: #242121;
  padding-left: 26px;
  width: 65%;
  display: block;
}
.myStudy_course p,
.noCourse {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a29c9c;
  padding-left: 26px;
  margin: 10px 0px;
}
.noCourse {
  font-size: 18px;
}
.c_link {
  color: #a29c9c;
  text-decoration: underline;
  color: #e6a23c;
}
.c_link:hover {
  color: #d49537;
}
.teacher_btn {
  position: absolute;
  height: 27px;
  width: 79px;
  right: 35px;
  top: 11px;
}
.budge {
  width: 8px;
  height: 8px;
  background: #e6a23c;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 10px;
}
.el_cal_out >>> .is-today {
  color: #e6a23c;
}

.el_cal_out >>> .is-selected {
  background-color: #ffe0a826;
}

.el_cal_out >>> td :hover {
  background-color: #ffe0a826;
}
.upload_btn {
  top: 50px;
}
</style>