export const dataX = (y, m)=>{
    function getDaysInOneMonth(year, month){
        month = parseInt(month, 10);
        var d= new Date(year, month, 0);
        return d.getDate();
    }
    function gsh(a){
        if(a>=10){
            return a
        }else{
            return '0'+a
        }
    }
    let totalDay = getDaysInOneMonth(y,m)
    let dataTimea = []
    for(let i =0;i<31;i++){
        let day = gsh(i+1)
        dataTimea.push(m+'-'+day)
    }

    switch (totalDay){
        case 28:
            return dataTimea.slice(0,28)
            break;
        case 29:
            return dataTimea.slice(0,29)
            break;
        case 30:
            return dataTimea.slice(0,30)
            break;
        case 31:
            return dataTimea.slice(0,31)
            break;
    }

}