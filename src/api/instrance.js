import axios from 'axios';
import qs from 'qs';
import config from '../../config/config.js';
import { Message } from 'element-ui';
import router from "../router";
import { MessageBox } from 'element-ui';
var URI = config.apiurl

var ax = axios.create({
  baseURL: URI,
  timeout: 50000,
  headers: {
    // 'Content-Type':'application/x-www-form-urlencoded',
    // 'TOKEN': ''
  }
})

export var itr = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = qs.stringify(params)
  return ax[type](url, arg)
}

// Ajax API start
export const g = (url, params) => {
  return base('get', url, params)
}

export const p = (url, params, mask, clear, silent) => {
  return base('post', url, params, mask, clear, silent)
}

export const d = (url, params) => {
  return base('delete', url, params)
}

export const u = (url, params) => {
  return base('put', url, params)
}
export const pa = (url, params) => {
  return base('patch', url, params)
}

export const op = (url, params) => {
  return base('options', url, params)
}
// Ajax API end

export function base (type, url, params, mask = false, clear = true, silent = false) {
  return new Promise((resolve, reject) => {
    itr(type, url, params).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((msg) => {
      if (!msg.response) {
        // alert('服务器连接超时')
      } else {
        // alert(msg.response.status + ':' + msg.response.statusText)
      }
      reject(msg.message)
    })
  })
}



// ----------------------------------------------传json




// 添加一个响应拦截器
// axios.interceptors.response.use(function (response) {
//   console.log('拦截器：', response)

//   return response;
// }, function (error) {
//   // Do something with response error
//   console.dir(error);
//   this.$message('服务器连接失败')
//   return Promise.reject(error);
// })





export var itrJson = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let token = sessionStorage.getItem('token');
  if (!token) {
    token = null;
  }

  var axJson = axios.create({
    baseURL: URI,
    timeout: 20000,
    headers: {
      'token': token,
      'Content-Type': 'application/json',
    }
  });

  let arg = JSON.stringify(params);
  // let arg = qs.stringify(params)
  return axJson[type](url, arg)
}

// Ajax API start
export const pJson = (url, params, mask, clear, silent) => {
  return baseJson('post', url, params, mask, clear, silent)
}
// Ajax API end

export function baseJson (type, url, params, mask = false, clear = true, silent = false) {
  return new Promise((resolve, reject) => {
    itrJson(type, url, params).then((response) => {
      // console.log('status', response)
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((msg) => {
      // console.log(msg.message)
      if ((msg.message).match(401)) {
        console.log('token验证失败')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        MessageBox.alert('登录已过期，请重新登录', '', {
          confirmButtonText: '确定',
          callback: action => {
            top.location.href = "https://www.cpu-edu.com"
            // top.location.href = "http://test.cpu-edu.com"
            // top.location.href = "http://127.0.0.1:8099/" //fllinag
          }
        });
        // Message.error('请重新登录');
        // setTimeout(() => {
        //   // router.push({ path: '/', query: {} });
        //   top.location.href = "https://wx.cpu-edu.com"
        // }, 1000);
      }
      if (!msg.response) {
        // alert('服务器连接超时')
      } else {
        // alert(msg.response.status + ':' + msg.response.statusText)
      }
      reject(msg.message)
    })
  })
}



// ----------------------------------------------传Blob 
var axJsonBlob = axios.create({
  baseURL: URI,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export var itrJsonBlob = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = JSON.stringify(params);
  // let arg = qs.stringify(params)
  return axJsonBlob[type](url, arg)
}

// Ajax API start
export const pJsonBlob = (url, params, mask, clear, silent) => {
  return baseJsonBlob('post', url, params, mask, clear, silent)
}
// Ajax API end

export function baseJsonBlob (type, url, params, mask = false, clear = true, silent = false) {
  return new Promise((resolve, reject) => {
    itrJsonBlob(type, url, params).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((msg) => {
      if (!msg.response) {
        // alert('服务器连接超时')
      } else {
        // alert(msg.response.status + ':' + msg.response.statusText)
      }
      reject(msg.message)
    })
  })
}