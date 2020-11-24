import VeHistogram from 'v-charts/lib/histogram'
import VePie from 'v-charts/lib/pie'
import VeLine from 'v-charts/lib/line'
import VeRing from 'v-charts/lib/ring'

const echarts ={
    install:function(Vue){
        Vue.component(VeHistogram.name, VeHistogram)
        Vue.component(VePie.name, VePie)
        Vue.component(VeLine.name, VeLine)
        Vue.component(VeRing.name, VeRing)


    }
}

export default echarts
