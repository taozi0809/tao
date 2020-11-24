<template>
    <div class="home">
        home
        <Nav/>
    </div>
</template>

<script>
    import Nav from '../../components/nav'
    export default {
        components:{Nav},
        data(){
            return{

            }
        },
        created:function(){
            var payStatus=this.$route.query.payStatus
            if(!!payStatus){
                if(payStatus=='success'){
                    this.$router.push({ path:'/paySuccess'})
                }
                if(payStatus=='error'){
                    this.$router.push({ path:'/payError'})
                }
            }
        }
    }
</script>