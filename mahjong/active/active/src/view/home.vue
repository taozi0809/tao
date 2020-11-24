<template>
    <div class="home">
        <start v-if="start==0"/>
        <mjmain v-if="start==1"/>
        <over v-if="start==2"/>
        <active v-if="start==3"/>

    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    import start from "../components/start";
    import over from "../components/over";
    import mjmain from "../components/main";
    import active from "../components/active";

   import {ws} from "../service/ws";

    export default {
        components:{over,mjmain,start,active},
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['start'])
        },
        created() {

        },
        mounted() {
            ws()
        },
        methods:{
            ...mapMutations(['LOGININFO']),

        }
    }
</script>