<template>
  <div class="mh100vh bcf bcf9">
    <headmenu ref="head" :index="2"></headmenu>
    <div class="vih lh40p">&nbsp;</div>
    <div class="mr15 ">
      <div class="bcf mt5 br10p pd2" style="min-height:650px">
        <div class="tl font20">订单确认</div>
        <!-- <div class="tl" style="height:300px">
          <div class="font14 cbbb">应支付费用</div>
          <div class="font30 cf7b6">A${{money}} <div class="font16 cf7b6">(￥{{rmb}})</div>
          </div>
        </div> -->
        <el-divider></el-divider>
        <div class="tl ovh" style="padding:10% auto;line-height:30px">
          <div v-if="orderType ==2">
            <div class="w100">
              <span class="font18 cbbb">课程金额</span>
              <span class="font18 cf7b6 pl2">A${{cost}} <span class="font16 cf7b6 ">(￥{{costrmb}})</span></span>
            </div>
            <div class="w100">
              <span class="font18 cbbb">应付金额</span>
              <span class="font18 cf7b6 pl2">A${{money}} <span class="font16 cf7b6">(￥{{rmb}})</span></span>
            </div>
          </div>
          <!--充值订单S-->
          <div v-if="orderType ==1">
            <div class="w100">
              <span class="font18 cbbb">充值金额</span>
              <span class="font18 cf7b6 pl2">A${{rechargeInf.a_money}} <span class="font16 cf7b6">(￥{{recharge_hl_money}})</span></span>
            </div>

            <div class="w100" v-if="rechargeInf.rechargeType==1">
              <span class="font18 cbbb">赠送积分</span>
              <span class="font18 cf7b6 pl2">{{rechargeInf.a_integral}}</span>
            </div>

            <div class="w100">
              <span class="font18 cbbb">应付金额</span>
              <span class="font18 cf7b6 pl2">A${{rechargeInf.a_money}} <span class="font16 cf7b6">(￥{{recharge_hl_money}})</span></span>
            </div>
          </div>
          <!--充值订单E-->

          <div class="pt2" v-if="orderType ==2">
            <span class="font18">余额支付</span>&nbsp;
            <span class="tr cbbb font16">当前可用余额: A${{n_balance}}</span>&nbsp;&nbsp;
            <span class="tr cbbb font16">当前可用积分: {{n_integral}}</span>&nbsp;
            <!-- <van-switch class="flr mt2 ml2" v-model="checked1" size="5vw" :value="checked1" @input="onInput1" /> -->
            <el-switch class="plr2" v-model="checked1" active-color="#E6984D" @change='onInput1'>
            </el-switch>
          </div>
          <el-radio-group v-model="radio" class="pt2">
            <el-radio :label="1"><img src="../../common/img/pay1.png" class="pt4"></el-radio>
            <el-radio :label="2"><img src="../../common/img/pay2.png" alt=""></el-radio>
            <el-radio :label="3"><img src="../../common/img/pay3.png" alt=""></el-radio>
          </el-radio-group>
        </div>
        <div>
        </div>
        <!-- <div class="mt5 ovh">
          <el-radio class="fll" v-model="clause" label="1">{{""}}</el-radio>
          <span class="cur cacb" style="margin-left:-25px" @click="centerDialogVisible = true">请阅读并同意相关条款</span>
        </div> -->
        <div class="pt2">
          <el-button type="warning" round @click="resumeAdd" v-if="orderType ==2">去付款</el-button>

          <el-button type="warning" round @click="rechargeAdd" v-if="orderType ==1">去付款</el-button>
        </div>
      </div>

      <div class="vih lh100p">&nbsp;</div>
    </div>
    <foote ref="foote"></foote>

    <!-- <el-dialog title="相关条款" :visible.sync="centerDialogVisible" width="50%" center>
      <div class="font13" style="max-width:100%;line-height:6vw" v-html="bean.c_text"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="centerDialogVisible = false;clause='1'">同 意</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import config from '../../../config/config.js';
