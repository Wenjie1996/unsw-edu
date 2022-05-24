import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/main'
import Course from '@/page/course'
import courseDetail from '@/page/courseDetail'
import code from '@/page/code'
import joinus from '@/page/joinus'
import aboutus from '@/page/aboutus'
import myStudy from '@/page/myStudy/myStudy'
import pay from '@/page/pay/pay'
import paysavn from '@/page/pay/paysavn'
import page from '@/page/pay/page'
import contactUs from '@/page/bottom/contactUs'
import useAgreement from '@/page/bottom/useAgreement'
import privacyPolicy from '@/page/bottom/privacyPolicy'
import refund from '@/page/bottom/refund'
import publicClassList from '@/page/publicClass/publicClassList'
import publicClassDetail from '@/page/publicClass/publicClassDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/course',
      name: 'course',
      component: Course,
      meta: {
        title: '课程总览'
      }
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: courseDetail,
      meta: {
        title: '课程详情'
      }
    },
    {
      path: '/code',
      name: 'code',
      component: code,
      meta: {
        title: '轮播图详情'
      }
    },
    {
      path: '/joinus',
      name: 'joinus',
      component: joinus,
      meta: {
        title: '加入我们'
      }
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus,
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/myStudy',
      name: 'myStudy',
      component: myStudy,
      meta: {
        title: '我的学习中心'
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/page',
      name: 'page',
      component: page,
      meta: {
        title: '支付包跳转'
      }
    },
    {
      path: '/paysavn',
      name: 'paysavn',
      component: paysavn,
      meta: {
        title: '确认支付'
      }
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: contactUs,
      meta: {
        title: '联系我们'
      }
    },
    {
      path: '/useAgreement',
      name: 'useAgreement ',
      component: useAgreement,
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/privacyPolicy',
      name: 'privacyPolicy ',
      component: privacyPolicy,
      meta: {
        title: '隐私政策'
      }
    },
    {
      path: '/refund',
      name: 'refund ',
      component: refund,
      meta: {
        title: '退款协议'
      }
    },
    {
      path: '/publicClassList',
      name: 'publicClassList ',
      component: publicClassList,
      meta: {
        title: '公开课列表'
      }
    },
    {
      path: '/publicClassDetail',
      name: 'publicClassDetail ',
      component: publicClassDetail,
      meta: {
        title: '公开课详情'
      }
    }

  ]
})
