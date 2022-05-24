<template>
  <div>
    <div class="block">
      <span class="demonstration">课程内容</span>
      <el-rate v-model="content" class="rate"></el-rate>
    </div>
    <div class="block">
      <span class="demonstration">讲课风格</span>
      <el-rate v-model="style" class="rate"></el-rate>
    </div>
    <div class="block">
      <span class="demonstration">讲课逻辑</span>
      <el-rate v-model="logic" class="rate"></el-rate>
    </div>
    <div class="block">
      <span class="demonstration"> 课后答疑</span>
      <el-rate v-model="answer" class="rate"></el-rate>
    </div>
    <div class="block">
      <span class="demonstration">综合评价</span>
      <el-rate v-model="valuation" class="rate"></el-rate>
    </div>
    <el-input :rows="5" type="textarea" placeholder="请输入评论" @keyup.enter.native="submitMessage" v-model="comment" style="font-size:18px">
    </el-input>
    <el-checkbox v-model="checked" class="anonymous">匿名评价</el-checkbox>
    <el-button class="submit-btn" type="primary" @click="submitMessage" :disabled="comment == ''">提交
    </el-button>
    <el-popover placement="bottom" title="标题" width="500" height="700" trigger="click" v-model="emojiShow">
      <el-button slot="reference" class="emojiButton">😀</el-button>
      <div class="browBox">
        <ul>
          <li v-for="(item, index) in faceList" :key="index" @click="getBrow(index)" class="emojiClass">
            {{ item }}
          </li>
        </ul>
      </div>
    </el-popover>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import { addComment } from '../api/course.js'
const appData = require("@/assets/emojis.json");
export default {
  props: ['sectionId', 'courseId'],
  data () {
    return {
      comment: "",
      //表情框是否展示
      emojiShow: false,
      //表情列表
      faceList: [],
      //表情文本
      getBrowString: "",
      user: '',
      content: 0, 
      style: 0, 
      logic: 0, 
      answer: 0,
      valuation: 0,
      checked: false
    }
  },
  created () {
    this.user = JSON.parse(sessionStorage.getItem("user"))
    this.loadEmojis()
  },
  methods: {
    //加载表情，存放到表情列表中
    loadEmojis () {
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow (index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.comment += this.getBrowString;
        }
      }
      this.emojiShow = false;
    },
    // 提交评论
    submitMessage () {
      // 数据
      var data = {
        comment: this.comment,
        sectionId: this.sectionId,
        userId: this.user.userId,
        aduitStatus: 2,
        courseId: this.courseId,
        showName: this.checked == false ? 1 : 0,
        valuation: this.valuation,
        content: this.content,
        style: this.style,
        logic: this.logic,
        answer: this.answer
      }
      addComment(data).then(res => {
        if (res.err == 'success') {
          this.$message({
            type: 'success',
            message: '评论成功'
          })
          this.comment = ''
          this.$emit('func')
        } else {
          this.$message({
            type: 'error',
            message: '评论失败'
          })
        }
      })
      // 提交。。。
    },
    // 父组件触发方法
    clearRate () {
      this.comment = ''
      this.checked = false
      this.courseware = 0
      this.classStyle = 0
      this.logic = 0
      this.afterClass = 0
      this.totality = 0
    }
  }

}
</script>

<style scoped>
.browBox {
  width: 100%;
  background: #f3f3f3;
  position: absolute;
  z-index: 100;
  bottom: 0px;
  overflow: scroll;
}
.submit-btn {
  margin: 10px 15px 0px 10px;
  float: right;
  background: #e6984dff;
  border: #e6984dff solid 1px;
}

.emojiClass {
  list-style: none;
  width: 20px;
  height: 20px;
  float: left;
}
.emojiButton {
  float: right;
  margin-top: 10px;
}
.emojiButton:hover {
  background: #fdf8f4;
  border: #e6984dff solid 1px;
}
.demonstration {
  float: left;
}
.rate {
  float: left;
  margin-left: 10px;
}
.block::after {
  content: "";
  clear: both;
  display: block;
}
.block {
  margin-bottom: 10px;
}
.anonymous >>> .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #e6984dff;
  border-color: #e6984dff;
}
.anonymous >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #e6984dff;
}
.anonymous {
  margin-top: 5px;
}
.anonymous >>> .el-checkbox__inner:hover {
  border-color: #e6984dff;
}
</style>