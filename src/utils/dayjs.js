import Vue from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// 相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// vue过滤器
// 参数一：过滤器名
// 参数二：过滤器函数
// 使用方式：{{表达式 | 过滤器名 }}
// 表达式会传进过滤器函数里
// 过滤器的返回值，会在使用的位置
Vue.filter('relativeTime',value=>{
  return dayjs().to(dayjs(value))
})

