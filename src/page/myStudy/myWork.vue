<template>
  <div>
    <!-- 我的工作安排 -->
    <el-col :span="11">
      <div class="mystudy_right">
        <div class="mystudy_r_top">
          <span class="cur">工作安排</span>
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
          <span class="my_s_c_font line-limit-length" :title="v.cname" v-html="v.cname"></span>

          <el-button type="warning" round class="teacher_btn" size="mini" slot="reference" v-if="v.c_work_state == '0' " @click="finishwork(v)">完成</el-button>
          <el-button type="warning" round class="teacher_btn" size="mini" slot="reference" v-if="v.c_work_state == '1' " disabled>已完成</el-button>
          <el-button type="warning" round class="teacher_btn" size="mini" slot="reference" v-if="v.c_work_state == '2' " disabled>超时完成</el-button>

          <div class="line-limit-length font20 pt2" style="padding-left: 26px">{{v.work_plan}}</div>

          <div>
            <p class="pt2 pb2">{{v.work_plan}}</p>
            <p>开始时间&nbsp;{{v.d_start_time}}</p>
            <p>预计完成时间&nbsp;{{v.d_end_time}}</p>
            </p>
          </div>

        </div>
        <div v-if="dayCourse.length==0" class="noCourse">该天暂无工作安排！</div>
      </div>
    </el-col>
  </div>
</template>

<script>
import { myworkByTime, myworkByMouth, updatemyWork } from '../../api/main.js'
export default {
  data () {
    return {
      value: new Date(),
      dayTime: [],
      clickDayTime: '', // 格式化后的时间，用于按时间查找课程
      uid: '', // 用户id
      uName: '', // 用户名
      uFace: '', // 用户头像
      dayCourse: '' // 当天的课程
    }
  },
  created () {
    var user = JSON.parse(sessionStorage.getItem('user'))
    // 获取用户id
    this.uid = user.p_n_id
    this.uName = user.c_name
    this.uFace = user.c_wx_tx
    this.getTime()
    // 获取上课的天
    // this.myworkByTime()

    // 按月查询
    this.myworkByMouth()
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
      this.myworkByTime()
    },
    // 按天查找上课课程
    myworkByTime () {
      let data = {
        n_uid: this.uid,
        day: this.clickDayTime
      }
      myworkByTime(data).then(res => {
        // console.log(res)
        this.dayCourse = res
      })
    },

    // 按月查询
    myworkByMouth () {
      let data = {
        uid: this.uid,
      }
      myworkByMouth(data).then(res => {
        this.dayTime = res
      })
    },
    finishwork (e) {

      // console.log(this.workList[this.index].p_n_id)
      this.$confirm('是否已完成工作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = {
          // d_com_time: new Date,
          p_n_id: e.p_n_id,
          d_end_time: e.d_end_time

        };
        updatemyWork(postData).then(res => {
          // alert(res.msg)
          //console.log(res.msg)
          if (res.msg == "success") {
            this.myworkByTime()
            this.$message({
              message: '已完成',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.mgg,
              type: 'error'
            });
          }

        });
      }).catch(() => {
        //取消的提示
      })

      // return;

    },
    // 开始上课
    begin_course (sname, sid) {

      let data = {
        title: sname,
        zid: sid,
        useid: this.uid,
        usename: this.uName,
        usetx: this.uFace,
      }


    }

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
  position: relative;
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
</style>