import headmenu from '../../components/headmenu.vue';
import foote from '../../components/foote.vue';
import Vue from 'vue';
import md5 from "js-md5";
import axios from 'axios';
import { selSetting, orderAdd, getpaysign, checkuser, alipay } from '../../api/main.js'

export default {
  data () {
    return {
      centerDialogVisible: false,
      clause: '',
      fileList: [],
      file: '',
      show: false,
      radio: '',
      checked: false,
      checked1: false,
      user: '',
      setting: '',
      n_balance: 0.00,
      n_integral: 0,
      money: 0, // 支付的金额
      cost: 0, // 订单金额
      costrmb: 0,
      rmb: 0, // 人民币
      number: 0,
      number1: 0,
      tmp: '',
      c_urls: [],
      c_url: '',
      c_type: '',
      n_course_sonid: [],
      n_courseid: '',
      oderNum: '',
      c_zzxm: '',
      c_zfbzh: '',
      zfb: '',
      account: '',
      from: '',
      obj: '',
      orderType: '', // 订单类型
      rechargeInf: '', // 充值订单信息
      recharge_hl_money: '', // 充值订单汇率金额
      recharge_money: '',
      bean: '',
    };
  },
  components: {
    headmenu: headmenu,
    foote: foote
  },
  created () {
    this.orderType = sessionStorage.getItem("orderType")
    if (this.orderType == 2) {
      this.obj = JSON.parse(sessionStorage.getItem('pay'))
      // console.log(obj)
      this.n_courseid = this.obj.n_courseid;
      this.n_course_sonid = this.obj.n_course_sonid;
      this.money = this.obj.money;
      this.cost = this.obj.money;
      // console.log('章节id', this.n_course_sonid)
      // console.log('课程id', this.n_courseid)
    }
    this.getUser()
    this.getSetting()

    if (this.orderType == 1) {
      // 获取用户选择的充值信息
      this.rechargeInf = JSON.parse(sessionStorage.getItem('recharge'))
      this.recharge_money = this.rechargeInf.a_money
    }
    // console.log(this.$route.params)

  },

  methods: {
    onOversize (file) {
      this.$message.error('文件大小不能超过 10Mb');
    },
    afterRead (file) {
      // console.log(file)
      this.file = file
      this.saven()
    },
    Fundelete (file, e) {
      this.c_urls.splice(e.index, 1)
      // console.log(this.fileList)
      let vm = this;
      //name.index代表图片的索引
      return (file, e) => {
        let fileIndex = e.index
        // console.log(fileIndex)
        vm.fileList.splice(fileIndex, 1)
        vm.fileListIs.splice(fileIndex, 1)
      }

    },
    saven () {
      const formData = new FormData()
      formData.append('file', this.file.file)
      formData.append('path', 'voucher')
      axios({
        url: config.apiUrl + '/upload/fileupload',
        method: 'post',
        data: formData,
        processData: false, // 告诉axios不要去处理发送的数据(重要参数)
        contentType: false,   // 告诉axios不要去设置Content-Type请求头
      }).then((res) => {
        // console.log(res)
        this.$message({
          message: '上传成功',
          type: 'success'
        });

        this.show = true
        this.c_urls.push(res.data[0].url)
      })
    },
    getUser () {
      var user = JSON.parse(sessionStorage.user)
      var cs = {
        p_n_id: user.p_n_id,
      }
      checkuser(cs).then(res => {
        this.user = res.bean
        this.n_integral = Number(this.user.n_integral)
        this.n_balance = Number(this.user.n_balance)

      })
    },
    getSetting () {
      var cs = {
        t: new Date()
      }
      selSetting(cs).then(res => {
        console.log(res)
        this.bean = res
        this.setting = res
        this.rmb = this.money * Number(this.setting.n_hl)
        this.rmb = this.rmb.toFixed(2)
        this.costrmb = (this.cost * Number(this.setting.n_hl)).toFixed(2)
        this.zfb = config.apiUrl + res.c_zfb
        this.account = res.c_account
        this.recharge_hl_money = (this.recharge_money * Number(this.setting.n_hl)).toFixed(2)
      })
    },
    onInput1 (checked) {
      if (this.n_balance == 0 && this.n_integral == 0) {
        this.$message.error('当前余额不足');
        this.checked1 = false
        return
      }
      // if (this.money == 0 && this.checked1 == false) {
      //   this.$toast('所需付金额为0')

      //   return
      // }
      if (checked == true) {
        this.number1 = this.money
        this.money = (Number(this.n_balance) + Number(this.n_integral)) - Number(this.money)
        if (this.money > 0) {
          this.money = 0
        } else {
          this.number1 = Number(this.n_balance) + Number(this.n_integral)
          this.money = Math.abs(this.money);
        }
      } else {
        this.money = Number(this.money) + Number(this.number1)
      }
      this.rmb = this.money * Number(this.setting.n_hl)
      this.rmb = this.rmb.toFixed(2)
    },
    resumeAdd () {
      // if (this.clause == '') {
      //   this.$message.error('请勾选阅读并同意相关条款');
      //   return
      // }

      // if (this.checked && !this.checked1) {
      //   this.tmp = '1'
      //   this.c_type = '4'
      // }
      // if (this.checked1 && !this.checked) {
      //   this.tmp = '2'
      //   this.c_type = '4'
      // }

      if (this.checked1) {
        this.tmp = '3'
        this.c_type = '4'
      }
      if (this.money == 0 && this.checked1) {
        // 调用生成订单
        this.orderAdd()
        return
      } else {
        if (this.radio == '') {
          this.$message.error('请选择支付方式');
          return
        }
        if (this.radio == '2') {
          // 使用支付宝
          this.c_type = '1'
          // this.alipay()
          // 暂时使用
          sessionStorage.setItem("payItem", JSON.stringify({
            'tmp': this.tmp,
            'c_type': this.c_type,
            'cost': this.cost,
            'money': this.money,
            'rmb': this.rmb,
            'n_courseid': this.n_courseid,
            'n_course_sonid': this.n_course_sonid,
          }))
          this.$router.push({ path: 'paysavn', query: { type: '2', 'orderType': this.orderType } });

          return
        }
        if (this.radio == '3') {
          // 使用澳元支付

          this.c_type = '3'
          sessionStorage.setItem("payItem", JSON.stringify({
            'tmp': this.tmp,
            'c_type': this.c_type,
            'cost': this.cost,
            'money': this.money,
            'rmb': this.rmb,
            'n_courseid': this.n_courseid,
            'n_course_sonid': this.n_course_sonid,
          }))
          this.$router.push({ path: 'paysavn', query: { type: '3', 'orderType': this.orderType } });
        }

        if (this.radio == '1') {
          // 使用微信支付
          this.c_type = '0'
          sessionStorage.setItem("payItem", JSON.stringify({
            'tmp': this.tmp,
            'c_type': this.c_type,
            'cost': this.cost,
            'money': this.money,
            'rmb': this.rmb,
            'n_courseid': this.n_courseid,
            'n_course_sonid': this.n_course_sonid,
          }))
          this.$router.push({ path: 'paysavn', query: { type: '1', 'orderType': this.orderType } });

          // this.weixinzhifu()
          return
        }
      }
    },
    FunResume (e) {
      this.$router.push({ path: '/resume', query: { c_post: JSON.stringify(e.c_post) } });
    },
    orderAdd () {

      var user = JSON.parse(sessionStorage.user)
      var cs = {
        // c_zzxm: this.c_zzxm,
        // c_zfbzh: this.c_zfbzh,
        cost: this.cost,
        money: this.money,
        n_uid: user.p_n_id,
        tmp: this.tmp,
        c_pay_order: this.c_url,
        c_typr: this.c_type,
        n_courseid: this.n_courseid,
        n_course_sonid: this.n_course_sonid,
        t: new Date(),
      }
      orderAdd(cs).then(res => {
        if (res.err == 'success') {
          this.$message({
            message: '支付成功',
            type: 'success'
          });

          sessionStorage.removeItem('pay')
          setTimeout(() => {
            this.$router.push({ path: '/myStudy', query: {} });
          }, 1000);

        } else {
          this.$message.error(res.err);
        }
      }).catch(err => {

      })
    },
    //充值订单支付：微信支付、支付宝支付
    rechargePay () {
      var user = JSON.parse(sessionStorage.user)
      let params = {
        openid: user.c_openid,
        a_money: this.rechargeInf.a_money,
        a_integral: this.rechargeInf.a_integral,
        uid: user.p_n_id,
        c_typr: this.rechargeInf.pay, // 支付方式
        type: '1'
      }
      // 支付宝支付
      if (this.rechargeInf.pay == '1') {
        alipay(params).then((res) => {
          let routerData = this.$router.resolve({ path: '/paysavn', query: { htmlData: res, type: '2' } })
          // 打开新页面s
          window.location.href = (routerData.href);
        });
        // 微信支付

      } else if (this.rechargeInf.pay == '0') {

        getpaysign(params).then((res) => {

          // console.log('微信扫码支付', res)
          this.$router.push({ path: '/paysavn', query: { 'code_url': res.code_url, 'orderid': res.oderNum, type: '1' } });
        })
      }
    },
    alipay () {
      var user = JSON.parse(sessionStorage.user)
      let params = {
        openid: user.c_openid,
        cost: this.cost,
        money: this.money,
        n_uid: user.p_n_id,
        tmp: this.tmp,
        c_pay_order: this.c_url,
        c_typr: this.c_type,
        n_courseid: this.n_courseid,
        n_course_sonid: this.n_course_sonid,
        type: "2"
      };
      // console.log(params)
      // return
      let that = this;
      alipay(params).then((res) => {
        // console.log('支付宝支付', res)
        // this.from = res
        let routerData = this.$router.resolve({ path: '/paysavn', query: { htmlData: res, type: '2' } })
        // 打开新页面
        window.location.href = (routerData.href);
      });
    },

    weixinzhifu () {
      var user = JSON.parse(sessionStorage.user)
      let params = {
        openid: user.c_openid,
        cost: this.cost,
        money: this.money,
        n_uid: user.p_n_id,
        tmp: this.tmp,
        c_pay_order: this.c_url,
        c_typr: this.c_type,
        n_courseid: this.n_courseid,
        n_course_sonid: this.n_course_sonid,
        type: "2"
      };
      // console.log(params)
      // return
      let that = this;
      getpaysign(params).then((res) => {

        // console.log('微信扫码支付', res)
        this.$router.push({ path: '/paysavn', query: { 'code_url': res.code_url, 'orderid': res.oderNum, type: '1' } });
      });
    },
    // 转跳到支付页面，提交充值订单
    rechargeAdd () {
      // if (this.clause == '') {
      //   this.$message.error('请勾选阅读并同意相关条款');
      //   return
      // }
      if (this.radio == '') {
        this.$message.error('请选择支付方式');
        return
      }
      // 微信支付
      if (this.radio == 1) {
        this.rechargeInf.pay = '0'
        this.rechargePay()
      }
      // 支付宝支付
      if (this.radio == 2) {
        this.rechargeInf.pay = '1'
        // this.rechargePay()
      }
      // 澳币支付
      if (this.radio == 3) { this.rechargeInf.pay = '3' }
      this.rechargeInf.hlMoney = this.recharge_hl_money
      sessionStorage.setItem("payItem", JSON.stringify(this.rechargeInf))
      this.$router.push({ path: 'paysavn', query: { 'orderType': this.orderType, 'type': this.radio } });
    },

  },
  computed: {},
};
</script>
<style>
@import "../../common/css/common.css";
.el-radio__inner {
  width: 18px;
  height: 18px;
}
</style>