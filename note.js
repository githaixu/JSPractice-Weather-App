//use geolocation API
let geolocation = navigator.geolocation;
//getCurrentPosition()
navigator.geolocation.getCurrentPosition(success[, error[, [options]])
//watchPostion()
navigator.geolocation.watchPosition(success[, error[, options]])
//clearPosition()
navigator.geolocation.clearWatch(id);

//solve the CROS problem by using the proxy
const PROXY = 'https://cors-anywhere.herokuapp.com/';
//uset the backtick `` and ${} to wrap statement
const API = `${PROXY}https://api.darksky.net/forecast/3fcf9c5ab53a46503f8931f93a5ecc98/${lat},${long}?units=si&lang=ja&exclude=flags,hourly,daily`;
//fetch()の使い方詳細はhttps://sbfl.net/blog/2017/01/29/fetch-api/
//.thenはプロミス成功した場合が実行され、.catch()はプロミスが履行されなかった場合実行される
fetch(API)
  .then(response => response.json())
  .then(json => {
    console.log(json);
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


//オブジェクトから簡単に複数の変数の値を代入する　ただし、名前は一致する必要がある
const {temperature, summary, icon} = json.currently;
