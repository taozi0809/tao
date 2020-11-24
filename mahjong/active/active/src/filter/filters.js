let mjTosrc=(item,$index)=>{
    if ($index >= 0 && $index <= 8) {
        if (item <= 0) {
            return require("../assets/img/acr-27/" + ($index + 1) + "w-no.png");
        }
        else {
            return require("../assets/img/acr-27/" + ($index + 1) + "w.png");
        }
    }
    else if ($index >= 9 && $index <= 17) {
        if (item <= 0) {
            return require("../assets/img/acr-27/" + ($index - 8) + "t-no.png");
        }
        else {
            return require("../assets/img/acr-27/" + ($index - 8) + "t.png");
        }
    }
    else {
        if (item <= 0) {
            return require("../assets/img/acr-27/" + ($index - 17) + "s-no.png");
        }
        else {
            return require("../assets/img/acr-27/" + ($index - 17) + "s.png");
        }
    }
}
let areares=(item)=>{
    if (item < 0) {
        return require("../assets/img/majiangBox.png");
    } else {
        if (item >= 0 && item <= 8) {
            return require("../assets/img/acr-27/" + (item + 1) + "w.png")
        }
        if (item >= 9 && item <= 17) {
            return require("../assets/img/acr-27/" + (item - 8) + "t.png")
        }
        if (item >= 18 && item <= 26) {
            return require("../assets/img/acr-27/" + (item - 17) + "s.png")
        }

    }
}

let areaResW = (item,$index)=>{
    if (item <= 0) {
        return require("../assets/img/acr-27/" + ($index + 1) + "w-no.png");
    } else {
        return require("../assets/img/acr-27/" + ($index + 1) + "w.png");
    }
}
let areaResT = (item,$index)=>{
    if (item <= 0) {
        return require("../assets/img/acr-27/" + ($index + 1) + "t-no.png");
    } else {
        return require("../assets/img/acr-27/" + ($index + 1) + "t.png");
    }
}
let areaResS = (item,$index)=>{
    if (item <= 0) {
        return require("../assets/img/acr-27/" + ($index + 1) + "s-no.png");
    } else {
        return require("../assets/img/acr-27/" + ($index + 1) + "s.png");
    }
}

export const recopymjnumber = (item)=>{
    if (item <= 0) {
        return 0;
    } else {
        return "x" + item;
    }
}

export {mjTosrc,areares,areaResW,areaResT,areaResS}