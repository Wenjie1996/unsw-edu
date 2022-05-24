<template>
  <div class="bcf9">
    <headmenu ref="head" :index='2'></headmenu>
    <div class="vih lh50p">&nbsp;</div>

    <div class="poa" style="top:30%"><img src="../common/img/BG1.png" class="w100" alt=""></div>
    <div class="mr15">
      <div class="w100">
        <div class="tc" style="padding:2% 1%">
          <div class="bcf">
            <div class="w100 ovh" style="margin-bottom:1%">
              <div class="fll w50">
                <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left:2%;padding-top:2%">
                  <el-breadcrumb-item>课程总览&nbsp; ></el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="flr" style="margin-right:1%">
                <input style="border:0.5px solid #FFFFFF;height:28px" class="" placeholder="请输入你想要搜索的课程" v-model="searchcourse">
                <el-button type="warning" icon="el-icon-search" square @click="searchkc"></el-button>
              </div>
            </div>
            <el-divider class="mt0"></el-divider>
            <template>
              <span class="fll plr2 c99" style="padding-top:9px">分类:</span>
              <el-tabs @tab-click="fenlei">
                <el-tab-pane label="全部" name=""></el-tab-pane>
                <el-tab-pane v-for="(item,index) in classList" :label="item.c_name" :key="index" :name="item.p_n_id"></el-tab-pane>
              </el-tabs>
            </template>

            <template>
              <span class="fll plr2 c99" style="padding-top:9px">学校:</span>
              <el-tabs @tab-click="zhuanye">
                <el-tab-pane label="全部" name=""></el-tab-pane>
                <el-tab-pane v-for="(item,index) in schoolList" :label="item.c_name" :key="index" :name="item.p_n_id"></el-tab-pane>
                <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
              </el-tabs>
            </template>
            <template>
              <span class="fll plr2 c99" style="padding-top:9px">专业:</span>
              <el-tabs id="nomajor" @tab-click="majorfun">
                {{zwsj}}
                <el-tab-pane label="全部" name=""></el-tab-pane>
                <el-tab-pane v-for="(item,index) in majorList" :label="item.c_name" :key="index" :name="item.p_n_id"></el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </div>
        <el-row :span="24" class="ovh" v-infinite-scroll="getCourseList" infinite-scroll-disabled="disabled" style="overflow:auto">
          <el-col class="w25 plr1 pt1 cur" v-for="(item, index) in courseList" :key="index" @click.native="gotoCourseDetail(item.p_n_id)">
            <el-card :body-style="{ padding: '10px' }" class="br10p">
              <el-image :src="item.c_purl" class="w100" style="height:180px"></el-image>            
              <div class="line-limit-length" style="padding: 10px;">
                <span style="line-height:40px" class="fontw font18">{{item.c_name}}</span>
                <div class="pt6" style="line-height:30px">
                  <span class="fontw font18 cred">{{item.n_people_virtual==null|| item.n_people_virtual==''?0:item.n_people_virtual}}</span><span class="cacb">人报名</span>
                  <span class="fontw font18 ce69 flr font24">A${{item.n_pre_price==null || item.n_pre_price ==''?0:item.n_pre_price}}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- <div class="pd2" v-if="count>0">
          <el-pagination background layout="prev, pager, next" :total="count" :page-size="pagesize" @current-change="handleCurrentChange"> </el-pagination>
        </div> -->
        <div class="tc pt6" style="color:#C0C4CC" v-if="loading">加载中...</div>
        <div class="tc pt6" style="color:#C0C4CC" v-if="noMore">没有更多了</div>
        <div class="vih lh40p">&nbsp;</div>
      </div>
    </div>
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import Vue from 'vue';
import app from '../App';
import { getAllClass, getAllMajor, getAllSchool, getCourseList } from '../api/hta.js'
import config from '../../config/config.js'
import headmenu from '../components/headmenu.vue';
import foote from '../components/foote.vue';


