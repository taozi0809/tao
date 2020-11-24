<template>
    <div>
        <div id="paypal-button-container"></div>
    </div>
</template>

<script>
    import {YXB} from "../assets/config/YXB";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['lang','isLogin','userInfo']),
        },
        mounted:function(){
            let _this=this
            paypal.Buttons({
                style: {
                    layout:  'vertical',
                    color:   'white',
                    shape:   'rect',
                    label:   'paypal'
                },

                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '0.01'
                            }
                        }]
                    });
                },

                onApprove: function(data, actions) {

                    return actions.order.capture().then(function(details) {

                        console.log(details);
                        // return fetch(_this.abc(), {
                        //     method: 'post',
                        //     headers: {
                        //         'content-type': 'application/json'
                        //     },
                        //     body: JSON.stringify({
                        //         "object":{
                        //             "orderID": data.orderID
                        //         }
                        //     })
                        // });
                        var option={method:'youxibi.paypal.create.order', data:{idCode:_this.userInfo.idCode,productId:1}}
                        var url=YXB.url.zf

                        let data = YXB.getBaseCtoInfo(option.method,option.data)
                        let ret=''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        data = ret
                        url = url+'?'+data
                        let obj = {"object":{
                                "orderID": data.orderID
                            }
                        }
                        obj=JSON.stringify(obj)
                        $.ajax({
                            type: 'POST',
                            url: url,
                            data: obj,
                            dataType: "json",
                            contentType: "application/json;",
                            success: function(res){
                                console.log('gopay:',res)
                            },
                        })
                    });


                },
            }).render('#paypal-button-container');
        },
        methods:{


            abc(){
                var option={method:'youxibi.paypal.create.order', data:{idCode:this.userInfo.idCode,productId:1}}
                var url=YXB.url.zf
                let data = YXB.getBaseCtoInfo(option.method,option.data)
                let ret=''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                data = ret
                url = url+'?'+data
                return url
            }



        },
    }
</script>