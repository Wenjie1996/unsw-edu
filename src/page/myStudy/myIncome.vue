<template>
  <div>
    <!--我的钱包-->
    <el-col :span="19">
      <div class="mystudy_right">
        <!--面包屑导航栏组件-->
        <breadcrumb v-bind:text='text' v-bind:name='name' ref="sonBreadcrumb" @back="getSonData"></breadcrumb>
        <div>
          <!--余额与积分-->
          <div class="myWalletOut">
            <div class="w100">
              <div class="myWalletinner">
                <div clas="font24">
                  <div class="fll w50 font24 ce69">总工资 :A${{userbean.n_summoney==null?0:userbean.n_summoney}}</div>
                  <div class="fll font24 ce69">当前工资 :A${{userbean.n_wage==null?0:userbean.n_wage}} </div>
                </div>
                <!--工资E-->
                <!--老师课时信息S-->
                <div class="w100 ovh pt4" style="width:600px" v-if="type == 1">
                  <div class="fll w30">
                    <div class="font24">历史总课时</div>
                    <div class="t_two font20">{{userbean.n_sumcount}}(h)</div>
                  </div>
                  <div class="fll w30">
                    <div class="font24">历史总课数</div>
                    <div class="t_two font20">{{userbean.courseCount}}(课)</div>
                  </div>
                  <div class="fll w30">
                    <div class="font24">历史学生数</div>
                    <div class="t_two font20">{{userbean.n_sumpre}}(人)</div>
                  </div>
                </div>
                <!--老师课时信息E-->
                <!-- <span class="fll">
                  <div style="margin-bottom:10px">当前余额</div>
                  <div>{{n_balance}}</div>
                </span>

                <span class="fll" style="margin-left:50px;">|</span>

                <span class="fll" style="margin-left:50px;">
                  <div style="margin-bottom:10px">积分余额</div>
                  <div>{{n_integral}}</div>
                </span>
                <span class="btn_out flr">
                  <el-button size="mini" @click="openRefund">退款</el-button>
                  <el-button size="mini" @click="openRecharge"> 充值</el-button>
                </span> -->

              </div>
            </div>
          </div>

          <!--明细流水-->
          <div style="margin-left:30px" class="myWallet_tabs_out">

            <div class="fontw">
              现金明细
            </div>

            <div v-for="(v, i) in list" :key="i" class="flow_out">
              <div class="mwallet_money">{{v.n_money}}</div>
              <div class="mwallet_type">{{v.c_type}}</div>
              <div class="mwallet_c_remark line-limit-length">{{v.c_remark}}</div>
              <div class="mwallet_time">{{v.addTime}}</div>
              <div v-if="list.length == 0">暂无流水</div>
            </div>

            <!--分页-->
            <div class="block ms_page mwallet_page " v-if="count>0">
              <el-pagination layout="prev, pager, next" :total="count" :page-size="pagesize" @current-change="handleCurrentChange"> </el-pagination>
            </div>

          </div>
        </div>

      </div>

    </el-col>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'
import { income, myAccountFlow } from '../../api/main.js'
export default {
  data () {
    return {
      text: '我的收入',
      name: '充值',
      uid: '',
      n_balance: '', // 余额
      n_integral: '', // 积分
      activeName: '1',
      curpage: 0,
      pagesize: 4,
      count: 0,
      list: [], // 现金流水
      userbean: '',
      user: '',
      type: ''
    }
  },
  components: {
    breadcrumb
  },
  created () {
    this.user = JSON.parse(sessionStorage.getItem('user'))

    var data = {
      id: this.user.p_n_id
    }
    income(data).then(res => {
      this.type = res.c_type
      this.userbean = res
    })
    this.myCashFlow()

  },
  methods: {
    // 账户现金流水
    myCashFlow () {
      var data = {
        id: this.user.p_n_id,
        curpage: this.curpage,
        pagesize: this.pagesize,
        c_type: 2,
        c_type1: 4,
        c_type2: 6
      }
      // console.log(data)
      myAccountFlow(data).then(res => {
        this.count = res.count
        this.list = res.list
        console.log(this.list.length == 0)
      })
    },
    // 点击分页查询
    handleCurrentChange (currentPage) {
      this.curpage = currentPage
      this.myCashFlow()
    },
    openRecharge () {
      this.ifRcharge = true
      // 向面包屑导航栏组件传递数据
      this.$refs.sonBreadcrumb.getData(true)

    },
    getSonData (msg) {
      this.ifRcharge = msg
    }
  }

}
</script>

<style scoped>
@import "../../common/css/common.css";
.mystudy_right {
  overflow: scroll;
}
.userBalance {
  width: 80%;
  height: 150px;
  background: silver;
  color: white;
  background-image: linear-gradient(to right, #ff9d26, #ff6338);
  border-radius: 4px;
  display: table;
}
.myWalletOut {
  margin: 30px;
}
.myWalletinner {
  display: table-cell;
  vertical-align: middle;
  padding-left: 20px;
}
.myWalletinner >>> .el-button {
  background: transparent;
  border: white solid 1px;
  color: white;
}
.btn_out {
  margin-right: 100px;
}
.myWallet_tabs_out >>> .el-tabs__item.is-active {
  color: #e6984d;
}
.myWallet_tabs_out >>> .el-tabs__item:hover {
  color: #e6984d;
}
.myWallet_tabs_out {
  width: 76%;
}
.flow_out {
  height: 80px;
  border-bottom: rgb(231, 230, 230) solid 1px;
  position: relative;
}
.flow_out div {
  position: absolute;
}
.mwallet_money {
  right: 50px;
  top: 10px;
  color: #fd5e26;
}
.mwallet_time {
  bottom: 5px;
  font-size: 14px;
  color: silver;
}
.mwallet_type {
  top: 10px;
}
.mwallet_c_remark {
  left: 40%;
  top: 30px;
  max-width: 150px;
}
.mwallet_page >>> .el-pager li.active {
  color: #e6984d;
}
.mwallet_page >>> .el-pager li:hover {
  color: #e6984d;
}
.mwallet_page {
  margin-top: 10px;
}
</style>