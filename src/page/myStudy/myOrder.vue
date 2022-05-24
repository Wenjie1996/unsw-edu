<template>
  <div>
    <!--我的订单-->
    <el-col :span="19">
       <div class="mystudy_right">
          <!--面包屑导航栏组件-->
        <breadcrumb v-bind:text='text' v-bind:name='name' ref="sonBreadcrumb"  @back="getSonData"></breadcrumb>

        <div class="myOrder_tabs_out" >
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-show="!orderDetail">
            <el-tab-pane label="课程订单" name="2" >
               <div class="courseOrder_out cur" v-for="(v, index) in courseList" :key="index" @click="queryOrderDetail(v.p_c_id)" > 
                 <el-image :src="src + v.c_purl"  class="courseImg"></el-image> 
                  <span class="course_title">{{v.c_name}}</span>
                  <i class="el-icon-s-management courseOrder_icon"></i> 
                  <span class="course_order_chapter">{{v.sname}}</span>
                  <span class="course_order_time">{{v.d_addtime}}</span>
                  <span class="course_order_state" v-if="v.c_pay_state==1" style="color:#5aea5a">已付款</span>
                  <span class="course_order_state" v-if="v.c_pay_state==0" style="color:#F56C6C">未付款</span>
                  <span class="course_order_state" v-if="v.c_pay_state==2" style="color:#7372d3">待审核</span>
                  <span class="course_order_price">A${{v.n_money}}</span>
               </div>
              <div v-if="courseList==null || courseList == ''">暂无订单</div>
            </el-tab-pane>
            <el-tab-pane label="充值订单" name="1" >
              <div class="recharge_order_out cur" v-for="(i, index) in rechargeList" :key="index"  @click="queryOrderDetail(i.p_c_id)">
                 <div class="recharge_order_number">订单号：{{i.p_c_id}}</div>
                 <div class="recharge_order_money">充值金额:{{i.n_money}}</div>
                 <div class="recharge_order_give">赠送金额：{{i.c_give_integral}}</div>
                 <div class="recharge_order_time">{{i.d_addtime}}</div>
                 <span class="recharge_order_state" v-if="i.c_pay_state==2" style="color:#7372d3">待审核</span>
                 <span class="recharge_order_state" v-if="i.c_pay_state==1" style="color:#5aea5a">已付款</span>
                 <span class="recharge_order_state" v-if="i.c_pay_state==0" style="color:#F56C6C">未付款</span>
              </div>
               <div v-if="rechargeList==null || rechargeList == ''">暂无订单</div>
            </el-tab-pane>
                 <!--分页-->
              <div class="block ms_page order_page" v-if="count>0" >
              <el-pagination layout="prev, pager, next" :total="count" :page-size="pageSize" @current-change="handleCurrentChange"> </el-pagination>
            </div>
          </el-tabs>
        </div> 

        <!--订单详情-->
        <div v-show="orderDetail">
          <!--课程订单详情-->
          <div  style="position:relative;margin-left:10px">
            <div style="border-bottom:#dbdbdb solid 1px;padding-left:20px;width:90%;padding-bottom:10px" v-show="activeName==2">
                <el-image :src="src + courseDetail.c_purl"  class="courseImg"></el-image> 
                <span style="font-size:20px;font-weight:bold;position: absolute;top:0px;margin-left:10px">{{courseDetail.cname}}</span>
                <i class="el-icon-s-management courseOrder_icon" style="top:60px"></i> 
                <span class="course_order_chapter"  style="top:60px">{{courseDetail.sname}}</span>
            </div>

            <div style="padding-left:20px">
             <div style="margin-top:10px">
               <span>订单号:</span> {{courseDetail.p_c_id}}
             </div>
              <div style="margin-top:10px">
                 <span>下单时间: </span> {{courseDetail.d_addtime}}
             </div>

             <div style="margin-top:10px">
                 <span>订单状态: </span> {{courseDetail.c_pay_state==0?"未付款":courseDetail.c_pay_state==1?"已付款":"待审核"}}
             </div>

             <div style="margin-top:10px;">
              <div>支付凭证: <span v-if="cre_img==''">暂无支付凭证</span></div>
               <el-image v-for="(item, index) in cre_img" :key="index" :src="item" style="width:100px;height:100px;margin:5px 0px 0px 5px" 
               @click.native="onpenImg(item)" class="cur"></el-image> 
             
             </div>
             
              <div style="margin-top:10px" v-if="activeName==2">
                 <span>商品总额: </span> A${{courseDetail.n_australian_dollar}}
             </div>

             <div style="margin-top:10px" v-if="courseDetail.n_integral != 0 && courseDetail.n_integral != null">
                 <span>积分抵扣: </span>{{courseDetail.n_integral}}
             </div>

             <div style="margin-top:10px" v-if="courseDetail.n_balance != 0 && courseDetail.n_balance != null">
                 <span>余额抵扣: </span>{{courseDetail.n_balance}}
             </div>

              <div style="margin-top:10px" v-if="activeName==1">
                 <span>充值订单金额: </span>A${{courseDetail.n_goods_money}}
             </div>
              
              <div style="margin-top:10px"  v-if="activeName==1">
                 <span>充值赠送金额: </span>{{courseDetail.c_give_integral}}
             </div>
 
            <div style="margin-top:10px">
                 <span>支付方式: </span>{{payType}}
             </div>
             
              <div style="margin-top:10px;">
                 <span>汇率: </span>{{courseDetail.n_hl}}
             </div>
              <div style="margin-top:10px;font-weight:bold;font-size:18px">
                 <span>实付款: </span>A${{courseDetail.n_money}}
             </div>
             
            </div>

          </div>

        </div>
    </div>


    </el-col>
  </div>
