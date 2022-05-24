<template>
  <div id="app">
    <div class="mh100vh bcf w100">
      <div class="w100">
        <!-- <div class="vih lh40p">&nbsp;</div> -->
        <!-- 通过@/router查看子路由对应的组件 -->
        <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width,viewport-fit=cover">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

import md5 from 'js-md5';


export default {
  name: 'app',
  data () {
    return {
      activeIndex: '1',
      dialogVisible: false,
      iflogin: false
    };
  },
  created () {
    var user = {
      c_name: '张三',
      c_type: '1',
      p_n_id: '1',
      c_openid: 'ojoyO5R0g8XG2rBLCkOFWm7ohCl8',
      c_wx_tx: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLcUqr9vicgHtdXUWJTnw3a35tDbeuFIHWrWBJWoHgibOwOYGchX7sr85YGotp4ib5XSZ8LBXiaqnUsnQ/132'
    }
    // sessionStorage.setItem('user', JSON.stringify(user))
  },
  methods: {
  }
};
</script>
<style>
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  max-width: 100%;
  min-width: 1500px;
}
.el-menu-item {
  font-size: 18px;
}
</style>