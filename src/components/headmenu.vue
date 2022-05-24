<template>
  <div>
    <div class="pof w100 bcf" style="z-index:5;min-width:1500px">
      <el-menu :default-active="activeIndex" :active="activeIndex" :collapse-transition="false" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#E6984D">
        <img style="margin-left:15%" class="fll cupn" @click="toHome" src="../common/img/LOGO.png" alt="">
        <el-menu-item style="margin-left:5%" index="1">Main</el-menu-item>
        <el-menu-item index="2">Courses Overview</el-menu-item>
        <el-menu-item index="3">Public Class</el-menu-item>
        <el-menu-item index="4">About Us</el-menu-item>
        <el-menu-item index="5">My Courses</el-menu-item>
        <div v-if="iflogin === false" class="flr  font18 cup cbbb" @click="login" style="margin-right:15%;padding-top:1%;color: #909399;">Log in&nbsp; / &nbsp;Sign up</div>
        <div v-if="iflogin === true" class="flr  font18  cbbb" style="margin-right:15%;color: #909399;padding:auto 0">
          <div class="flr font18" @click="exit" style="padding-top:8%;">
            <div class="cup tr">Log out</div>
          </div>
          <div class="flr font18 " style="padding-top:8%;">
            <div class=" tr">&nbsp;&nbsp;|&nbsp;&nbsp;</div>
          </div>
          <div class="flr" style="padding-top:8%">
            <div class=" tr">{{username}}</div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-avatar class="userface flr" style="margin-top:4%" :src="user.c_wx_tx"></el-avatar>
        </div>

      </el-menu>
    </div>

    <el-dialog title="微信扫码登录" :visible.sync="dialogVisible" width="350px">
      <div style="text-align: center;">
        <!-- <span>微信扫一扫登录</span><br> -->
        <!-- <el-image src="../common/img/ewm.jpg" style="width:200px;height:200px"></el-image><br> -->
        <wxlogin :appid="'wx149d23cb078fb470'" :scope="'snsapi_login'" :redirect_uri="'https://www.cpu-edu.com/#/'"></wxlogin>
      </div>
    </el-dialog>
    <!-- redirect_uri="https://wx.cpu-edu.com/" -->

    <el-dialog title="请填写信息" :visible.sync="userFlag" width="350px">
      <div>
        <el-form ref="form" :model="user" label-width="70px" :label-position="labelPosition">
          <el-form-item label="姓名">
            <el-input v-model="user.c_name" maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="手机号" style="margin-bottom:0px">
            <el-select placeholder="区号" style="width:30%;float:left" v-model="AreaCode">
              <el-option label="86" value="86"></el-option>
              <el-option label="852" value="852"></el-option>
              <el-option label="853" value="853"></el-option>
              <el-option label="886" value="886"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="33" value="33"></el-option>
              <el-option label="34" value="34"></el-option>
              <el-option label="39" value="39"></el-option>
              <el-option label="41" value="41"></el-option>
              <el-option label="44" value="44"></el-option>
              <el-option label="46" value="46"></el-option>
              <el-option label="49" value="49"></el-option>
              <el-option label="60" value="60"></el-option>
              <el-option label="61" value="61"></el-option>
              <el-option label="64" value="64"></el-option>
              <el-option label="65" value="65"></el-option>
              <el-option label="66" value="66"></el-option>
            </el-select>
            <el-input v-model="user.c_tel" maxlength="20" style="width:69%;float:right"></el-input>
            <p style="font-size:12px;margin:0px">请填写真实手机号码，以便提供授课服务</p>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="update">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

