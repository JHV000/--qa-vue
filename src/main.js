import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库store
import store from '@/store'
//引入swiper.css
import 'swiper/css/swiper.css'
//引入swiper组件
Vue.config.productionTip = false
//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

//引入全局组件
import Header from '@/components/Header'
import questionCard from '@/components/questionCard'
import dayjs from "dayjs"
Vue.prototype.dayjs = dayjs;//可以全局使用dayjs
Vue.component(Header.name,Header)
Vue.component(questionCard.name,questionCard)
Vue.prototype.$message = ElementUI.Message
//引入插件
Vue.use(ElementUI);
// Vue.use(new VueSocketIO({
//     debug: true,
//     // 服务器端地址
//     connection: SocketIO('http://127.0.0.1:8888'),
//     options:{
//       // path: "/api/socket.io/" 
//     }
    
// }))
new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate() {
    //这里的this就是vm
    Vue.prototype.$bus = this
  },
  //注册路由
  router,
  //注册仓库，组件实例会出现一个属性$store
  store
}).$mount('#app')