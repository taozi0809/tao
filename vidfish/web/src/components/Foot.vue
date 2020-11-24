<template>
    <div class="foot">
       <section class="foot-main">
           <ul>
               <li><a href="https://www.vidfish.net">{{lang.hasOwnProperty('lang')?langCon[lang.lang].foot.corporate:''}}</a></li>
               <li><a href="https://www.vidfish.net/terms-of-use/">{{lang.hasOwnProperty('lang')?langCon[lang.lang].foot.terms:''}}</a></li>
               <li><a href="https://www.vidfish.net/privacy-policy/">{{lang.hasOwnProperty('lang')?langCon[lang.lang].foot.privacy:''}}</a></li>
               <li><a @click="contactUs">{{lang.hasOwnProperty('lang')?langCon[lang.lang].foot.contactUs:''}}</a></li>
           </ul>
           <p class="pet-ltd">{{lang.hasOwnProperty('lang')?langCon[lang.lang].foot.petLtd:''}}</p>
       </section>
    </div>
</template>
<script>
    import {langCon} from "../assets/data/langCon";
    import {mapState, mapMutations} from 'vuex'
    export default {
        computed:{
            ...mapState(['lang']),
        },
        created:function(){
            this.langCon=langCon
        },
        methods:{
            contactUs(){
                switch (this.lang.lang){
                    case 'ZH':
                        alert('如有任何查询，请电邮到 hello@vidfish.com')
                        break;
                    case 'EN':
                        alert('If you have any questions or enquiries, please email us at hello@vidfish.com')
                        break;
                    case 'IND':
                        alert('Jika Anda punya pertanyaan atau perlu keterangan, silakan kirim surel ke hello@vidfish.com')
                        break;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .foot{
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        padding-top: 50px;
        padding-bottom: 20px;
        .foot-main{
            width: 1200px;
            margin: 0 auto;
           ul{
               width: 100%;
               display: flex;
               align-items: center;
               justify-content: space-between;
               margin-bottom: 40px;
               li{
                   a{
                        color: #fff;
                       font-size: 16px;
                   }
                   a:hover{
                       color: #358dfe;
                       cursor: pointer;
                   }
               }
           }
            .pet-ltd{
                text-align: center;
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>