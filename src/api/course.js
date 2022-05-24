import * as ax from './instrance';
import config from '../../config/config.js';
var URL = config.apiUrl;
// 课程详情
export const courseDetail = params => {
  return ax.pJson(URL + '/client/clientCourseController/courseDetail', params);
}

// 课程评论
export const commentList = params => {
  return ax.pJson(URL + '/client/clientCourseController/commentList', params);
}

// 获取客服的二维码、微信号
export const selectList = () => {
  return ax.pJson(URL + '/client/clientCourseController/selectList');
}

// 学生购买的课程
export const ourCourse = params => {
  return ax.pJson(URL + '/client/clientCourseController/ourCourse', params);
}

// 我的信息
export const myMessage = params => {
  return ax.p(URL + '/client/clientCourseController/myMessage', params);
}

// 购买的课程章节
export const myStudyDetail = params => {
  return ax.pJson(URL + '/client/clientCourseController/myStudyDetail', params);
}

// 下载文件
export const FileDownload = params => {
  return ax.p(URL + '/client/clientCourseController/FileDownload', params);
}

// 查找要上课的课程
export const teacher_Course = params => {
  return ax.pJson(URL + '/client/clientCourseController/teacherCourse', params);
}
// 按月查询课程，以用来显示日历上的点
export const courseByMouth = params => {
  return ax.pJson(URL + '/client/clientCourseController/courseByMouth', params);
}

// 老师开课 
export const createHy = params => {
  return ax.p(URL + '/client/clientCourseController/createHy', params);
}

// 观看新增历史记录
export const courseHistory = params => {
  return ax.pJson(URL + '/client/clientCourseController/courseHistory', params);
}

// 用户评论
export const addComment = params => {
  return ax.pJson(URL + '/client/clientCourseController/addComment', params);
}

// 用户是否购买该章节 
export const ifBuyChapter = params => {
  return ax.pJson(URL + '/client/clientCourseController/ifBuyChapter', params);
}

// 根据学校id查询专业

export const allMajor = params => {
  return ax.p(URL + '/client/clientCourseController/allMajor', params);
}

// 修改信息
export const updateMyMessage = params => {
  return ax.pJson(URL + '/client/clientCourseController/updateMyMessage', params);
}

// 我的订单
export const myOrder = params => {
  return ax.pJson(URL + '/client/clientCourseController/myOrder', params);
}

// 订单详情
export const queryOrderById = params => {
  return ax.pJson(URL + '/client/clientCourseController/queryOrderById', params);
}

// 我的余额
export const myWallet = params => {
  return ax.p(URL + '/client/clientCourseController/myWallet', params);
}

// 我的账户流水
export const myAccountFlow = params => {
  return ax.pJson(URL + '/client/clientCourseController/myAccountFlow', params);
}

// 我的积分流水
export const myIntegralFlow = params => {
  return ax.pJson(URL + '/client/clientCourseController/myIntegralFlow', params);
}


// 添加退款
export const addRefund = params => {
  return ax.pJson(URL + '/client/clientCourseController/addRefund', params);
}

// 查找充值活动
export const rechargeActivity = params => {
  return ax.pJson(URL + '/client/clientCourseController/rechargeActivity', params);
}
// 提交积分充值
export const submitRecharge = params => {
  return ax.pJson(URL + '/client/clientCourseController/submitRecharge', params);
}

// 添加现金充值
export const cashRecharge = params => {
  return ax.pJson(URL + '/client/clientCourseController/cashRecharge', params);
}

// 用户是否该买了全课
export const ifBuyAllChapter = params => {
  return ax.pJson(URL + '/client/clientCourseController/ifBuyAllChapter', params);
}

// 普通课程开课
export const addCourseClass = params => {
  return ax.pJson(URL + '/classin/addCourseClass', params);
}

// 公开课开课
export const addCourseClassGK = params => {
  return ax.pJson(URL + '/classin/addCourseClassGK', params);
}

// 打开教室
export const getLoginLinked = params => {
  return ax.pJson(URL + '/classin/getLoginLinked', params);
}

// 添加老师订单
export const teacherOrder = params => {
  return ax.pJson(URL + '/client/order/teacherOrder', params);
}