<template>
  <div>
    <!--我的钱包-->
    <el-col :span="19">
      <div class="mystudy_right">
        <!--面包屑导航栏组件-->
        <breadcrumb v-bind:text='text' v-bind:name='name' ref="sonBreadcrumb" @back="getSonData"></breadcrumb>
        <div v-show="ifRcharge==false">
          <!--余额与积分-->
          <div class="myWalletOut">
            <div class="userBalance">
              <div class="myWalletinner">
                <span class="fll">
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
                </span>

              </div>
            </div>
          </div>

          <!--明细流水-->
          <div style="margin-left:30px" class="myWallet_tabs_out">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="现金明细" name="1">
                <div v-for="(v, i) in cashFlowList" :key="i" class="flow_out">
                  <div class="mwallet_money">{{v.n_money}}</div>
                  <div class="mwallet_type">{{v.c_type}}</div>
                  <div class="mwallet_c_remark line-limit-length">{{v.c_remark}}</div>
                  <div class="mwallet_time">{{v.addTime}}</div>
                  <div v-if="cashFlowList==null">暂无流水</div>
                </div>

              </el-tab-pane>
              <el-tab-pane label="积分明细" name="2">
                <div v-for="(v, i) in integralFlowList" :key="i" class="flow_out">
                  <div class="mwallet_money">{{v.money}}</div>
                  <div class="mwallet_type">{{v.type}}</div>
                  <div class="mwallet_c_remark line-limit-length">{{v.c_remark}}</div>
                  <div class="mwallet_time">{{v.addTime}}</div>
                </div>
                <div v-if="integralFlowList==null">暂无流水</div>
              </el-tab-pane>

              <!--分页-->
              <div class="block ms_page mwallet_page " v-if="count>0">
                <el-pagination layout="prev, pager, next" :total="count" :page-size="pagesize" @current-change="handleCurrentChange"> </el-pagination>
              </div>
            </el-tabs>
          </div>
        </div>
        <!--充值组件-->
        <recharge v-show="ifRcharge"></recharge>
      </div>
      <!--退款弹窗组件-->
      <refundWindow ref="refund"></refundWindow>
    </el-col>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'
import refundWindow from '@/page/myStudy/refundWindow'
import recharge from '@/page/myStudy/recharge'
import { myWallet, myAccountFlow, myIntegralFlow } from '../../api/course.js'
export default {
  data () {
    return {
      text: '我的钱包',
      name: '充值',
      uid: '',
      n_balance: '', // 余额
      n_integral: '', // 积分
      activeName: '1',
      curpage: 0,
      pagesize: 3,
      count: 0,
      cashFlowList: [], // 现金流水
      integralFlowList: [], // 积分流水
      ifOpenRund: false, // 是否打开充值窗口
      ifRcharge: false // 是否打开充值页面
    }
  },
  components: {
    refundWindow,
    recharge,
    breadcrumb
  },
  created () {
    this.uid = JSON.parse(sessionStorage.getItem('user')).p_n_id
    this.queryMessage()
    this.myCashFlow()
  },
  methods: {
    // 用户余额
    queryMessage () {
      var data = {
        id: this.uid
      }
      myWallet(data).then(res => {
        this.n_balance = res.n_balance
        this.n_integral = res.n_integral
      })

    },
    // 点击tab页切换数据
    handleClick () {
      this.curpage = 0
      this.count = 0
      this.activeName == 1 ? this.myCashFlow() : this.queryMyIntegralFlow()
    },
    // 账户现金流水
    myCashFlow () {
      var data = {
        id: this.uid,
        curpage: this.curpage,
        pagesize: this.pagesize,
        type: 'myWallet'
      }
      myAccountFlow(data).then(res => {
        this.count = res.count
        this.cashFlowList = res.list
      })
    },
    // 积分流水
    queryMyIntegralFlow () {
      var data = {
        id: this.uid,
        curpage: this.curpage,
        pagesize: this.pagesize
      }
      myIntegralFlow(data).then(res => {
        this.count = res.count
        this.integralFlowList = res.list
      })
    },
    // 点击分页查询
    handleCurrentChange (currentPage) {
      this.curpage = currentPage
      this.activeName == 1 ? this.myCashFlow() : this.queryMyIntegralFlow()
    },
    // 打开退款窗口
    openRefund () {
      this.$refs.refund.getData(true)
      this.ifOpenRund = true
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