// https://www.youtube.com/watch?v=EQgoiDtk1I4


let info = new browserInfo();

function t1() {
  const result = document.getElementById('result');

  result.innerHTML = ("локация скрипта: " + info.pageon())
  result.innerHTML += "<hr>"
  result.innerHTML += ("откуда перешел: " + info.referrer())
  result.innerHTML += "<hr>"
  result.innerHTML += ("глубина истории браузера: " + info.previousSites())
  result.innerHTML += "<hr>"
  result.innerHTML += ("информация о браузере: " + info.brInfo())
  result.innerHTML += "<hr>"

// доступно HTTPS
  let memory = navigator.deviceMemory
  result.innerHTML += ("Размер оперативной памяти примерно: " +
    memory + " Гб")
  result.innerHTML += "<hr>"



  ///////////////////////////////////////////////////////
  // https://www.w3.org/TR/battery-status/#examples
  navigator.getBattery().then(battery => {
    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
      updateChargingInfo();
      updateDischargingInfo();
    }
    updateAllBatteryInfo();

    battery.addEventListener('chargingchange', () => {
      updateChargeInfo();
    });

    function updateChargeInfo() {
      result.innerHTML += ("Заряжается сейчас батарея или нет: " +
        (battery.charging ? "Да" : "Нет"));
    }

    battery.addEventListener('levelchange', () => {
      updateLevelInfo();
    });

    function updateLevelInfo() {
      result.innerHTML += ("<br>Уровень заряда батареи устройства: " +
        battery.level * 100 + "%");
    }

    battery.addEventListener('chargingtimechange', () => {
      updateChargingInfo();
    });

    function updateChargingInfo() {
      result.innerHTML += ("<br>Число оставшихся секунд до полной зарядки, или 0, если устройство заряжено: " +
        battery.chargingTime + " seconds");
    }

    battery.addEventListener('dischargingtimechange', () => {
      updateDischargingInfo();
    });

    function updateDischargingInfo() {
      result.innerHTML += ("<br>Число оставшихся секунд до полной разрядки устройства: " +
        battery.dischargingTime + " seconds");
    }
    result.innerHTML += "<hr>"

  });

  result.innerHTML += ("Предпочитаемые пользователем языки браузера: " + navigator.languages)
  result.innerHTML += "<hr>"

  result.innerHTML += ("Количество одновременных точек касания, поддерживаемых текущим устройством: " + navigator.maxTouchPoints)
  result.innerHTML += "<hr>"



// доступно HTTPS
  result.innerHTML += ("userAgentData: " + navigator.userAgentData.brands[1]['brand'] +
    " версия " + navigator.userAgentData.brands[1]['version'] +
    ", производитель: " + navigator.vendor)
  result.innerHTML += "<hr>"

  result.innerHTML += ("Ширина экрана: " + screen.width + " px" +
    "<br>Высота экрана: " + screen.height + " px" +
    "<br>Ширина браузера: " + document.body.clientWidth + " px" +
    "<br>?Высота браузера: " + document.body.clientHeight + " px" +
    "<br>Внутренняя ширина: " + window.innerWidth + " px" +
    "<br>Внутренняя высота: " + window.innerHeight + " px" +
    "<br>screenAvailWidth: " + screen.availWidth + " px" +
    "<br>screenAvailHeight: " + screen.availHeight + " px" +
    "<br>Глубина цвета: " + screen.colorDepth +
    "<br>?Глубина пикселей: " + screen.pixelDepth)
  result.innerHTML += "<hr>"

  navigator.clipboard.readText().then(
    clipText => result.innerHTML += ("Данные из буфера обмена: " +
      clipText + "<hr>"));

  ///////////////////////////////////////////////////////
  //
  // //bluetooth
  // navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
  // .then(device => {result.innerHTML += ("<br> bluetooth: "
  //              + device);})
  // .catch(error => {result.innerHTML += ("<br> bluetooth: "
  //              + error);});
  //
  // /////////////////////
  // navigator.bluetooth.requestDevice({acceptAllDevices:true}).then(function(device) {
  //     alert('Name: ' + device.name);
  // }).catch(function(error) {
  //     alert("Something went wrong. " + error);
  // });


}


// https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
function getTimestamp() {
  const pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();

  result.innerHTML += "Текущее время загрузки страницы: " + `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  result.innerHTML += "<hr>";
}




function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    result.innerHTML += "Определение местоположения не поддерживается вашим браузером.";
  }
}

function showPosition(position) {
  result.innerHTML += "Ваше место положение:<br>Широта: " + position.coords.latitude + " °" +
    "<br>Долгота: " + position.coords.longitude + " °" +
    "<br>Точность: " + position.coords.accuracy + " м" +
    "<hr>Ваша высота над уровнем моря: " + position.coords.altitude + " м" +
    "<br>Точность: " + position.coords.altitudeAccuracy + " м" +
    "<hr>Направление движения: " + position.coords.heading + " °" +
    "<br>Скорость движения " + position.coords.speed + " м/c"
}


t1();
getTimestamp()
getLocation();
