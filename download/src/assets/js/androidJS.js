export function setScale() {
  if (window.top !== window) {
    return;
  }
  var pageScale = 1;

  var width = document.documentElement.clientWidth || 320;
  var height = document.documentElement.clientHeight || 693;


  if (width / height >= 320 / 693) {
    pageScale = height / 693;
  } else {
    pageScale = width / 320;
  }
  pageScale = pageScale.toFixed(2)
  console.log('screen.width', width, 'screen.height', height, 'setScale', pageScale);
  // meta
  var content = 'width=320, initial-scale=' + pageScale + ', maximum-scale=' + pageScale + ', user-scalable=no';
  document.getElementById('viewport').setAttribute('content', content);
}

export function isWeChat() {
  // console.log(window.navigator.userAgent)
  var ua = window.navigator.userAgent.toLowerCase();
  // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  }
  return false;
}

export function isYouxibi() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/Youxibi/i) == 'youxibi') {
    return true;
  }
  return false;
}

export function downloadApk(url) {
  javascript:js.downloadApk(url)
}