</template>

<script>
import studyTop  from '@/components/studyTop'
import breadcrumb from '@/components/breadcrumb'
import config from '../../../config/config.js'
import { myOrder, queryOrderById} from '../../api/course'
var URL = config.apiUrl
export default {
    data() {
      return {
        text: '我的订单', // 向子组件传数据
        activeName: '2',
        courseList: '', // 购买订单
        rechargeList: '', // 充值订单
        count: 0 ,
        curpage: 0,
        pageSize: 3,
        src: URL ,
        orderDetail: false,
        name: '订单详情', // 面包屑导航栏 向子组件传数据
        courseDetail: '', //订单详情
        cre_img: [], // 支付凭证
        payType: '' // 支付方式
      }
    
    },
    props: ['uid'],  // 获取id
    components: {
      studyTop,
      breadcrumb
    },
    created () {
      this.queryMyOrder()
    },
    methods: {
      // 重置分页数据
       handleClick(event) {
         this.count = 0
         this.curpage = 0
         this.queryMyOrder()
      },
      // 订单查找
      queryMyOrder() {
        var data = {
          id: this.uid,
          type: this.activeName,
          pagesize: this.pageSize,
          curpage: this.curpage
        }
        
        myOrder(data).then( res => {
          this.count = res.count
          this.activeName == 2? this.courseList = res.list:
          this.rechargeList = res.list
        })
      },
      
      handleCurrentChange (currentPage) {
      this.curpage = currentPage
       this.queryMyOrder()
    },
    // 订单详情查找
      queryOrderDetail(oId) {
        this.cre_img = []
         this.orderDetail = true
          // 向面包屑导航栏组件传递数据
         this.$refs.sonBreadcrumb.getData(true)
         var data = {
           p_c_id: oId
         }
        
         queryOrderById(data).then( res => {
          this.courseDetail = res
          // 获取支付凭证
          this.img = URL + res.c_purl
          var str = res.c_pay_order.split(',')
          for (var i = 0; i < str.length; i++) {
            if (res.c_pay_order != '') {
              this.cre_img.push(config.apiUrl + str[i])
            }
          }
        // 获取支付方式
        switch (parseInt(res.c_typr)) {
        case 0:
          this.payType = '微信支付'
          break
        case 1:
          this.payType = '支付宝支付'
          break
        case 2:
          this.payType = '手工添加'
          break
        case 3:
          this.payType = '澳币支付'
          break
        case 4:
          this.payType = '积分支付'
          break
        case 5:
          this.payType = '余额支付'
          break
      }
         })
        
      },
      // 获取子组件数据
      getSonData(msg) {
        this.orderDetail = msg
      },
      onpenImg(url) {
       window.open(url, '_blank')
        }
    } 
}
</script>

<style  scoped>
@import "../../common/css/common.css";
/* 购买订单 */
.myOrder_tabs_out {
   margin: 0 30px;
}
.order_page >>>.el-pager li.active {
  color: #e6984d;
}
.order_page >>>.el-pager li:hover {
  color: #e6984d;
}
.order_page {
  margin-top:10px
}
  
.myOrder_tabs_out >>> .el-tabs__item.is-active {
  color: #e6984d;
}
.myOrder_tabs_out >>> .el-tabs__item:hover {
  color: #e6984d;
}
.courseImg {
  width: 138px;
  height: 92px;
}

.courseOrder_out {
  position: relative;
  margin-top:10px;
  border-bottom: rgb(219, 219, 219) solid 1px;
  padding-bottom: 10px;
}
.course_title {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}
.courseOrder_icon {
   position: absolute;
   color: #fa8748;
   font-size: 24px;
   top:45px;
   margin-left: 10px;
}
.course_order_chapter {
  position: absolute;
   color: #fa8748;
  top:45px;
  margin-left: 35px;
  font-size: 15px;

}
.course_order_time {
  color: darkgrey;
  font-size: 15px;
  margin-left: 10px;
}
.course_order_state {
  position: absolute;
  right: 100px;
}
.course_order_price {
  position: absolute;
   right: 100px;
   top:70px;
}

/* 充值订单 */
.recharge_order_out {
  position: relative;
  height: 125px;
  background-color: rgb(253, 253, 253);
  border-radius:5px;
  padding:5px 10px 10px 15px;
  margin-top:10px;
  box-shadow: 1px 1px 3px rgb(238, 238, 238);;
}
.recharge_order_number {
  font-size: 18px;
  color: #918f8b;
}
.recharge_order_money {
  margin-top: 10px;
  color: #ec9848;
   font-size: 16px;
}
.recharge_order_give {
  color: #918f8b;
  margin-top: 10px;
   font-size: 16px;
}
.recharge_order_time {
  color: #b8b3b3;
  margin-top: 10px;
}
.recharge_order_state {
  position:absolute;
  right: 100px;
  top:10px
}
.mystudy_right {
  overflow:scroll;
}

</style>