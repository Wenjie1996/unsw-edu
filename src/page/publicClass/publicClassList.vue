<template>
  <div class="bcf9">
    <headmenu ref="head" :index='3'></headmenu>
    <div class="vih lh50p">&nbsp;</div>
    <div class="content mr15 ">
      <!--课程总览S-->
      <div class="Overview">
        <div style="padding-left:1%;padding-top:0.5%;border-bottom:1px solid #dcdfe6;padding-bottom:0.5%">
          <div class="w30 fll" style="line-height:40px;font-size: 14px;color:#606266">
            <div>公开课总览&nbsp; ></div>
          </div>
          <div class="flr" style="margin-right:1%">
            <input style="border:0.5px solid #FFFFFF;height:28px" class="" placeholder="请输入你想要搜索的课程" v-model="searchcourse">
            <el-button type="warning" icon="el-icon-search" square @click="searchkc"></el-button>
          </div>
          <p style="clear:both"></p>
        </div>
      </div>
      <!--课程总览E-->
      <!--学校与专业S-->
      <!-- <div class="majorOut">
        <template>
          <span class="fll plr2 c99" style="padding-top:9px">学校:</span>
          <el-tabs @tab-click="zhuanye" v-model="n_shcoolid">
            <el-tab-pane label="全部" name=""></el-tab-pane>
            <el-tab-pane v-for="(item,index) in schoolList" :label="item.c_name" :key="index" :name="item.p_n_id"></el-tab-pane>
          </el-tabs>
        </template>

        <template>
          <span class="fll plr2 c99" style="padding-top:9px">专业:</span>
          <el-tabs id="nomajor" @tab-click="majorfun" v-model="majorid">
            {{zwsj}}
            <el-tab-pane label="全部" name=""></el-tab-pane>
            <el-tab-pane v-for="(item,index) in majorList" :label="item.c_name" :key="index" :name="item.p_n_id"></el-tab-pane>
          </el-tabs>
        </template>
      </div> -->
      <!--学校与专业E-->
      <!--课程列表S-->
      <el-row :span="24" class="ovh" v-infinite-scroll="getCourseList" infinite-scroll-disabled="disabled" style="overflow:auto">
        <el-col class="w25 plr1 pt1 cur" v-for="(item, index) in courseList" :key="index" @click.native="gotoCourseDetail(item.p_n_id)">
          <el-card :body-style="{ padding: '10px' }" class="br10p">
            <el-image :src="item.c_purl" class="w100" style="height:180px"></el-image>            
            <div class="line-limit-length" style="padding: 10px;">
              <span style="line-height:40px" class="fontw font18">{{item.c_name}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!--课程列表E-->
      <div class="tc pt6" style="color:#C0C4CC" v-if="loading">加载中...</div>
      <div class="tc pt6" style="color:#C0C4CC" v-if="noMore">没有更多了</div>
      <div class="vih lh40p">&nbsp;</div>
    </div>
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import headmenu from '../../components/headmenu.vue';
import { getAllMajor, getAllSchool, getCourseList } from '@/api/hta.js'
import config from '../../../config/config.js'
import foote from '@/components/foote.vue';
export default {
  data () {
    return {
      schoolList: [],
      majorList: [],
      courseList: [],
      pagesize: 24,
      curpage: 0,
      n_shcoolid: "",
      majorid: "",
      zwsj: '',
      searchcourse: '',
      loading: false,
      noMore: false,
      count: 1
    }
  },
  components: {
    headmenu,
    foote
  },
  methods: {
    gotoCourseDetail (courseId) {
      this.$router.push({ path: '/publicClassDetail', query: { p_n_id: courseId } });
    },
    getAllSchool () {
      var cs = {
        t: new Date(),
      }
      getAllSchool(cs).then(res => {
        this.schoolList = res;
        for (var i = 0; i < this.schoolList.length; i++) {
          var id = (this.schoolList[i].p_n_id).toString()
          this.schoolList[i].p_n_id = id
        }
      })
    },
    getAllMajor () {
      var cs = {
        pagesize: 9999,
      }
      getAllMajor(cs).then(res => {
        this.majorList = res.list;
        for (var i = 0; i < this.majorList.length; i++) {
          this.majorList[i].p_n_id = this.majorList[i].p_n_id.toString()
        }
      })
    },
    // 查询课程
    getCourseList () {
      if (this.curpage >= this.count) {
        // 没有更多数据
        this.noMore = true
        return
      }
      this.loading = true
      this.curpage++
      var url = config.apiUrl;
      var cs = {
        type: '1',
        curpage: this.curpage,
        pagesize: this.pagesize,
        c_school: this.n_shcoolid == 0 ? '' : this.n_shcoolid,
        c_major: this.majorid == 0 ? '' : this.c_major,
        c_style: '1'
      }
      getCourseList(cs).then(res => {
        var list = res.list
        this.count = res.pagecount
        for (var i = 0; i < list.length; i++) {
          if (list[i].c_purl != '') {
            list[i].c_purl = url + list[i].c_purl;
          }
        }
        this.courseList = [...this.courseList, ...res.list];
        if (this.curpage >= this.count) {
          // 没有更多数据
          this.noMore = true
        }
        this.loading = false
      })
    },
    zhuanye () {
      this.searchkc()
    },
    majorfun () {
      this.searchkc()
    },
    searchkc () {
      this.curpage = 0
      this.count = 1
      this.courseList = []
      var url = config.apiUrl;
      var cs = {
        type: '1',
        pagesize: this.pagesize,
        c_school: this.n_shcoolid == 0 ? '' : this.n_shcoolid,
        c_major: this.majorid == 0 ? '' : this.majorid,
        c_name: this.searchcourse,
        c_style: '1'
      }
      getCourseList(cs).then(res => {
        this.courseList = res.list;
        this.count = res.pagecount
        for (var i = 0; i < this.courseList.length; i++) {
          if (this.courseList[i].c_purl != '') {
            this.courseList[i].c_purl = url + this.courseList[i].c_purl;
          }
        }
      })
    }
  },
  created () {
    this.getAllSchool()
    this.getAllMajor()
    this.getCourseList()
  },
  computed: {
    disabled () {
      return this.loading || this.noMore
    }
  }
}
</script>

<style scoped>
@import "../../common/css/common.css";
.content {
  margin-top: 2%;
}
.Overview {
  border-radius: 5px;
  background: white;
}
.majorOut >>> .el-tabs__item.is-active {
  color: #e6984d;
}
.majorOut >>> .el-tabs__active-bar {
  background-color: #e6984d;
}
.majorOut >>> .el-tabs__item:hover {
  color: #e6984d;
}
.majorOut {
  background: white;
  padding-top: 1%;
  padding-right: 1%;
}
</style>