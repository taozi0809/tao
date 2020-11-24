export const lastDateArr = ()=>{
    var lastSeven = []
    var lastThirty = []
    var lastNinety = []


    for(var i = 1;i<8;i++){
        lastSeven.unshift(new Date(new Date()
            .setDate(new Date().getDate()-i))
            .toLocaleDateString())
    }
    for(var i = 1;i<31;i++){
        lastThirty.unshift(new Date(new Date()
            .setDate(new Date().getDate()-i))
            .toLocaleDateString())
    }
    for(var i = 1;i<91;i++){
        lastNinety.unshift(new Date(new Date()
            .setDate(new Date().getDate()-i))
            .toLocaleDateString())
    }
    return [lastSeven,lastThirty,lastNinety]

}