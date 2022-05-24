<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="rechargeOut">
      <el-tab-pane label="积分充值" name="1">
        <!--充值活动-->
        <div>
          <el-row :gutter="20">
            <el-col :span="4" v-for="(v, i) in rechargeList" :key="i">
              <div class="grid-content bg-purple cur" @click="checked_activity(v.p_n_id, i)" :class="{activity_check:rechargeId==v.p_n_id}">
                <div class="activity_top " :class="{activity_check_top:rechargeId==v.p_n_id}">积分充值</div>
                <div class="activity_money">A${{v.a_money}}</div>
                <div class="activity_money activity_give">送{{v.a_integral}}</div>
                <div class="activity_money activity_time">{{v.a_end_time}}</div>
              </div>
            </el-col>
            <el-col :span="4" style="display:none">
              <div class="grid-content bg-purple">5</div>
            </el-col>
          </el-row>

        </div>
        <!--自定义金额-->
        <el-form ref="form" label-width="140px" style="width:400px;margin-top:50px">
          <el-form-item label="自定义金额（澳元）">
            <el-input v-model="diy_i_money" @input="diy_i_money = diy_i_money.replace(/[^\d]/g,'')" maxlength="12" placeholder="请输入自定义金额"></el-input>
          </el-form-item>
          <div class="input_give"> 赠送金额：{{customAmount}}</div>
          <el-form-item>
            <el-button type="warning" @click="onSubmit">立即充值</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="现金充值" name="2">

        <el-form ref="form" label-width="140px" style="width:400px;margin-top:50px">
          <el-form-item label="自定义金额（澳元）">
            <el-input v-model="cash_money" @input="cash_money = cash_money.replace(/[^\d]/g,'')" maxlength="12" placeholder="请输入自定义金额"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="cashSubmit">立即充值</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { rechargeActivity } from '../../api/course.js'
export default {
  data () {
    return {
      ifChecked: false, // 是否选择活动
      rechargeList: [], // 活动列表
      rechargeId: 0, // 选择的活动id
      checkedActivityContent: '', // 选中的活动内容
      activeName: '1',
      diy_i_money: '', // 自定义金额的内容
      cash_money: '', // 现金充值
      id: '' // 用户id
    }

  },
  created () {
    this.queryRecharge()
    this.id = JSON.parse(sessionStorage.getItem('user')).p_n_id
  },
  methods: {
    // 查找活动
    queryRecharge () {
      rechargeActivity().then(res => {
        this.rechargeList = res
      })
    },
    // 选择活动 ,点击取消选择
    checked_activity (id, index) {

      // 若点击获取的活动id和已经存好的活动id一致，说明用户选择了活动，又取消了
      if (this.rechargeId == id) {
        this.diy_i_money = 0
        this.a_integral = 0
        this.rechargeId = 0
        this.ifChecked = false
      } else {
        // 获取用户选择的活动
        this.checkedActivityContent = this.rechargeList[index]
        this.diy_i_money = this.checkedActivityContent.a_money + ""
        this.a_integral = this.checkedActivityContent.a_integral
        // 不一致说明用户选中了一个活动
        this.ifChecked = true
        this.rechargeId = id

      }
    },
    // tabs切换时的事件
    handleClick () {

    },
    // 提交积分充值
    onSubmit () {

      // 充值活动和自定义充值只能二选一
      // if (this.ifChecked == true && this.diy_i_money != '') {
      //   this.$message({
      //     message: '充值活动和自定义金额只能选择一种进行充值！',
      //     type: 'error'
      //   })
      //   return false
      // }
      // 判空
      if (this.ifChecked == false && this.diy_i_money == '') {
        this.$message({
          message: '请选择充值活动或者输入自定义金额进行充值！',
          type: 'error'
        })
        return false
      }
      if (this.diy_i_money <= 0 && this.ifChecked == false) {
        this.$message({
          message: '请输入正确的金额',
          type: 'error'
        })
        return false
      }
      // 选择充值活动的积分充值
      if (this.ifChecked == true) {
        this.checkedActivityContent.a_integral = this.customAmount
        this.checkedActivityContent.rechargeType = 1
        sessionStorage.setItem('orderType', 1)
        sessionStorage.setItem('recharge', JSON.stringify(this.checkedActivityContent))

        this.$router.push({ name: 'pay', params: { 'recharge': this.checkedActivityContent, 'orderType': 1 } })

      }
      // 不选择充值活动的积分充值
      if (this.diy_i_money != '') {
        var data = {
          uid: this.id,
          a_money: this.diy_i_money.replace(/\b(0+)/gi, ''),
          a_integral: this.customAmount,
          rechargeType: 1 // 积分充值
        }
        sessionStorage.setItem('orderType', 1)
        sessionStorage.setItem('recharge', JSON.stringify(data))
        this.$router.push({ name: 'pay', params: { 'recharge': data, 'orderType': 1 } })
      }

    },
    // 添加现金充值
    cashSubmit () {
      if (this.cash_money === '') {
        this.$message({
          message: '请输入金额',
          type: 'error'
        })
        return false
      } else if (this.cash_money <= 0) {
        this.$message({
          message: '请输入正确的金额',
          type: 'error'
        })
        return false
      }
      var data = {
        a_money: this.cash_money.replace(/\b(0+)/gi, ''),
        rechargeType: 2 // 现金充值
      }
      sessionStorage.setItem('orderType', 1)
      sessionStorage.setItem('recharge', JSON.stringify(data))
      this.$router.push({ name: 'pay', params: { 'recharge': data, 'orderType': 1 } })

    }

  },
  computed: {
    customAmount () {
      var give = 0
      for (var i in this.rechargeList) {
        if (this.diy_i_money >= this.rechargeList[i].a_money && Number(this.rechargeList[i].a_integral) > give) {
          give = this.rechargeList[i].a_integral
        }
      }
      return give
    }
  }

}
</script>

<style scoped>
@import "../../common/css/common.css";
.rechargeOut {
  margin-left: 30px;
}
.bg-purple {
  border-radius: 10px;
  border: 1px solid rgb(216, 216, 216);
  text-align: center;
  padding-bottom: 20px;
}
.activity_top {
  border-bottom: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding: 5px;
  color: rgb(172, 61, 18);
  font-weight: bold;
}
.activity_money {
  font-weight: bold;
  color: #f50c0c;
  font-size: 20px;
  padding: 5px;
}
.activity_give {
  font-size: 18px;
}
.activity_time {
  font-size: 18px;
}
.activity_check {
  border: 1px solid #d17214;
  background: #fbdfb8;
}
.activity_check_top {
  border-bottom: 1px solid #d17214;
  background: linear-gradient(to right, #e59f59, #fbdfb8);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.rechargeOut >>> .el-tabs__item.is-active {
  color: #d17214;
}
.rechargeOut >>> .el-tabs__item:hover {
  color: #d17214;
}
.input_give {
  font-size: 13px;
}
</style>