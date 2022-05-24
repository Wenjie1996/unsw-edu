<template>
  <div class="mh100vh bcf9">
    <!-- 微信扫码支付 -->

    <headmenu ref="head" :index="2"></headmenu>
    <div class="vih lh40p">&nbsp;</div>
    <div class="mr15 bcf mt2 mb2 br10p pd2 por" style="min-height:650px">
      <!-- 微信支付 正式 -->
      <!-- <div v-if="type=='1'">
        <div style="padding-left:40%;padding-top:10%">
          <img src="../../common/img/pay1.png" style="padding-left:2%"><br>
          <img :src="url" class="" style="width:200px">
          <div class="font18">请使用微信扫码进行支付</div>
        </div>
      </div> -->

      <!-- 澳元转账支付 -->
      <!-- <div v-if="type=='3'"> -->
      <div>
        <div class="tl ovh" style="padding:10% auto;line-height:30px">

          <div class="w100">
            <span class="font24 cbbb">应付金额</span>
            <span class="font24 cf7b6 pl2">A${{money}} <span class="font16 cf7b6">(￥{{rmb}})</span></span>
          </div>
          <!-- 暂时使用 start -->
          <div v-if="type=='1'" class="mt2">
            <span class="font24 cbbb">请使用微信扫码支付</span>
            <div>
              <img src="../../common/zf.jpg" style="width:250px;height:250px"><br>
            </div>
          </div>

          <div v-if="type=='2'" class="mt2">
            <span class="font24 cbbb">请使用支付宝扫码支付</span>
            <div>
              <el-image :src="apiurl+ setting.c_zfb" style="width:200px;height:200px"></el-image><br>
            </div>

          </div>
          <div v-if="type=='2'" class="w70 pt4">
            <label class="fll font20 cbbb pt1">支付宝账号：</label>
            <div class="fll">
              <el-input class="fll w100" placeholder="请输入支付宝账号" v-model="c_zfbzh" clearable>
              </el-input>
            </div>
          </div>
          <!-- 暂时使用 end -->
          <!-- 澳元支付 -->
          <div v-if="type=='3'" class="mt2">
            <span class="font24 cbbb">澳元转账账户</span>
            <span class="font24 cf7b6 pl2">{{setting.c_account}}</span>
          </div>
          <div v-if="type=='3'" class="w70 pt4">
            <label class="fll font20 cbbb pt1">转账人姓名：</label>
            <div class="fll">
              <el-input class="fll w100" placeholder="请输入转账人姓名" v-model="c_zzxm" clearable>
              </el-input>
            </div>
          </div>

        </div>
        <div class="pt4">
          <div class="font20 cbbb pb1">上传凭证：</div>
          <el-upload class="upload-demo" :action="fileUpload" :limit='3' :data="{path:'file'}" :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeUpload" :file-list="fileList" list-type="picture" accept=".jpg,.jpeg,.png,.bmp,.BMP,.JPG,.PNG,.JPEG">
            <el-button size="small" type="warning">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过10M</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="poa" style="left:3%;bottom:5%">
          <el-button type="warning" round @click="save">确认支付</el-button>
        </div>
      </div>

      <div class="vih lh100p">&nbsp;</div>
    </div>
    <foote ref="foote"></foote>
  </div>
</template>

