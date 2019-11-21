import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入vuetify
import Vuetify from 'vuetify'
// vuetify样式
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// 引入 apollo-boost  vue-apollo
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";


Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  // 这里使用绝对路径
  uri: "http://localhost:4000/graphql"
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
