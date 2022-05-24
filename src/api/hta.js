import * as ax from './instrance';
import config from '../../config/config.js';
var URL = config.apiUrl;

// 获取所有分类
export const getAllClass = params => {
  return ax.pJson(URL + '/client/opencourse/getAllClass', params);
};
//获取所有学校
export const getAllSchool = params => {
  return ax.pJson(URL + '/client/opencourse/getAllSchool', params);
};
//获取所有专业
export const getAllMajor = params => {
  return ax.pJson(URL + '/client/opencourse/getAllMajor', params);
};
//获取所有课程
export const getCourseList = params => {
  return ax.pJson(URL + '/client/opencourse/getAllCourse', params);
};
//获取章节价格
export const courseSonPrice = params => {
  return ax.pJson(URL + '/xcx/course/courseSonPrice', params);
};


