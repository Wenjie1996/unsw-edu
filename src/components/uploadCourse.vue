<template>
  <div>
    <el-dialog :title="sname" :visible.sync="centerDialogVisible" width="30%" center>

      <el-upload class="upload-demo" :action="fileUpload" :data="{path:'file'}" :limit='1' :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeUpload" :file-list="fileList" list-type="picture" accept=".flv,.rvmb,.mp4,.avi,.wmv,.pdf,.docx,.doc,.jpg,.jpeg,.png,.bmp,.BMP,.JPG,.PNG,.JPEG">
        <el-button size="small" type="warning">点击上传</el-button>

      </el-upload>
    </el-dialog>
  </div>

</template>

<script>
import config from '../../config/config.js'
import { fileAdd } from '../api/main.js'
export default {
  data () {
    return {
      fileUpload: config.apiUrl + '/upload/fileupload',
      fileList: [],
      centerDialogVisible: false,
      sname: '',
      sid: '', // 章节id
      cid: '' // 课程id
    };
  },
  methods: {
    beforeUpload (file) {

      var tmp = false;
      if (file.name == "") {
        this.$message("请选择文件")
        tmp = false;
      } else {
        /*图片类型正则验证*/
        var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
        // if (!imgStr.test(file.name)) {
        //   this.$message("文件不是图片类型")

        //   tmp = false;
        // } else {
        //   /*图片大小*/
        //   var imagSize = file.size;
        //   if (imagSize.toFixed(2) <= (10 * 1024 * 1024)) {
        //     tmp = true;
        //   } else {
        //     this.$message(life.name + "大小不能超过" + "10" + "M")
        //     tmp = false;
        //   }
        // }
      }
      return true;
    },
    uploadSuccess (res, file, fileList) {

      let _this = this
      if (res.length > 0) {

        var type = '-1';
        var suffix = this.getFileType(file.name)
        if (suffix === 'video') {
          type = '0'
        } else if (suffix === 'pdf') {
          type = '1'
        } else if (suffix === 'word') {
          type = '2'
        } else {
          type = '-1' // 其他
        }
        this.fileList = fileList
        let param = {
          n_courseid: this.cid,
          n_course_sonid: this.sid,
          c_url: res[0].url,
          c_name: res[0].name,
          c_type: type
        }
        fileAdd(param).then(res => {
          console.log(res)
          if (res.err == 'success') {
            this.$notify({
              title: "成功",
              message: "上传成功",
              type: "success",
            });

          } else {
            this.$notify.error({
              title: "上传失败",
              message: res.err,
            });
          }
        })
      } else {
        this.$notify.error({
          title: "上传失败",
          message: res.err,
        });
      }
      setTimeout(() => {
        this.fileList = []
      }, 1000);
    },
    handleRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePreview (file) {
      // console.log(file);
    },

    // 获取父组件的数据
    getData (text, name, sid, cid) {
      this.centerDialogVisible = text
      this.sname = name + '-课件上传'

      this.sid = sid
      this.cid = cid

    },
    getFileType (fileName) {
      // 后缀获取
      let suffix = '';
      // 获取类型结果
      let result = '';
      try {
        const flieArr = fileName.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      // fileName无后缀返回 false
      if (!suffix) { return false; }
      suffix = suffix.toLocaleLowerCase();
      // 图片格式
      const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
      // 进行图片匹配
      result = imglist.find(item => item === suffix);
      if (result) {
        return 'image';
      }
      // 匹配txt
      const txtlist = ['txt'];
      result = txtlist.find(item => item === suffix);
      if (result) {
        return 'txt';
      }
      // 匹配 excel
      const excelist = ['xls', 'xlsx'];
      result = excelist.find(item => item === suffix);
      if (result) {
        return 'excel';
      }
      // 匹配 word
      const wordlist = ['doc', 'docx'];
      result = wordlist.find(item => item === suffix);
      if (result) {
        return 'word';
      }
      // 匹配 pdf
      const pdflist = ['pdf'];
      result = pdflist.find(item => item === suffix);
      if (result) {
        return 'pdf';
      }
      // 匹配 ppt
      const pptlist = ['ppt', 'pptx'];
      result = pptlist.find(item => item === suffix);
      if (result) {
        return 'ppt';
      }
      // 匹配 视频
      const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
      result = videolist.find(item => item === suffix);
      if (result) {
        return 'video';
      }
      // 匹配 音频
      const radiolist = ['mp3', 'wav', 'wmv'];
      result = radiolist.find(item => item === suffix);
      if (result) {
        return 'radio';
      }
      // 其他 文件类型
      return 'other';

    }
  }
}
</script>

<style  scoped>
@import "../common/css/common.css";
</style>