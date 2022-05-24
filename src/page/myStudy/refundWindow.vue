<template>
  <div>
    <!-- 退款窗口 -->
    <!-- <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button> -->
    <el-dialog title="退款" :visible.sync="centerDialogVisible" width="30%" center>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="退款类型" prop="pay">
          <el-radio-group v-model="form.pay">
            <el-radio label="0" class="refund_radio">微信</el-radio>
            <el-radio label="1" class="refund_radio">支付宝</el-radio>
            <el-radio label="2" class="refund_radio">澳元</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账户信息" prop="c_account">
          <el-input v-model.trim="form.c_account" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="退款金额" prop="n_money">
          <el-input v-model.trim="form.n_money" @input="form.n_money=form.n_money.replace(/[^\d]/g,'')" maxlength="12"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRefund } from '../../api/course.js'
export default {
  data () {
    return {
      centerDialogVisible: false,
      form: {
        pay: '',
        c_account: '',
        n_money: '',
        p_n_id: ''
      }
    }
  },
  methods: {
    // 获取父组件的数据
    getData (text) {
      this.centerDialogVisible = text
    },
    onSubmit () {
      if (this.form.pay == '') {
        this.$message({
          message: '请选择退款方式！',
          type: 'error'
        })
        return false
      }

      if (this.form.c_account == '') {
        this.$message({
          message: '请输入正确的账户！',
          type: 'error'
        })
        return false
      }
      if (this.form.n_money == '' || this.form.n_money <= 0) {
        this.$message({
          message: '请输入正确的金额！',
          type: 'error'
        })
        return false
      }
      this.form.p_n_id = JSON.parse(sessionStorage.getItem('user')).p_n_id
      addRefund(this.form).then(res => {
        if (res > 0) {
          this.$message({
            message: '退款成功！',
            type: 'success'
          })
          this.centerDialogVisible = false
        } else if (res == -1) {
          this.$message({
            message: '余额不足，退款失败！',
            type: 'error'
          })
        }
      }).catch((err) => {
        this.$message({
          message: '系统错误！' + err,
          type: 'error'
        })
      })

    }
  },

}
</script>

<style  scoped>
.refund_radio >>> .is-checked .el-radio__inner {
  border-color: #e6a23c;
  background: #e6a23c;
}
.refund_radio >>> .is-checked + .el-radio__label {
  color: #e6a23c;
}
.refund_radio >>> .el-radio__inner:hover {
  border: 1px solid #e6a23c;
}
</style>