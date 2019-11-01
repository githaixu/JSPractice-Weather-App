//DOMをキャッシュする
const number = document.querySelector('#number');
const description = document.querySelector('#description');
const timezone = document.querySelector('#timezone');
const domicon = document.querySelector('#icon');

//windowがロードしたら緯度と経度を取得する
window.addEventListener('load', function(e){
  //受け皿の作成
  let long;
  let lat;
  let geolocation = navigator.geolocation;
  //navigator.geolocationが動作する場合
  if(geolocation){
    //成功のコールバック関数の作成
    function success(position){
      //成功した場合緯度と経度を取得する
      let crd = position.coords;
      long = crd.longitude;
      lat = crd.latitude;
      //現在位置の緯度と経度に基づいてAPIから気温などの情報を取得する
      const PROXY = 'https://cors-anywhere.herokuapp.com/';
      //CROS問題を解決するためにPROXYを設置
      const API = `${PROXY}https://api.darksky.net/forecast/3fcf9c5ab53a46503f8931f93a5ecc98/${lat},${long}?units=si&lang=ja&exclude=flags,hourly,daily`;
      //fetchからpromiseが帰ってくる
      fetch(API)
        .then(response => response.json())
        .then(json => {
          const {temperature, summary, icon} = json.currently;
          //DOMにAPIから取得した情報をセットする
          number.textContent = temperature;
          description.textContent = summary;
          timezone.textContent = json.timezone;
          console.log(icon)
          console.log(domicon);
          setIcon(icon, domicon)
        })
    }
    //失敗のコールバック関数の作成
    function error(error){
      let code = error.code;
      let message = error.message;
      console.warm(code + message);
    }
    geolocation.getCurrentPosition(success, error)
  //navigator.geolocation が動作しない場合
  }else{
    alert('the geolocaton function is not work in this browser');
  }

  function setIcon(icon, domicon){
    const skycons = new Skycons({color : "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(domicon, Skycons[currentIcon]);
  }

});
