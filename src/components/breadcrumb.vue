<template>
  <div>
     <div class="mystudy_r_top cur">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <span class="cur" @click="goBack" :class="ifClickDetail==true?'bold':''">{{text}}</span>
           </el-breadcrumb-item>
           <el-breadcrumb-item v-if="ifClickDetail">{{name}}</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
  </div>
</template>

<script>

export default {
 data () {
    return {
      ifClickDetail:false
    }
 },
 props: ['text', 'name'],
 created() {
 
 },
 methods: {
   // 获取父组件的数据
   getData (text) {
     this.ifClickDetail =  text

   },
   // 返回
   goBack () {
     this.ifClickDetail = false
     this.$emit('back', false)
   }
 }
}
</script>

<style scoped>
@import "../common/css/common.css";
.mystudy_r_top >>> .el-breadcrumb {
  font-size: 15px;
  line-height: 22px;
}
.mystudy_r_top >>> .el-breadcrumb__inner {
  color: black;
}
.mystudy_r_top >>> .el-breadcrumb__separator {
  color: black;
}
.bold {
  font-weight: bold;
}

</style>