export default {
  data () {
    return {
      // tximg: require('../../common/img/tx.png'),
      activeIndex: '1',
      courseList: [],
      classList: [],
      schoolList: [],
      majorList: [],
      activeName: 'second',
      c_name: '',
      zwsj: "",
      n_shcoolid: "",
      majorid: "",
      classid: "",
      pagesize: 24,
      curpage: 0,
      searchcourse: "",
      loading: false,
      noMore: false,
      // disabled: false,
      count: 1

    };
  },
  components: {
    headmenu: headmenu,
    foote: foote
  },
  computed: {
    // noMore () {
    //   return this.curpage >= this.count
    // },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.getCourseList();
    this.getAllClass();
    this.getAllSchool();
    this.getAllMajor();
  },

  methods: {
    coursedetail (id) {
      var url = config.apiUrl;
      this.$router.push({ path: '/courseDetail', params: { p_n_id: id } });
      // var cs = {
      //   p_n_id:  this.courseList[i].p_n_id
      // }
    },
    gotoCourseDetail (courseId) {
      this.$router.push({ path: '/courseDetail', query: { p_n_id: courseId } });
    },
    //searchkc
    searchkc () {
      this.curpage = 0
      this.count = 1
      this.courseList = []
      var url = config.apiUrl;
      var cs = {
        type: '1',
        pagesize: this.pagesize,
        c_school: this.n_shcoolid,
        c_major: this.majorid,
        n_classifyid: this.classid,
        c_name: this.searchcourse,
        c_style: '0'
      }
      getCourseList(cs).then(res => {
        // console.log(res)
        this.courseList = res.list;
        this.count = res.pagecount
        for (var i = 0; i < this.courseList.length; i++) {
          if (this.courseList[i].c_purl != '') {
            this.courseList[i].c_purl = url + this.courseList[i].c_purl;
          }
        }
      })
    },
    zhuanye (tab, event) {
      // //如果学校点击全部,那么专业不选
      // if (tab.name == "") {


      // }
      //console.log("qqqqqq555555555555555555qqqqqqqqqqqqqqqqq" + JSON.stringify(tab), event);
      // alert(tab.name)
      this.n_shcoolid = tab.name;
      var url = config.apiUrl;
      var cs = {
        n_shcoolid: tab.name,
      }
      getAllMajor(cs).then(res => {
        // console.log(res)
        this.majorList = res.list;
        // for (var i = 0; i < this.courseList.length; i++) {
        //  alert(this.majorList.length + "5555555558889")
        if (this.majorList.length != 0) {
          //alert("5585512")
          this.zwsj = "";
        } else {
          this.zwsj = "此学校下暂无专业";
        }

        // }
      })
      this.curpage = 0
      this.count = 1
      this.courseList = []
      this.getCourseList();
    },
    fenlei (tab, event) {
      this.classid = tab.name;
      this.curpage = 0
      this.count = 1
      this.courseList = []
      this.getCourseList();
    },
    majorfun (tab, event) {
      this.majorid = tab.name;
      this.curpage = 0
      this.count = 1
      this.courseList = []
      this.getCourseList();
    },
    handleCurrentChange (currentPage) {
      this.curpage = currentPage
      this.getCourseList()
    },
    // 查询课程
    getCourseList () {
      if (this.curpage >= this.count) {
        // 没有更多数据
        this.noMore = true
        return
      }
      // console.log('加载。。。')
      this.loading = true
      this.curpage++
      var url = config.apiUrl;
      var cs = {
        type: '1',
        curpage: this.curpage,
        pagesize: this.pagesize,
        c_school: this.n_shcoolid,
        c_major: this.majorid,
        n_classifyid: this.classid,
        c_style: '0',
      }
      getCourseList(cs).then(res => {
        // console.log(res)
        // this.courseList = res.list;
        var list = res.list
        this.count = res.pagecount
        for (var i = 0; i < list.length; i++) {
          if (list[i].c_purl != '') {
            list[i].c_purl = url + list[i].c_purl;
          }
        }
        this.courseList = [...this.courseList, ...res.list];
        // this.courseList = res.list;

        if (this.curpage >= this.count) {
          // 没有更多数据
          this.noMore = true
        }
        this.loading = false
      })
    },
    getAllClass () {
      var url = config.apiUrl;
      var cs = {
        t: new Date(),
      }
      getAllClass(cs).then(res => {
        // console.log(res)
        this.classList = res.list;
        for (var i = 0; i < this.classList.length; i++) {
          this.classList[i].p_n_id = this.classList[i].p_n_id.toString()
        }
      })
    },
    getAllSchool () {
      var url = config.apiUrl;
      var cs = {
        t: new Date(),
      }
      getAllSchool(cs).then(res => {
        // console.log(res)
        this.schoolList = res;
        for (var i = 0; i < this.schoolList.length; i++) {
          var id = (this.schoolList[i].p_n_id).toString()
          this.schoolList[i].p_n_id = id
        }
      })
    },
    getAllMajor () {
      var url = config.apiUrl;
      var cs = {
        pagesize: 9999,
      }
      getAllMajor(cs).then(res => {
        // console.log(res)
        this.majorList = res.list;
        for (var i = 0; i < this.majorList.length; i++) {
          this.majorList[i].p_n_id = this.majorList[i].p_n_id.toString()
        }
      })
    },
  },
};
</script>
<style>
@import "../common/css/common.css";
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-tabs__item.is-active {
  color: #e6984d;
}
.el-tabs__item:hover {
  color: #e6984d;
  cursor: pointer;
}
.el-tabs__item.is-active {
  color: #e6984d;
}
.el-tabs__active-bar {
  background-color: #e6984d;
}
.el-breadcrumb {
  font-size: 14px;
  line-height: 2.5;
}
.right-tabbox-newnotice /deep/.el-tabs__nav-wrap::after {
  position: static !important;
}
</style>