<template>
  <div>
    <el-image style="width: 50px; height:50px" class="fll" :src="require('../common/img/course/PDF.png')" v-if="c_type==1"></el-image>
    <el-image style="width: 50px; height:50px" class="fll" :src="require('../common/img/course/mp4.png')" v-if="c_type ==0"></el-image>
    <el-image style="width: 50px; height:50px" class="fll" :src="require('../common/img/course/word.png')" v-if="c_type==2"></el-image>
    <el-image style="width: 50px; height:50px" class="fll" :src="require('../common/img/course/img.png')" v-if="c_type==3"></el-image>
    <div style="clear:both"></div>
  </div>
</template>

<script>
export default {
  props: ['c_type','courseId'],
 data (){
   return{}
 },
 methods: {
  
 }

}
</script>

<style>

</style>