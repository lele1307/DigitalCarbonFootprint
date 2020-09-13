import VueRouter from 'vue-router' 
import home from '../components/home.vue'
import generalapp from '../components/generalapp.vue'
import video from '../components/video.vue'
import audio from '../components/audio.vue'
import message from '../components/message.vue'
import game from '../components/game/game.vue'
import result from '../components/result.vue'

let router = new VueRouter({
    routes:[
        {path: '/', redirect: '/home'},
        {path: '/home', component: home},
        {path: '/genApp', component: generalapp},
        {path: '/video', component: video},
        {path: '/audio', component: audio},
        {path: '/messaging', component: message},
        {path: '/gaming', component: game},
        {path: '/result', component: result}
    ]
})
export default router