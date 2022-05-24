<template>
  <div>
    <div class="bc33 w100 mb1 por h100" style="height: 180px;">
      <img style="margin-left:15%" src="../common/img/LOGO.png">
      <div class="poa" style="right:10%;top:15%">
        <img class="w20" style="margin-left:20%" src="../common/img/bottom/kf4.png">
      </div>
      <div style="margin-bottom:1%;margin-left:15%;" class="cacb fontw font18">
        <span class="cupn" @click="toPage('1')">关于我们</span>
        <span class="cupn" @click="toPage('2')" style="margin-left:1%;">联系我们</span>
        <!-- <span class="cupn" @click="toPage('3')" style="margin-left:1%;">帮助中心</span> -->
        <span class="cupn" @click="toPage('4')" style="margin-left:1%;">用户协议</span>
        <span class="cupn" @click="toPage('5')" style="margin-left:1%;">退款规则</span>
        <span class="cupn" @click="toPage('6')" style="margin-left:1%;">隐私政策</span>
        <!-- <span class="cupn" @click="toPage('7')" style="margin-left:1%;">版权声明</span> -->
      </div>
      <el-divider></el-divider>
      <div class="cacb cupn" @click="openUrl" style="margin-left:15%">Copyright 2015 - 2021 CPU. All Rights Reserved | 闽ICP备2020021986号 | CPU EDUCATION</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

import md5 from 'js-md5';
import config from '../../config/config.js'
import { selSetting } from '../api/main.js'
export default {
  name: 'foote',
  data () {
    return {
      activeIndex: '1',
      dialogVisible: false,
      iflogin: false,
      wxCode: '',
    };
  },
  created () {
    // 获取小程序传递用户信息并保存
    // if (decodeURIComponent(window.location.href).indexOf("?") != -1) {
    //   var user = JSON.parse(
    //     decodeURIComponent(window.location.href).split('?')[1].split('=')[1]
    //   )
    //   if (user.p_n_id != '' && user.p_n_id) {
    //     // alert(JSON.stringify(user))
    //     sessionStorage.setItem('user', JSON.stringify(user))
    //   }
    // }
    // this.selSetting()
  },
  methods: {
    toPage (type) {
      if (type === '1') {
        this.$router.push({ path: '/joinus', query: "" });
      } else if (type === '2') {
        this.$router.push({ path: '/contactUs', query: "" });
      } else if (type === '3') {

      } else if (type === '4') {
        this.$router.push({ path: '/useAgreement', query: "" });
      } else if (type === '5') {

        this.$router.push({ path: '/refund', query: "" });
      } else if (type === '6') {

        this.$router.push({ path: '/privacyPolicy', query: "" });
      } else if (type === '7') {

      }
    },
    selSetting () {
      var url = config.apiUrl;
      var cs = {
        t: new Date(),
      }
      selSetting(cs).then(res => {
        this.wxCode = url + res.c_coach
        // console.log('客户--', this.wxCode)
      })
    },
    openUrl () {
      window.open('https://beian.miit.gov.cn/', "_blank")
    }
  }
};
</script>
<style>
</style>