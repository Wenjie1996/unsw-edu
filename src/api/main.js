import * as ax from './instrance';
import config from '../../config/config.js';
var URL = config.apiUrl;

// 获取最新5张轮播图
export const bannerList = params => {
  return ax.pJson(URL + '/client/banner/bannerList', params);
};
// 获取轮播图详情
export const bannerDetail = params => {
  return ax.pJson(URL + '/client/home/bannerDetail', params)
}

// 获热门课程
export const getCourseList = params => {
  return ax.pJson(URL + '/client/home/getCourseList', params);
};
// 获取优质评论
export const commentsList = params => {
  return ax.pJson(URL + '/client/home/commentsList', params);
};

// 获取系统设置信息
export const selSetting = params => {
  return ax.pJson(URL + '/client/home/selSetting', params);
};

// 获取系统设置信息
export const wxQrCodeLogin = params => {
  return ax.pJson(URL + '/client/login/', params);
};

// 生成课程购买订单
export const nativepay = params => {
  return ax.pJson(URL + '/client/order/nativepay', params);
};


// 生成课程购买订单
export const orderAdd = params => {
  return ax.pJson(URL + '/xcx/order/orderAdd', params);
};

// 微信扫码支付下单
export const getpaysign = params => {
  return ax.pJson(URL + '/client/nativepay/getpaysign', params);
};

// 获取用户信息
export const checkuser = params => {
  return ax.pJson(URL + '/xcx/main/checkuser', params);
};

// 订单详情
export const orderDetail = params => {
  return ax.pJson(URL + '/client/order/orderDetail', params);
};

// 支付宝支付下单
export const alipay = params => {
  return ax.pJson(URL + '/client/alipay/getpaysign', params);
};

// 查找要工作安排
export const myworkByTime = params => {
  return ax.pJson(URL + '/client/mywork/myworkByTime', params);
}
// 按月查询工作安排，以用来显示日历上的点
export const myworkByMouth = params => {
  return ax.pJson(URL + '/client/mywork/myworkByMouth', params);
}

//修改我的工作安排状态
export const updatemyWork = params => {
  return ax.pJson(URL + '/xcx/MyWork/updatemyWork', params);
};

// 我的收入
export const income = params => {
  return ax.p(URL + '/xcx/my/income', params)
}

// 我的账户流水
export const myAccountFlow = params => {
  return ax.p(URL + '/xcx/my/myAccountFlow', params)
}

// 上传课件
export const fileAdd = params => {
  return ax.pJson(URL + '/client/opencourse/fileAdd', params)
}