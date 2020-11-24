<template>
    <div class="loadPage" ref="loadPage" v-if="loadPage.is_loadPage">
        <div class="loading" v-if="loadPage.status==0">
            <span><img src="../../assets/img/loading2.png" alt=""></span>
            <p>{{loadPage.message}}</p>
        </div>
        <div class="no-data" v-if="loadPage.status==2">
            <span><img src="../../assets/img/no-data.png" alt=""></span>
            <p>{{loadPage.message}}</p>
        </div>
    </div>
</template>

<script>
  export default {
      data(){
          return{
              loadPage:{
                  status:"",
                  message:"",
                  is_loadPage:false,
              },
          }
      },

      methods:{
          LoadPage(status,message,is_loadPage){
              this.loadPage = {
                  status:status,
                  message:message,
                  is_loadPage:is_loadPage
                  // continue: setTimeout(() => {
                  //     this.loadPage.status = ''
                  //     this.loadPage.is_loadPage=false
                  // },10000)
              }
          },
      }
  }
</script>

<style type="text/scss" scoped lang="scss">
    .loadPage{
        width: 100%;
        position: absolute;
        top: 20%;
        display: flex;
        align-items: center;
        justify-content: center;

        .loading,.no-data{
            text-align: center;
            width: 100%;
            span{
                display: block;
                width: 60px;
                overflow: hidden;
                height: 60px;
                margin: 0 auto;
                margin-bottom: 20px;
                img{
                    width: 100%;
                }
            }
            p{
                color: #bfbfbf;
                font-size: 24px;
            }
        }
        .loading{
            img{
                -webkit-animation: spin 1s linear 1s 5 alternate;
                animation: spin 1s linear infinite;
            }
        }
    }
    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
