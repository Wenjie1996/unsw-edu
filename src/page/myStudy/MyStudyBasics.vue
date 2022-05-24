<template>
  <div>
    <!--基本资料-->
    <el-col :span="19">
      <div class="mystudy_right">
        <studyTop v-bind:text='text'></studyTop>

        <el-form ref="form" :model="userDate" label-width="80px" style="width:500px;margin:10px 0px 0px 10px">
          <el-form-item label="姓名">
            <el-input v-model="userDate.c_name" maxlength="20"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-select placeholder="请选择区号" style="width:30%;float:left" v-model="AreaCode">
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
            <el-input v-model="userDate.c_tel" maxlength="20" style="width:68%;float:right"></el-input>
          </el-form-item>

          <el-form-item label="学院" v-if="userDate.c_type==0">
            <el-select v-model="activeSchool" placeholder="请选择学院" @change="select">
              <el-option v-for="v in school" :key="v.p_n_id" :label="v.c_name" :value="v.p_n_id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="专业" v-if="userDate.c_type==0">
            <el-select v-model="activeMajor" placeholder="请选择专业">
              <el-option v-for="v in major" :key="v.p_n_id" :label="v.c_name" :value="v.p_n_id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="个人简介" v-if="userDate.c_type== 1">
            <el-input type="textarea" v-model="userDate.c_resume" rows="10"></el-input>
          </el-form-item>

          <el-form-item class="message_btn">
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </div>
</template>

<script>
import studyTop from '@/components/studyTop'
import { myMessage, allMajor, updateMyMessage } from '@/api/course.js'
export default {
  data () {
    return {

      text: '基本资料',
      userDate: {}, // 用户资料
      uid: '',  // 用户id
      school: [], // 学院列表
      major: [], // 专业列表
      activeSchool: '', // 选中的学校
      activeMajor: '',// 选中的专业
      AreaCode: ""
    }
  },
  created () {
    // 获取用户id
    this.uid = JSON.parse(sessionStorage.getItem('user')).p_n_id
    this.queryMyMessage()
  },
  components: {
    studyTop
  },
  methods: {
    // 我的资料
    queryMyMessage () {
      var data = {
        id: this.uid
      }
      myMessage(data).then(res => {
        this.userDate = res.message
        this.school = res.school
        this.major = res.major
        this.activeSchool = this.userDate.c_school == null || this.userDate.c_school == '' ? '' : parseInt(this.userDate.c_school)
        this.activeMajor = this.userDate.c_major != '' && this.userDate.c_major != null ? parseInt(this.userDate.c_major) : ''
        var tel = this.userDate.c_tel
        var flag = tel.indexOf('-')
        if (flag != -1) {
          this.AreaCode = tel.substring(0, flag)
          this.userDate.c_tel = tel.substring(flag + 1)
        }

      })
    },
    // 查找专业

    // 提交修改
    onSubmit () {
      // 判断手机格式
      // const p = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (this.userDate.c_tel == null || this.userDate.c_tel == '') {
        this.$message({
          message: '手机号不得为空！',
          type: 'error'
        })
        return false
      }
      if (this.AreaCode == null || this.AreaCode == '') {
        this.$message({
          message: '区号不得为空！',
          type: 'error'
        })
        return false
      }
      //
      if (this.userDate.c_name == null || this.userDate.c_name == '') {
        this.$message({ message: '姓名不能为空！', type: 'error' })
        return false
      }

      var { c_name, c_tel, c_resume } = this.userDate
      var data = {
        c_name,
        c_tel: this.AreaCode + "-" + c_tel,
        c_resume,
        c_school: this.activeSchool,
        c_major: this.activeMajor,
        id: this.uid
      }
      updateMyMessage(data).then(res => {
        res > 0 ? this.$message({ type: 'success', message: '修改成功！' }) :
          this.$message({ type: 'err', message: '修改失败！' })
        // 重新加载数据
        this.queryMyMessage()
      }).catch((err) => {
        this.$message({
          message: '系统错误',
          type: 'error'
        })
      })
    },
    // 选中学院时查找学院对应的专业
    select (value) {
      var data = {
        id: value
      }
      // 查找专业
      allMajor(data).then(res => {
        this.major = res
        if (value == this.userDate.c_school) {
          this.activeMajor = parseInt(this.userDate.c_major)
        } else {
          this.activeMajor = ''
        }

      })
    },

  }
}
</script>

<style scoped>
@import "../../common/css/common.css";

.el-input__inner,
.el-input:focus {
  border: blanchedalmond solid 1px;
}

.el-select-dropdown__item.selected {
  color: #e6984dff;
}
.message_btn >>> .el-button--primary {
  background-color: #e6984dff;
  border-color: #e6984dff;
}
.mystudy_right {
  overflow: scroll;
}
</style>