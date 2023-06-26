import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'

createApp(App).use(store).use(router).mixin(mixins).mount('#app')

window.Kakao.init('be3591e5eb435becf923984f4b447ac2');
