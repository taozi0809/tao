<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import {userTokenGetinfo,positionShortName,languageSelect,videoGenre} from "./service/api";
  import {getLocalStore} from "./storage";
  import {mapState, mapMutations} from 'vuex'
  export default {
      data(){
          return{
              languageCtoModelList:[],
              id:'',
          }
      },
      computed:{
          ...mapState(['userInfo','isLogin','lang']),
      },
      created:function(){
          // window.location.href = '//www.vidfish.com'


          if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
              var url='http://150.109.20.236:5009/#/home'
              var href = window.location.href
              var settlement = href.indexOf('transaction_status=settlement')!= -1
              var pending = href.indexOf('transaction_status=pending')!= -1
              if(settlement){
                  window.location.href = `${url}?payStatus=success`
              }
              if(pending){
                  window.location.href = `${url}?payStatus=error`
              }
          }

          let token = getLocalStore('token')
          if(!!token){
              userTokenGetinfo(token).then(res=>{
                  console.log('token是否过期',res)
                  if(res.code==0){
                      this.ISLOGIN(true)
                      this.USERINFO(res.data)
                  }else{
                      this.ISLOGIN(false)
                      this.USERINFO({})
                  }
              })
          }


      },
      mounted:function(){
          this.ip = getLocalStore('ip')
          let coordinate = JSON.parse(getLocalStore('coordinate'))
          if(coordinate!=null){
              if(coordinate.hasOwnProperty('lon')){
                  positionShortName(coordinate.lon,coordinate.lat,this.ip).then(res=>{
                      console.log('国家简称:',res)
                      if(res.code==0){
                          this.COUNTRY(res.data)
                      }
                  })
              }else{
                  positionShortName(null,null,this.ip).then(res=>{
                      console.log('国家简称:',res)
                      if(res.code==0){
                          this.COUNTRY(res.data)
                      }
                  })
              }
          }else{
              positionShortName(null,null,this.ip).then(res=>{
                  console.log('国家简称:',res)
                  if(res.code==0){
                      this.COUNTRY(res.data)
                  }
              })
          }


          languageSelect().then(res=>{
              console.log('语言列表:',res)
              if(res.code==0){
                  var arr=[]
                  var defLang={}
                  for(let i in res.data.languageCtoModelList){
                      // if(res.data.languageCtoModelList[i].lang!='ES'&&res.data.languageCtoModelList[i].lang!='PT'){
                      //     arr.push(res.data.languageCtoModelList[i])
                      // }
                      arr.push(res.data.languageCtoModelList[i])
                      if(res.data.languageCtoModelList[i].lang=='EN'){
                          defLang=res.data.languageCtoModelList[i]
                      }
                  }
                  this.LANGLIST(arr)
                  if(JSON.stringify(this.lang) == "{}"){
                      this.LANG(defLang)
                  }
                  var videoGenreCtoModelList={}
                  var that=this
                  async function pa(){
                      for(let i in res.data.languageCtoModelList){
                          videoGenreCtoModelList[res.data.languageCtoModelList[i].lang]= await that.videoGenre(res.data.languageCtoModelList[i].lang)
                      }
                      that.VIDEOGENRELIST(videoGenreCtoModelList)
                      that.STARTLOAD(false)
                  }
                  pa()
              }
          })
      },
      methods:{
          ...mapMutations(['ISLOGIN','USERINFO','LANG','LANGLIST','VIDEOGENRELIST','COUNTRY','STARTLOAD']),

          videoGenre(lang){
              return new Promise((resolve, reject) => {
                  videoGenre(lang).then(res=>{
                      resolve(res.data.videoGenreCtoModelList)
                  })
              })
          },
      },
  }
</script>

<style lang="scss">
  @import "./assets/css/reset.css";
  a{
    text-decoration: none;
    color: #fff;
  }
  html{
    overflow-x: hidden;
  }
  body{
    font-family:'Nunito', sans-serif;
    background: #000;
    color: #555;
    font-size: 16px;
    min-width: 1200px;
  }
  li{
    list-style-type: none;
  }
  .date-input{
    background: none;
    border: none;
    color: #fff;
    font-size: 18px;
    outline: none;
  }
</style>