<script>
import Vue from 'vue';
import { orderDetail, selSetting, orderAdd } from '../../api/main.js'
import { submitRecharge } from '../../api/course.js'
import headmenu from '../../components/headmenu.vue';
import foote from '../../components/foote.vue';
import config from '../../../config/config.js'
export default {
  data () {
    return {
      apiurl: config.apiUrl,
      bean: '',
      id: '',
      url: '',
      orderid: '',
      payGateWay: '',
      type: '',
      setting: '',
      orderParam: '',
      money: '',
      rmb: '',
      c_zzxm: '',
      c_zfbzh: '',
      fileUpload: config.apiUrl + '/upload/fileupload',
      fileUrl: [],
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      c_url: '',
      orderType: '', // 订单类型
    };
  },

  created (e) {
    console.log('支付回调参数-', e)
    this.getZH()
    let code_url = this.$route.query.code_url;
    this.url = config.apiUrl + '/client/nativepay/getQRCode_toxcxindex?code_url=' + code_url
    this.orderid = this.$route.query.orderid;
    this.type = this.$route.query.type;
    this.orderType = this.$route.query.orderType
    // if (this.type == '1') {
    //   this.getData()
    // }

    // 课程订单
    if (this.orderType == 2) {
      this.orderParam = JSON.parse(sessionStorage.getItem('payItem'))
      // console.log('支付参数--', this.orderParam)
      this.money = this.orderParam.money
      this.rmb = this.orderParam.rmb
    }

    // 充值订单
    if (this.orderType == 1) {
      this.orderParam = JSON.parse(sessionStorage.getItem('payItem'))
      this.money = this.orderParam.a_money
      this.rmb = this.orderParam.hlMoney
    }

  },
  components: {
    headmenu: headmenu,
    foote: foote
  },
  mounted () {
    // 支付宝支付 暂时注释
    // if (this.$route.query.type == '2') {
    //   let form = this.$route.query.htmlData
    //   this.payGateWay = form
    //   this.$nextTick(() => {
    //     // this.$refs.payGateWay.children[0].submit()
    //     let routerData = this.$router.resolve({ path: '/page', query: { htmlData: form } })
    //     // 打开新页面
    //     window.open(routerData.href);
    //   })
    // }

  },
  methods: {

    beforeUpload (file) {
      var tmp = false;
      if (file.name == "") {
        this.$message("请选择图片")
        tmp = false;
      } else {
        /*图片类型正则验证*/
        var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
        if (!imgStr.test(file.name)) {
          this.$message("文件不是图片类型")

          tmp = false;
        } else {
          /*图片大小*/
          var imagSize = file.size;
          if (imagSize.toFixed(2) <= (10 * 1024 * 1024)) {
            tmp = true;
          } else {
            this.$message(life.name + "大小不能超过" + "10" + "M")
            tmp = false;
          }
        }
      }
      return tmp;
      // return extension || extension2
    },
    uploadSuccess (res, file, fileList) {
      let _this = this
      if (res.length > 0) {
        this.$notify({
          title: "成功",
          message: "上传成功",
          type: "success",
        });
        // this.fileUrl.push(res[0].url)
        // 
        this.fileList = fileList
        for (let i = 0; i < this.fileList.length; i++) {
          if (file.uid == this.fileList[i].uid) {
            this.fileList[i].c_url = res[0].url
          }
        }

      } else {
        this.$notify.error({
          title: "上传失败",
          message: res.err,
        });
      }
    },
    handleRemove (file, fileList) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.uid == this.fileList[i].uid) {
          this.fileList.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
          i--;
        }
      }
    },
    handlePreview (file) {
      // console.log(file);
    },


    // 查询订单状态
    getData () {
      let _this = this
      let postData = {
        out_trade_no: this.orderid
      };
      // console.log(postData)
      orderDetail(postData).then(res => {
        // console.log('订单详情', res)

        if (res.c_pay_state === '1') {
          this.$message({
            message: '支付成功',
            type: 'success'
          })
          sessionStorage.removeItem('payItem')
          sessionStorage.removeItem('pay')
          this.$router.push({ path: '/myStudy', query: {} });
        } else {
          setTimeout(() => {
            _this.getData()
          }, 5000);
        }
      });

    },
    getZH: function () {
      var cs = {
        t: new Date()
      }
      selSetting(cs).then(res => {
        this.setting = res
        // console.log('系统设置', this.setting)
        // this.rmb = this.money * Number(this.setting.n_hl)
        // this.rmb = this.rmb.toFixed(2)
        // this.costrmb = (this.cost * Number(this.setting.n_hl)).toFixed(2)
        // this.zfb = config.apiUrl + res.c_zfb
        // this.account = res.c_account
      })
    },
    save () {
      // console.log(this.orderType)
      this.c_url = ''
      for (var i = 0; i < this.fileList.length; i++) {
        this.c_url = this.c_url + this.fileList[i].c_url + ",";
      }
      if (this.c_url.length > 0) {
        this.c_url = this.c_url.substring(0, this.c_url.length - 1);
      }
      // console.log("所有图片地址", this.c_url)
      if (this.fileList.length == 0) {
        this.$message('请上传凭证')
        return
      }
      if (this.type == '2') {
        // 使用支付宝
        if (this.c_zfbzh == '') {
          this.$message('请输入支付宝账号')
          return
        }
      } else if (this.type == '3') {
        // 使用澳元支付
        if (this.c_zzxm == '') {
          this.$message('请输入转账姓名')
          return
        }
      }
      // 如果是购买订单执行这个方法
      if (this.orderType == 2) {
        this.orderAdd()
      }
      // 如果是充值订单执行这个方法
      if (this.orderType == 1) {
        this.addRechargeOrder()
      }

    },
    orderAdd () {
      var user = JSON.parse(sessionStorage.user)
      var cs = {
        c_zzxm: this.c_zzxm,
        c_zfbzh: this.c_zfbzh,
        cost: this.orderParam.cost,
        money: this.orderParam.money,
        n_uid: user.p_n_id,
        tmp: this.orderParam.tmp,
        c_pay_order: this.c_url,
        c_typr: this.orderParam.c_type,
        n_courseid: this.orderParam.n_courseid,
        n_course_sonid: this.orderParam.n_course_sonid,
        t: new Date(),
      }
      // console.log(cs)
      // return
      orderAdd(cs).then(res => {
        if (res.err == 'success') {
          this.$message({
            message: '支付成功',
            type: 'success'
          });
          sessionStorage.removeItem('payItem')
          setTimeout(() => {
            this.$router.push({ path: '/myStudy', query: {} });
          }, 1000);

        } else {
          this.$message.error(res.err);
        }
      }).catch(err => {

      })
    },
    // 充值订单
    addRechargeOrder () {
      var user = JSON.parse(sessionStorage.user)
      this.orderParam.c_pay_order = this.c_url
      this.orderParam.c_zzxm = this.c_zzxm
      this.orderParam.c_zfbzh = this.c_zfbzh
      this.orderParam.uid = user.p_n_id
      this.orderParam.n_money = this.orderParam.a_money
      // console.log(this.orderParam)
      submitRecharge(this.orderParam).then(res => {
        if (res > 0) {
          this.$message({
            message: '支付成功',
            type: 'success'
          });
          sessionStorage.removeItem('payItem')
          setTimeout(() => {
            this.$router.push({ path: '/myStudy', query: {} });
          }, 1000);
        }
      })



    }

  },

};
</script>
<style>
@import "../../common/css/common.css";
</style>