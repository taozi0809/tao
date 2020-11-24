import Message from './message'

const message = {
  install:function(Vue){
    Vue.component('message',Message)
  }
}

export default message