import md5 from 'js-md5';
import wxlogin from 'vue-wxlogin';
import { updateMyMessage } from '@/api/course.js'
export default {
  name: 'headmenu',
  props: {
    index: {
      type: Number,
      default: '1'
    }
  },
  components: {
    wxlogin,
  },
  data () {
    return {
      activeIndex: '1',
      dialogVisible: false,
      iflogin: false,
      user: '',
      username: '',
      labelPosition: 'right',
      userFlag: false, // 用户是否填写了姓名与手机号
      AreaCode: ""
    };
  },
  watch: {
    index: function (v) {
      this.activeIndex = v.toString()
    }
  },
  created () {
    this.activeIndex = this.index.toString()
    // console.log("上导航栏--", sessionStorage.getItem("user"))
    if (sessionStorage.getItem("user") != null && sessionStorage.getItem("user") != '' && sessionStorage.getItem("user") != undefined) {
      var user = JSON.parse(sessionStorage.getItem("user"))
      this.user = user
      // console.log(user.c_name)
      if (user.c_name == null) {
        this.username = user.c_wx_nick
      } else {
        this.username = user.c_name
      }
      this.iflogin = true
      // 是否填写用户名和手机号
      if (user.c_name != null && user.c_name != '' && user.c_tel != null && user.c_tel != '') {
        this.userFlag = false
      } else {
        this.userFlag = true
      }
    }

  },
  methods: {
    update () {
      if (this.user.c_name == null || this.user.c_name == '') {
        this.$message({
          message: '请输入姓名！',
          type: 'error'
        })
        return false
      }
      if (this.AreaCode == null || this.AreaCode == '') {
        this.$message({
          message: '请选择区号！',
          type: 'error'
        })
        return false
      }
      if (this.user.c_tel == null || this.user.c_tel == '') {
        this.$message({
          message: '请输入手机号码！',
          type: 'error'
        })
        return false
      }

      let cs = {
        c_name: this.user.c_name,
        c_tel: this.AreaCode + '-' + this.user.c_tel,
        id: this.user.p_n_id
      }
      updateMyMessage(cs).then(res => {
        if (res > 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.user.c_tel = this.AreaCode + '-' + this.user.c_tel
          sessionStorage.setItem("user", JSON.stringify(this.user))
          console.log(sessionStorage.getItem('user'))
        }
        this.userFlag = false
      })
    },
    toHome () {
      this.$router.push({ path: '/', query: "" });
    },
    // 到个人中心
    toUser (e) {
      this.$router.push({ path: '/myStudy', query: "" });
    },
    login (e) {
      this.dialogVisible = true
      // this.iflogin = true
    },
    // 登录状态
    loginStatus (e) {
      if (e) {
        this.dialogVisible = false
        var user = JSON.parse(sessionStorage.getItem("user"))
        this.user = user
        if (user.c_name == null) {
          this.username = user.c_wx_nick
        } else {
          this.username = user.c_name
        }
        this.iflogin = true
      }
      // sessionStorage.getItem("openid"); //openid
      // sessionStorage.getItem("headimgurl"); //头像
      // sessionStorage.getItem("nickname"); //昵称
      // sessionStorage.getItem("sex"); //普通用户性别，1为男性，2为女性
      // sessionStorage.getItem("unionid") // 微信的unionid

    },
    exit () {
      sessionStorage.clear()
      window.location.href = 'https://www.cpu-edu.com'
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath);
      if (key == 1) {
        this.$router.push({ path: '/', query: "" });
      } else if (key == 2) {
        this.$router.push({ path: '/course', query: "" });
      } else if (key == 3) {
        this.$router.push({ path: '/publicClassList', query: "" });
      } else if (key == 4) {
        this.$router.push({ path: '/aboutus', query: "" });
      } else if (key == 5) {
        if (sessionStorage.getItem("user") != null && sessionStorage.getItem("user") != '' && sessionStorage.getItem("user") != undefined) {
          this.$router.push({ path: '/myStudy', query: "" });
        } else {
          this.dialogVisible = true
        }
      }

    },

  }
};
</script>
<style>
@import "../common/css/common.css";
.userface {
  width: 40px;
  height: 40px;
  font-size: 55px;
  border: #ffff solid 1px;
}
.el-menu-item {
  font-size: 18px;
}
</style>
